import { ReactNode, useMemo, useState } from 'react';
import { UserInfo, AuthContextValue, AuthContext } from './useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const readInitialUser = (): UserInfo | null => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('userInfo');
  if (!token || !user) return null;
  try {
    return JSON.parse(user) as UserInfo;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(readInitialUser);
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const login: AuthContextValue['login'] = (tokens, userInfo) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate(`/${i18n.language}/`);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: user !== null,
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
