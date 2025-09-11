import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li className="item">
          <Link to="/">Головна</Link>
        </li>
        <li className="item">
          <Link to="/about">Про нас</Link>
        </li>
        <li className="item">
          <Link to="/how-to-help">Як допомогти</Link>
        </li>
        <li className="item">
          <Link to="/shelters">Притулкам</Link>
        </li>
        <li className="item">
          <Link to="/contacts">Контакти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
