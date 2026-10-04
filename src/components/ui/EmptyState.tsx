import type { ReactNode } from 'react';
import './EmptyState.css';

export type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  /** Optional actions, usually a `Button` or `ButtonLink`. */
  children?: ReactNode;
  className?: string;
};

/**
 * Placeholder for a list with nothing in it yet, such as courses that are still
 * coming soon. Every part is optional, so a caller can show a single line of
 * copy or a full message with an action.
 */
export function EmptyState({ title, description, children, className = '' }: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      {title !== undefined && <p className="empty-state-title">{title}</p>}
      {description !== undefined && (
        <p className="empty-state-description">{description}</p>
      )}
      {children !== undefined && <div className="empty-state-actions">{children}</div>}
    </div>
  );
}
