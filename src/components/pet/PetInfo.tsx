import { db } from "@/lib/db";
import Header from "@/components/ui/containers/Header";
import BackButton from "@/components/ui/buttons/BackButton";
import PetCarousel from "@/components/pet/PetCarousel";
import StatBadge from "@/components/pet/StatBadge";

export default async function PetInfo({ id }: { id: string }) {
  const pet = await db
    .selectFrom("pets")
    .where("pets.id", "=", id)
    .select([
      "name",
      "ageGroup",
      "breed",
      "size",
      "gender",
      "description",
      "ownerId",
    ])
    .executeTakeFirst();

  if (!pet) return <p className="p-6">Pet not found.</p>;

  const photos = await db
    .selectFrom("petImages")
    .where("petId", "=", id)
    .orderBy("orderIdx")
    .select(["url"])
    .execute();

  const owner = await db
    .selectFrom("users")
    .where("id", "=", pet.ownerId)
    .select(["name"])
    .executeTakeFirst();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-col h-1/2 max-h-[50vh] flex-shrink-0">
        <Header
          left={<BackButton />}
          center={<h1 className="text-lg font-semibold">Pet Details</h1>}
        />

        <div className="flex-1 min-h-0">
          <PetCarousel photos={photos} alt={pet.name} className="h-full" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-4 py-3 max-w-xl mx-auto w-full">
        <div>
          <span className="font-bold text-lg pr-1">{pet.name}</span>
          <span className="text-gray-500">({pet.breed})</span>
        </div>

        <div className="flex justify-between gap-4">
          <StatBadge label="Gender" value={pet.gender} color="red" />
          <StatBadge label="Age" value={pet.ageGroup} color="blue" />
          <StatBadge label="Size" value={pet.size} color="green" />
        </div>

        {owner && (
          <p className="text-gray-600">
            Posted by <span className="font-bold">{owner.name}</span>
          </p>
        )}

        {pet.description && <p>{pet.description}</p>}
      </div>
    </div>
  );
}
