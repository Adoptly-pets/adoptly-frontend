import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { forgotPassword } from '../../services/auth';
import './ForgotPasswordForm.css';

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    try {
      await forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setIsSent(true);
    } catch (error) {
      setServerError(t('errors.serverError'));
      console.error('Reset password error:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate(`/${i18n.language}/login`);
  };

  return (
    <div className="forgot-password-card">
      {!isSent ? (
        <form
          className="forgot-password-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="forgot-password-title">{t('forgotPassword.title')}</h2>

          <p className="forgot-password-description">
            {t('forgotPassword.description')}
          </p>

          <div className="forgot-password-field">
            <label className="forgot-password-label" htmlFor="forgot-email">
              {t('forgotPassword.emailLabel')}
            </label>
            <input
              id="forgot-email"
              type="email"
              disabled={isSubmitting}
              className={`forgot-password-input ${
                errors.email || serverError ? 'input-error' : ''
              }`}
              placeholder={t('forgotPassword.emailPlaceholder')}
              {...register('email', {
                required: t('forgotPassword.emailRequired'),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t('forgotPassword.emailInvalid'),
                },
              })}
            />
            {errors.email && (
              <span className="forgot-password-error">
                {errors.email.message}
              </span>
            )}
            {serverError && !errors.email && (
              <span className="forgot-password-error" role="alert">
                {serverError}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            maxWidth="100%"
            height={56}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('forgotPassword.submitting')
              : t('forgotPassword.submit')}
          </Button>

          <button
            type="button"
            className="forgot-password-back-btn"
            onClick={handleBackToLogin}
          >
            {t('forgotPassword.backToLogin')}
          </button>
        </form>
      ) : (
        <div className="forgot-password-success">
          <h2 className="forgot-password-title">
            {t('forgotPassword.successTitle')}
          </h2>
          <p className="forgot-password-description">
            {t('forgotPassword.successDescription')}{' '}
            <strong>{submittedEmail}</strong>.
          </p>
          <button
            type="button"
            className="forgot-password-back-btn"
            onClick={handleBackToLogin}
          >
            {t('forgotPassword.backToLogin')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
