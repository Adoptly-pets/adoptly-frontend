import { useState, lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Icon } from '../../components/Icon/Icon';
import styles from './ResetPasswordPage.module.css';
import { resetPassword } from '../../services/auth';
import { HTTP_STATUS } from '../../constants/HTTP_STATUS';
import { isApiError } from '../../services/api';
import Button from '../../components/Button/Button';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Status = 'form' | 'success' | 'tokenError';

const PasswordStrengthBar = lazy(
  () => import('../../components/PasswordStrengthBar/PasswordStrengthBar')
);

const ResetPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const newPassword = watch('newPassword', '');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>(token ? 'form' : 'tokenError');
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    setServerError(null);
    try {
      await resetPassword({ token, newPassword: data.newPassword });
      setStatus('success');
    } catch (error) {
      if (isApiError(error) && error.status === HTTP_STATUS.UNAUTHORIZED) {
        setStatus('tokenError');
        return;
      }
      setServerError(t('errors.serverError'));
      console.error('Reset password error: ', error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        {status === 'form' && (
          <>
            <div>
              <h2 className={styles.title}>{t('resetPassword.title')}</h2>
              <p className={styles.description}>
                {t('resetPassword.description')}
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword" className={styles.label}>
                  {t('resetPassword.passwordLabel')}*
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    className={styles.input}
                    placeholder={t('resetPassword.passwordPlaceholder')}
                    {...register('newPassword', {
                      required: t('resetPassword.passwordRequired'),
                      minLength: {
                        value: 8,
                        message: t('resetPassword.passwordMinLength'),
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(prev => !prev)}
                    className={styles.toggleButton}
                    aria-label={
                      showNewPassword
                        ? t('common.hidePassword')
                        : t('common.showPassword')
                    }
                  >
                    <Icon
                      id={showNewPassword ? 'icon-eye' : 'icon-eye-off'}
                      className={styles.eyeIcon}
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <span className={styles.error}>
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  {t('resetPassword.confirmPasswordLabel')}*
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={styles.input}
                    placeholder={t('resetPassword.passwordPlaceholder')}
                    {...register('confirmPassword', {
                      required: t('resetPassword.confirmPasswordRequired'),
                      validate: value =>
                        value === newPassword ||
                        t('resetPassword.passwordsMustMatch'),
                    })}
                  />
                  <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? t('common.hidePassword')
                        : t('common.showPassword')
                    }
                  >
                    <Icon
                      id={showConfirmPassword ? 'icon-eye' : 'icon-eye-off'}
                      className={styles.eyeIcon}
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className={styles.error}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {serverError && (
                <span className={styles.error} role="alert">
                  {serverError}
                </span>
              )}
              <div>
                <span
                  className={`${styles.hint} ${newPassword.length >= 8 ? styles.hintValid : ''}`}
                >
                  <Icon id="icon-checkmark" className={styles.hintIcon} />
                  {t('resetPassword.passwordMinLength')}
                </span>
                <Suspense fallback={null}>
                  <PasswordStrengthBar password={newPassword} />
                </Suspense>
              </div>
              <Button
                type="submit"
                variant="action"
                maxWidth="100%"
                height={56}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('resetPassword.submitting')
                  : t('resetPassword.submitButton')}
              </Button>
            </form>
          </>
        )}
        {status === 'success' && (
          <div>
            <h2 className={styles.title}>{t('resetPassword.title')}</h2>
            <p className={styles.description}>
              {t('resetPassword.successMessage')}
            </p>
            <Link to={`/${i18n.language}/`} className={styles.backLink}>
              {t('resetPassword.backToLogin')}
            </Link>
          </div>
        )}

        {status === 'tokenError' && (
          <div>
            <h2 className={styles.title}>{t('resetPassword.title')}</h2>
            <p className={styles.description}>
              {t('resetPassword.tokenErrorMessage')}
            </p>
            <Link
              to={`/${i18n.language}/forgot-password`}
              className={styles.requestNewLink}
            >
              {t('resetPassword.requestNewLink')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;
