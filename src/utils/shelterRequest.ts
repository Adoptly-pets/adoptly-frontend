import type { CreateShelterRequest } from '../services/shelter';
import regions from '../constants/regions.json';
import { regionSlug } from './region';

// Region is a slug; the request mapping converts it
export type ShelterProfileFormValues = {
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

export const PUBLIC_PAGE_FIELDS = [
  'website',
  'facebook',
  'instagram',
  'otherLink',
] as const;

export const normalizePhone = (phone: string) => {
  return `+380${phone.replace(/\D/g, '').slice(-9)}`;
};

export const toCreateShelterRequest = (
  data: ShelterProfileFormValues
): CreateShelterRequest => ({
  name: data.name,
  edrpou: data.edrpou?.trim() || undefined,
  region: regions.find(r => regionSlug(r) === data.region)?.uk ?? data.region,
  city: data.settlement,
  address: data.address,
  description: data.description,
  socialLinks: PUBLIC_PAGE_FIELDS.map(field => data[field]?.trim())
    .filter(url => !!url)
    .map(url => ({ url: url! })),
  contactFirstName: data.firstName,
  contactLastName: data.lastName?.trim() || undefined,
  contactPhone: normalizePhone(data.phone),
});
