import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { CourseGrid } from '../components/ui/CourseGrid';
import { SubjectIcon } from '../components/ui/SubjectIcon';
import { getGradeById } from '../data/classes';
import { getCoursesForSubject } from '../data/courses';
import { getSubjectBySlug, subjectAreaLabels } from '../data/subjects';
import { usePageTitle } from '../hooks/usePageTitle';
import { HOME_ROUTE, classPath } from '../router/routes';
import './SubjectPage.css';

export type SubjectPageProps = {
  /** Grade id taken from the route, for example `class1`. */
  classId: string;
  /** Subject slug taken from the route, for example `mathematics`. */
  subjectSlug: string;
};

const CLASSES_ANCHOR = `${HOME_ROUTE}#classes`;

export function SubjectPage({ classId, subjectSlug }: SubjectPageProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);

  usePageTitle(
    grade === undefined || subject === undefined
      ? 'Subject not found - Seekho'
      : `${subject.name} - ${grade.name} - Seekho`,
  );

  if (grade === undefined || subject === undefined) {
    return <SubjectNotFound classId={classId} subjectSlug={subjectSlug} />;
  }

  const courses = getCoursesForSubject(grade.id, subject.slug);
  const lessonTotal = courses.reduce((total, course) => total + course.lessonCount, 0);

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="subject-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                { label: grade.name, to: classPath(grade.id) },
                { label: subject.name },
              ]}
            />

            <BackLink to={classPath(grade.id)}>Back to {grade.name}</BackLink>

            <div className="subject-hero-head">
              <span className="subject-hero-icon" aria-hidden="true">
                <SubjectIcon name={subject.icon} />
              </span>

              <div className="subject-hero-text">
                <p className="subject-hero-eyebrow">
                  <span className="subject-hero-class">{grade.name}</span>
                  <span className="subject-hero-dot" aria-hidden="true">
                    &middot;
                  </span>
                  <span>{subjectAreaLabels[subject.area]}</span>
                </p>
                <h1 className="subject-hero-title">{subject.name}</h1>
                <p className="subject-hero-desc">{subject.description}</p>
              </div>
            </div>

            <dl className="subject-meta">
              <div className="subject-meta-item">
                <dt className="subject-meta-label">Class</dt>
                <dd className="subject-meta-value">{grade.name}</dd>
              </div>
              <div className="subject-meta-item">
                <dt className="subject-meta-label">Stage</dt>
                <dd className="subject-meta-value">{grade.stage}</dd>
              </div>
              <div className="subject-meta-item">
                <dt className="subject-meta-label">Courses</dt>
                <dd className="subject-meta-value">{courses.length}</dd>
              </div>
              <div className="subject-meta-item">
                <dt className="subject-meta-label">Lessons planned</dt>
                <dd className="subject-meta-value">{lessonTotal}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section bg-light" aria-labelledby="subject-intro-title" tabIndex={-1}>
          <div className="container">
            <h2 id="subject-intro-title" className="section-title">
              About this subject
            </h2>
            <div className="subject-intro">
              <p className="subject-intro-text">
                Each course below is a short, focused path: it starts with the
                simplest idea, adds practice on top, and finishes with a project
                that uses what was learnt. Lessons and quizzes arrive with the
                courses themselves.
              </p>
              <ul className="subject-intro-points">
                <li>Short lessons that fit into a normal study routine.</li>
                <li>Quizzes planned for each course to check understanding.</li>
                <li>Original explanations written for each stage of learning.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="subject-courses-title" tabIndex={-1}>
          <div className="container">
            <h2 id="subject-courses-title" className="section-title">
              Courses in {subject.name}
            </h2>
            <p className="section-subtitle">
              Pick a course to see its lessons and quizzes
            </p>

            <CourseGrid classId={grade.id} courses={courses} />
          </div>
        </section>

        <section className="subject-next-step">
          <div className="container">
            <h2 className="subject-next-title">What comes next?</h2>
            <p className="subject-next-text">
              Every course links to its own page. Lesson pages and quizzes are
              still being written, so a course page currently shows what to
              expect.
            </p>
            <BackLink to={classPath(grade.id)}>Back to {grade.name}</BackLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function SubjectNotFound({ classId, subjectSlug }: SubjectPageProps) {
  const grade = getGradeById(classId);
  const backTo = grade === undefined ? CLASSES_ANCHOR : classPath(grade.id);
  const backLabel = grade === undefined ? 'Back to Classes' : `Back to ${grade.name}`;

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="subject-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                ...(grade === undefined
                  ? []
                  : [{ label: grade.name, to: classPath(grade.id) }]),
                { label: 'Not found' },
              ]}
            />

            <BackLink to={backTo}>{backLabel}</BackLink>

            <h1 className="subject-hero-title">Subject not found</h1>
            <p className="subject-hero-desc">
              We could not find that subject
              {grade === undefined ? '' : ` in ${grade.name}`} (
              <code>{subjectSlug}</code>). Pick a subject from the class page to
              see its courses.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
