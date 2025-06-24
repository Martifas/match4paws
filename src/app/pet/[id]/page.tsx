import { db } from "@/lib/db";
import Header from "@/components/ui/containers/Header";
import BackButton from "@/components/ui/buttons/BackButton";
import PetCarousel from "@/components/pet/PetCarousel";
import StatBadge from "@/components/pet/StatBadge";

export default async function PetPage({ params }: { params: { id: string } }) {
  const [pet] = await db
    .selectFrom("pets")
    .where("pets.id", "=", params.id)
    .select(["name", "ageGroup", "breed", "size", "gender", "description"])
    .execute();

  const photos = await db
    .selectFrom("petImages")
    .where("petId", "=", params.id)
    .orderBy("orderIdx")
    .select(["url"])
    .execute();

  if (!pet) return <p className="p-6">Pet not found.</p>;

  return (
    <>
      <Header
        left={<BackButton />}
        center={<h1 className="text-lg font-semibold">Pet Details</h1>}
      />

      <PetCarousel photos={photos} alt={pet.name} />

      <div className="flex justify-between w-full mx-auto max-w-md md:max-w-xl gap-4 py-4 m">
        <StatBadge label="Gender" value={pet.gender} color="red" />
        <StatBadge label="Age" value={pet.ageGroup} color="blue" />
        <StatBadge label="Size" value={pet.size} color="green" />
      </div>

      {pet.description && <p>{pet.description}</p>}
    </>
  );
}
