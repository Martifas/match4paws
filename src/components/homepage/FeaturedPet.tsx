'use client';

import { useMemo } from 'react';
import SearchPetCard from '../pet/petInfo/SearchPetCard';

export type FeaturedPet = {
  id: string;
  name: string;
  ageGroup: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
};

export function FeaturedPets({ pets }: { pets: FeaturedPet[] }) {
  const topSix = useMemo(() => pets.slice(0, 6), [pets]);

  if (!topSix.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Featured Pets
      </h2>
      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topSix.map(p => (
          <SearchPetCard
            key={p.id}
            id={p.id}
            name={p.name}
            age={p.ageGroup}
            breed={p.breed}
            size={p.size}
            imageUrl={p.imageUrl ?? undefined}
            isFavorite={false}
          />
        ))}
      </div>
    </section>
  );
}
