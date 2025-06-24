import { db } from '@/lib/db';
import { sql } from 'kysely';
import { PetFilters, PetSearchResult } from '../types/pets';

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

export type PetPhoto = {
  url: string;
};

export type PetOwner = {
  name: string;
};

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
  return await db
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

export async function getUserByAuth0Id(
  auth0Id: string
): Promise<{ id: string } | null> {
  return (
    (await db
      .selectFrom('users')
      .select(['id'])
      .where('auth0Id', '=', auth0Id)
      .executeTakeFirst()) || null
  );
}

export async function isPetFavorited(
  petId: string,
  userId: string
): Promise<boolean> {
  const result = await db
    .selectFrom('favourites')
    .select('petId')
    .where('petId', '=', petId)
    .where('userId', '=', userId)
    .executeTakeFirst();

  return !!result;
}
