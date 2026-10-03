import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { getGradeById } from '../data/classes';
import { courseStatusLabels, getCourseById } from '../data/courses';
import { getSubjectBySlug } from '../data/subjects';
import { usePageTitle } from '../hooks/usePageTitle';
import { HOME_ROUTE, classPath, subjectPath } from '../router/routes';
import './CoursePage.css';

export type CoursePageProps = {
  /** Grade id taken from the route, for example `class1`. */
  classId: string;
  /** Subject slug taken from the route, for example `mathematics`. */
  subjectSlug: string;
  /** Course id taken from the route, for example `numbers-and-counting`. */
  courseId: string;
};

const CLASSES_ANCHOR = `${HOME_ROUTE}#classes`;

/**
 * Placeholder course page. It exists so every course card leads somewhere
 * useful; lesson and quiz lists are added in the next step of the
 * Class → Subject → Course → Lesson → Quiz path.
 */
export function CoursePage({ classId, subjectSlug, courseId }: CoursePageProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);
  const course =
    grade === undefined || subject === undefined
      ? undefined
      : getCourseById(grade.id, subject.slug, courseId);

  usePageTitle(course === undefined ? 'Course not found - Seekho' : `${course.title} - Seekho`);

  if (grade === undefined || subject === undefined || course === undefined) {
    return <CourseNotFound classId={classId} subjectSlug={subjectSlug} />;
  }

  const lessonLabel = `${course.lessonCount} ${course.lessonCount === 1 ? 'lesson' : 'lessons'}`;

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="course-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                { label: grade.name, to: classPath(grade.id) },
                { label: subject.name, to: subjectPath(grade.id, subject.slug) },
                { label: course.title },
              ]}
            />

            <BackLink to={subjectPath(grade.id, subject.slug)}>
              Back to {subject.name}
            </BackLink>

            <p className="course-hero-eyebrow">
              {course.stage} &middot; {subject.name}
            </p>
            <h1 className="course-hero-title">{course.title}</h1>
            <p className="course-hero-summary">{course.description}</p>

            <dl className="course-meta">
              <div className="course-meta-item">
                <dt className="course-meta-label">Class</dt>
                <dd className="course-meta-value">{grade.name}</dd>
              </div>
              <div className="course-meta-item">
                <dt className="course-meta-label">Level</dt>
                <dd className="course-meta-value">{course.level}</dd>
              </div>
              <div className="course-meta-item">
                <dt className="course-meta-label">Lessons</dt>
                <dd className="course-meta-value">{lessonLabel}</dd>
              </div>
              <div className="course-meta-item">
                <dt className="course-meta-label">Status</dt>
                <dd className="course-meta-value">{courseStatusLabels[course.status]}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section bg-light" aria-labelledby="course-coming-soon-title" tabIndex={-1}>
          <div className="container">
            <h2 id="course-coming-soon-title" className="section-title">
              Course coming soon
            </h2>
            <p className="section-subtitle">
              The {lessonLabel} and quizzes for this course are still being written
            </p>

            <div className="course-coming-soon">
              <p className="course-coming-soon-text">
                This page is a placeholder. When the lessons are ready they will be
                listed here in order, followed by a short quiz for each level of the
                course, so you can check what you understood.
              </p>
              <ul className="course-coming-soon-points">
                <li>Lesson list and progress tracking come first.</li>
                <li>Quizzes follow the lessons, one per level.</li>
                <li>Everything stays free and open to every student.</li>
              </ul>
              <BackLink to={subjectPath(grade.id, subject.slug)}>
                Back to {subject.name}
              </BackLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

type CourseNotFoundProps = Pick<CoursePageProps, 'classId' | 'subjectSlug'>;

function CourseNotFound({ classId, subjectSlug }: CourseNotFoundProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);

  // Each crumb is only rendered when the level above it exists, so an invalid
  // class or subject still produces a usable trail back.
  const gradeCrumb = grade === undefined ? null : { label: grade.name, to: classPath(grade.id) };
  const subjectCrumb =
    grade === undefined || subject === undefined
      ? null
      : { label: subject.name, to: subjectPath(grade.id, subject.slug) };

  const backTo = subjectCrumb?.to ?? gradeCrumb?.to ?? CLASSES_ANCHOR;
  const backLabel =
    subjectCrumb?.label !== undefined
      ? `Back to ${subjectCrumb.label}`
      : gradeCrumb !== null
        ? `Back to ${gradeCrumb.label}`
        : 'Back to Classes';

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="course-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                ...(gradeCrumb === null ? [] : [gradeCrumb]),
                ...(subjectCrumb === null ? [] : [subjectCrumb]),
                { label: 'Not found' },
              ]}
            />

            <BackLink to={backTo}>{backLabel}</BackLink>

            <h1 className="course-hero-title">Course not found</h1>
            <p className="course-hero-summary">
              We could not find that course. Open {backLabel.toLowerCase()} and
              choose one of the listed courses.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
