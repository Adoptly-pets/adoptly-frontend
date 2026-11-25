import {
  createShelterProfile,
  uploadShelterLogo,
  type CreateShelterRequest,
  type ShelterResponse,
} from './shelter';
import { apiClient } from './api';

jest.mock('./api', () => ({
  apiClient: {
    post: jest.fn(),
    put: jest.fn(),
  },
}));

const mockedPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;
const mockedPut = apiClient.put as jest.MockedFunction<typeof apiClient.put>;

const request: CreateShelterRequest = {
  name: 'Happy Paws',
  region: 'Київська область',
  city: 'Київ',
  address: 'вул. Хрещатик, 1',
  description: 'We help dogs and cats',
  socialLinks: [{ url: 'https://happypaws.org' }],
  contactFirstName: 'Olena',
  contactPhone: '+380671234567',
};

const apiError = { type: 'server', status: 500, message: 'Server error' };

describe('createShelterProfile', () => {
  const successResponse: { data: ShelterResponse } = {
    data: {
      ...request,
      id: 7,
      slug: 'happy-paws',
      status: 'PENDING',
      photoUrl: null,
    },
  };

  beforeEach(() => {
    mockedPost.mockReset();
    mockedPost.mockResolvedValue(successResponse);
  });

  test('posts the request to /shelters', async () => {
    await createShelterProfile(request);

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost).toHaveBeenCalledWith('/shelters', request);
  });

  test('returns the created shelter', async () => {
    const result = await createShelterProfile(request);

    expect(result).toEqual(successResponse.data);
  });

  test('propagates errors from apiClient', async () => {
    mockedPost.mockRejectedValueOnce(apiError);

    await expect(createShelterProfile(request)).rejects.toEqual(apiError);
  });
});

describe('uploadShelterLogo', () => {
  const file = new File(['image'], 'logo.png', { type: 'image/png' });

  beforeEach(() => {
    mockedPut.mockReset();
    mockedPut.mockResolvedValue({ data: {} });
  });

  test('puts the file as multipart form data to the shelter logo URL', async () => {
    await uploadShelterLogo('happy-paws', file);

    expect(mockedPut).toHaveBeenCalledTimes(1);
    const [url, body, config] = mockedPut.mock.calls[0];
    expect(url).toBe('/shelters/happy-paws/logo');
    expect(body).toBeInstanceOf(FormData);
    expect(config).toEqual({
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  test('sends the file in the "file" field', async () => {
    await uploadShelterLogo('happy-paws', file);

    const body = mockedPut.mock.calls[0][1] as FormData;
    const sent = body.get('file') as File;
    expect(sent).toBeInstanceOf(File);
    expect(sent.name).toBe('logo.png');
  });

  test('propagates errors from apiClient', async () => {
    mockedPut.mockRejectedValueOnce(apiError);

    await expect(uploadShelterLogo('happy-paws', file)).rejects.toEqual(
      apiError
    );
  });
});
