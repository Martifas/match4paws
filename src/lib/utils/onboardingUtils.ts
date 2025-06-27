import { OnboardingFormData } from '@/lib/types/onboarding';

export async function submitOnboarding(
  userId: string,
  formData: OnboardingFormData
) {
  const res = await fetch('/api/update-onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, ...formData }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to complete onboarding');
  }
  return res.json();
}
