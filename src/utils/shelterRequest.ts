import { CreateShelterRequest, ShelterProfilePayload } from 'services/shelter';

export const PUBLIC_PAGE_FIELDS = [
  'website',
  'facebook',
  'instagram',
  'otherLink',
] as const;

export const normalizePhone = (phone: string) => {
  return `+38${phone.replace(/\D/g, '').slice(-9)}`;
};

export const toCreateShelterReques = (
  data: ShelterProfilePayload
): CreateShelterRequest => ({
  name: data.name,
  edrpou: data.edrpou?.trim() || undefined,
  region: data.region,
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
