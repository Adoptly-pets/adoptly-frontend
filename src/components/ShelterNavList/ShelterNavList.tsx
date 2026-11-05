import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SHELTER_MENU } from '../../constants/SHELTER_MENU';
import { langLink } from '../../utils/routing';
import styles from './ShelterNavList.module.css';

interface ShelterNavListProps {
  onItemClick?: () => void;
}

const ShelterNavList: React.FC<ShelterNavListProps> = ({ onItemClick }) => {
  const { t } = useTranslation();

  return (
    <ul>
      {SHELTER_MENU.map(({ path, labelKey }) => (
        <li key={path}>
          <NavLink
            to={langLink(path)}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={onItemClick}
          >
            {t(labelKey)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ShelterNavList;
