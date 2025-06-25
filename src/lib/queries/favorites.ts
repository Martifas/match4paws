import { db } from "@/lib/db";

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
