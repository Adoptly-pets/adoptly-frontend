import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './Footer.css';
import { useTranslation } from 'react-i18next';
import SocialLinks from '../SocialLinks/SocialLinks';

const Footer = () => {
  const { t } = useTranslation();
  const scrollToHeader = () => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <div className="nav-footer">
            <Link to="/">
              <Icon
                id="icon-Logo"
                className="footer-logo"
                size={217}
                height={36}
              />
            </Link>
            <Link to="/" className="platform-footer">
              {t('footer.platform')}
            </Link>

            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <Link to="/">{t('nav.home')}</Link>
                </li>
                <li className="item-nav">
                  <Link to="/about">{t('nav.about')}</Link>
                </li>
                <li className="item-nav">
                  <Link to="/contacts">{t('nav.contacts')}</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <Link to="/donate">{t('footer.donate')}</Link>
                </li>
                <li className="item-nav">
                  <Link to="/volunteer">{t('footer.volunteer')}</Link>
                </li>
                <li className="item-nav">
                  <Link to="/help-medical-food">
                    {t('footer.helpMedicalFood')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <Link to="/find-pet">{t('footer.findPet')}</Link>
                </li>
                <li className="item-nav">
                  <Link to="/shelters">{t('footer.joinShelter')}</Link>
                </li>
              </ul>
            </div>

            <SocialLinks />
          </div>
          <div className="containerBtn">
            <a
              className="btnUp"
              href="#header"
              data-testid="back-to-top"
              aria-label="Back to top"
              onClick={e => {
                e.preventDefault();
                scrollToHeader();
              }}
            >
              <Icon id="icon-up" className="icon-up" size={16} />
            </a>
          </div>
          <hr className="divider" />
          <ul className="police-list">
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/cookie-policy">Cookie Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
