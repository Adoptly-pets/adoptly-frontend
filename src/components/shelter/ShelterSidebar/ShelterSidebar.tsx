import { useTranslation } from 'react-i18next';
import ShelterNavList from '../ShelterNavList/ShelterNavList';
import ShelterLogoutButton from '../ShelterLogoutButton/ShelterLogoutButton';
import styles from './ShelterSidebar.module.css';

const ShelterSidebar = () => {
  const { t } = useTranslation();
  return (
    <nav className={styles.sidebar} aria-label={t('shelter.menu.ariaLabel')}>
      {/* TODO: replace with real shelter name from backend */}
      <h2 className={styles.title}>Назва притулку</h2>
      <div className={styles.menu}>
        <ShelterNavList />
        <ShelterLogoutButton />
      </div>
    </nav>
  );
};

export default ShelterSidebar;
