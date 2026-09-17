import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './ResetPasswordPage.module.css';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const newPassword = watch('newPassword', '');

  const onSubmit = (data: FormData) => {
    console.log('Reset password data:', data);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div>
          <h2>{t('resetPassword.title')}</h2>
          <p>{t('resetPassword.description')}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">
              {t('resetPassword.passwordLabel')}*
            </label>
            <input
              type="password"
              id="newPassword"
              {...register('newPassword', {
                required: t('resetPassword.passwordRequired'),
                minLength: {
                  value: 8,
                  message: t('resetPassword.passwordMinLength'),
                },
              })}
            />
            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword.message}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              {t('resetPassword.confirmPasswordLabel')}*
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: t('resetPassword.confirmPasswordRequired'),
                validate: value =>
                  value === newPassword ||
                  t('resetPassword.passwordsMustMatch'),
              })}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button type="submit">{t('resetPassword.submitButton')}</button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
