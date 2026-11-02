import { registerWithEmail, loginWithEmail, type LoginResponse } from './auth';
import { apiClient } from './api';

jest.mock('./api', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

const mockedPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;

describe('registerWithEmail', () => {
  beforeEach(() => {
    mockedPost.mockReset();
    mockedPost.mockResolvedValue({ data: { accessToken: null } });
  });

  test('posts to /auth/register endpoint', async () => {
    await registerWithEmail({
      email: 'test@example.com',
      password: 'password123',
      role: 'adopter',
    });

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost.mock.calls[0][0]).toBe('/auth/register');
  });

  test('maps adopter role to USER', async () => {
    await registerWithEmail({
      email: 'test@example.com',
      password: 'password123',
      role: 'adopter',
    });

    expect(mockedPost.mock.calls[0][1]).toMatchObject({ role: 'USER' });
  });

  test('maps shelter role to SHELTER', async () => {
    await registerWithEmail({
      email: 'shelter@example.com',
      password: 'password123',
      role: 'shelter',
    });

    expect(mockedPost.mock.calls[0][1]).toMatchObject({ role: 'SHELTER' });
  });

  test('passes email and password through unchanged', async () => {
    await registerWithEmail({
      email: 'user@example.com',
      password: 'secret123',
      role: 'adopter',
    });

    expect(mockedPost.mock.calls[0][1]).toMatchObject({
      email: 'user@example.com',
      password: 'secret123',
    });
  });

  test('includes empty strings for optional backend fields', async () => {
    await registerWithEmail({
      email: 'test@example.com',
      password: 'password123',
      role: 'adopter',
    });

    expect(mockedPost.mock.calls[0][1]).toMatchObject({
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
    });
  });

  test('returns the response from apiClient', async () => {
    const response = { data: { accessToken: null, message: 'check email' } };
    mockedPost.mockResolvedValueOnce(response);

    const result = await registerWithEmail({
      email: 'test@example.com',
      password: 'password123',
      role: 'adopter',
    });

    expect(result).toBe(response);
  });

  test('propagates errors from apiClient', async () => {
    const error = {
      type: 'client',
      status: 409,
      message: 'Email Already Exists',
    };
    mockedPost.mockRejectedValueOnce(error);

    await expect(
      registerWithEmail({
        email: 'taken@example.com',
        password: 'password123',
        role: 'adopter',
      })
    ).rejects.toEqual(error);
  });
});

describe('loginWithEmail', () => {
  const successResponse: { data: LoginResponse } = {
    data: {
      accessToken: 'access-token-jwt',
      refreshToken: 'refresh-token-uuid',
      expiresIn: 86400000,
      userInfo: {
        id: 29,
        email: 'user@example.com',
        firstName: '',
        lastName: '',
        profileImageUrl: null,
        location: '',
        role: 'ROLE_USER',
      },
    },
  };

  beforeEach(() => {
    mockedPost.mockReset();
    mockedPost.mockResolvedValue(successResponse);
  });

  test('posts to /auth/login endpoint with email and password', async () => {
    await loginWithEmail({ email: 'user@example.com', password: 'secret123' });

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost.mock.calls[0][0]).toBe('/auth/login');
    expect(mockedPost.mock.calls[0][1]).toEqual({
      email: 'user@example.com',
      password: 'secret123',
    });
  });

  test('returns the LoginResponse data', async () => {
    const result = await loginWithEmail({
      email: 'user@example.com',
      password: 'secret123',
    });

    expect(result).toEqual(successResponse.data);
  });

  test('propagates errors from apiClient', async () => {
    const error = {
      type: 'client',
      status: 403,
      message: 'User is disabled',
    };
    mockedPost.mockReset();
    mockedPost.mockRejectedValueOnce(error);

    await expect(
      loginWithEmail({ email: 'inactive@example.com', password: 'secret123' })
    ).rejects.toEqual(error);
  });
});
