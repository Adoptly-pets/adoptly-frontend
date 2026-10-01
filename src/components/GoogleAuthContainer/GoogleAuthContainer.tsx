import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import { loginWithGoogle } from '../../services/auth';

interface GoogleAuthContainerProps {
  onSuccess: () => void;
  onError: () => void;
  rememberMe?: boolean;
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
  onSuccess,
  onError,
  rememberMe = false,
}) => {
  const { i18n } = useTranslation();
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
            await loginWithGoogle(response.credential, rememberMe);
            onSuccess();
          } catch {
            onError();
          }
        }}
        onError={onError}
        theme="outline"
        size="large"
        shape="rectangular"
        text="signin_with"
        logo_alignment="center"
        width={width}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthContainer;
