export type PetFilters = {
  type?: string;
  gender?: string;
  size?: string;
  age?: string;
};

export type PetSearchResult = {
  id: string;
  name: string;
  ageGroup: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
  isFavorite: boolean;
};
