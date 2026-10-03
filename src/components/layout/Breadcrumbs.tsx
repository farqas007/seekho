import { Link } from '../../router/Link';
import './Breadcrumbs.css';

export type Crumb = {
  label: string;
  /** Omit on the current page so it renders as plain text. */
  to?: string;
};

export type BreadcrumbsProps = {
  items: readonly Crumb[];
  label?: string;
};

export function Breadcrumbs({ items, label = 'Breadcrumb' }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label={label}>
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label} className="breadcrumb-item">
              {item.to !== undefined && !isCurrent ? (
                <Link to={item.to} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current={isCurrent ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {isCurrent ? null : (
                <span className="breadcrumb-separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
