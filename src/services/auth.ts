import { apiClient, ApiError } from './api';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userInfo: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    location: string;
    role: 'ROLE_USER' | 'ROLE_SHELTER_OWNER';
  };
};

export const registerWithEmail = async (data: {
  email: string;
  password: string;
  role: 'adopter' | 'shelter';
}) => {
  const response = await apiClient.post('/auth/register', {
    email: data.email,
    password: data.password,
    role: data.role === 'shelter' ? 'SHELTER' : 'USER',
    // Backend returns 409 if any of these fields are missing
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
  });
  return response;
};

export const resendActivationEmail = async (email: string): Promise<void> => {
  await apiClient.post('/auth/resend-activation', { email });
};

export const loginWithEmail = async (data: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    email: data.email,
    password: data.password,
  });

  const { accessToken, refreshToken, userInfo } = response.data;
  if (!accessToken || !refreshToken || !userInfo) {
    throw {
      type: 'server',
      message:
        'Invalid login response: missing accessToken, refreshToken or userInfo',
    } as ApiError;
  }

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

  return response.data;
};

export const loginWithGoogle = async (
  idToken: string,
  rememberMe: boolean
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/google', {
    idToken,
    rememberMe,
  });

  const { accessToken, refreshToken, userInfo } = response.data;
  if (!accessToken || !refreshToken || !userInfo) {
    throw {
      type: 'server',
      message: 'Invalid Google login response: missing tokens or userInfo',
    } as ApiError;
  }

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

  return response.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};
