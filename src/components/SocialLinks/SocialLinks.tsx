import { Icon } from '../Icon/Icon';
import './SocialLinks.css';

const SocialLinks = () => {
  return (
    <div className="social-nav">
      <a
        className="btn-footer"
        title="Instagram"
        target="_blank"
        rel="noopener noreferrer"
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
        title="Facebook"
        target="_blank"
        rel="noopener noreferrer"
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
        title="TikTok"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.tiktok.com"
        aria-label="TikTok"
      >
        <Icon id="icon-tiktok" className="footer-icon" size={25} height={22} />
      </a>
    </div>
  );
};
export default SocialLinks;
