import Navigation from '../Navigation/Navigation';
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
  return <Navigation className={className} onLinkClick={onLinkClick} />;
};

export default ModalNavigation;
