import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/useAuth';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t('account.title')}</h1>
      <Button onClick={logout} maxWidth={200}>
        {t('header.logout')}
      </Button>
    </section>
  );
};

export default AccountPage;
