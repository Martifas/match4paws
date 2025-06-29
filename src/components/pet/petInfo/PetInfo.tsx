import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';
import PetCarousel from '@/components/pet/petInfo/PetCarousel';
import StatBadge from '@/components/pet/petInfo/StatBadge';
import BottomBar from '../../ui/containers/BottomBar';
import FavoriteButton from '../../ui/buttons/FavoriteButton';

import { auth0 } from '@/lib/auth0';
import {
  getPetById,
  getPetPhotos,
  getPetOwner,
  isPetFavorited,
} from '@/lib/queries/pets';
import { getUserByAuth0Id } from '@/lib/queries/users';
import AdoptButton from '@/components/chat/AdoptButton';

export default async function PetInfo({ id }: { id: string }) {
  const pet = await getPetById(id);

  if (!pet) return <p className="p-6">Pet not found.</p>;

  const [photos, owner] = await Promise.all([
    getPetPhotos(id),
    getPetOwner(pet.ownerId),
  ]);

  const session = await auth0.getSession();
  let initiallyFav = false;
  let currentUser = null;

  if (session) {
    currentUser = await getUserByAuth0Id(session.user.sub);
    if (currentUser) {
      initiallyFav = await isPetFavorited(id, currentUser.id);
    }
  }

  const isOwner = currentUser && currentUser.id === pet.ownerId;

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

      <div
        className={`flex-1 overflow-y-auto flex flex-col gap-4 px-4 py-3 max-w-xl mx-auto w-full ${isOwner ? 'mb-4' : 'mb-28'}`}
      >
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
            {isOwner && <span className="ml-2 text-orange-600">(You)</span>}
          </p>
        )}

        <div className="flex-1 overflow-y-auto">
          {pet.description && (
            <p className="text-gray-700">{pet.description}</p>
          )}
        </div>

        {isOwner && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-20 text-center">
            <p className="text-orange-800 font-medium">
              This is your pet listing
            </p>
            <p className="text-orange-600 text-sm mt-1">
              You can edit or manage this listing from your account
            </p>
          </div>
        )}
      </div>

      {!isOwner && (
        <BottomBar alwaysSticky>
          <div className="flex max-w-lg w-full pb-30 gap-2">
            <FavoriteButton petId={id} initiallyFav={initiallyFav} />
            <AdoptButton petId={id} ownerId={pet.ownerId} />
          </div>
        </BottomBar>
      )}
    </div>
  );
}
