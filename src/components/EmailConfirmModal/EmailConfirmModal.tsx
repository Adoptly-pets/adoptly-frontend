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

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const EmailConfirmModal: React.FC<EmailConfirmModalProps> = ({
  isOpen,
  email,
  onClose,
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('ready');
  const TIMER_SECONDS = 120;
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStatus('ready');
      setSecondsLeft(TIMER_SECONDS);
    }
  }, [isOpen]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setStatus('ready');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = async () => {
    setStatus('resending');
    try {
      await resendActivationEmail(email);
      setStatus('resent');
      setSecondsLeft(TIMER_SECONDS);
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
            disabled={
              status === 'resending' || status === 'resent' || secondsLeft > 0
            }
          >
            {secondsLeft > 0
              ? t('registration.confirmEmail.resendWithTimer', {
                  time: formatTime(secondsLeft),
                })
              : t('registration.confirmEmail.resend')}
          </button>
        </p>
        <div className="email-confirm-status-container">
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
      </div>
    </Modal>
  );
};

export default EmailConfirmModal;
