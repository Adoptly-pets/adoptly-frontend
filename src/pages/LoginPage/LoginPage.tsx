import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2>{t('login.title')}</h2>
      </div>
    </div>
  );
};

export default LoginPage;
