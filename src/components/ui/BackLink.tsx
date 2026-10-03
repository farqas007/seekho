import type { ReactNode } from 'react';
import { Link } from '../../router/Link';
import './BackLink.css';

export type BackLinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

/** Reusable "go back" navigation built on the router Link. */
export function BackLink({ to, children, className = '' }: BackLinkProps) {
  return (
    <Link to={to} className={`back-link ${className}`}>
      <svg
        className="back-link-arrow"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M15 5l-7 7 7 7" />
      </svg>
      <span>{children}</span>
    </Link>
  );
}
