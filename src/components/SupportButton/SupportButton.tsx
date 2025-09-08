import React from 'react';
import './SupportButton.css';

export interface SupportButtonProps {
  imgSrc: string;
  altText: string;
  text: string;
  ariaLabel: string;
}

const SupportButton: React.FC<SupportButtonProps> = ({
  imgSrc,
  altText,
  text,
  ariaLabel,
}) => {
  return (
    <button className="support-btn" aria-label={ariaLabel}>
      <img src={imgSrc} alt={altText} loading="lazy" />
      <h4>{text}</h4>
    </button>
  );
};

export default SupportButton;
