/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchPetCard from '../SearchPetCard';

vi.mock('../../ui/buttons/FavoriteButton', () => ({
  default: ({
    petId,
    initiallyFav,
    onUnfavorited,
    onFavoriteRestored,
  }: any) => (
    <button
      data-testid="favorite-button"
      data-pet-id={petId}
      data-initially-fav={initiallyFav}
      onClick={() => {
        if (initiallyFav && onUnfavorited) {
          onUnfavorited(petId);
        } else if (!initiallyFav && onFavoriteRestored) {
          onFavoriteRestored(petId);
        }
      }}
    >
      {initiallyFav ? '❤️' : '🤍'}
    </button>
  ),
}));

describe('SearchPetCard', () => {
  const defaultProps = {
    id: 'pet-123',
    name: 'Buddy',
    age: '3 years',
    breed: 'Golden Retriever',
    size: 'Large',
    imageUrl: 'https://example.com/buddy.jpg',
  };

  it('should render pet card with basic information', () => {
    render(<SearchPetCard {...defaultProps} />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByTestId('next-image')).toHaveAttribute(
      'src',
      'https://example.com/buddy.jpg'
    );
    expect(screen.getByTestId('next-image')).toHaveAttribute('alt', 'Buddy');
  });

  it('should render link to pet detail page', () => {
    render(<SearchPetCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pet/pet-123');
  });

  it('should not render image when imageUrl is null', () => {
    render(<SearchPetCard {...defaultProps} imageUrl={null} />);

    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
  });

  it('should render favorite button with correct props', () => {
    render(<SearchPetCard {...defaultProps} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveAttribute('data-pet-id', 'pet-123');
    expect(favoriteButton).toHaveAttribute('data-initially-fav', 'false');
  });

  it('should render favorite button as favorited when isFavorite is true', () => {
    render(<SearchPetCard {...defaultProps} isFavorite={true} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveAttribute('data-initially-fav', 'true');
    expect(favoriteButton).toHaveTextContent('❤️');
  });

  it('should render favorite button as not favorited when isFavorite is false', () => {
    render(<SearchPetCard {...defaultProps} isFavorite={false} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    expect(favoriteButton).toHaveAttribute('data-initially-fav', 'false');
    expect(favoriteButton).toHaveTextContent('🤍');
  });

  it('should call onUnfavorited when favorite button is clicked and pet is favorited', async () => {
    const user = userEvent.setup();
    const onUnfavorited = vi.fn();

    render(
      <SearchPetCard
        {...defaultProps}
        isFavorite={true}
        onUnfavorited={onUnfavorited}
      />
    );

    const favoriteButton = screen.getByTestId('favorite-button');
    await user.click(favoriteButton);

    expect(onUnfavorited).toHaveBeenCalledWith('pet-123');
  });

  it('should call onFavoriteRestored when favorite button is clicked and pet is not favorited', async () => {
    const user = userEvent.setup();
    const onFavoriteRestored = vi.fn();

    render(
      <SearchPetCard
        {...defaultProps}
        isFavorite={false}
        onFavoriteRestored={onFavoriteRestored}
      />
    );

    const favoriteButton = screen.getByTestId('favorite-button');
    await user.click(favoriteButton);

    expect(onFavoriteRestored).toHaveBeenCalledWith('pet-123');
  });

  it('should not call callbacks when they are not provided', async () => {
    const user = userEvent.setup();

    render(<SearchPetCard {...defaultProps} isFavorite={true} />);

    const favoriteButton = screen.getByTestId('favorite-button');
    await user.click(favoriteButton);

    expect(favoriteButton).toBeInTheDocument();
  });

  it('should apply correct CSS classes to image', () => {
    render(<SearchPetCard {...defaultProps} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass(
      'md:h-48',
      'h-38',
      'w-full',
      'object-cover',
      'rounded-xl'
    );
  });

  it('should have correct image dimensions', () => {
    render(<SearchPetCard {...defaultProps} />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '300');
  });

  it('should handle missing breed prop', () => {
    render(<SearchPetCard {...defaultProps} breed={null} />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
  });

  it('should handle all props being provided', () => {
    const onUnfavorited = vi.fn();
    const onFavoriteRestored = vi.fn();

    render(
      <SearchPetCard
        {...defaultProps}
        isFavorite={true}
        onUnfavorited={onUnfavorited}
        onFavoriteRestored={onFavoriteRestored}
      />
    );

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });
});
