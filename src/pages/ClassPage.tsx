import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { SubjectCard } from '../components/ui/SubjectCard';
import { getGradeById } from '../data/classes';
import { getSubjectsForGrade } from '../data/subjects';
import { usePageTitle } from '../hooks/usePageTitle';
import { HOME_ROUTE, subjectPath } from '../router/routes';
import './ClassPage.css';

export type ClassPageProps = {
  /** Grade id taken from the route, for example `class1`. */
  classId: string;
};

const CLASSES_ANCHOR = `${HOME_ROUTE}#classes`;

export function ClassPage({ classId }: ClassPageProps) {
  const grade = getGradeById(classId);

  usePageTitle(grade === undefined ? 'Class not found - Seekho' : `${grade.name} - Seekho`);

  if (grade === undefined) {
    return <ClassNotFound />;
  }

  const subjects = getSubjectsForGrade(grade.id);

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="class-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                { label: grade.name },
              ]}
            />

            <BackLink to={CLASSES_ANCHOR}>Back to Classes</BackLink>

            <p className="class-hero-eyebrow">{grade.stage}</p>
            <h1 className="class-hero-title">{grade.name}</h1>
            <p className="class-hero-tagline">{grade.description}</p>
            <p className="class-hero-summary">{grade.summary}</p>

            <dl className="class-meta">
              <div className="class-meta-item">
                <dt className="class-meta-label">Subjects</dt>
                <dd className="class-meta-value">{subjects.length}</dd>
              </div>
              <div className="class-meta-item">
                <dt className="class-meta-label">Stage</dt>
                <dd className="class-meta-value">{grade.stage}</dd>
              </div>
              <div className="class-meta-item">
                <dt className="class-meta-label">Level</dt>
                <dd className="class-meta-value">
                  {grade.stage === 'Pre-Primary'
                    ? 'Early years'
                    : grade.stage === 'Secondary'
                      ? 'Board preparation'
                      : grade.stage}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="class-subjects-title" tabIndex={-1}>
          <div className="container">
            <h2 id="class-subjects-title" className="section-title">
              Subjects in {grade.name}
            </h2>
            <p className="section-subtitle">
              Pick a subject to see its courses, lessons and quizzes
            </p>

            <ul className="subjects-grid">
              {subjects.map((subject) => (
                <li key={subject.id} className="subjects-grid-item">
                  <SubjectCard
                    subject={subject}
                    href={subjectPath(grade.id, subject.slug)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="class-next-step">
          <div className="container">
            <h2 className="class-next-title">What comes next?</h2>
            <p className="class-next-text">
              Every subject has a page with its own courses. A course lists its
              lessons, and each lesson finishes with a short quiz.
            </p>
            <BackLink to={CLASSES_ANCHOR}>Back to Classes</BackLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ClassNotFound() {
  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="class-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Classes', to: CLASSES_ANCHOR }, { label: 'Not found' }]}
            />

            <BackLink to={CLASSES_ANCHOR}>Back to Classes</BackLink>

            <h1 className="class-hero-title">Class not found</h1>
            <p className="class-hero-summary">
              We could not find that class. Pick a class from the list to see
              its subjects.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
