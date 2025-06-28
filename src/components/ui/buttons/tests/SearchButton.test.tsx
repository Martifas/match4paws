import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from '../SearchButton';

vi.mock('@mui/icons-material/Search', () => ({
  default: () => <svg data-testid="search-icon" />,
}));

let pushMock: ReturnType<typeof vi.fn>;

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

beforeEach(() => {
  pushMock = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('<SearchButton />', () => {
  it('returns null when hidden', () => {
    const { container } = render(<SearchButton hidden />);
    expect(container.firstChild).toBeNull();
  });

  it("navigates to default /search when clicked (no 'to' prop)", async () => {
    const user = userEvent.setup();
    render(<SearchButton />);

    await user.click(screen.getByRole('button'));
    expect(pushMock).toHaveBeenCalledWith('/search');
  });

  it("navigates to the path provided in 'to' prop", async () => {
    const user = userEvent.setup();
    render(<SearchButton to="/quick-find" />);

    await user.click(screen.getByRole('button'));
    expect(pushMock).toHaveBeenCalledWith('/quick-find');
  });

  it('merges custom className and forwards extra props', () => {
    render(
      <SearchButton
        className="custom-class"
        aria-label="open search"
        data-test="xyz"
      />
    );
    const btn = screen.getByRole('button', { name: /open search/i });
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveAttribute('data-test', 'xyz');
  });

  it('renders the search icon inside the button', () => {
    render(<SearchButton />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });
});
