import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './Footer.css';
import { useTranslation } from 'react-i18next';

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
            <Icon
              id="icon-Logo"
              className="footer-logo"
              size={217}
              height={36}
            />
            <Link to="/" className="platform-footer">
              Платформа для адопції тварин
            </Link>
            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <a href="/find-pet">{t('footer.findPet')}</a>
                </li>
                <li className="item-nav">
                  <a href="/join-shelter">{t('footer.joinShelter')}</a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <a href="/donate">{t('footer.donate')}</a>
                </li>
                <li className="item-nav">
                  <a href="/volunteer">{t('footer.volunteer')}</a>
                </li>
                <li className="item-nav">
                  <a href="/help-medical-food">{t('footer.helpMedicalFood')}</a>
                </li>
              </ul>
            </div>

            <nav className="buttons">
              <a
                className="btn-footer"
                type="button"
                title="Instagram"
                target="_blank"
                href="https://www.instagram.com"
                aria-label="Instagram"
              >
                <Icon
                  id="icon-instagram"
                  className="footer-icon"
                  size={25}
                  height={22}
                />
              </a>
              <a
                className="btn-footer"
                type="button"
                title="Facebook"
                target="_blank"
                href="https://www.facebook.com"
                aria-label="Facebook"
              >
                <Icon
                  id="icon-facebook"
                  className="footer-icon"
                  size={25}
                  height={22}
                />
              </a>
              <a
                className="btn-footer"
                type="button"
                title="TikTok"
                target="_blank"
                href="https://www.tiktok.com"
                aria-label="TikTok"
              >
                <Icon
                  id="icon-tiktok"
                  className="footer-icon"
                  size={25}
                  height={22}
                />
              </a>
            </nav>
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
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="/sitemap">Sitemap</a>
            </li>
          </ul>
          <Link to="/privacy-policy" className="cookie">
            Cookie policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
