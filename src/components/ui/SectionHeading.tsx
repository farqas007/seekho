import type { ReactNode } from 'react';
import './SectionHeading.css';

export type SectionHeadingProps = {
  title: ReactNode;
  /** Short label above the title, e.g. "Step 2". */
  eyebrow?: string;
  description?: ReactNode;
  /** Trailing slot for a button or link, e.g. a "Back to classes" link. */
  actions?: ReactNode;
  align?: 'start' | 'center';
  /** Heading level, so a page outline stays in order. Defaults to `h2`. */
  level?: 2 | 3;
  className?: string;
};

/** Title block for a page section: optional eyebrow, description and actions. */
export function SectionHeading({
  title,
  eyebrow,
  description,
  actions,
  align = 'start',
  level = 2,
  className = '',
}: SectionHeadingProps) {
  const Heading = level === 3 ? 'h3' : 'h2';

  return (
    <div className={`section-heading section-heading-${align} ${className}`}>
      <div className="section-heading-text">
        {eyebrow !== undefined && <p className="section-heading-eyebrow">{eyebrow}</p>}
        <Heading className="section-heading-title">{title}</Heading>
        {description !== undefined && (
          <p className="section-heading-description">{description}</p>
        )}
      </div>
      {actions !== undefined && <div className="section-heading-actions">{actions}</div>}
    </div>
  );
}
