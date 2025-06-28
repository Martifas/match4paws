/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';

const useAuth = vi.fn();
vi.mock('@/lib/authProvider', () => ({ useAuth }));

vi.mock('@/components/onboarding/OnboardingIntro', () => ({
  default: ({ onComplete, userId }: any) => (
    <button data-testid="flow" onClick={onComplete}>
      flow-{userId}
    </button>
  ),
}));

vi.mock('@/components/onboarding/OnboardingForm', () => ({
  default: ({ userId }: any) => <div data-testid="form">form-{userId}</div>,
}));

const importOnboarding = () => import('@/components/onboarding/Onboarding');

describe('<Onboarding />', () => {
  it('shows loading when auth not ready', async () => {
    useAuth.mockReturnValue(null);
    const { default: Onboarding } = await importOnboarding();
    render(<Onboarding />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders flow then switches to form on complete', async () => {
    useAuth.mockReturnValue({ id: 'u1' });
    const { default: Onboarding } = await importOnboarding();
    render(<Onboarding />);

    expect(screen.getByTestId('flow')).toBeInTheDocument();
    expect(screen.queryByTestId('form')).toBeNull();

    await userEvent.click(screen.getByTestId('flow'));

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.queryByTestId('flow')).toBeNull();
  });
});
