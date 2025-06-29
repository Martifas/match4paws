'use client';

import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

import ToggleChip from '@/components/ui/buttons/ToggleChip';
import { PET_TYPES, GENDERS, SIZES, AGES } from '@/lib/constants/pet';
import usePetSearch from '@/hooks/usePetSearch';
import useFavorites from '@/hooks/useFavorites';
import SearchPetCard from '@/components/pet/petInfo/SearchPetCard';
import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';

import { useFilterPagination } from '@/hooks/usePagination';
import PaginationControls from '../ui/pagination/PaginationControls';

export default function Search() {
  const params = useSearchParams();

  const { pets, totalPages, loading } = usePetSearch(params);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { currentPage, setPage, setParam } = useFilterPagination({
    totalPages,
    resetPageOnFilterChange: true,
  });

  return (
    <div className="flex flex-col mx-auto">
      <Header
        left={<BackButton smartNavigation />}
        center={<h1 className="text-lg font-semibold">Search results</h1>}
      />

      <Box className="px-4 py-3 pb-5 space-y-3 max-w-3xl mx-auto">
        <div className="flex gap-3 ">
          <ToggleChip
            items={PET_TYPES}
            selected={params.get('type') as 'dog' | 'cat' | null}
            onChange={v => setParam('type', v)}
            getId={p => p.id.toLowerCase()}
            render={p => p.label}
          />
          <ToggleChip
            items={AGES}
            selected={
              params.get('age') as 'baby' | 'young' | 'adult' | 'senior' | null
            }
            onChange={v => setParam('age', v)}
            render={a => a.label}
          />
        </div>

        <div className="flex gap-3">
          <ToggleChip
            items={GENDERS}
            selected={params.get('gender') as 'female' | 'male' | 'any' | null}
            onChange={v => setParam('gender', v === 'any' ? null : v)}
            render={g => g.label}
          />
          <ToggleChip
            items={SIZES}
            selected={params.get('size') as 'small' | 'medium' | 'large' | null}
            onChange={v => setParam('size', v)}
            render={s => s.label}
          />
        </div>
      </Box>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mb-4"
      />

      {loading ? (
        <p className="text-center py-10">Loading…</p>
      ) : pets.length ? (
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6">
            {pets.map(p => (
              <SearchPetCard
                key={p.id}
                id={p.id}
                name={p.name}
                age={p.ageGroup}
                breed={p.breed}
                size={p.size}
                imageUrl={p.imageUrl}
                isFavorite={favorites.has(p.id)}
                onFavoriteRestored={addFavorite}
                onUnfavorited={removeFavorite}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">
          No pets match those filters yet.
        </p>
      )}
    </div>
  );
}
