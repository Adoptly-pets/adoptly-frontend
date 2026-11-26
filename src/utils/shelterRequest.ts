import type {
  CreateShelterRequest,
  ShelterResponse,
} from '../services/shelter';
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
  socialLinks: PUBLIC_PAGE_FIELDS.map(field => ({
    url: data[field]?.trim() ?? '',
  })),
  contactFirstName: data.firstName,
  contactLastName: data.lastName?.trim() || undefined,
  contactPhone: normalizePhone(data.phone),
});

export const toShelterProfileFormValues = (
  shelter: ShelterResponse
): ShelterProfileFormValues => {
  const region = regions.find(r => r.uk === shelter.region);
  return {
    name: shelter.name,
    edrpou: shelter.edrpou,
    region: region ? regionSlug(region) : shelter.region,
    settlement: shelter.city,
    address: shelter.address,
    description: shelter.description,
    website: shelter.socialLinks[0]?.url,
    facebook: shelter.socialLinks[1]?.url,
    instagram: shelter.socialLinks[2]?.url,
    otherLink: shelter.socialLinks[3]?.url,
    firstName: shelter.contactFirstName,
    lastName: shelter.contactLastName,
    phone: shelter.contactPhone,
  };
};
