import { useRef, useState, type RefObject } from 'react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { BackLink } from '../components/ui/BackLink';
import { Link } from '../router/Link';
import { getGradeById } from '../data/classes';
import { getCourseById } from '../data/courses';
import { getLessonById } from '../data/lessons';
import {
  getQuestionsForQuiz,
  getQuizById,
  scoreQuiz,
  type Quiz,
  type QuizAnswers,
  type QuizQuestion,
} from '../data/quizzes';
import { getSubjectBySlug } from '../data/subjects';
import { usePageTitle } from '../hooks/usePageTitle';
import { HOME_ROUTE, classPath, coursePath, lessonPath, subjectPath } from '../router/routes';
import './QuizPage.css';

export type QuizPageProps = {
  /** Grade id taken from the route, for example `class1`. */
  classId: string;
  /** Subject slug taken from the route, for example `mathematics`. */
  subjectSlug: string;
  /** Course id taken from the route, for example `numbers-and-counting`. */
  courseId: string;
  /** Lesson id taken from the route, for example `lesson-1`. */
  lessonId: string;
  /** Quiz id taken from the route, for example `quiz-1`. */
  quizId: string;
};

const CLASSES_ANCHOR = `${HOME_ROUTE}#classes`;
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** Kid-friendly closing lines, picked from the percentage the learner scored. */
const RESULT_MESSAGES: { minPercentage: number; message: string }[] = [
  { minPercentage: 100, message: 'Perfect score. You counted every number correctly!' },
  { minPercentage: 60, message: 'Well done. Most of your answers were correct.' },
  { minPercentage: 1, message: 'Good try. Read the lesson once more, then try again.' },
  { minPercentage: 0, message: 'Let us count together once more, then try again.' },
];

function getResultMessage(percentage: number): string {
  const match = RESULT_MESSAGES.find((entry) => percentage >= entry.minPercentage);
  return match === undefined ? RESULT_MESSAGES[RESULT_MESSAGES.length - 1].message : match.message;
}

function getOptionLetter(index: number): string {
  return OPTION_LETTERS[index] ?? String(index + 1);
}

/**
 * A quiz only counts when it belongs to the lesson in the URL, so a mismatched
 * quiz/lesson pair falls through to the friendly "not found" page.
 */
function resolveQuiz(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
  quizId: string,
): Quiz | undefined {
  const quiz = getQuizById(classId, subjectSlug, courseId, quizId);
  return quiz?.lessonId === lessonId ? quiz : undefined;
}

/**
 * Quiz page for one lesson. Answers, current question and the final score live
 * in local React state only: nothing is stored, tracked or sent anywhere, and
 * a refresh simply starts the quiz again.
 */
export function QuizPage({ classId, subjectSlug, courseId, lessonId, quizId }: QuizPageProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);
  const course =
    grade === undefined || subject === undefined
      ? undefined
      : getCourseById(grade.id, subject.slug, courseId);
  const lesson =
    grade === undefined || subject === undefined || course === undefined
      ? undefined
      : getLessonById(grade.id, subject.slug, course.courseId, lessonId);
  const quiz =
    grade === undefined || subject === undefined || course === undefined
      ? undefined
      : resolveQuiz(grade.id, subject.slug, course.courseId, lessonId, quizId);

  usePageTitle(quiz === undefined ? 'Quiz not found - Seekho' : `${quiz.title} - Seekho`);

  if (
    grade === undefined ||
    subject === undefined ||
    course === undefined ||
    lesson === undefined ||
    quiz === undefined
  ) {
    return (
      <QuizNotFound
        classId={classId}
        subjectSlug={subjectSlug}
        courseId={courseId}
        lessonId={lessonId}
      />
    );
  }

  return (
    <QuizSession
      quiz={quiz}
      lessonTitle={lesson.title}
      backToLesson={lessonPath(grade.id, subject.slug, course.courseId, lesson.lessonId)}
      backToCourse={coursePath(grade.id, subject.slug, course.courseId)}
      backToSubject={subjectPath(grade.id, subject.slug)}
    />
  );
}

type QuizSessionProps = {
  quiz: Quiz;
  lessonTitle: string;
  backToLesson: string;
  backToCourse: string;
  backToSubject: string;
};

function QuizSession({
  quiz,
  lessonTitle,
  backToLesson,
  backToCourse,
  backToSubject,
}: QuizSessionProps) {
  const questions = getQuestionsForQuiz(quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const score = scoreQuiz(questions, answers);
  const isLastQuestion = currentIndex === questions.length - 1;
  const progressPercent =
    questions.length === 0 ? 0 : Math.round(((currentIndex + 1) / questions.length) * 100);
  const question = questions[currentIndex];

  function selectOption(questionId: string, optionId: string) {
    setAnswers((previous) => ({ ...previous, [questionId]: optionId }));
  }

  function moveToQuestion(index: number) {
    setCurrentIndex(index);
    // Moving the focus keeps keyboard and screen-reader users on the new
    // question instead of at the top of the page.
    requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function retry() {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function submit() {
    setIsSubmitted(true);
    requestAnimationFrame(() => resultHeadingRef.current?.focus());
  }

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="quiz-hero" tabIndex={-1}>
          <div className="container">
            <BackLink to={backToLesson}>Back to {lessonTitle}</BackLink>

            <p className="quiz-hero-eyebrow">
              Quiz &middot; {questions.length} {questions.length === 1 ? 'question' : 'questions'}
            </p>
            <h1 className="quiz-hero-title">{quiz.title}</h1>
            <p className="quiz-hero-summary">{quiz.description}</p>
          </div>
        </section>

        <section className="quiz-body" aria-labelledby="quiz-progress-title">
          <div className="container">
            <h2 id="quiz-progress-title" className="sr-only">
              Quiz progress
            </h2>

            {question === undefined ? (
              <QuizEmpty backToLesson={backToLesson} lessonTitle={lessonTitle} />
            ) : isSubmitted ? (
              <QuizResult
                questions={questions}
                answers={answers}
                correctCount={score.correctCount}
                total={score.total}
                percentage={score.percentage}
                headingRef={resultHeadingRef}
                onRetry={retry}
                backToLesson={backToLesson}
                backToCourse={backToCourse}
                backToSubject={backToSubject}
              />
            ) : (
              <div className="quiz-card">
                <div className="quiz-progress">
                  <p className="quiz-progress-label">
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                  <div
                    className="quiz-progress-track"
                    role="progressbar"
                    aria-label="Quiz progress"
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-valuenow={currentIndex + 1}
                    aria-valuetext={`Question ${currentIndex + 1} of ${questions.length}`}
                  >
                    <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                <h3 className="quiz-prompt" tabIndex={-1} ref={questionHeadingRef}>
                  {question.prompt}
                </h3>

                <fieldset className="quiz-options">
                  <legend className="sr-only">Choose one answer</legend>
                  {question.options.map((option, index) => {
                    const optionId = `${question.questionId}-${option.optionId}`;
                    const isSelected = answers[question.questionId] === option.optionId;

                    return (
                      <label
                        key={option.optionId}
                        htmlFor={optionId}
                        className={`quiz-option${isSelected ? ' quiz-option-selected' : ''}`}
                      >
                        <input
                          id={optionId}
                          className="quiz-option-input"
                          type="radio"
                          name={question.questionId}
                          value={option.optionId}
                          checked={isSelected}
                          onChange={() => selectOption(question.questionId, option.optionId)}
                        />
                        <span className="quiz-option-marker" aria-hidden="true">
                          {getOptionLetter(index)}
                        </span>
                        <span className="quiz-option-text">{option.text}</span>
                      </label>
                    );
                  })}
                </fieldset>

                <div className="quiz-actions">
                  <button
                    type="button"
                    className="quiz-button quiz-button-ghost"
                    onClick={() => moveToQuestion(currentIndex - 1)}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>

                  {isLastQuestion ? (
                    <button type="button" className="quiz-button quiz-button-primary" onClick={submit}>
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="quiz-button quiz-button-primary"
                      onClick={() => moveToQuestion(currentIndex + 1)}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

type QuizResultProps = {
  questions: QuizQuestion[];
  answers: QuizAnswers;
  correctCount: number;
  total: number;
  percentage: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRetry: () => void;
  backToLesson: string;
  backToCourse: string;
  backToSubject: string;
};

function QuizResult({
  questions,
  answers,
  correctCount,
  total,
  percentage,
  headingRef,
  onRetry,
  backToLesson,
  backToCourse,
  backToSubject,
}: QuizResultProps) {
  const unansweredCount = questions.filter(
    (question) => answers[question.questionId] === undefined,
  ).length;

  return (
    <div className="quiz-result">
      <div className="quiz-result-card">
        <p className="quiz-result-eyebrow">Quiz complete</p>
        <div
          className="quiz-result-score"
          role="img"
          aria-label={`Score: ${percentage} percent`}
        >
          {percentage}%
        </div>
        <h3 className="quiz-result-title" tabIndex={-1} ref={headingRef}>
          {correctCount} out of {total} correct
        </h3>
        <p className="quiz-result-message">{getResultMessage(percentage)}</p>
        {unansweredCount > 0 && (
          <p className="quiz-result-unanswered">
            You left {unansweredCount}{' '}
            {unansweredCount === 1 ? 'question' : 'questions'} unanswered.
          </p>
        )}

        <div className="quiz-result-actions">
          <button type="button" className="quiz-button quiz-button-primary" onClick={onRetry}>
            Retry Quiz
          </button>
          <Link to={backToLesson} className="quiz-button quiz-button-ghost">
            Back to Lesson
          </Link>
        </div>
      </div>

      <section className="quiz-review" aria-labelledby="quiz-review-title">
        <h3 id="quiz-review-title" className="quiz-review-title">
          Your answers
        </h3>
        <ol className="quiz-review-list">
          {questions.map((question, index) => {
            const chosenOptionId = answers[question.questionId];
            const chosenOption = question.options.find((option) => option.optionId === chosenOptionId);
            const correctOption = question.options.find(
              (option) => option.optionId === question.correctOptionId,
            );
            const isCorrect = chosenOptionId === question.correctOptionId;

            return (
              <li
                key={question.questionId}
                className={`quiz-review-item${isCorrect ? ' quiz-review-correct' : ' quiz-review-incorrect'}`}
              >
                <p className="quiz-review-prompt">
                  {index + 1}. {question.prompt}
                </p>
                <p className="quiz-review-answer">
                  Your answer: {chosenOption?.text ?? 'Not answered'}
                  {isCorrect ? '' : ` - Correct answer: ${correctOption?.text ?? ''}`}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <nav className="quiz-result-links" aria-label="Quiz next steps">
        <Link to={backToCourse} className="quiz-button quiz-button-ghost">
          Back to course
        </Link>
        <Link to={backToSubject} className="quiz-button quiz-button-ghost">
          Back to subject
        </Link>
      </nav>
    </div>
  );
}

type QuizEmptyProps = {
  backToLesson: string;
  lessonTitle: string;
};

/** Shown when a quiz exists but has no questions yet. */
function QuizEmpty({ backToLesson, lessonTitle }: QuizEmptyProps) {
  return (
    <div className="quiz-empty" role="status">
      <h3 className="quiz-empty-title">Questions coming soon</h3>
      <p className="quiz-empty-text">
        This quiz does not have any questions yet. Open {lessonTitle} and read it again, then
        come back when the questions are ready.
      </p>
      <Link to={backToLesson} className="quiz-button quiz-button-primary">
        Back to {lessonTitle}
      </Link>
    </div>
  );
}

type QuizNotFoundProps = Pick<QuizPageProps, 'classId' | 'subjectSlug' | 'courseId' | 'lessonId'>;

/**
 * Shown when any id in the URL is unknown. Each crumb is only rendered when the
 * level above it exists, so a bad quiz link still produces a usable way back.
 */
function QuizNotFound({ classId, subjectSlug, courseId, lessonId }: QuizNotFoundProps) {
  const grade = getGradeById(classId);
  const subject = grade === undefined ? undefined : getSubjectBySlug(grade.id, subjectSlug);
  const course =
    grade === undefined || subject === undefined
      ? undefined
      : getCourseById(grade.id, subject.slug, courseId);
  const lesson =
    grade === undefined || subject === undefined || course === undefined
      ? undefined
      : getLessonById(grade.id, subject.slug, course.courseId, lessonId);

  const gradeCrumb = grade === undefined ? null : { label: grade.name, to: classPath(grade.id) };
  const subjectCrumb =
    grade === undefined || subject === undefined
      ? null
      : { label: subject.name, to: subjectPath(grade.id, subject.slug) };
  const courseCrumb =
    grade === undefined || subject === undefined || course === undefined
      ? null
      : { label: course.title, to: coursePath(grade.id, subject.slug, courseId) };
  const lessonCrumb =
    grade === undefined || subject === undefined || course === undefined || lesson === undefined
      ? null
      : { label: lesson.title, to: lessonPath(grade.id, subject.slug, courseId, lessonId) };

  const backTo =
    lessonCrumb?.to ?? courseCrumb?.to ?? subjectCrumb?.to ?? gradeCrumb?.to ?? CLASSES_ANCHOR;
  const backLabel =
    lessonCrumb !== null
      ? `Back to ${lessonCrumb.label}`
      : courseCrumb !== null
        ? `Back to ${courseCrumb.label}`
        : subjectCrumb !== null
          ? `Back to ${subjectCrumb.label}`
          : gradeCrumb !== null
            ? `Back to ${gradeCrumb.label}`
            : 'Back to Classes';

  return (
    <>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        <section className="quiz-hero" tabIndex={-1}>
          <div className="container">
            <Breadcrumbs
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Classes', to: CLASSES_ANCHOR },
                ...(gradeCrumb === null ? [] : [gradeCrumb]),
                ...(subjectCrumb === null ? [] : [subjectCrumb]),
                ...(courseCrumb === null ? [] : [courseCrumb]),
                ...(lessonCrumb === null ? [] : [lessonCrumb]),
                { label: 'Not found' },
              ]}
            />

            <BackLink to={backTo}>{backLabel}</BackLink>

            <h1 className="quiz-hero-title">Quiz not found</h1>
            <p className="quiz-hero-summary">
              We could not find that quiz. {backLabel} and choose a quiz from the lesson.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}