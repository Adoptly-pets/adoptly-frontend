import { Link } from 'react-router-dom';
import './ModalNavigation.css';
const ModalNavigation = ({ className = '' }) => {
  return (
    <nav>
      <ul className={`nav-list ${className}`}>
        <li className="item">
          <Link to="/find-pet">Знайти улюбленця</Link>
        </li>
        <li className="item">
          <Link to="/donate">Задонатити</Link>
        </li>
        <li className="item">
          <Link to="/volunteer">Волонтерство</Link>
        </li>
        <li className="item">
          <Link to="/help-medical-food">Допомогти ліками та кормом</Link>
        </li>
        <li className="item">
          <Link to="/register-shelter">Зареєструвати притулок</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ModalNavigation;
