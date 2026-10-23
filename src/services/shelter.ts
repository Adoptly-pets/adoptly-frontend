export type ShelterProfilePayload = {
  name: string;
  edrpou?: string;
  region: string;
  settlement: string;
  address: string;
  description: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  otherLink?: string;
  firstName: string;
  lastName?: string;
  phone: string;
};

// Mock — replace with API call when backend contract is ready.
export const createShelterProfile = async (
  payload: ShelterProfilePayload
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  console.log('[mock] createShelterProfile', payload);
};
