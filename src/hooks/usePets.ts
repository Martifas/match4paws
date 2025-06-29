import { PAGE_SIZE } from '@/lib/constants/pet';
import { Pet } from '@/lib/types/pets';
import { useCallback, useEffect, useState } from 'react';

export default function usePets(
  userId: string | undefined,
  page: number,
  filters: string[]
) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const qs = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      if (filters.length) qs.set('filters', filters.join(','));

      const res = await fetch(`/api/pets?${qs}`);
      if (!res.ok) throw new Error('Fetch failed');
      const { pets, totalCount } = await res.json();
      setPets(pets);
      setTotalCount(totalCount);
    } catch (err) {
      console.error(err);
      setError('Failed to load pets');
    } finally {
      setLoading(false);
    }
  }, [userId, page, filters]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const refetch = useCallback(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, totalCount, isLoading, error, refetch };
}
