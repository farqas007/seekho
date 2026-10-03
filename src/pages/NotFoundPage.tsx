import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from '../router/Link';
import { HOME_ROUTE } from '../router/routes';
import './NotFoundPage.css';

export type NotFoundPageProps = {
  /** The unmatched path, shown so the visitor knows what was requested. */
  path: string;
};

export function NotFoundPage({ path }: NotFoundPageProps) {
  usePageTitle('Page not found - Seekho');

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="not-found" tabIndex={-1}>
          <div className="container">
            <p className="not-found-code">404</p>
            <h1 className="not-found-title">Page not found</h1>
            <p className="not-found-text">
              We could not open <code>{path}</code>. Start from the class list to
              keep learning.
            </p>
            <div className="not-found-actions">
              <BackLink to={`${HOME_ROUTE}#classes`}>Back to Classes</BackLink>
              <Link to={HOME_ROUTE} className="not-found-home-link">
                Go to homepage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
