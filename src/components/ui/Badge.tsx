import type { ReactNode } from 'react';
import './Badge.css';

/** `brand` marks the main subject, the rest carry status or category. */
export type BadgeVariant = 'brand' | 'neutral' | 'success' | 'warning';

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

/** Short label for a status, category or stage, such as a course stage. */
export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}
