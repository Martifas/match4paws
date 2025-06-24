import PetCard from '@/components/pet/PetCard';
import Header from '../ui/containers/Header';
import BackButton from '../ui/buttons/BackButton';
import SearchButton from '../ui/buttons/SearchButton';
import { searchPets } from '@/lib/queries/pets';
import { PetFilters } from '@/lib/types/pets';

export default async function SearchResults(filters: PetFilters) {
  const pets = await searchPets(filters);

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
            {pets.map(p => (
              <PetCard
                key={p.id}
                id={p.id}
                name={p.name}
                age={p.ageGroup}
                breed={p.breed}
                size={p.size}
                imageUrl={p.imageUrl}
                isFavorite={p.isFavorite}
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
