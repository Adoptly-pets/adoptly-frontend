import React, { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import './EmailConfirmModal.css';
import { resendActivationEmail } from '../../services/auth';

interface EmailConfirmModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

type Status = 'ready' | 'resending' | 'resent' | 'failed';

const EmailConfirmModal: React.FC<EmailConfirmModalProps> = ({
  isOpen,
  email,
  onClose,
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('ready');

  useEffect(() => {
    if (isOpen) {
      setStatus('ready');
    }
  }, [isOpen]);

  const handleResend = async () => {
    setStatus('resending');
    try {
      await resendActivationEmail(email);
      setStatus('resent');
    } catch (error) {
      setStatus('failed');
      console.error('Failed to resend activation email:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={t('registration.confirmEmail.title')}
    >
      <div className="email-confirm">
        <h2 className="email-confirm-title">
          {t('registration.confirmEmail.title')}
        </h2>
        <p className="email-confirm-message">
          <Trans
            i18nKey="registration.confirmEmail.message"
            values={{ email }}
            components={{ bold: <strong /> }}
          />
        </p>
        <p className="email-confirm-resend">
          <span>{t('registration.confirmEmail.didntReceive')}</span>{' '}
          <button
            type="button"
            className="email-confirm-resend-btn"
            onClick={handleResend}
            disabled={status === 'resending' || status === 'resent'}
          >
            {t('registration.confirmEmail.resend')}
          </button>
        </p>
        {status === 'resent' && (
          <p
            className="email-confirm-status email-confirm-status--success"
            role="status"
          >
            {t('registration.confirmEmail.resent')}
          </p>
        )}

        {status === 'failed' && (
          <p
            className="email-confirm-status email-confirm-status--error"
            role="alert"
          >
            {t('registration.confirmEmail.failed')}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default EmailConfirmModal;
