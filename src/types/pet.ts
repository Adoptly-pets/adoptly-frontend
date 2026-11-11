export type Species = 'CAT' | 'DOG';
export type Gender = 'MALE' | 'FEMALE';
export type AgeUnit = 'MONTHS' | 'YEARS';
export type Size = 'SMALL' | 'MEDIUM' | 'LARGE';
export type AnimalStatus = 'AVAILABLE' | 'PENDING' | 'ADOPTED' | 'MEDICAL';

export type Pet = {
  id: number;
  name: string;
  species: Species;
  gender: Gender;
  age: number; //Age in months
  size: Size;
  photos: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
  treatedForParasites: boolean;
  description: string;
  breed?: string;
  adoptionConditions?: string;
  status: AnimalStatus;
  shelter: { id: number; name: string; location: string };
  dateOfArrival?: string;
};
