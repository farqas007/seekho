import { Link } from '../../router/Link';
import { HOME_ROUTE } from '../../router/routes';
import { useRouter } from '../../router/routerContext';
import './Header.css';

const navItems = [
  { label: 'Home', to: HOME_ROUTE },
  { label: 'Classes', to: `${HOME_ROUTE}#classes` },
  { label: 'Subjects', to: `${HOME_ROUTE}#subjects` },
  { label: 'Courses', to: `${HOME_ROUTE}#courses` },
  { label: 'Learning', to: `${HOME_ROUTE}#learning` },
] as const;

export function Header() {
  const { pathname } = useRouter();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={HOME_ROUTE} className="logo-link">
            <span className="logo-text">Seekho</span>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="nav-link"
                  aria-current={pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
