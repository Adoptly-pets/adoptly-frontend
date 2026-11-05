import { NavLink } from 'react-router-dom';
import './ShelterSidebar.css';
import { useTranslation } from 'react-i18next';
import { SHELTER_MENU } from '../../constants/SHELTER_MENU';
import { langLink } from '../../utils/routing';

const ShelterSidebar = () => {
  const { t } = useTranslation();
  return (
    <nav className="shelter-sidebar" aria-label={t('shelter.menu.ariaLabel')}>
      {/* TODO: replace with real shelter name from backend */}
      <h2>Назва притулку</h2>
      <ul>
        {SHELTER_MENU.map(({ path, labelKey }) => (
          <li key={path}>
            <NavLink to={langLink(path)}>{t(labelKey)}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ShelterSidebar;
