import { Link } from 'react-router-dom';
import './ModalNavigation.css';

interface ModalNavigationProps {
  className?: string;
  onLinkClick?: () => void;
}
const ModalNavigation = ({
  className = '',
  onLinkClick,
}: ModalNavigationProps) => {
  return (
    <nav>
      <ul className={`nav-list ${className}`}>
        <li className="item">
          <Link to="/find-pet" onClick={onLinkClick}>
            Знайти улюбленця
          </Link>
        </li>
        <li className="item">
          <Link to="/donate" onClick={onLinkClick}>
            Задонатити
          </Link>
        </li>
        <li className="item">
          <Link to="/volunteer" onClick={onLinkClick}>
            Волонтерство
          </Link>
        </li>
        <li className="item">
          <Link to="/help-medical-food" onClick={onLinkClick}>
            Допомогти ліками та кормом
          </Link>
        </li>
        <li className="item">
          <Link to="/register-shelter" onClick={onLinkClick}>
            Зареєструвати притулок
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ModalNavigation;
