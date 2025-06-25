import DogIcon from "@/assets/DogIcon";
import CatIcon from "@/assets/CatIcon";

export const PET_TYPES = [
  { id: "dog", label: "Dog", IconComponent: DogIcon },
  { id: "cat", label: "Cat", IconComponent: CatIcon },
] as const;

export const GENDERS = [
  { id: "any", label: "Any" },
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
] as const;

export const SIZES = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
] as const;

export const AGES = [
  { id: "baby", label: "Baby" },
  { id: "young", label: "Young" },
  { id: "adult", label: "Adult" },
  { id: "senior", label: "Senior" },
] as const;
