import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styles from './ResetPasswordPage.module.css';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormData>();

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
              {...register('newPassword', { required: true })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              {t('resetPassword.confirmPasswordLabel')}*
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}
            />
          </div>
          <button type="submit">{t('resetPassword.submitButton')}</button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
