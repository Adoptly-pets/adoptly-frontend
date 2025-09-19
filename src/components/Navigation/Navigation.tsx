import { Link } from 'react-router-dom';
import './Navigation.css';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className="list">
        <li className="item">
          <Link to="/">{t('nav.home')}</Link>
        </li>
        <li className="item">
          <Link to="/about">{t('nav.about')}</Link>
        </li>
        <li className="item">
          <Link to="/how-to-help">{t('nav.help')}</Link>
        </li>
        <li className="item">
          <Link to="/shelters">{t('nav.shelters')}</Link>
        </li>
        <li className="item">
          <Link to="/contacts">{t('nav.contacts')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
