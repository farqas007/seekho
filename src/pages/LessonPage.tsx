import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { getGradeById } from '../data/classes';
import { getCourseById } from '../data/courses';
import { getLessonById, getLessonsForCourse, getNextLesson, getPreviousLesson } from '../data/lessons';
import { getQuizForLesson, hasQuestions } from '../data/quizzes';
import { getSubjectBySlug } from '../data/subjects';
import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from '../router/Link';
import {
  HOME_ROUTE,
  classPath,
  coursePath,
  lessonPath,
  quizPath,
  subjectPath,
} from '../router/routes';
import './LessonPage.css';

export type LessonPageProps = {
  classId: string;
  subjectSlug: string;
  courseId: string;
  lessonId: string;
};

const CLASSES_ANCHOR = `${HOME_ROUTE}#classes`;

/**
 * Lesson page showing original lesson content with clear sections.
 * Structure is progress-ready for future completion/progress features.
 */
export function LessonPage({ classId, subjectSlug, courseId, lessonId }: LessonPageProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);
  const course =
    grade === undefined || subject === undefined
      ? undefined
      : getCourseById(grade.id, subject.slug, courseId);

  const lessons = getLessonsForCourse(classId, subjectSlug, courseId);
  const lesson = getLessonById(classId, subjectSlug, courseId, lessonId);
  const previousLesson = lesson === undefined ? undefined : getPreviousLesson(lessons, lesson.lessonId);
  const nextLesson = lesson === undefined ? undefined : getNextLesson(lessons, lesson.lessonId);

  usePageTitle(
    lesson === undefined ? 'Lesson not found - Seekho' : `${lesson.title} - Seekho`,
  );

  if (grade === undefined || subject === undefined || course === undefined || lesson === undefined) {
    return <LessonNotFound classId={classId} subjectSlug={subjectSlug} courseId={courseId} />;
  }

  const { content } = lesson;

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="lesson-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                { label: grade.name, to: classPath(grade.id) },
                { label: subject.name, to: subjectPath(grade.id, subject.slug) },
                { label: course.title, to: coursePath(grade.id, subject.slug, courseId) },
                { label: lesson.title },
              ]}
            />

            <BackLink to={coursePath(grade.id, subject.slug, courseId)}>
              Back to {course.title}
            </BackLink>

            <p className="lesson-hero-eyebrow">
              Lesson {lesson.order} &middot; {lesson.estimatedMinutes} min
            </p>
            <h1 className="lesson-hero-title">{lesson.title}</h1>
            <p className="lesson-hero-summary">{lesson.summary}</p>
          </div>
        </section>

        <section className="lesson-content" aria-labelledby="lesson-content-title">
          <div className="container">
            <h2 id="lesson-content-title" className="sr-only">
              Lesson content
            </h2>

            {content.intro && (
              <article className="lesson-block" aria-labelledby="intro-heading">
                <h3 id="intro-heading" className="lesson-block-title">
                  {content.intro.title ?? 'Introduction'}
                </h3>
                {(content.intro.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.intro.list && content.intro.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.intro.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            {content.keyPoints && (
              <article className="lesson-block" aria-labelledby="keypoints-heading">
                <h3 id="keypoints-heading" className="lesson-block-title">
                  {content.keyPoints.title ?? 'Key Points'}
                </h3>
                {(content.keyPoints.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.keyPoints.list && content.keyPoints.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.keyPoints.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            {content.explanation && (
              <article className="lesson-block" aria-labelledby="explanation-heading">
                <h3 id="explanation-heading" className="lesson-block-title">
                  {content.explanation.title ?? 'Explanation'}
                </h3>
                {(content.explanation.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.explanation.list && content.explanation.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.explanation.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            {content.example && (
              <article className="lesson-block" aria-labelledby="example-heading">
                <h3 id="example-heading" className="lesson-block-title">
                  {content.example.title ?? 'Example'}
                </h3>
                {(content.example.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.example.list && content.example.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.example.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            {content.practice && (
              <article className="lesson-block" aria-labelledby="practice-heading">
                <h3 id="practice-heading" className="lesson-block-title">
                  {content.practice.title ?? 'Practice'}
                </h3>
                {(content.practice.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.practice.list && content.practice.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.practice.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            {content.recap && (
              <article className="lesson-block" aria-labelledby="recap-heading">
                <h3 id="recap-heading" className="lesson-block-title">
                  {content.recap.title ?? 'Recap'}
                </h3>
                {(content.recap.content ?? []).map((line, index) => (
                  <p key={index} className="lesson-block-text">
                    {line}
                  </p>
                ))}
                {content.recap.list && content.recap.list.length > 0 && (
                  <ul className="lesson-block-list">
                    {content.recap.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            )}

            <QuizCallout
              classId={grade.id}
              subjectSlug={subject.slug}
              courseId={course.courseId}
              lessonId={lesson.lessonId}
            />
          </div>
        </section>

        <section className="lesson-navigation" aria-label="Lesson navigation">
          <div className="container">
            <div className="lesson-nav-grid">
              <div className="lesson-nav-item lesson-nav-prev">
                {previousLesson ? (
                  <a
                    href={lessonPath(
                      grade.id,
                      subject.slug,
                      courseId,
                      previousLesson.lessonId,
                    )}
                    className="lesson-nav-link"
                  >
                    <span className="lesson-nav-label">Previous lesson</span>
                    <span className="lesson-nav-title">← {previousLesson.title}</span>
                  </a>
                ) : (
                  <span className="lesson-nav-placeholder" aria-hidden="true">
                    Previous lesson
                  </span>
                )}
              </div>
              <div className="lesson-nav-item lesson-nav-course">
                <a
                  href={coursePath(grade.id, subject.slug, courseId)}
                  className="lesson-nav-link lesson-nav-link-center"
                >
                  <span className="lesson-nav-label">Back to course</span>
                  <span className="lesson-nav-title">{course.title}</span>
                </a>
              </div>
              <div className="lesson-nav-item lesson-nav-next">
                {nextLesson ? (
                  <a
                    href={lessonPath(
                      grade.id,
                      subject.slug,
                      courseId,
                      nextLesson.lessonId,
                    )}
                    className="lesson-nav-link lesson-nav-link-next"
                  >
                    <span className="lesson-nav-label">Next lesson</span>
                    <span className="lesson-nav-title">{nextLesson.title} →</span>
                  </a>
                ) : (
                  <span className="lesson-nav-placeholder lesson-nav-placeholder-next" aria-hidden="true">
                    Next lesson
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

type QuizCalloutProps = {
  classId: string;
  subjectSlug: string;
  courseId: string;
  lessonId: string;
};

/**
 * Closing block of a lesson: a clear "Start Quiz" entry point when the lesson
 * has a quiz ready, otherwise a short note about what comes next.
 */
function QuizCallout({ classId, subjectSlug, courseId, lessonId }: QuizCalloutProps) {
  const quiz = getQuizForLesson(classId, subjectSlug, courseId, lessonId);

  return (
    <article className="lesson-block lesson-next-info" aria-labelledby="whats-next-heading">
      <h3 id="whats-next-heading" className="lesson-block-title">
        What comes next?
      </h3>

      {quiz === undefined ? (
        <p className="lesson-block-text">
          A quiz for this lesson is coming soon. In the meantime, read the recap above and try
          the practice activity once more.
        </p>
      ) : (
        <>
          <p className="lesson-block-text">
            Ready to check what you remember? Take the short quiz for this lesson - it has{' '}
            {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}.
          </p>
          <Link
            to={quizPath(classId, subjectSlug, courseId, lessonId, quiz.quizId)}
            className="lesson-quiz-cta"
          >
            {hasQuestions(quiz) ? 'Start Quiz' : 'View quiz'}
          </Link>
        </>
      )}
    </article>
  );
}

type LessonNotFoundProps = Pick<LessonPageProps, 'classId' | 'subjectSlug' | 'courseId'>;

function LessonNotFound({ classId, subjectSlug, courseId }: LessonNotFoundProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);
  const course =
    grade === undefined || subject === undefined
      ? undefined
      : getCourseById(grade.id, subject.slug, courseId);

  const gradeCrumb = grade === undefined ? null : { label: grade.name, to: classPath(grade.id) };
  const subjectCrumb =
    grade === undefined || subject === undefined
      ? null
      : { label: subject.name, to: subjectPath(grade.id, subject.slug) };
  const courseCrumb =
    grade === undefined || subject === undefined || course === undefined
      ? null
      : { label: course.title, to: coursePath(grade.id, subject.slug, courseId) };

  const backTo = courseCrumb?.to ?? subjectCrumb?.to ?? gradeCrumb?.to ?? CLASSES_ANCHOR;
  const backLabel =
    courseCrumb?.label !== undefined
      ? `Back to ${courseCrumb.label}`
      : subjectCrumb?.label !== undefined
        ? `Back to ${subjectCrumb.label}`
        : gradeCrumb !== null
          ? `Back to ${gradeCrumb.label}`
          : 'Back to Classes';

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="lesson-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                ...(gradeCrumb === null ? [] : [gradeCrumb]),
                ...(subjectCrumb === null ? [] : [subjectCrumb]),
                ...(courseCrumb === null ? [] : [courseCrumb]),
                { label: 'Not found' },
              ]}
            />

            <BackLink to={backTo}>{backLabel}</BackLink>

            <h1 className="lesson-hero-title">Lesson not found</h1>
            <p className="lesson-hero-summary">
              We could not find that lesson. Open {backLabel.toLowerCase()} and choose
              one of the listed lessons.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
