import { useContext, createContext } from 'react';
import type { Role, UserInfo } from '../services/auth';

export type { Role, UserInfo };

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
