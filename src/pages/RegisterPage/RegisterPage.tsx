import { useTranslation } from 'react-i18next';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{t('registration.title')}</h2>
      </div>
    </div>
  );
};

export default RegisterPage;
