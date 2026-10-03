import { Router } from './router/Router';
import { useRouter } from './router/routerContext';
import { matchRoute } from './router/routes';
import { HomePage } from './pages/HomePage';
import { ClassPage } from './pages/ClassPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './components/ui/Card.css';
import './components/ui/ClassCard.css';
import './components/ui/SubjectCard.css';
import './components/layout/Page.css';
import './components/layout/Header.css';
import './components/layout/Footer.css';
import './pages/HomePage.css';
import './pages/ClassPage.css';
import './pages/NotFoundPage.css';

function AppRoutes() {
  const { pathname } = useRouter();
  const route = matchRoute(pathname);

  if (route.name === 'class') {
    return <ClassPage classId={route.classId} />;
  }

  if (route.name === 'notFound') {
    return <NotFoundPage path={route.path} />;
  }

  return <HomePage />;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;