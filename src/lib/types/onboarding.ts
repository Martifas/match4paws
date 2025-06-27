export type UserType = 'petOwner' | 'adopter';

export type OnboardingFormData = {
  userType: UserType | null;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export type OnboardingStepProps = {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
};

export type UpdateOnboardingRequest = {
  userId: string;
  name?: string;
  phone?: string;
  userType?: UserType;
};
