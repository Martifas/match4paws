import DogIcon from "@/assets/DogIcon";
import CatIcon from "@/assets/CatIcon";

export const USER_TYPES = [
  { id: "adopter", label: "Pet Adopter" },
  { id: "petOwner", label: "Pet Owner or Organization" },
] as const;

export const ANIMAL_TYPES = [
  { id: "cats", label: "Cats", IconComponent: CatIcon },
  { id: "dogs", label: "Dogs", IconComponent: DogIcon },
] as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
] as const;

export const ONBOARDING_STEPS = [
  {
    title: "Tell us about yourself",
    description: "Are you a Pet Owner or Organization ready to find loving homes? Or a Pet Adopter looking for your new best friend?",
  },
  {
    petOwner: {
      title: "List Your Animal(s) for Adoption",
      description: "What type of animal(s) are you looking to place in a loving home? You can add more later.",
    },
    adopter: {
      title: "Let's Find Your Match", 
      description: "What type of animal are you looking to adopt? Don't worry—you can always change this later.",
    },
  },
  {
    title: "Final Steps!",
    description: "We're almost there! Fill in your personal details to create a profile and start your journey toward a furry friendship.",
  },
] as const;