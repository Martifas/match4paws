import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteButton from '../FavoriteButton';

vi.mock('@mui/icons-material/Favorite', () => ({
  default: () => <svg data-testid="filled-heart" />,
}));
vi.mock('@mui/icons-material/FavoriteBorderOutlined', () => ({
  default: () => <svg data-testid="outlined-heart" />,
}));

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  global.fetch = fetchMock as unknown as typeof global.fetch;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('<FavoriteButton />', () => {
  it('renders filled-heart when initiallyFav=true and outlined when false', () => {
    const { rerender } = render(<FavoriteButton petId="1" initiallyFav />);
    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
    expect(screen.queryByTestId('outlined-heart')).not.toBeInTheDocument();
    rerender(<FavoriteButton petId="1" initiallyFav={false} />);
    expect(screen.getByTestId('outlined-heart')).toBeInTheDocument();
  });

  it('adds to favourites → fetch POST and icon swaps', async () => {
    fetchMock.mockResolvedValue({ ok: true } as Response);
    const user = userEvent.setup();

    render(<FavoriteButton petId="77" initiallyFav={false} />);

    await user.click(screen.getByRole('button', { name: /add to favorites/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/favorites',
      expect.objectContaining({ method: 'POST' })
    );

    await waitFor(() =>
      expect(screen.getByTestId('filled-heart')).toBeInTheDocument()
    );
  });

  it('removes from favourites → fetch DELETE and onUnfavorited fires', async () => {
    fetchMock.mockResolvedValue({ ok: true } as Response);
    const onUnfavorited = vi.fn();
    const user = userEvent.setup();

    render(
      <FavoriteButton petId="88" initiallyFav onUnfavorited={onUnfavorited} />
    );
    await user.click(
      screen.getByRole('button', { name: /remove from favorites/i })
    );

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/favorites',
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(onUnfavorited).toHaveBeenCalledWith('88');
    await waitFor(() =>
      expect(screen.getByTestId('outlined-heart')).toBeInTheDocument()
    );
  });

  it('disables the button while the request is in-flight', async () => {
    let resolveFetch!: (value: Response) => void;
    fetchMock.mockImplementation(
      () =>
        new Promise<Response>(res => {
          resolveFetch = res;
        })
    );
    const user = userEvent.setup();
    render(<FavoriteButton petId="99" initiallyFav={false} />);

    const btn = screen.getByRole('button');

    await user.click(btn);
    expect(btn).toBeDisabled();

    resolveFetch({ ok: true } as Response);
    await waitFor(() => expect(btn).not.toBeDisabled());
  });

  it('rollback on DELETE failure → calls onFavoriteRestored and icon reverts', async () => {
    fetchMock.mockRejectedValue(new Error('boom'));
    const restored = vi.fn();
    const user = userEvent.setup();

    render(
      <FavoriteButton
        petId="42"
        initiallyFav
        onFavoriteRestored={restored}
        onUnfavorited={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => expect(restored).toHaveBeenCalledWith('42'));

    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
  });

  it('rollback on POST failure and keeps outlined icon', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 } as Response);
    const user = userEvent.setup();

    render(<FavoriteButton petId="55" initiallyFav={false} />);
    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(screen.getByTestId('outlined-heart')).toBeInTheDocument()
    );
  });
});
