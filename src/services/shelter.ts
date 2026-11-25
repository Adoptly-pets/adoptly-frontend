import { apiClient } from './api';

export type CreateShelterRequest = {
  name: string;
  edrpou?: string;
  region: string;
  city: string;
  address: string;
  description: string;
  socialLinks: { url: string }[];
  contactFirstName: string;
  contactLastName?: string;
  contactPhone: string;
};

export type ShelterResponse = CreateShelterRequest & {
  id: number;
  slug: string;
  status: string;
  photoUrl: string | null;
};

export const createShelterProfile = async (
  request: CreateShelterRequest
): Promise<ShelterResponse> => {
  const response = await apiClient.post<ShelterResponse>('/shelters', request);
  return response.data;
};

export const uploadShelterLogo = async (
  slug: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  await apiClient.put(`/shelters/${slug}/logo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
