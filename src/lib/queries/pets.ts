import { db } from '@/lib/db';
import { sql } from 'kysely';

export type PetFilters = {
  type?: string;
  gender?: string;
  size?: string;
  age?: string;
};

export type PetSearchResult = {
  id: string;
  name: string;
  ageGroup: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
  isFavorite: boolean;
};

export async function searchPetsSlice(
  filters: PetFilters,
  page: number,
  limit: number
) {
  /* 1️⃣  base builder with filters, no joins yet ------------------ */
  let base = db.selectFrom('pets');

  if (filters.type) base = base.where('pets.type', '=', filters.type);
  if (filters.gender) base = base.where('pets.gender', '=', filters.gender);
  if (filters.size) base = base.where('pets.size', '=', filters.size);
  if (filters.age) base = base.where('pets.ageGroup', '=', filters.age);

  /* 2️⃣  total count ---------------------------------------------- */
  const { count } = await base
    .clearSelect() // keep builder clean
    .select(eb => eb.fn.countAll().as('count'))
    .executeTakeFirstOrThrow();

  /* 3️⃣  data slice with join + select ---------------------------- */
  const pets = await base
    .leftJoin('petImages as pi', j =>
      j.onRef('pi.petId', '=', 'pets.id').on('pi.orderIdx', '=', 0)
    )
    .offset((page - 1) * limit)
    .limit(limit)
    .orderBy('pets.createdAt', 'desc')
    .select([
      'pets.id',
      'pets.name',
      'pets.breed',
      'pets.size',
      'pets.ageGroup',
      sql<string>`pi.url`.as('imageUrl'),
    ])
    .execute();

  return { pets, totalCount: Number(count) };
}

export async function searchPets(
  filters: PetFilters
): Promise<PetSearchResult[]> {
  let q = db
    .selectFrom('pets')
    .select(({ ref }) => [
      'pets.id',
      'pets.name',
      ref('pets.ageGroup').as('ageGroup'),
      'pets.breed',
      'pets.size',
      sql<string>`pi.url`.as('imageUrl'),
      sql<boolean>`CASE WHEN f.pet_id IS NOT NULL THEN true ELSE false END`.as(
        'isFavorite'
      ),
    ])
    .leftJoin('petImages as pi', j =>
      j.onRef('pi.petId', '=', 'pets.id').on('pi.orderIdx', '=', 0)
    )
    .leftJoin('favourites as f', 'f.petId', 'pets.id')
    .limit(20);

  if (filters.type) q = q.where('pets.type', '=', filters.type);
  if (filters.gender) q = q.where('pets.gender', '=', filters.gender);
  if (filters.size) q = q.where('pets.size', '=', filters.size);
  if (filters.age) q = q.where('pets.ageGroup', '=', filters.age);

  return await q.execute();
}

export type PetDetails = {
  id: string;
  name: string;
  ageGroup: string;
  breed: string | null;
  size: string;
  gender: string;
  description: string | null;
  ownerId: string;
};

export type PetPhoto = { url: string };
export type PetOwner = { name: string };

export async function getPetByIdForOwner(petId: string, ownerId: string) {
  const pet = await db
    .selectFrom('pets')
    .selectAll()
    .where('id', '=', petId)
    .where('ownerId', '=', ownerId)
    .executeTakeFirst();

  if (!pet) return null;

  const images = await db
    .selectFrom('petImages')
    .select(['url', 'orderIdx'])
    .where('petId', '=', petId)
    .orderBy('orderIdx', 'asc')
    .execute();

  return { ...pet, images };
}

export async function getPetById(id: string): Promise<PetDetails | null> {
  return (
    (await db
      .selectFrom('pets')
      .where('pets.id', '=', id)
      .select([
        'id',
        'name',
        'ageGroup',
        'breed',
        'size',
        'gender',
        'description',
        'ownerId',
      ])
      .executeTakeFirst()) || null
  );
}

export async function getPetPhotos(petId: string): Promise<PetPhoto[]> {
  return db
    .selectFrom('petImages')
    .where('petId', '=', petId)
    .orderBy('orderIdx')
    .select(['url'])
    .execute();
}

export async function getPetOwner(ownerId: string): Promise<PetOwner | null> {
  return (
    (await db
      .selectFrom('users')
      .where('id', '=', ownerId)
      .select(['name'])
      .executeTakeFirst()) || null
  );
}

export async function isPetFavorited(
  petId: string,
  userId: string
): Promise<boolean> {
  const res = await db
    .selectFrom('favourites')
    .select('petId')
    .where('petId', '=', petId)
    .where('userId', '=', userId)
    .executeTakeFirst();
  return !!res;
}

type CreatePetData = {
  name: string;
  type: string;
  breed?: string | null;
  gender: string;
  size: string;
  ageGroup: string;
  description?: string | null;
};

export async function createPet(
  ownerId: string,
  petData: CreatePetData
): Promise<string> {
  const result = await db
    .insertInto('pets')
    .values({ ownerId, ...petData })
    .returning('id')
    .executeTakeFirstOrThrow();
  return result.id;
}

export async function getUserPets(userId: string) {
  const pets = await db
    .selectFrom('pets')
    .select([
      'pets.id',
      'pets.name',
      'pets.type',
      'pets.breed',
      'pets.gender',
      'pets.size',
      'pets.ageGroup',
      'pets.description',
      'pets.status',
      'pets.createdAt',
      'pets.updatedAt',
    ])
    .where('pets.ownerId', '=', userId)
    .orderBy('pets.createdAt', 'desc')
    .execute();

  const petsWithImages = await Promise.all(
    pets.map(async p => ({
      ...p,
      images: await db
        .selectFrom('petImages')
        .select(['url', 'orderIdx'])
        .where('petId', '=', p.id)
        .orderBy('orderIdx', 'asc')
        .execute(),
    }))
  );
  return petsWithImages;
}

export async function getUserPetsSlice(
  userId: string,
  offset: number,
  limit: number,
  chips: string[]
) {
  let q = db.selectFrom('pets').where('ownerId', '=', userId);

  if (chips.includes('cat') || chips.includes('dog'))
    q = q.where(
      'type',
      'in',
      chips.filter(c => c === 'cat' || c === 'dog')
    );

  if (chips.includes('female') || chips.includes('male'))
    q = q.where(
      'gender',
      'in',
      chips.filter(c => c === 'female' || c === 'male')
    );

  if (['small', 'medium', 'large'].some(c => chips.includes(c)))
    q = q.where(
      'size',
      'in',
      chips.filter(c => ['small', 'medium', 'large'].includes(c))
    );

  if (['baby', 'young', 'adult', 'senior'].some(c => chips.includes(c)))
    q = q.where(
      'ageGroup',
      'in',
      chips.filter(c => ['baby', 'young', 'adult', 'senior'].includes(c))
    );

  const [{ count }] = await q
    .select(eb => eb.fn.countAll().as('count'))
    .execute();

  const pets = await q
    .offset(offset)
    .limit(limit)
    .orderBy('createdAt', 'desc')
    .selectAll()
    .execute();

  const petsWithImages = await Promise.all(
    pets.map(async p => ({
      ...p,
      images: await db
        .selectFrom('petImages')
        .select(['url', 'orderIdx'])
        .where('petId', '=', p.id)
        .orderBy('orderIdx', 'asc')
        .execute(),
    }))
  );

  return { pets: petsWithImages, totalCount: Number(count) };
}

type UpdatePetData = Partial<{
  name: string;
  type: string;
  breed: string | null;
  gender: string;
  size: string;
  ageGroup: string;
  description: string | null;
  status: string;
}>;

export async function updatePet(
  petId: string,
  ownerId: string,
  petData: UpdatePetData
) {
  if (!Object.keys(petData).length) return;

  await db
    .updateTable('pets')
    .set({ ...petData, updatedAt: new Date() })
    .where('id', '=', petId)
    .where('ownerId', '=', ownerId)
    .execute();
}

export async function updatePetWithImages(
  petId: string,
  ownerId: string,
  petData: UpdatePetData,
  imageUrls: string[]
) {
  await db.transaction().execute(async trx => {
    if (Object.keys(petData).length) {
      await trx
        .updateTable('pets')
        .set({ ...petData, updatedAt: new Date() })
        .where('id', '=', petId)
        .where('ownerId', '=', ownerId)
        .execute();
    }

    const existing = await trx
      .selectFrom('petImages')
      .select(['id', 'url'])
      .where('petId', '=', petId)
      .execute();

    const currentUrls = new Set(existing.map(e => e.url));
    const newUrls = new Set(imageUrls);

    const toDelete = existing.filter(e => !newUrls.has(e.url)).map(e => e.id);
    if (toDelete.length) {
      await trx.deleteFrom('petImages').where('id', 'in', toDelete).execute();
    }

    const toInsert = imageUrls
      .map((url, idx) =>
        currentUrls.has(url)
          ? null
          : { id: crypto.randomUUID(), petId, url, orderIdx: idx }
      )
      .filter(Boolean) as {
      id: string;
      petId: string;
      url: string;
      orderIdx: number;
    }[];
    if (toInsert.length)
      await trx.insertInto('petImages').values(toInsert).execute();

    await Promise.all(
      imageUrls.map(async (url, idx) => {
        const row = existing.find(e => e.url === url);
        if (row) {
          await trx
            .updateTable('petImages')
            .set({ orderIdx: idx })
            .where('id', '=', row.id)
            .execute();
        }
      })
    );
  });
}

export async function deletePet(petId: string, ownerId: string) {
  await db.deleteFrom('petImages').where('petId', '=', petId).execute();
  await db
    .deleteFrom('pets')
    .where('id', '=', petId)
    .where('ownerId', '=', ownerId)
    .execute();
}

export async function savePetImageUrls(petId: string, imageUrls: string[]) {
  await db.deleteFrom('petImages').where('petId', '=', petId).execute();

  if (imageUrls.length) {
    await db
      .insertInto('petImages')
      .values(imageUrls.map((url, idx) => ({ petId, url, orderIdx: idx })))
      .execute();
  }
}
