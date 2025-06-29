'use client';

import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

type Props = {
  petId: string;
  initiallyFav: boolean;
  onUnfavorited?: (petId: string) => void;
  onFavoriteRestored?: (petId: string) => void;
};

export default function FavoriteButton({
  petId,
  initiallyFav,
  onUnfavorited,
  onFavoriteRestored,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(initiallyFav);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initiallyFav);
  }, [initiallyFav]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    const newFavoriteState = !isFavorite;
    const previousFavoriteState = isFavorite;

    setIsFavorite(newFavoriteState);

    try {
      const response = await fetch('/api/favorites', {
        method: newFavoriteState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      if (newFavoriteState && onFavoriteRestored) {
        onFavoriteRestored(petId);
      } else if (!newFavoriteState && onUnfavorited) {
        onUnfavorited(petId);
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);

      setIsFavorite(previousFavoriteState);

      if (newFavoriteState && onUnfavorited) {
        onUnfavorited(petId);
      } else if (!newFavoriteState && onFavoriteRestored) {
        onFavoriteRestored(petId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        p-2 rounded-full transition-all duration-200 z-10 relative
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${!isLoading ? 'hover:bg-orange-200' : ''}
      `}
      style={{
        color: '#ed9426',
        backgroundColor: isFavorite
          ? 'rgba(237, 148, 38, 0.15)'
          : 'transparent',
      }}
      onMouseEnter={e => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = 'rgba(237, 148, 38, 0.3)';
        }
      }}
      onMouseLeave={e => {
        if (!isLoading) {
          e.currentTarget.style.backgroundColor = isFavorite
            ? 'rgba(237, 148, 38, 0.15)'
            : 'transparent';
        }
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
    </button>
  );
}
