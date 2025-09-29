import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import Modal from '../Modal/Modal';
import ModalNavigation from '../ModalNavigation/ModalNavigation';
import NavFooter from '../NavFooter/NavFooter';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header" id="header" tabIndex={-1}>
      <div className="header_inner">
        <div className="menu-box">
          <button
            type="button"
            className="btn btn-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon id="icon-menu" className="menu-icon" size={18} height={16} />
          </button>
          <Link to="/">
            <Icon
              id="icon-Logo"
              className="header-logo"
              size={108}
              height={32}
            />
          </Link>
        </div>
        <nav className="desktop-nav">
          <Navigation />
        </nav>

        <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div className="wrap-close">
            <Icon
              id="icon-Logo"
              className="header-logo"
              size={136}
              height={40}
            />
            <button
              type="button"
              className="btn btn-menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon id="icon-close" className="icon-close" size={18} />
            </button>
          </div>
          <ModalNavigation
            className="modal-nav-list"
            onLinkClick={() => setIsMenuOpen(false)}
          />
          <div className="btn-wrap">
            <button type="button" className="btn btn-modal" title="Favourite">
              <Icon id="icon-heart" size={16} />
            </button>
            <div className="btn-modal-language" aria-label="Switch language">
              <button
                type="button"
                onClick={() => changeLanguage('uk')}
                className={i18n.language === 'uk' ? 'active-lang' : ''}
                aria-pressed={i18n.language === 'uk'}
              >
                UA
              </button>
              <span> / </span>
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? 'active-lang' : ''}
                aria-pressed={i18n.language === 'en'}
              >
                EN
              </button>
            </div>
          </div>

          <NavFooter />
        </Modal>
        <div className="actions actions-modal">
          <button
            type="button"
            className="btn btn-lang"
            aria-label={
              i18n.language === 'uk'
                ? 'Switch language to Ukrainian'
                : 'Switch language to English'
            }
            aria-pressed={i18n.language === 'uk'}
            onClick={() => changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}
          >
            {i18n.language.toUpperCase()}
          </button>

          <button type="button" className="btn" title="Favourite">
            <Icon id="icon-heart" size={16} height={15} />
          </button>
          <button type="button" className="btn" title="Username">
            <Icon id="icon-user" size={16} height={15} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
