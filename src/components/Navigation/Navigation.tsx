import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navigation.css';
import { langLink } from '../../utils/routing';

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
          <Link to={langLink('/')} onClick={onLinkClick}>
            {t('nav.home')}
          </Link>
        </li>
        <li className="item">
          <Link to={langLink('/about')} onClick={onLinkClick}>
            {t('nav.about')}
          </Link>
        </li>
        <li className="item">
          <Link to={langLink('/how-to-help')} onClick={onLinkClick}>
            {t('nav.help')}
          </Link>
        </li>
        <li className="item">
          <Link to={langLink('/shelters')} onClick={onLinkClick}>
            {t('nav.shelters')}
          </Link>
        </li>
        <li className="item">
          <Link to={langLink('/contacts')} onClick={onLinkClick}>
            {t('nav.contacts')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
