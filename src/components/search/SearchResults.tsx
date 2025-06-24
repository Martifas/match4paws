import { db } from "@/lib/db";
import { sql } from "kysely";
import PetCard from "@/components/ui/containers/PetCard";

type Filters = {
  type?: string;
  gender?: string;
  size?: string;
  age?: string;
};

export default async function SearchResults(filters: Filters) {
  let q = db
    .selectFrom("pets")
    .leftJoin("petImages as pi", "pi.petId", "pets.id")
    .select(({ ref }) => [
      "pets.id",
      "pets.name",
      ref("pets.ageGroup").as("ageGroup"),
      "pets.breed",
      "pets.size",
      sql<string>`pi.url`.as("imageUrl"),
    ])
    .orderBy("pets.createdAt desc")
    .limit(20);

  if (filters.type) q = q.where("pets.type", "=", filters.type);
  if (filters.gender) q = q.where("pets.gender", "=", filters.gender);
  if (filters.size) q = q.where("pets.size", "=", filters.size);
  if (filters.age) q = q.where("pets.ageGroup", "=", filters.age);

  const pets = await q.execute();

  if (!pets.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No pets match those filters yet.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-6">
        {pets.map((p) => (
          <PetCard
            key={p.id}
            id={p.id}
            name={p.name}
            age={p.ageGroup}
            breed={p.breed}
            size={p.size}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
