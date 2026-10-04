import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from '../../router/Link';
import { Link } from '../../router/Link';
import './Button.css';

/** Visual weight. `primary` is reserved for the main action of a view. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * `sm` fits dense rows, `md` is the default and matches the 44px tap target,
 * `lg` is for a single prominent call to action.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonLook = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean;
  className?: string;
};

type ButtonStyleProps = ButtonLook & {
  children: ReactNode;
};

export type ButtonProps = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export type ButtonLinkProps = ButtonStyleProps & LinkProps;

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonLook): string {
  return [
    'button',
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? 'button-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Button for an action. It renders a real `<button>` and defaults to
 * `type="button"`, so it never submits a surrounding form by accident.
 */
export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
    >
      {children}
    </button>
  );
}

/** Navigation styled as a button, built on the router `Link`. */
export function ButtonLink({
  to,
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      {...rest}
      to={to}
      className={buttonClassName({ variant, size, fullWidth, className })}
    >
      {children}
    </Link>
  );
}
