import Header from "@/components/ui/containers/Header";
import BackButton from "@/components/ui/buttons/BackButton";
import PetCarousel from "@/components/pet/petInfo/PetCarousel";
import StatBadge from "@/components/pet/petInfo/StatBadge";
import BottomBar from "../../ui/containers/BottomBar";
import FavoriteButton from "../../ui/buttons/FavoriteButton";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import { auth0 } from "@/lib/auth0";
import {
  getPetById,
  getPetPhotos,
  getPetOwner,
  isPetFavorited,
} from "@/lib/queries/pets";
import { getUserByAuth0Id } from "@/lib/queries/users";

export default async function PetInfo({ id }: { id: string }) {
  const pet = await getPetById(id);

  if (!pet) return <p className="p-6">Pet not found.</p>;

  const [photos, owner] = await Promise.all([
    getPetPhotos(id),
    getPetOwner(pet.ownerId),
  ]);

  const session = await auth0.getSession();
  let initiallyFav = false;

  if (session) {
    const user = await getUserByAuth0Id(session.user.sub);
    if (user) {
      initiallyFav = await isPetFavorited(id, user.id);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-col h-1/2 max-h-[50vh] flex-shrink-0">
        <Header
          left={<BackButton smartNavigation />}
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

      <BottomBar alwaysSticky>
        <FavoriteButton petId={id} initiallyFav={initiallyFav} />
        <PrimaryButton>Adopt</PrimaryButton>
      </BottomBar>
    </div>
  );
}
