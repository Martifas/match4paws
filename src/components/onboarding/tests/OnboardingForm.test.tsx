/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@/components/ui/buttons/PrimaryButton', () => ({
  default: ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));
vi.mock('@/components/ui/buttons/BackButton', () => ({
  default: ({ hidden, onClick }: any) =>
    hidden ? null : (
      <button data-testid="back" onClick={onClick}>
        back
      </button>
    ),
}));
vi.mock('@/components/ui/progressBar/ProgressBar', () => ({
  default: ({ value }: any) => (
    <div data-testid="progress" data-value={value} />
  ),
}));

vi.mock('@/components/onboarding/OnboardingSteps', () => ({
  UserTypeStep: ({ setFormData }: any) => (
    <button
      data-testid="user-type"
      onClick={() => setFormData((p: any) => ({ ...p, userType: 'adopter' }))}
    >
      choose user
    </button>
  ),
  PersonalDetailsStep: ({ setFormData }: any) => (
    <button
      data-testid="details"
      onClick={() =>
        setFormData((p: any) => ({ ...p, name: 'John', phone: '123' }))
      }
    >
      fill details
    </button>
  ),
}));
const submitOnboarding = vi.fn().mockResolvedValue(undefined);
vi.mock('@/lib/utils/onboardingUtils', () => ({ submitOnboarding }));

const importForm = () => import('@/components/onboarding/OnboardingForm');

describe('<OnboardingForm />', () => {
  beforeEach(() => vi.clearAllMocks());

  it('walks through steps and submits', async () => {
    const { default: Form } = await importForm();
    render(<Form userId="u1" />);

    expect(
      screen.getByRole('heading', { name: /tell us who you are/i })
    ).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeDisabled();

    await userEvent.click(screen.getByTestId('user-type'));
    expect(nextBtn).not.toBeDisabled();

    await userEvent.click(nextBtn);
    expect(
      screen.getByRole('heading', { name: /your contact details/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('back')).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    await userEvent.click(screen.getByTestId('details'));
    expect(nextBtn).not.toBeDisabled();

    await userEvent.click(nextBtn);
    expect(
      screen.getByRole('heading', { name: /you are done!/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(submitOnboarding).toHaveBeenCalledWith('u1', {
      userType: 'adopter',
      name: 'John',
      phone: '123',
    });
    expect(push).toHaveBeenCalledWith('/');
  });
});
