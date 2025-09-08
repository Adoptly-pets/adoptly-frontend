import React, { type MouseEventHandler } from 'react';
import type { ReactNode } from 'react';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button onClick={onClick} className={`button button--${variant}`}>
      {children}
    </button>
  );
};

export default Button;
