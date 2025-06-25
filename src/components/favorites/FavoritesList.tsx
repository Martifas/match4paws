"use client";

import PetCard from "@/components/pet/PetCard";
import { FavoritedPet } from "@/lib/queries/favorites";

type FavoritesListProps = {
  initialPets: FavoritedPet[];
};

export default function FavoritesList({ initialPets }: FavoritesListProps) {
  return (
    <div className="max-w-xl mx-auto px-4">
      {initialPets.length > 0 ? (
        <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6">
          {initialPets.map((pet) => (
            <div key={pet.id} className="relative">
              <PetCard
                id={pet.id}
                name={pet.name}
                age={pet.ageGroup}
                breed={pet.breed}
                size={pet.size}
                imageUrl={pet.imageUrl}
                isFavorite={true}
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded text-xs px-2 py-1">
                Added {new Date(pet.favoritedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-6xl">💔</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring pets and add some to your favorites!
          </p>
          <a
            href="/searchresults"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Explore Pets
          </a>
        </div>
      )}
    </div>
  );
}
