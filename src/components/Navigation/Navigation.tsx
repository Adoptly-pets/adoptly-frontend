import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

// Navigation component code
interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  className = '',
  onLinkClick,
}) => {
  const listClass = `list ${className}`.trim();

  return (
    <nav>
      <ul className={listClass}>
        <li className="item">
          <Link to="/" onClick={onLinkClick}>
            Головна
          </Link>
        </li>
        <li className="item">
          <Link to="/about" onClick={onLinkClick}>
            Про нас
          </Link>
        </li>
        <li className="item">
          <Link to="/how-to-help" onClick={onLinkClick}>
            Як допомогти
          </Link>
        </li>
        <li className="item">
          <Link to="/shelters" onClick={onLinkClick}>
            Притулкам
          </Link>
        </li>
        <li className="item">
          <Link to="/contacts" onClick={onLinkClick}>
            Контакти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
