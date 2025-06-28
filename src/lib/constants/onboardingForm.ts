import DogIcon from '@/assets/icons/DogIcon';
import CatIcon from '@/assets/icons/CatIcon';

export const USER_TYPES = [
  { id: 'adopter', label: 'Pet Adopter' },
  { id: 'petOwner', label: 'Pet Owner or Organization' },
] as const;

export const ANIMAL_TYPES = [
  { id: 'cats', label: 'Cats', IconComponent: CatIcon },
  { id: 'dogs', label: 'Dogs', IconComponent: DogIcon },
] as const;
