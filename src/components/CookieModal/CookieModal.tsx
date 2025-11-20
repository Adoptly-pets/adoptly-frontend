import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';

import './CookieModal.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CookieModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

const CookieModal: React.FC<CookieModalProps> = ({
  isOpen,
  onAccept,
  onClose,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cookies = () => {
    navigate('/cookies');
  };
  if (!isOpen) return null;
  return (
    <div className="cookies-overlay">
      <div className="cookies-popUp">
        <div className="btn-close">
          <button onClick={onClose} type="button">
            <Icon
              id="icon-Close"
              className="icon-Close"
              size={30}
              height={30}
            />
          </button>
        </div>
        <div className="cookies-content">
          <h3 className="cookies-title">COOKIES</h3>
          <p className="cookies-text">{t('cookies.text')}</p>
        </div>
        <div className="cookies-btnBox">
          <Button variant="primary" onClick={onAccept}>
            {t('cookies.accept')}
          </Button>
          <Button variant="secondary" onClick={cookies}>
            {t('cookies.more')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
