export type UserType = 'petOwner' | 'adopter';

export type Gender =
  | 'male'
  | 'female'
  | 'other'
  | 'non-binary'
  | 'prefer-not-to-say';

export type OnboardingFormData = {
  userType: UserType | null;
  preferredAnimalTypes: string[];
  animalsToPlace?: string[];
  name?: string;
  email?: string;
  phone?: string;
  gender?: Gender;
  location?: string;
};

export type OnboardingStepProps = {
  formData: OnboardingFormData;
  setFormData: (data: OnboardingFormData) => void;
};
