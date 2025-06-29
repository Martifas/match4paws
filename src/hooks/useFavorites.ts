
import { useEffect, useState } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
     
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFavorites(new Set(data.pets.map((pet: any) => pet.id)));
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = (petId: string) => {
    setFavorites(prev => new Set([...prev, petId]));
  };

  const removeFavorite = (petId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.delete(petId);
      return next;
    });
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    refetch: fetchFavorites,
  };
}