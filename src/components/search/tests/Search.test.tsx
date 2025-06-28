/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}));

vi.mock('@/hooks/usePetSearch', () => ({
  default: vi.fn(() => ({
    pets: [],
    totalPages: 1,
    page: 1,
    loading: false,
  })),
}));

vi.mock('@/lib/constants/pet', () => ({
  PET_TYPES: [
    { id: 'DOG', label: 'Dogs' },
    { id: 'CAT', label: 'Cats' },
  ],
  GENDERS: [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'any', label: 'Any' },
  ],
  SIZES: [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ],
  AGES: [
    { id: 'baby', label: 'Baby' },
    { id: 'young', label: 'Young' },
    { id: 'adult', label: 'Adult' },
    { id: 'senior', label: 'Senior' },
  ],
}));

vi.mock('@/components/ui/buttons/ToggleChip', () => ({
  default: ({ items, selected, onChange, getId, render }: any) => (
    <div data-testid="toggle-chip">
      {items.map((item: any) => (
        <button
          key={getId ? getId(item) : item.id}
          onClick={() => onChange(getId ? getId(item) : item.id)}
          data-selected={selected === (getId ? getId(item) : item.id)}
        >
          {render(item)}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@/components/pet/petInfo/SearchPetCard', () => ({
  default: ({ id, name, age, breed, size, imageUrl, isFavorite }: any) => (
    <div data-testid={`pet-card-${id}`}>
      <div>{name}</div>
      <div>{age}</div>
      <div>{breed}</div>
      <div>{size}</div>
      <div>{imageUrl}</div>
      <div>{isFavorite ? 'favorite' : 'not-favorite'}</div>
    </div>
  ),
}));

vi.mock('@/components/ui/containers/Header', () => ({
  default: ({ left, center }: any) => (
    <div data-testid="header">
      <div data-testid="header-left">{left}</div>
      <div data-testid="header-center">{center}</div>
    </div>
  ),
}));

vi.mock('@/components/ui/buttons/BackButton', () => ({
  default: ({ smartNavigation }: any) => (
    <button data-testid="back-button" data-smart={smartNavigation}>
      Back
    </button>
  ),
}));

vi.mock('@mui/material', () => ({
  Box: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
  Pagination: ({ count, page, onChange, shape }: any) => (
    <div
      data-testid="pagination"
      data-count={count}
      data-page={page}
      data-shape={shape}
    >
      {Array.from({ length: count }, (_, i) => (
        <button key={i + 1} onClick={() => onChange(null, i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  ),
}));

import usePetSearch from '@/hooks/usePetSearch';

const mockUsePetSearch = vi.mocked(usePetSearch);

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Array.from(mockSearchParams.keys()).forEach(key => {
      mockSearchParams.delete(key);
    });
  });

  it('should render search results header', () => {
    render(<Search />);
    expect(screen.getByText('Search results')).toBeInTheDocument();
  });

  it('should render back button with smart navigation', () => {
    render(<Search />);
    const backButton = screen.getByTestId('back-button');
    expect(backButton).toHaveAttribute('data-smart', 'true');
  });

  it('should render filter toggle chips', () => {
    render(<Search />);
    const toggleChips = screen.getAllByTestId('toggle-chip');
    expect(toggleChips).toHaveLength(4);
  });

  it('should show loading state', () => {
    mockUsePetSearch.mockReturnValue({
      pets: [],
      totalPages: 1,
      page: 1,
      loading: true,
      error: '',
    });

    render(<Search />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('should show no pets message when no results', () => {
    mockUsePetSearch.mockReturnValue({
      pets: [],
      totalPages: 1,
      page: 1,
      loading: false,
      error: '',
    });

    render(<Search />);
    expect(
      screen.getByText('No pets match those filters yet.')
    ).toBeInTheDocument();
  });

  it('should render pet cards when pets exist', () => {
    const mockPets = [
      {
        id: '1',
        name: 'Buddy',
        ageGroup: 'adult',
        breed: 'Golden Retriever',
        size: 'large',
        imageUrl: 'image1.jpg',
        isFavorite: true,
      },
      {
        id: '2',
        name: 'Whiskers',
        ageGroup: 'young',
        breed: 'Tabby',
        size: 'small',
        imageUrl: 'image2.jpg',
        isFavorite: false,
      },
    ];

    mockUsePetSearch.mockReturnValue({
      pets: mockPets,
      totalPages: 1,
      page: 1,
      loading: false,
      error: '',
    });

    render(<Search />);
    expect(screen.getByTestId('pet-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('pet-card-2')).toBeInTheDocument();
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
  });

  it('should show pagination when totalPages > 1', () => {
    mockUsePetSearch.mockReturnValue({
      pets: [],
      totalPages: 3,
      page: 2,
      loading: false,
      error: '',
    });

    render(<Search />);
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toHaveAttribute('data-count', '3');
    expect(pagination).toHaveAttribute('data-page', '2');
  });

  it('should not show pagination when totalPages <= 1', () => {
    mockUsePetSearch.mockReturnValue({
      pets: [],
      totalPages: 1,
      page: 1,
      loading: false,
      error: '',
    });

    render(<Search />);
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('should handle pagination change', async () => {
    const user = userEvent.setup();
    mockUsePetSearch.mockReturnValue({
      pets: [],
      totalPages: 3,
      page: 1,
      loading: false,
      error: '',
    });

    render(<Search />);
    const pageButton = screen.getByText('2');
    await user.click(pageButton);

    expect(mockReplace).toHaveBeenCalledWith('/search?page=2');
  });

  it('should handle type filter change', async () => {
    const user = userEvent.setup();
    render(<Search />);

    const dogButton = screen.getByText('Dogs');
    await user.click(dogButton);

    expect(mockReplace).toHaveBeenCalledWith('/search?type=dog&page=1');
  });

  it('should handle gender filter change with any option', async () => {
    const user = userEvent.setup();
    render(<Search />);

    const anyButton = screen.getByText('Any');
    await user.click(anyButton);

    expect(mockReplace).toHaveBeenCalledWith('/search?page=1');
  });

  it('should preserve existing params when setting new ones', () => {
    mockSearchParams.set('type', 'dog');
    mockSearchParams.set('size', 'large');

    render(<Search />);

    const ageButton = screen.getByText('Adult');
    fireEvent.click(ageButton);

    expect(mockReplace).toHaveBeenCalledWith(
      '/search?type=dog&size=large&age=adult&page=1'
    );
  });

  it('should reset page to 1 when changing non-page filters', () => {
    mockSearchParams.set('page', '3');

    render(<Search />);

    const dogButton = screen.getByText('Dogs');
    fireEvent.click(dogButton);

    expect(mockReplace).toHaveBeenCalledWith('/search?page=1&type=dog');
  });

  it('should remove filter when same value is selected', () => {
    mockSearchParams.set('type', 'dog');

    render(<Search />);

    const dogButton = screen.getByText('Dogs');
    fireEvent.click(dogButton);

    expect(mockReplace).toHaveBeenCalledWith('/search?type=dog&page=1');
  });

  it('should handle pet with null isFavorite', () => {
    const mockPets = [
      {
        id: '1',
        name: 'Buddy',
        ageGroup: 'adult',
        breed: 'Golden Retriever',
        size: 'large',
        imageUrl: 'image1.jpg',
        isFavorite: null,
      },
    ];

    mockUsePetSearch.mockReturnValue({
      pets: mockPets,
      totalPages: 1,
      page: 1,
      loading: false,
      error: '',
    });

    render(<Search />);
    expect(screen.getByText('not-favorite')).toBeInTheDocument();
  });
});
