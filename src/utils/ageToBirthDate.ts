import { AgeUnit } from '../types/pet';

export const ageToBirthDate = (ageValue: number, ageUnit: AgeUnit) => {
  const today = new Date();
  const months = ageUnit === 'MONTHS' ? ageValue : ageValue * 12;
  const birth = new Date(today.getFullYear(), today.getMonth() - months, 1);
  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth() + 1;

  return { birthYear, birthMonth };
};
