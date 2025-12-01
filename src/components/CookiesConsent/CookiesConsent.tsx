import CookieModal from '../../components/CookieModal/CookieModal';
import { useEffect, useState } from 'react';

const CookiesConsent = () => {
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    const rejectedThisSession = sessionStorage.getItem(
      'cookiesRejectedThisSession'
    );

    if (!accepted && !rejectedThisSession) {
      setIsCookieOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    sessionStorage.removeItem('cookiesRejectedThisSession');
    setIsCookieOpen(false);
  };

  const handleClose = () => {
    sessionStorage.setItem('cookiesRejectedThisSession', 'true');
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
