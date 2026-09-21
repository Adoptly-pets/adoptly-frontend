import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Icon } from '../../components/Icon/Icon';
import styles from './ResetPasswordPage.module.css';
import { resetPassword } from '../../services/auth';
import { HTTP_STATUS } from '../../constants/HTTP_STATUS';
import { isApiError } from '../../services/api';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Status = 'form' | 'success' | 'tokenError';

const ResetPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const newPassword = watch('newPassword', '');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>(token ? 'form' : 'tokenError');

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    try {
      await resetPassword({ token, newPassword: data.newPassword });
      console.log('Password reset succeeded');
      setStatus('success');
    } catch (error) {
      if (isApiError(error) && error.status === HTTP_STATUS.UNAUTHORIZED) {
        setStatus('tokenError');
        return;
      }
      console.error('Reset password error: ', error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        {status === 'form' && (
          <>
            <div>
              <h2>{t('resetPassword.title')}</h2>
              <p>{t('resetPassword.description')}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">
                  {t('resetPassword.passwordLabel')}*
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    className={styles.input}
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
                      showNewPassword ? 'Hide password' : 'Show password'
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
                <label htmlFor="confirmPassword">
                  {t('resetPassword.confirmPasswordLabel')}*
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={styles.input}
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
                      showConfirmPassword ? 'Hide password' : 'Show password'
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
              <button type="submit">{t('resetPassword.submitButton')}</button>
            </form>
          </>
        )}
        {status === 'success' && (
          <div>
            <h2>{t('resetPassword.title')}</h2>
            <p>{t('resetPassword.successMessage')}</p>
            <Link to={`/${i18n.language}/`} className={styles.backLink}>
              {t('resetPassword.backToLogin')}
            </Link>
          </div>
        )}

        {status === 'tokenError' && (
          <div>
            <h2>{t('resetPassword.title')}</h2>
            <p>Недійсний або вже використаний токен скидання пароля</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;
