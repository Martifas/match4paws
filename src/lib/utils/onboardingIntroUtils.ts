export async function completeOnboardingIntro(userId: string): Promise<void> {
  const response = await fetch('/api/update-onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to update user metadata');
  }
}
