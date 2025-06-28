import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackButton from '../BackButton';

let pushMock: ReturnType<typeof vi.fn>;
let backMock: ReturnType<typeof vi.fn>;
let pathname = '/';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    back: backMock,
  }),
  usePathname: () => pathname,
}));

const setDocumentReferrer = (value: string) => {
  Object.defineProperty(document, 'referrer', {
    value,
    configurable: true,
    writable: true,
  });
};

beforeEach(() => {
  pushMock = vi.fn();
  backMock = vi.fn();
  pathname = '/';
  setDocumentReferrer('');
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('<BackButton />', () => {
  it('returns null when hidden', () => {
    const { container } = render(<BackButton hidden />);
    expect(container.firstChild).toBeNull();
  });

  it('calls the custom onClick handler if provided', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    render(<BackButton onClick={handler} />);
    await user.click(screen.getByRole('button'));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
    expect(backMock).not.toHaveBeenCalled();
  });

  it("navigates to the 'to' prop when supplied", async () => {
    const user = userEvent.setup();
    render(<BackButton to="/dashboard" />);

    await user.click(screen.getByRole('button'));
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
    expect(backMock).not.toHaveBeenCalled();
  });

  it('uses smartNavigation → pushes to /favorites when coming from favourites-flow', async () => {
    const user = userEvent.setup();

    pathname = '/pet/123';
    setDocumentReferrer('https://myapp.com/favorites');

    render(<BackButton smartNavigation />);

    await user.click(screen.getByRole('button'));

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock.mock.calls[0][0]).toMatch(/^\/favorites\?refresh=\d+$/);
    expect(backMock).not.toHaveBeenCalled();
  });

  it('uses smartNavigation → falls back to router.back()', async () => {
    const user = userEvent.setup();

    pathname = '/profile';
    render(<BackButton smartNavigation />);

    await user.click(screen.getByRole('button'));
    expect(backMock).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('backs up by default when no special props are present', async () => {
    const user = userEvent.setup();
    render(<BackButton />);

    await user.click(screen.getByRole('button'));
    expect(backMock).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
