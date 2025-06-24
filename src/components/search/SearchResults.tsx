import { db } from "@/lib/db";
import { sql } from "kysely";
import PetCard from "@/components/pet/PetCard";
import Header from "../ui/containers/Header";
import BackButton from "../ui/buttons/BackButton";
import SearchButton from "../ui/buttons/SearchButton";

type Filters = {
  type?: string;
  gender?: string;
  size?: string;
  age?: string;
};

export default async function SearchResults(filters: Filters) {
  let q = db
    .selectFrom("pets")
    .select(({ ref }) => [
      "pets.id",
      "pets.name",
      ref("pets.ageGroup").as("ageGroup"),
      "pets.breed",
      "pets.size",
      sql<string>`pi.url`.as("imageUrl"),
    ])
    .leftJoin("petImages as pi", (j) =>
      j.onRef("pi.petId", "=", "pets.id").on("pi.orderIdx", "=", 0)
    )
    .limit(20);

  if (filters.type) q = q.where("pets.type", "=", filters.type);
  if (filters.gender) q = q.where("pets.gender", "=", filters.gender);
  if (filters.size) q = q.where("pets.size", "=", filters.size);
  if (filters.age) q = q.where("pets.ageGroup", "=", filters.age);

  const pets = await q.execute();

  return (
    <>
      <Header
        left={<BackButton />}
        center={
          <h1 className="text-lg font-semibold tracking-wide select-none">
            Search results
          </h1>
        }
        right={<SearchButton />}
      />
      {pets.length > 0 && (
        <div className="max-w-xl mx-auto flex">
          <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6">
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
      )}
      {!pets.length && (
        <p className="text-center text-gray-500 py-10">
          No pets match those filters yet.
        </p>
      )}
    </>
  );
}
