import { useState } from 'react';
import { Icon } from '../Icon/Icon';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import Modal from '../Modal/Modal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header" id="header" tabIndex={-1}>
      <div className="header_inner">
        <div className="menu-box">
          <button
            type="button"
            className="btn btn-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon id="icon-menu" className="icon-menu" size={18} />
          </button>

          <Icon id="icon-Logo" className="header-logo" size={108} height={32} />
        </div>
        <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <Navigation />
        </Modal>
        <div className="actions">
          <button
            type="button"
            className="btn btn-lang"
            aria-label="Switch language to Ukrainian"
            title="Ukrainian"
            aria-pressed="true"
          >
            UA
          </button>

          <button type="button" className="btn" title="Favourite">
            <Icon id="icon-heart" size={16} />
          </button>
          <button type="button" className="btn" title="Username">
            <Icon id="icon-user" size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
