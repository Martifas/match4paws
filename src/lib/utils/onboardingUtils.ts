import { OnboardingFormData } from '@/lib/types/onboarding';
import { ONBOARDING_STEPS } from '@/lib/constants/onboarding';

export function getStepContent(
  activeStep: number,
  userType: OnboardingFormData['userType']
) {
  const step = ONBOARDING_STEPS[activeStep];

  if (activeStep === 1 && typeof step === 'object' && 'petOwner' in step) {
    return userType === 'petOwner' ? step.petOwner : step.adopter;
  }

  return step as { title: string; description: string };
}

export function validateStep(
  activeStep: number,
  formData: OnboardingFormData
): boolean {
  switch (activeStep) {
    case 0:
      return formData.userType !== null;
    case 1:
      return formData.preferredAnimalTypes.length > 0;
    case 2:
      return !!(formData.name && formData.phone);
    default:
      return true;
  }
}

export async function submitOnboarding(
  userId: string,
  formData: OnboardingFormData
) {
  const response = await fetch('/api/update-onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      ...formData,
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to complete onboarding');
  }

  return response.json();
}
