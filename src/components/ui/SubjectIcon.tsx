import type { ReactElement } from 'react';
import type { SubjectIconName } from '../../data/subjects';
import './SubjectIcon.css';

export type SubjectIconProps = {
  name: SubjectIconName;
};

const iconPaths: Record<SubjectIconName, ReactElement> = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <rect x="8" y="6" width="8" height="3" rx="0.5" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" strokeWidth="2.4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5C4 4.1 5.1 3 6.5 3H11v16H6.5C5.1 19 4 20.1 4 21.5z" />
      <path d="M20 5.5C20 4.1 18.9 3 17.5 3H13v16h4.5c1.4 0 2.5 1.1 2.5 2.5z" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5" />
      <path d="M10.5 3v5.9L5.9 17.3A2.2 2.2 0 0 0 7.8 21h8.4a2.2 2.2 0 0 0 1.9-3.7L13.5 8.9V3" />
      <path d="M7.8 15h8.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5z" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 2-.9 2-1.9 0-.5-.2-.9-.5-1.2a1.7 1.7 0 0 1 1.3-2.8h1.4a4.3 4.3 0 0 0 4.3-4.3c0-3.7-3.8-6.8-8.5-6.8z" />
      <circle cx="7.8" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.4" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M12 20.3l-1.1-1C6.1 15 3.5 12.6 3.5 9.6 3.5 7 5.5 5 8 5c1.5 0 2.9.7 3.7 1.8l.3.4.3-.4C13.1 5.7 14.5 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3-2.6 5.4-7.4 9.7z" />
  ),
  leaf: (
    <>
      <path d="M20 4c0 9-5.4 13.5-11 13.5H5.5C5.5 9.9 10.6 4 20 4z" />
      <path d="M4.5 20c1.6-4.6 4.2-7.8 8.2-9.8" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9.5h3l5-4v13l-5-4H4z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18.2 6.5a7.8 7.8 0 0 1 0 11" />
    </>
  ),
};

/**
 * Small original line icons for subjects. Decorative only: the subject name is
 * always rendered as text beside it.
 */
export function SubjectIcon({ name }: SubjectIconProps) {
  return (
    <svg
      className="subject-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}
