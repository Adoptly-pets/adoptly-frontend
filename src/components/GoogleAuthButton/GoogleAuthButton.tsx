import React from 'react';
import { Icon } from '../Icon/Icon';
import './GoogleAuthButton.css';

interface GoogleAuthButtonProps {
  onClick: () => void;
  ariaLabel: string;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      className="google-auth-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon
        id="icon-google"
        size={24}
        height={24}
        className="google-auth-button-icon"
      />
      <span className="google-auth-button-label">Google</span>
    </button>
  );
};

export default GoogleAuthButton;
