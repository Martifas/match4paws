import { db } from "@/lib/db";
import { sql } from "kysely";

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

export async function searchPets(
  filters: PetFilters
): Promise<PetSearchResult[]> {
  let q = db
    .selectFrom("pets")
    .select(({ ref }) => [
      "pets.id",
      "pets.name",
      ref("pets.ageGroup").as("ageGroup"),
      "pets.breed",
      "pets.size",
      sql<string>`pi.url`.as("imageUrl"),
      sql<boolean>`CASE WHEN f.pet_id IS NOT NULL THEN true ELSE false END`.as(
        "isFavorite"
      ),
    ])
    .leftJoin("petImages as pi", (j) =>
      j.onRef("pi.petId", "=", "pets.id").on("pi.orderIdx", "=", 0)
    )
    .leftJoin("favourites as f", "f.petId", "pets.id")
    .limit(20);

  if (filters.type) q = q.where("pets.type", "=", filters.type);
  if (filters.gender) q = q.where("pets.gender", "=", filters.gender);
  if (filters.size) q = q.where("pets.size", "=", filters.size);
  if (filters.age) q = q.where("pets.ageGroup", "=", filters.age);

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
      .selectFrom("pets")
      .where("pets.id", "=", id)
      .select([
        "id",
        "name",
        "ageGroup",
        "breed",
        "size",
        "gender",
        "description",
        "ownerId",
      ])
      .executeTakeFirst()) || null
  );
}

export async function getPetPhotos(petId: string): Promise<PetPhoto[]> {
  return await db
    .selectFrom("petImages")
    .where("petId", "=", petId)
    .orderBy("orderIdx")
    .select(["url"])
    .execute();
}

export async function getPetOwner(ownerId: string): Promise<PetOwner | null> {
  return (
    (await db
      .selectFrom("users")
      .where("id", "=", ownerId)
      .select(["name"])
      .executeTakeFirst()) || null
  );
}

export async function isPetFavorited(
  petId: string,
  userId: string
): Promise<boolean> {
  const result = await db
    .selectFrom("favourites")
    .select("petId")
    .where("petId", "=", petId)
    .where("userId", "=", userId)
    .executeTakeFirst();

  return !!result;
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

type UpdatePetData = CreatePetData & {
  status?: string;
};

export async function createPet(
  ownerId: string,
  petData: CreatePetData
): Promise<string> {
  const result = await db
    .insertInto("pets")
    .values({
      ownerId,
      ...petData,
    })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
}

export async function getUserPets(userId: string) {
  const pets = await db
    .selectFrom("pets")
    .select([
      "pets.id",
      "pets.name",
      "pets.type",
      "pets.breed",
      "pets.gender",
      "pets.size",
      "pets.ageGroup",
      "pets.description",
      "pets.status",
      "pets.createdAt",
      "pets.updatedAt",
    ])
    .where("pets.ownerId", "=", userId)
    .orderBy("pets.createdAt", "desc")
    .execute();

  const petsWithImages = await Promise.all(
    pets.map(async (pet) => {
      const images = await db
        .selectFrom("petImages")
        .select(["url", "orderIdx"])
        .where("petId", "=", pet.id)
        .orderBy("orderIdx", "asc")
        .execute();

      return {
        ...pet,
        images,
      };
    })
  );

  return petsWithImages;
}

export async function getPetByIdForOwner(petId: string, userId: string) {
  const pet = await db
    .selectFrom("pets")
    .selectAll()
    .where("pets.id", "=", petId)
    .where("pets.ownerId", "=", userId)
    .executeTakeFirst();

  if (!pet) {
    return null;
  }

  const images = await db
    .selectFrom("petImages")
    .select(["url", "orderIdx"])
    .where("petId", "=", petId)
    .orderBy("orderIdx", "asc")
    .execute();

  return {
    ...pet,
    images,
  };
}

export async function updatePet(
  petId: string,
  userId: string,
  petData: UpdatePetData
) {
  await db
    .updateTable("pets")
    .set({
      ...petData,
      updatedAt: new Date(),
    })
    .where("id", "=", petId)
    .where("ownerId", "=", userId)
    .execute();
}

export async function deletePet(petId: string, userId: string) {
  await db.deleteFrom("petImages").where("petId", "=", petId).execute();

  await db
    .deleteFrom("pets")
    .where("id", "=", petId)
    .where("ownerId", "=", userId)
    .execute();
}

export async function savePetImageUrls(petId: string, imageUrls: string[]) {
  await db.deleteFrom("petImages").where("petId", "=", petId).execute();

  if (imageUrls.length > 0) {
    const imageRecords = imageUrls.map((url, index) => ({
      petId: petId,
      url: url,
      orderIdx: index,
    }));

    await db.insertInto("petImages").values(imageRecords).execute();
  }
}
