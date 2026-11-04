import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { loginWithGoogle } from '../../services/auth';
import { getPostLoginPath } from '../../utils/routing';

interface GoogleAuthContainerProps {
  onError: () => void;
  rememberMe?: boolean;
  text?: 'signin_with' | 'signup_with';
}

const MAX_WIDTH = 400;
const MIN_WIDTH = 200;
const HORIZONTAL_PADDING = 64;

const computeWidth = () =>
  Math.max(
    MIN_WIDTH,
    Math.min(MAX_WIDTH, window.innerWidth - HORIZONTAL_PADDING)
  );

const GoogleAuthContainer: React.FC<GoogleAuthContainerProps> = ({
  onError,
  rememberMe = false,
  text = 'signin_with',
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [width, setWidth] = useState(computeWidth);

  useEffect(() => {
    const handler = () => setWidth(computeWidth());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      locale={i18n.language}
    >
      <GoogleLogin
        onSuccess={async response => {
          if (!response.credential) {
            onError();
            return;
          }
          try {
            const data = await loginWithGoogle(response.credential, rememberMe);
            login(
              {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              },
              data.userInfo
            );

            navigate(
              `/${i18n.language}${getPostLoginPath(data.userInfo.role)}`
            );
          } catch {
            onError();
          }
        }}
        onError={onError}
        theme="outline"
        size="large"
        shape="rectangular"
        text={text}
        logo_alignment="center"
        width={width}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthContainer;
