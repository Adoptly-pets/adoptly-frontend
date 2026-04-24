import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import { Icon } from '../Icon/Icon';
import Button from '../Button/Button';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import FormDivider from '../FormDivider/FormDivider';
import './RegistrationModal.css';

type RegistrationFormData = {
  role: 'adopter' | 'shelter';
  email: string;
  password: string;
};

type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const selectedRole = watch('role');

  const handleGoogleClick = async () => {
    const isRoleValid = await trigger('role');
    if (!isRoleValid) return;
    // TODO(OSTC-189): wire up real Google OAuth
    console.log('Google auth', selectedRole);
  };

  useEffect(() => {
    if (isOpen) {
      reset();
      setShowPassword(false);
    }
  }, [isOpen, reset]);

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={t('registration.title')}
    >
      <form className="reg-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="reg-form-title">{t('registration.title')}</h2>

        <div className="reg-form-field">
          <div className="reg-form-radio-group">
            <label className="reg-form-radio">
              <input
                type="radio"
                value="adopter"
                {...register('role', {
                  required: t('registration.role_required'),
                })}
              />
              <span className="reg-form-radio-custom" />
              <span className="reg-form-radio-label">
                {t('registration.role_adopter')}
              </span>
            </label>

            <label className="reg-form-radio">
              <input
                type="radio"
                value="shelter"
                {...register('role', {
                  required: t('registration.role_required'),
                })}
              />
              <span className="reg-form-radio-custom" />
              <span className="reg-form-radio-label">
                {t('registration.role_shelter')}
              </span>
            </label>
          </div>
          {errors.role && (
            <span className="reg-form-error">{errors.role.message}</span>
          )}
        </div>

        <div className="reg-form-field">
          <label className="reg-form-label" htmlFor="reg-email">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            className="reg-form-input"
            placeholder={t('registration.email_placeholder')}
            {...register('email', {
              required: t('registration.email_required'),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('registration.email_invalid'),
              },
            })}
          />
          {errors.email && (
            <span className="reg-form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="reg-form-field">
          <label className="reg-form-label" htmlFor="reg-password">
            {t('registration.password_label')}
          </label>
          <div className="reg-form-password-wrapper">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              className="reg-form-input"
              placeholder={t('registration.password_placeholder')}
              {...register('password', {
                required: t('registration.password_required'),
              })}
            />
            <button
              type="button"
              className="reg-form-toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon
                id={showPassword ? 'icon-eye' : 'icon-eye-off'}
                className="reg-form-eye-icon"
              />
            </button>
          </div>
          {errors.password && (
            <span className="reg-form-error">{errors.password.message}</span>
          )}
        </div>

        <Button type="submit" variant="primary" maxWidth="100%" height={56}>
          {t('registration.submit')}
        </Button>
      </form>
      <p className="reg-form-login-text">
        {t('registration.has_account')}{' '}
        <button
          type="button"
          className="reg-form-login-link"
          onClick={onSwitchToLogin}
        >
          {t('registration.login_link')}
        </button>
      </p>
      <FormDivider text={t('registration.signUpWith')} />
      <GoogleAuthButton
        onClick={handleGoogleClick}
        ariaLabel={`${t('registration.signUpWith')} Google`}
      />
    </Modal>
  );
};

export default RegistrationModal;
