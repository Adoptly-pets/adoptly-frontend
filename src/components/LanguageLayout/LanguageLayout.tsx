import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

const DEFAULT_LANG = 'uk';
const SUPPORTED_LANGS = ['uk', 'en'];

const isSupportedLang = (lang?: string): lang is 'uk' | 'en' =>
  !!lang && SUPPORTED_LANGS.includes(lang);

const LanguageLayout = () => {
  const { lng } = useParams<{ lng?: string }>();
  const location = useLocation();
  const { i18n } = useTranslation();

  const isValidLang = isSupportedLang(lng);

  if (!isValidLang) {
    const cleanPath = location.pathname.replace(/^\/[^/]+/, '');
    return <Navigate to={`/${DEFAULT_LANG}${cleanPath}`} replace />;
  }

  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  return <Outlet key={lng} />;
};

export default LanguageLayout;
