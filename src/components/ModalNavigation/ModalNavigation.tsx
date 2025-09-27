import Navigation from '../Navigation/Navigation';
import './ModalNavigation.css';

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
