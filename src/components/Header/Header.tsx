import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import Modal from '../Drawer/Drawer';
import ModalNavigation from '../ModalNavigation/ModalNavigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLinks from '../SocialLinks/SocialLinks';
import { langLink } from '../../utils/routing';
import { useAuth } from '../../context/useAuth';
import ShelterMobileMenu from '../shelter/ShelterMobileMenu/ShelterMobileMenu';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<'nav' | 'shelter' | null>(null);
  const closeMenu = useCallback(() => setOpenMenu(null), []);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const isAdopter = user?.role === 'ROLE_USER';
  const isShelter = user?.role === 'ROLE_SHELTER_OWNER';

  const cabinetTriggerRef = useRef<HTMLButtonElement>(null);
  const userIcon = (
    <Icon id="icon-user" className="icon-user" size={16} height={15} />
  );

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const changeLanguage = (lng: string) => {
    const pathParts = location.pathname.split('/');
    const hasLanguagePrefix =
      pathParts.length > 1 && /^(uk|en)$/.test(pathParts[1]);
    const currentPath = hasLanguagePrefix
      ? pathParts.slice(2).join('/')
      : pathParts.slice(1).join('/');

    navigate(`/${lng}/${currentPath}${location.search}${location.hash}`);
  };

  const renderUserAction = () => {
    if (isAdopter) {
      return (
        <Link
          to={langLink('/account')}
          className="btn"
          title={t('header.account')}
        >
          {userIcon}
        </Link>
      );
    }

    if (isShelter) {
      return (
        <>
          <Link
            to={langLink('/shelter/profile')}
            className="btn user-desktop"
            title={t('header.cabinet')}
          >
            {userIcon}
          </Link>
          <button
            ref={cabinetTriggerRef}
            type="button"
            className="btn user-mobile"
            aria-label={t('header.cabinetMenu')}
            aria-expanded={openMenu === 'shelter'}
            aria-controls="shelter-mobile-menu"
            onClick={() =>
              setOpenMenu(m => (m === 'shelter' ? null : 'shelter'))
            }
          >
            {userIcon}
          </button>
          {openMenu === 'shelter' && (
            <ShelterMobileMenu
              id="shelter-mobile-menu"
              onClose={closeMenu}
              triggerRef={cabinetTriggerRef}
            />
          )}
        </>
      );
    }

    if (isAuthenticated) {
      // Temporary: admin / no role
      return (
        <button
          type="button"
          className="btn"
          title={t('header.logout')}
          onClick={logout}
        >
          {userIcon}
        </button>
      );
    }

    return (
      <Link to={langLink('/login')} className="btn" title={t('header.login')}>
        {userIcon}
      </Link>
    );
  };

  return (
    <header className="header" id="header" tabIndex={-1}>
      <div className="header_inner">
        <div className="menu-box">
          <button
            type="button"
            className="btn btn-menu"
            onClick={() => setOpenMenu(openMenu === 'nav' ? null : 'nav')}
          >
            <Icon id="icon-menu" className="menu-icon" size={18} height={16} />
          </button>
          <Link to={langLink('/')}>
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

        <Modal isOpen={openMenu === 'nav'} onClose={closeMenu}>
          <div className="wrap-close">
            <Icon
              id="icon-Logo"
              className="header-logo"
              size={136}
              height={40}
            />
            <button type="button" className="btn btn-menu" onClick={closeMenu}>
              <Icon id="icon-close" className="icon-close" size={18} />
            </button>
          </div>
          <ModalNavigation className="modal-nav-list" onLinkClick={closeMenu} />
          <div className="btn-wrap">
            <button type="button" className="btn btn-modal" title="Favourite">
              <Icon id="icon-heart" className="icon-heart" size={16} />
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
          <SocialLinks isMobileMenu={true} />
        </Modal>
        <div className="actions actions-modal">
          <button
            type="button"
            className="btn btn-lang"
            aria-label={
              i18n.language === 'uk'
                ? 'Switch language to English'
                : 'Switch language to Ukrainian'
            }
            aria-pressed={i18n.language === 'uk'}
            onClick={() => changeLanguage(i18n.language === 'uk' ? 'en' : 'uk')}
          >
            {i18n.language === 'uk' ? 'UA' : 'EN'}
          </button>

          <button type="button" className="btn" title="Favourite">
            <Icon
              id="icon-heart"
              className="icon-heart"
              size={16}
              height={15}
            />
          </button>
          {renderUserAction()}
        </div>
      </div>
    </header>
  );
};

export default Header;
