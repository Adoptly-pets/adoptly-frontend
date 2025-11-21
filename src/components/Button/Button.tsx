import React, { type MouseEventHandler } from 'react';
import type { ReactNode } from 'react';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  maxWidth?: string | number;
  maxWidthMobile?: string | number;
  height?: string | number;
  heightMobile?: string | number;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
}

const toPx = (v?: number | string) => (typeof v === 'number' ? `${v}px` : v);

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  maxWidth,
  maxWidthMobile,
  height,
  heightMobile,
  style,
  type = 'button',
}) => {
  const cssVars = {
    '--btn-max-width': toPx(maxWidth) ?? undefined,
    '--btn-max-width-mobile': toPx(maxWidthMobile) ?? undefined,
    '--btn-height': toPx(height) ?? undefined,
    '--btn-height-mobile': toPx(heightMobile) ?? undefined,
  } as Record<string, string | undefined>;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant}`}
      style={{ ...cssVars, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
