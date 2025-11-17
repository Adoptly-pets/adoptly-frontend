import CookieModal from '../../components/CookieModal/CookieModal';
import { useEffect, useState } from 'react';

const CookiesConsent = () => {
  const [isCookieOpen, setIsCookieOpen] = useState<boolean>(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted) {
      setIsCookieOpen(true);
    }
  }, []);

  const handleAccept = (): void => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsCookieOpen(false);
  };

  const handleClose = (): void => {
    setIsCookieOpen(false);
  };
  return (
    <CookieModal
      isOpen={isCookieOpen}
      onAccept={handleAccept}
      onClose={handleClose}
    />
  );
};

export default CookiesConsent;
