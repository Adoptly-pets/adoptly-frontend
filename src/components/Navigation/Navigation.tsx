import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useTranslation } from 'react-i18next';

// Navigation component code
interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  className = '',
  onLinkClick,
}) => {
  const listClass = `list ${className}`.trim();

  const { t } = useTranslation();
  return (
    <nav>
      <ul className={listClass}>
        <li className="item">
          <Link to="/" onClick={onLinkClick}>
            {t('nav.home')}
          </Link>
        </li>
        <li className="item">
          <Link to="/about" onClick={onLinkClick}>
            {t('nav.about')}
          </Link>
        </li>
        <li className="item">
          <Link to="/how-to-help" onClick={onLinkClick}>
            {t('nav.help')}
          </Link>
        </li>
        <li className="item">
          <Link to="/shelters" onClick={onLinkClick}>
            {t('nav.shelters')}
          </Link>
        </li>
        <li className="item">
          <Link to="/contacts" onClick={onLinkClick}>
            {t('nav.contacts')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
