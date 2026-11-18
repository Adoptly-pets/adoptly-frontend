import React, { type MouseEventHandler } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'action';

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
  disabled?: boolean;
  /**
   * Optional layout-only className. Do NOT use for colors, backgrounds,
   * borders, or typography — those must come from variants and design tokens.
   */
  className?: string;
  /** When set, renders a router Link styled as a button instead of <button>. */
  to?: string;
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
  disabled = false,
  className,
  to,
}) => {
  const cssVars = {
    '--btn-max-width': toPx(maxWidth) ?? undefined,
    '--btn-max-width-mobile': toPx(maxWidthMobile) ?? undefined,
    '--btn-height': toPx(height) ?? undefined,
    '--btn-height-mobile': toPx(heightMobile) ?? undefined,
  } as Record<string, string | undefined>;

  const classes = `button button--${variant}${className ? ` ${className}` : ''}`;
  const buttonStyle = { ...cssVars, ...style };

  if (to) {
    return (
      <Link to={to} className={classes} style={buttonStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
