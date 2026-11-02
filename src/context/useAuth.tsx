import { useContext, createContext } from 'react';

export type Role = 'ROLE_USER' | 'ROLE_SHELTER_OWNER';

export type UserInfo = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
  location: string;
  role?: Role;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: UserInfo
  ) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
};
