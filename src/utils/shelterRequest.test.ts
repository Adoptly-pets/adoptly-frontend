import {
  normalizePhone,
  toCreateShelterRequest,
  toShelterProfileFormValues,
  type ShelterProfileFormValues,
} from './shelterRequest';
import type { ShelterResponse } from '../services/shelter';

describe('normalizePhone', () => {
  test.each([
    '0671234567',
    '067 123 45 67',
    '(067) 123-45-67',
    '380671234567',
    '+380671234567',
    '+38 (067) 123-45-67',
  ])('%s → +380671234567', phone => {
    expect(normalizePhone(phone)).toBe('+380671234567');
  });
});

describe('toCreateShelterRequest', () => {
  const formData: ShelterProfileFormValues = {
    name: 'Happy Paws',
    edrpou: '12345678',
    region: 'kyiv-oblast',
    settlement: 'Бровари',
    address: 'вул. Київська, 1',
    description: 'We help dogs and cats',
    website: 'https://happypaws.org',
    facebook: 'https://facebook.com/happypaws',
    instagram: 'https://instagram.com/happypaws',
    otherLink: 'https://t.me/happypaws',
    firstName: 'Olena',
    lastName: 'Shevchenko',
    phone: '067 123 45 67',
  };

  test('maps form fields to the backend request', () => {
    expect(toCreateShelterRequest(formData)).toEqual({
      name: 'Happy Paws',
      edrpou: '12345678',
      region: 'Київська',
      city: 'Бровари',
      address: 'вул. Київська, 1',
      description: 'We help dogs and cats',
      socialLinks: [
        { url: 'https://happypaws.org' },
        { url: 'https://facebook.com/happypaws' },
        { url: 'https://instagram.com/happypaws' },
        { url: 'https://t.me/happypaws' },
      ],
      contactFirstName: 'Olena',
      contactLastName: 'Shevchenko',
      contactPhone: '+380671234567',
    });
  });

  test('leaves out empty links and keeps the form order', () => {
    const request = toCreateShelterRequest({
      ...formData,
      website: '',
      facebook: 'https://facebook.com/happypaws',
      instagram: '  ',
      otherLink: 'https://t.me/happypaws',
    });

    expect(request.socialLinks).toEqual([
      { url: 'https://facebook.com/happypaws' },
      { url: 'https://t.me/happypaws' },
    ]);
  });

  test('leaves out empty optional fields', () => {
    const request = toCreateShelterRequest({
      ...formData,
      edrpou: '',
      lastName: ' ',
    });

    // undefined fields are dropped from the JSON body
    expect(request.edrpou).toBeUndefined();
    expect(request.contactLastName).toBeUndefined();
  });
});

describe('toShelterProfileFormValues', () => {
  const shelter: ShelterResponse = {
    id: 7,
    slug: 'happy-paws',
    status: 'PENDING',
    photoUrl: null,
    name: 'Happy Paws',
    edrpou: '12345678',
    region: 'Київська',
    city: 'Бровари',
    address: 'вул. Київська, 1',
    description: 'We help dogs and cats',
    socialLinks: [],
    contactFirstName: 'Olena',
    contactLastName: 'Shevchenko',
    contactPhone: '+380671234567',
  };

  test('maps the saved shelter to the form values', () => {
    expect(toShelterProfileFormValues(shelter)).toEqual({
      name: 'Happy Paws',
      edrpou: '12345678',
      region: 'kyiv-oblast',
      settlement: 'Бровари',
      address: 'вул. Київська, 1',
      description: 'We help dogs and cats',
      firstName: 'Olena',
      lastName: 'Shevchenko',
      phone: '+380671234567',
    });
  });

  test('keeps a region that is not in the list as is', () => {
    const values = toShelterProfileFormValues({
      ...shelter,
      region: 'Невідома',
    });

    expect(values.region).toBe('Невідома');
  });

  test('maps back to the same request', () => {
    const {
      id: _id,
      slug: _slug,
      status: _status,
      photoUrl: _photoUrl,
      ...request
    } = shelter;

    expect(toCreateShelterRequest(toShelterProfileFormValues(shelter))).toEqual(
      request
    );
  });
});
