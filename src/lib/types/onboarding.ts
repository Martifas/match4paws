export type UserType = 'petOwner' | 'adopter';

export type OnboardingFormData = {
  userType: UserType | null;

  animalsToPlace?: string[];
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
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
