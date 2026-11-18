import { Gender, Pet, Size, Species } from '../types/pet';
import petMock from './mock/pets.json';

export type CreatePetPayload = {
  name: string;
  species: Species;
  gender: Gender;
  size?: Size;
  birthYear: number;
  birthMonth: number;
  description: string;
  isSterilized: boolean;
  breed?: string;
  adoptionConditions?: string;
  arrivalYear?: number;
  arrivalMonth?: number;
};

//TODO: Replace with actual API calls when backend is ready
export const getPetById = async (id: number): Promise<Pet | null> => {
  const pet = (petMock as Pet[]).find(p => p.id === id);
  return pet ?? null;
};

//TODO: Replace with actual API calls when backend is ready
export const createPet = async (payload: CreatePetPayload): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  console.log('createPet (mock): ', payload);
};
