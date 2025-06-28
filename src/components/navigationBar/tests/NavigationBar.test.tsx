/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { pushMock } from 'tests/setup';

const useAuth = vi.fn();
vi.mock('@/lib/authProvider', () => ({ useAuth }));

vi.mock('@/components/pet/petModal/AddPetModal', () => ({
  default: ({ open }: any) => (
    <div data-testid="add-modal">{open ? 'open' : 'closed'}</div>
  ),
}));

const importBar = () => import('@/components/navigationBar/NavigationBar');

let fetchSpy: any;

beforeEach(() => {
  fetchSpy = vi.fn();

  global.fetch = fetchSpy;
  pushMock.mockClear();
});

afterEach(() => vi.clearAllMocks());

describe('<NavigationBar />', () => {
  it('renders basic nav for logged-out user', async () => {
    useAuth.mockReturnValue(null);
    const { default: Bar } = await importBar();
    render(<Bar />);
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.queryByTestId('fab')).toBeNull();
  });

  it('shows fab and opens modal for petOwner', async () => {
    useAuth.mockReturnValue({ id: 'u1' });
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 'u1', userType: 'petOwner' } }),
    });

    const { default: Bar } = await importBar();
    render(<Bar />);

    await waitFor(() => expect(screen.getByTestId('fab')).toBeInTheDocument());

    expect(screen.getByTestId('add-modal').textContent).toBe('closed');
    await userEvent.click(screen.getByTestId('fab'));
    expect(screen.getByTestId('add-modal').textContent).toBe('open');
  });

  it('navigates on action click', async () => {
    useAuth.mockReturnValue({ id: 'u2' });
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 'u2', userType: 'adopter' } }),
    });

    const { default: Bar } = await importBar();
    render(<Bar />);
    await waitFor(() => screen.getByText('Favorites'));

    await userEvent.click(screen.getByText('Favorites'));
    expect(pushMock).toHaveBeenCalledWith('/favorites'); // ✅ now passes
  });
});
