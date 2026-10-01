import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import styles from './LoginPage.module.css';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('Login submit:', data);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{t('login.title')}</h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
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
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">
              {t('login.password_label')}
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder={t('login.password_placeholder')}
                {...register('password', {
                  required: t('login.password_required'),
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
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" {...register('rememberMe')} />
            <span>{t('login.remember_me')}</span>
          </label>

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
      </div>
    </div>
  );
};

export default LoginPage;
