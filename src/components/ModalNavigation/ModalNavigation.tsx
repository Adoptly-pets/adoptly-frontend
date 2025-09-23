import { Link } from 'react-router-dom';
import './ModalNavigation.css';
import { useTranslation } from 'react-i18next';

interface ModalNavigationProps {
  className?: string;
  onLinkClick?: () => void;
}
const ModalNavigation = ({
  className = '',
  onLinkClick,
}: ModalNavigationProps) => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className={`nav-list ${className}`}>
        <li className="item">
          <Link to="/find-pet" onClick={onLinkClick}>
            {t('footer.findPet')}
          </Link>
        </li>
        <li className="item">
          <Link to="/donate" onClick={onLinkClick}>
            {t('footer.donate')}
          </Link>
        </li>
        <li className="item">
          <Link to="/volunteer" onClick={onLinkClick}>
            {t('footer.volunteer')}
          </Link>
        </li>
        <li className="item">
          <Link to="/help-medical-food" onClick={onLinkClick}>
            {t('footer.helpMedicalFood')}
          </Link>
        </li>
        <li className="item">
          <Link to="/register-shelter" onClick={onLinkClick}>
            {t('footer.joinShelter')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ModalNavigation;
