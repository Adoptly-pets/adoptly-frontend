import { useState, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { resendActivationEmail } from '../../services/auth';
import './EmailConfirmPanel.css';

interface EmailConfirmPanelProps {
  email: string;
  messageKey: string;
  hasActiveRateLimit: boolean;
}

type Status = 'ready' | 'resending' | 'resent' | 'failed';

// Mirrors backend rate limit (2 min from registration, then after each resend)
const TIMER_SECONDS = 120;

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const EmailConfirmPanel: React.FC<EmailConfirmPanelProps> = ({
  email,
  messageKey,
  hasActiveRateLimit,
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('ready');
  const [secondsLeft, setSecondsLeft] = useState(() =>
    hasActiveRateLimit ? TIMER_SECONDS : 0
  );

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
    <div className="email-confirm">
      <h2 className="email-confirm-title">{t('emailConfirm.title')}</h2>
      <p className="email-confirm-message">
        <Trans
          i18nKey={messageKey}
          values={{ email }}
          components={{ bold: <strong /> }}
        />
      </p>
      <p className="email-confirm-resend">
        <span>{t('emailConfirm.didntReceive')}</span>{' '}
        <button
          type="button"
          className="email-confirm-resend-btn"
          onClick={handleResend}
          disabled={
            status === 'resending' || status === 'resent' || secondsLeft > 0
          }
        >
          {secondsLeft > 0
            ? t('emailConfirm.resendWithTimer', {
                time: formatTime(secondsLeft),
              })
            : t('emailConfirm.resend')}
        </button>
      </p>
      <div className="email-confirm-status-container">
        {status === 'resent' && (
          <p
            className="email-confirm-status email-confirm-status--success"
            role="status"
          >
            {t('emailConfirm.resent')}
          </p>
        )}

        {status === 'failed' && (
          <p
            className="email-confirm-status email-confirm-status--error"
            role="alert"
          >
            {t('emailConfirm.failed')}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmPanel;
