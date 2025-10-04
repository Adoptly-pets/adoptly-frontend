import React, { type MouseEventHandler } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  maxWidth?: string | number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  maxWidth,
}) => {
  const style: CSSProperties = maxWidth ? { maxWidth } : {};
  return (
    <button
      onClick={onClick}
      className={`button button--${variant}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
