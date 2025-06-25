'use client';

import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

type Props = {
  petId: string;
  initiallyFav: boolean;
};

export default function FavoriteButton({ petId, initiallyFav }: Props) {
  const [isFavorite, setIsFavorite] = useState(initiallyFav);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const newFavoriteState = !isFavorite;

    try {
      const response = await fetch('/api/favorites', {
        method: newFavoriteState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId }),
      });

      if (response.ok) {
        setIsFavorite(newFavoriteState);
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        p-2 rounded-full transition-all duration-200
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
