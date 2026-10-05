import { lazy, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import FormDivider from '../../components/FormDivider/FormDivider';
import GoogleAuthContainer from '../../components/GoogleAuthContainer/GoogleAuthContainer';
import EmailConfirmPanel from '../../components/EmailConfirmPanel/EmailConfirmPanel';
import { registerWithEmail } from '../../services/auth';
import { isApiError } from '../../services/api';
import styles from './RegisterPage.module.css';

const PasswordStrengthBar = lazy(
  () => import('../../components/PasswordStrengthBar/PasswordStrengthBar')
);

type RegistrationFormData = {
  role: 'adopter' | 'shelter';
  email: string;
  password: string;
};

type Status = 'form' | 'confirm';

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>('form');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>();

  const password = watch('password', '');

  const onSubmit = async (data: RegistrationFormData) => {
    setServerError(null);
    try {
      await registerWithEmail({
        email: data.email,
        password: data.password,
        role: data.role,
      });
      setSubmittedEmail(data.email);
      setStatus('confirm');
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        setError('email', {
          type: 'server',
          message: t('registration.emailInUse'),
        });
        return;
      }
      setServerError(t('errors.serverError'));
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        {status === 'confirm' && (
          <EmailConfirmPanel
            email={submittedEmail}
            messageKey="emailConfirm.registeredMessage"
            hasActiveRateLimit
          />
        )}

        {status === 'form' && (
          <>
            <h2 className={styles.title}>{t('registration.title')}</h2>

            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.field}>
                <div className={styles.radioGroup}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      value="adopter"
                      {...register('role', {
                        required: t('registration.role_required'),
                      })}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioLabel}>
                      {t('registration.role_adopter')}
                    </span>
                  </label>

                  <label className={styles.radio}>
                    <input
                      type="radio"
                      value="shelter"
                      {...register('role', {
                        required: t('registration.role_required'),
                      })}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioLabel}>
                      {t('registration.role_shelter')}
                    </span>
                  </label>
                </div>
                {errors.role && (
                  <span className={styles.error}>{errors.role.message}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-email">
                  Email
                </label>
                <input
                  id="reg-email"
                  type="email"
                  className={styles.input}
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
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="reg-password">
                  {t('registration.password_label')}
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    placeholder={t('registration.password_placeholder')}
                    {...register('password', {
                      required: t('registration.password_required'),
                      minLength: {
                        value: 8,
                        message: t('registration.password_min_length'),
                      },
                    })}
                  />
                  <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={
                      showPassword
                        ? t('common.hidePassword')
                        : t('common.showPassword')
                    }
                  >
                    <Icon
                      id={showPassword ? 'icon-eye' : 'icon-eye-off'}
                      className={styles.eyeIcon}
                    />
                  </button>
                </div>
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
                <span
                  className={`${styles.hint} ${password.length >= 8 ? styles.hintValid : ''}`}
                >
                  <Icon id="icon-checkmark" className={styles.hintIcon} />
                  {t('registration.password_min_length')}
                </span>
                <Suspense fallback={null}>
                  <PasswordStrengthBar password={password} />
                </Suspense>
              </div>

              {serverError && (
                <span className={styles.error} role="alert">
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
                {isSubmitting
                  ? t('registration.submitting')
                  : t('registration.submit')}
              </Button>
            </form>

            <p className={styles.loginText}>
              {t('registration.has_account')}{' '}
              <Link to={`/${i18n.language}/login`} className={styles.loginLink}>
                {t('registration.login_link')}
              </Link>
            </p>

            <FormDivider text={t('login.divider')} />
            <div className={styles.googleAuth}>
              <GoogleAuthContainer
                text="signup_with"
                onSuccess={() => navigate(`/${i18n.language}/`)}
                onError={() => setServerError(t('login.googleError'))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
