'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Pagination } from '@mui/material';

import ToggleChip from '@/components/ui/buttons/ToggleChip';
import {
  PET_TYPES,
  GENDERS,
  SIZES,
  AGES,
  PAGE_SIZE,
} from '@/lib/constants/pet';
import usePetSearch from '@/hooks/usePetSearch';
import SearchPetCard from '@/components/pet/petInfo/SearchPetCard';
import Header from '@/components/ui/containers/Header';
import BackButton from '@/components/ui/buttons/BackButton';
import SearchButton from '@/components/ui/buttons/SearchButton';

export default function Search() {
  const router = useRouter();
  const params = useSearchParams();

  const { pets, totalPages, page, loading } = usePetSearch(params, PAGE_SIZE);

  const setParam = (key: string, value: string | null) => {
    const q = new URLSearchParams(params.toString());
    if (value) {
      q.set(key, value);
    } else {
      q.delete(key);
    }
    q.set('page', '1');
    router.replace(`/search?${q.toString()}`);
  };

  return (
    <>
      <Header
        left={<BackButton smartNavigation />}
        center={<h1 className="text-lg font-semibold">Search results</h1>}
        right={<SearchButton />}
      />

      <Box className="px-4 py-3 space-y-3 max-w-3xl mx-auto">
        <ToggleChip
          items={PET_TYPES}
          selected={params.get('type') as 'dog' | 'cat' | null}
          onChange={v => setParam('type', v)}
          getId={p => p.id.toLowerCase()}
          render={p => p.label}
        />

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

        <ToggleChip
          items={AGES}
          selected={
            params.get('age') as 'baby' | 'young' | 'adult' | 'senior' | null
          }
          onChange={v => setParam('age', v)}
          render={a => a.label}
        />
      </Box>

      {loading ? (
        <p className="text-center py-10">Loading…</p>
      ) : pets.length ? (
        <div className="max-w-3xl mx-auto px-4">
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
                isFavorite={p.isFavorite ?? false}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">
          No pets match those filters yet.
        </p>
      )}

      {totalPages > 1 && (
        <Box className="flex justify-center pb-14">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setParam('page', String(newPage))}
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
}
