import { Icon } from '../Icon/Icon';
import './NavFooter.css';

const NavFooter = () => {
  return (
    <nav className="nav-buttons">
      <a
        className="nav-btn-footer"
        type="button"
        title="Instagram"
        target="_blank"
        href="https://www.instagram.com"
        aria-label="Instagram"
      >
        <Icon id="icon-instagram" size={25} />
      </a>
      <a
        className="nav-btn-footer"
        type="button"
        title="Facebook"
        target="_blank"
        href="https://www.facebook.com"
        aria-label="Facebook"
      >
        <Icon id="icon-facebook" size={25} />
      </a>
      <a
        className="nav-btn-footer"
        type="button"
        title="TikTok"
        target="_blank"
        href="https://www.tiktok.com"
        aria-label="TikTok"
      >
        <Icon id="icon-tiktok" size={25} />
      </a>
    </nav>
  );
};

export default NavFooter;
