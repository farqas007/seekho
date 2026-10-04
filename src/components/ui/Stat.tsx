import type { ReactNode } from 'react';
import './Stat.css';

export type StatProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

/**
 * One label/value pair, such as a course level or lesson count. Renders `dt`
 * and `dd`, so it must sit inside a `StatRow`.
 */
export function Stat({ label, value, className = '' }: StatProps) {
  return (
    <div className={`stat ${className}`}>
      <dt className="stat-label">{label}</dt>
      <dd className="stat-value">{value}</dd>
    </div>
  );
}

export type StatRowProps = {
  children: ReactNode;
  className?: string;
};

/** Definition list of `Stat` items. Borders and spacing stay with the caller. */
export function StatRow({ children, className = '' }: StatRowProps) {
  return (
    <dl className={`stat-row ${className}`}>{children}</dl>
  );
}
