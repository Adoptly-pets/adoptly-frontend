import type { Role } from '../services/auth';
import i18n from 'i18next';

export const langLink = (path: string) => `/${i18n.language}${path}`;

export const getPostLoginPath = (role?: Role) => {
  if (role === 'ROLE_SHELTER_OWNER') return '/shelter/profile';
  if (role === 'ROLE_USER') return '/account';
  return '/';
};
