import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/useAuth';
import styles from './ShelterLogoutButton.module.css';

const ShelterLogoutButton = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <>
      <hr className={styles.divider} />
      <button type="button" className={styles.logout} onClick={logout}>
        {t('shelter.menu.logout')}
      </button>
    </>
  );
};

export default ShelterLogoutButton;
