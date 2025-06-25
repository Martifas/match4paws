import { db } from "@/lib/db";
import { sql } from "kysely";

export async function addFavorite(
  userId: string,
  petId: string
): Promise<void> {
  await db
    .insertInto("favourites")
    .values({ userId, petId })
    .onConflict((oc) => oc.columns(["userId", "petId"]).doNothing())
    .execute();
}

export async function removeFavorite(
  userId: string,
  petId: string
): Promise<void> {
  await db
    .deleteFrom("favourites")
    .where("userId", "=", userId)
    .where("petId", "=", petId)
    .execute();
}

export async function getUserFavorites(userId: string): Promise<string[]> {
  const favorites = await db
    .selectFrom("favourites")
    .select(["petId"])
    .where("userId", "=", userId)
    .execute();

  return favorites.map((f) => f.petId);
}

export type FavoritedPet = {
  id: string;
  name: string;
  ageGroup: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
  favoritedAt: Date;
};

export async function getUserFavoritedPets(
  userId: string
): Promise<FavoritedPet[]> {
  return await db
    .selectFrom("favourites as f")
    .innerJoin("pets as p", "p.id", "f.petId")
    .leftJoin("petImages as pi", (j) =>
      j.onRef("pi.petId", "=", "p.id").on("pi.orderIdx", "=", 0)
    )
    .select([
      "p.id",
      "p.name",
      "p.ageGroup",
      "p.breed",
      "p.size",
      sql<string>`pi.url`.as("imageUrl"),
      "f.createdAt as favoritedAt",
    ])
    .where("f.userId", "=", userId)
    .orderBy("f.createdAt", "desc")
    .execute();
}
