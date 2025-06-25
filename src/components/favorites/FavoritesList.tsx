"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PetCard from "@/components/pet/petInfo/PetCard";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { FavoritedPet } from "@/lib/queries/favorites";

type FavoritesListProps = {
  initialPets: FavoritedPet[];
};

export default function FavoritesList({ initialPets }: FavoritesListProps) {
  const router = useRouter();
  const [pets, setPets] = useState<FavoritedPet[]>(initialPets);

  const handlePetUnfavorited = (petId: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== petId));
  };

  const handlePetFavoriteRestored = (petId: string) => {
    const petToRestore = initialPets.find((pet) => pet.id === petId);
    if (petToRestore) {
      setPets((prev) => {
        const exists = prev.some((pet) => pet.id === petId);
        if (!exists) {
          return [...prev, petToRestore];
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    setPets(initialPets);
  }, [initialPets]);

  return (
    <div className="max-w-xl mx-auto px-4">
      {pets.length > 0 ? (
        <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6">
          {pets.map((pet) => (
            <div key={pet.id} className="relative">
              <PetCard
                id={pet.id}
                name={pet.name}
                age={pet.ageGroup}
                breed={pet.breed}
                size={pet.size}
                imageUrl={pet.imageUrl}
                isFavorite={true}
                onUnfavorited={handlePetUnfavorited}
                onFavoriteRestored={handlePetFavoriteRestored}
              />
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
          <PrimaryButton
            onClick={() => router.push("/search")}
            fullWidth={false}
            className="max-w-none w-auto"
          >
            Explore Pets
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
