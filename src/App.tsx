import { Router } from './router/Router';
import { useRouter } from './router/routerContext';
import { matchRoute } from './router/routes';
import { HomePage } from './pages/HomePage';
import { ClassPage } from './pages/ClassPage';
import { SubjectPage } from './pages/SubjectPage';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './components/ui/Card.css';
import './components/ui/ClassCard.css';
import './components/ui/SubjectCard.css';
import './components/ui/CourseCard.css';
import './components/course/LessonList.css';
import './components/layout/Page.css';
import './components/layout/Header.css';
import './components/layout/Footer.css';
import './pages/HomePage.css';
import './pages/ClassPage.css';
import './pages/SubjectPage.css';
import './pages/CoursePage.css';
import './pages/LessonPage.css';
import './pages/QuizPage.css';
import './pages/NotFoundPage.css';

function AppRoutes() {
  const { pathname } = useRouter();
  const route = matchRoute(pathname);

  if (route.name === 'class') {
    return <ClassPage classId={route.classId} />;
  }

  if (route.name === 'subject') {
    return <SubjectPage classId={route.classId} subjectSlug={route.subjectSlug} />;
  }

  if (route.name === 'course') {
    return (
      <CoursePage
        classId={route.classId}
        subjectSlug={route.subjectSlug}
        courseId={route.courseId}
      />
    );
  }

  if (route.name === 'lesson') {
    return (
      <LessonPage
        classId={route.classId}
        subjectSlug={route.subjectSlug}
        courseId={route.courseId}
        lessonId={route.lessonId}
      />
    );
  }

  if (route.name === 'quiz') {
    return (
      <QuizPage
        classId={route.classId}
        subjectSlug={route.subjectSlug}
        courseId={route.courseId}
        lessonId={route.lessonId}
        quizId={route.quizId}
      />
    );
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
