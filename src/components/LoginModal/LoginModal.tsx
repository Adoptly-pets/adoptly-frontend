import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import { Icon } from '../Icon/Icon';
import Button from '../Button/Button';
import FormDivider from '../FormDivider/FormDivider';
import './LoginModal.css';
import { loginWithEmail } from '../../services/auth';
import { isApiError } from '../../services/api';
import { HTTP_STATUS } from '../../constants/HTTP_STATUS';
import GoogleAuthContainer from '../GoogleAuthContainer/GoogleAuthContainer';
import EmailConfirmModal from '../EmailConfirmModal/EmailConfirmModal';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmEmail, setConfirmEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const rememberMeValue = watch('rememberMe');

  useEffect(() => {
    if (isOpen) {
      reset();
      setShowPassword(false);
      setServerError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await loginWithEmail({ email: data.email, password: data.password });
      onClose();
    } catch (error) {
      if (isApiError(error)) {
        if (error.type === 'network') {
          setServerError(t('login.networkError'));
          console.error('Network error during login:', error);
          return;
        }
        if (error.status === HTTP_STATUS.UNAUTHORIZED) {
          setServerError(t('login.invalidCredentials'));
          return;
        }
        if (error.status === HTTP_STATUS.FORBIDDEN) {
          setConfirmEmail(data.email);
          onClose();
          return;
        }
      }
      setServerError(t('login.serverError'));
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} ariaLabel={t('login.title')}>
        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="login-form-title">{t('login.title')}</h2>

          <div className="login-form-field">
            <label className="login-form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="login-form-input"
              placeholder={t('login.email_placeholder')}
              {...register('email', {
                required: t('login.email_required'),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t('login.email_invalid'),
                },
              })}
            />
            {errors.email && (
              <span className="login-form-error">{errors.email.message}</span>
            )}
          </div>

          <div className="login-form-field">
            <label className="login-form-label" htmlFor="login-password">
              {t('login.password_label')}
            </label>
            <div className="login-form-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="login-form-input"
                placeholder={t('login.password_placeholder')}
                {...register('password', {
                  required: t('login.password_required'),
                })}
              />
              <button
                type="button"
                className="login-form-toggle-password"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon
                  id={showPassword ? 'icon-eye' : 'icon-eye-off'}
                  className="login-form-eye-icon"
                />
              </button>
            </div>
            {errors.password && (
              <span className="login-form-error">
                {errors.password.message}
              </span>
            )}
            <div className="login-form-options">
              <label className="login-form-checkbox">
                <input type="checkbox" {...register('rememberMe')} />
                <span className="login-form-checkbox-custom" />
                <span className="login-form-checkbox-label">
                  {t('login.remember_me')}
                </span>
              </label>
              <button type="button" className="login-form-forgot">
                {t('login.forgot_password')}
              </button>
            </div>
          </div>
          {serverError && (
            <span className="login-form-error" role="alert">
              {serverError}
            </span>
          )}
          <Button
            type="submit"
            variant="action"
            maxWidth="100%"
            height={56}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('login.submitting') : t('login.submit')}
          </Button>
        </form>
        <p className="login-form-register-text">
          {t('login.no_account')}{' '}
          <button
            type="button"
            className="login-form-register-link"
            onClick={onSwitchToRegister}
          >
            {t('login.register_link')}
          </button>
        </p>
        <FormDivider text={t('login.signInWith')} />
        <div className="login-form-google-auth">
          <GoogleAuthContainer
            onSuccess={onClose}
            onError={() => setServerError(t('login.googleError'))}
            rememberMe={rememberMeValue}
          />
        </div>
      </Modal>
      <EmailConfirmModal
        isOpen={confirmEmail !== null}
        email={confirmEmail ?? ''}
        messageKey="emailConfirm.notActivatedMessage"
        hasActiveRateLimit={false}
        onClose={() => setConfirmEmail(null)}
      />
    </>
  );
};

export default LoginModal;
