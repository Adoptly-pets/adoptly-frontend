import { Icon } from '../Icon/Icon';
import './Footer.css';

const Footer = () => {
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
            <Icon id="icon-Logo" className="footer-logo" />

            <div>
              <ul>
                <li className="item-nav">
                  <a href="/find-pet">Знайти улюбленця</a>
                </li>
                <li className="item-nav">
                  <a href="/join-shelter">Доєднатись як притулок</a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="footer-list">
                <li className="item-nav">
                  <a href="/donate">Задонатити</a>
                </li>
                <li className="item-nav">
                  <a href="/volunteer">Волонтерство</a>
                </li>
                <li className="item-nav">
                  <a href="/help-medical-food">Допомогти ліками / кормом</a>
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
                <Icon id="icon-instagram" size={25} />
              </a>
              <a
                className="btn-footer"
                type="button"
                title="Facebook"
                target="_blank"
                href="https://www.facebook.com"
                aria-label="Facebook"
              >
                <Icon id="icon-facebook" size={25} />
              </a>
              <a
                className="btn-footer"
                type="button"
                title="TikTok"
                target="_blank"
                href="https://www.tiktok.com"
                aria-label="TikTok"
              >
                <Icon id="icon-tiktok" size={25} />
              </a>
            </nav>
          </div>
          <div className="containerBtn">
            <a
              className="btnUp"
              href="#header"
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
