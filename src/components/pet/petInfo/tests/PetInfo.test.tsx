/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, afterEach, expect } from 'vitest';

vi.mock('@/components/ui/containers/Header', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));
vi.mock('@/components/ui/buttons/BackButton', () => ({
  default: () => <button>back</button>,
}));
vi.mock('@/components/pet/petInfo/PetCarousel', () => ({
  default: ({ photos }: any) => <div data-testid="photos">{photos.length}</div>,
}));
vi.mock('@/components/pet/petInfo/StatBadge', () => ({
  default: ({ value }: any) => <span>{value}</span>,
}));
vi.mock('../../ui/containers/BottomBar', () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));
vi.mock('@/components/ui/buttons/FavoriteButton', () => ({
  __esModule: true,
  default: ({ initiallyFav }: any) => (
    <div data-testid="fav" data-fav={String(initiallyFav)} />
  ),
}));

vi.mock('@/components/chat/AdoptButton', () => ({
  default: () => <button>adopt</button>,
}));

/* ─────────── data-layer stubs ─────────── */
const getPetById = vi.fn();
const getPetPhotos = vi.fn();
const getPetOwner = vi.fn();
const isPetFavorited = vi.fn();
vi.mock('@/lib/queries/pets', () => ({
  getPetById,
  getPetPhotos,
  getPetOwner,
  isPetFavorited,
}));

const getUserByAuth0Id = vi.fn();
vi.mock('@/lib/queries/users', () => ({ getUserByAuth0Id }));

const getSession = vi.fn();
vi.mock('@/lib/auth0', () => ({ auth0: { getSession } }));

const importComponent = () => import('@/components/pet/petInfo/PetInfo');

describe('<PetInfo />', () => {
  afterEach(() => vi.clearAllMocks());

  it('shows not found when pet is missing', async () => {
    getPetById.mockResolvedValue(null);
    const { default: PetInfo } = await importComponent();
    await act(async () => render(await PetInfo({ id: 'x' })));
    expect(screen.getByText(/Pet not found/i)).toBeInTheDocument();
  });

  it('renders details and passes initiallyFav false without session', async () => {
    getPetById.mockResolvedValue({
      id: 'p1',
      ownerId: 'o1',
      name: 'Luna',
      breed: 'Beagle',
      gender: 'Female',
      ageGroup: 'Young',
      size: 'Medium',
      description: 'desc',
    });
    getPetPhotos.mockResolvedValue([{ url: '1.jpg' }]);
    getPetOwner.mockResolvedValue({ name: 'Alice' });
    getSession.mockResolvedValue(null);

    const { default: PetInfo } = await importComponent();
    await act(async () => render(await PetInfo({ id: 'p1' })));

    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('(Beagle)')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByTestId('photos').textContent).toBe('1');
    expect(screen.getByTestId('fav').dataset.fav).toBe('false');
  });

  it('sets initiallyFav true when user has favorited', async () => {
    getPetById.mockResolvedValue({
      id: 'p2',
      ownerId: 'o1',
      name: 'Milo',
      breed: 'Cat',
    });
    getPetPhotos.mockResolvedValue([]);
    getPetOwner.mockResolvedValue(null);
    getSession.mockResolvedValue({ user: { sub: 'sub1' } });
    getUserByAuth0Id.mockResolvedValue({ id: 'u1' });
    isPetFavorited.mockResolvedValue(true);

    const { default: PetInfo } = await importComponent();
    await act(async () => render(await PetInfo({ id: 'p2' })));

    expect(isPetFavorited).toHaveBeenCalledWith('p2', 'u1');
    expect(screen.getByTestId('fav').dataset.fav).toBe('true');
  });
});
