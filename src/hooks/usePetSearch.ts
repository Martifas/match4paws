import { PAGE_SIZE } from '@/lib/constants/pet';
import { useState, useEffect } from 'react';

type Pet = {
  isFavorite: boolean;
  id: string;
  name: string;
  breed: string | null;
  size: string;
  ageGroup: string;
  imageUrl: string | null;
};

export default function usePetSearch(
  query: URLSearchParams,
  limit = PAGE_SIZE
) {
  const page = Number(query.get('page') ?? 1);

  const [pets, setPets] = useState<Pet[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pets/search?${query.toString()}`);
        const json: { pets: Pet[]; totalCount: number } = await res.json();
        setPets(json.pets);
        setTotal(json.totalCount);
        setError(null);
      } catch {
        setError('Failed to load pets');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { pets, page, totalPages, loading, error };
}
