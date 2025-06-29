'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PetCard from '@/components/pet/petInfo/SearchPetCard';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import { FavoritedPet } from '@/lib/queries/favorites';
import PaginationControls from '../ui/pagination/PaginationControls';
import { PAGE_SIZE } from '@/lib/constants/pet';
import { usePagination } from '@/hooks/usePagination';

type FavoritesListProps = {
  initialPets: FavoritedPet[];
};

export default function FavoritesList({ initialPets }: FavoritesListProps) {
  const router = useRouter();
  const [pets, setPets] = useState<FavoritedPet[]>(initialPets);

  const totalPages = Math.ceil(pets.length / PAGE_SIZE);

  const { currentPage, setPage } = usePagination({
    totalPages,
    scrollToTop: true,
  });

  const paginatedPets = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return pets.slice(startIndex, startIndex + PAGE_SIZE);
  }, [pets, currentPage]);

  const handlePetUnfavorited = (petId: string) => {
    setPets(prev => {
      const newPets = prev.filter(pet => pet.id !== petId);

      const newTotalPages = Math.ceil(newPets.length / PAGE_SIZE);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }

      return newPets;
    });
  };

  const handlePetFavoriteRestored = (petId: string) => {
    const petToRestore = initialPets.find(pet => pet.id === petId);
    if (petToRestore) {
      setPets(prev => {
        const exists = prev.some(pet => pet.id === petId);
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
    <div className="max-w-4xl mx-auto px-4">
      {pets.length > 0 ? (
        <>
          <div className="text-center py-4">
            <p className="text-gray-600">
              {pets.length} favorite {pets.length === 1 ? 'pet' : 'pets'}
            </p>
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mb-6"
          />

          <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6">
            {paginatedPets.map(pet => (
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
        </>
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
            onClick={() => router.push('/search')}
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
