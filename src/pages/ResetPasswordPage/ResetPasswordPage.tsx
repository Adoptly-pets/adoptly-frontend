import { useTranslation } from 'react-i18next';
import styles from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div>
          <h2>{t('resetPassword.title')}</h2>
          <p>{t('resetPassword.description')}</p>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">
              {t('resetPassword.passwordLabel')}*
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              {t('resetPassword.confirmPasswordLabel')}*
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          <button type="submit">{t('resetPassword.submitButton')}</button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
