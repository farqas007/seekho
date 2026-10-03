import { renderToString } from 'react-dom/server';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { LessonPage } from '../src/pages/LessonPage';
import { QuizPage } from '../src/pages/QuizPage';
import { Router } from '../src/router/Router';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'numbers-and-counting';
const LESSON_ID = 'lesson-1';
const QUIZ_ID = 'quiz-1';

/**
 * The router reads `window` while rendering, so the smallest possible browser
 * stand-in is set up before each render. Effects never run in this mode, which
 * is enough to check what a page shows for a given set of ids.
 */
function renderPage(pathname: string, page: ReactElement) {
  const globals = globalThis as unknown as Record<string, unknown>;
  globals.window = {
    location: { pathname, hash: '', origin: 'http://localhost' },
    history: { pushState() {}, replaceState() {} },
    addEventListener() {},
    removeEventListener() {},
    scrollTo() {},
  };
  globals.document = { title: '', getElementById: () => null };

  return renderToString(<Router>{page}</Router>);
}

const QUIZ_URL = `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${LESSON_ID}/quiz/${QUIZ_ID}`;
const LESSON_URL = `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${LESSON_ID}`;

describe('QuizPage rendering', () => {
  it('shows the quiz title, first question and its options', () => {
    const html = renderPage(
      QUIZ_URL,
      <QuizPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
        quizId={QUIZ_ID}
      />,
    );

    expect(html).toContain('Counting from 0 to 9 - Quiz');
    expect(html).toContain('Question 1 of 5');
    expect(html).toContain('Which number comes just after 3?');
    expect(html).toContain('type="radio"');
    expect(html).toContain('Next');
  });

  it('never reveals the correct answer before the quiz is submitted', () => {
    const html = renderPage(
      QUIZ_URL,
      <QuizPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
        quizId={QUIZ_ID}
      />,
    );

    expect(html).not.toContain('Correct answer');
    expect(html).not.toContain('quiz-review');
    expect(html).not.toContain('quiz-result');
    expect(html).not.toContain('Submit Quiz');
  });

  it('offers a way back to the lesson', () => {
    const html = renderPage(
      QUIZ_URL,
      <QuizPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
        quizId={QUIZ_ID}
      />,
    );

    expect(html).toContain(`href="${LESSON_URL}"`);
  });

  it('shows a friendly message for an unknown quiz', () => {
    const html = renderPage(
      `${QUIZ_URL.replace(QUIZ_ID, 'quiz-404')}`,
      <QuizPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
        quizId="quiz-404"
      />,
    );

    expect(html).toContain('Quiz not found');
    expect(html).toContain(`href="${LESSON_URL}"`);
  });

  it('shows a friendly message when the quiz belongs to another lesson', () => {
    const html = renderPage(
      QUIZ_URL,
      <QuizPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId="lesson-2"
        quizId={QUIZ_ID}
      />,
    );

    expect(html).toContain('Quiz not found');
  });

  it('shows a friendly message when the class, subject or course is unknown', () => {
    const html = renderPage(
      QUIZ_URL,
      <QuizPage
        classId="class99"
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
        quizId={QUIZ_ID}
      />,
    );

    expect(html).toContain('Quiz not found');
    expect(html).toContain('Back to Classes');
  });
});

describe('LessonPage rendering', () => {
  it('links to the quiz of the lesson', () => {
    const html = renderPage(
      LESSON_URL,
      <LessonPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId={LESSON_ID}
      />,
    );

    expect(html).toContain('Start Quiz');
    expect(html).toContain(`href="${QUIZ_URL}"`);
  });

  it('points learners to a coming soon note when a lesson has no quiz', () => {
    const html = renderPage(
      LESSON_URL.replace(LESSON_ID, 'lesson-2'),
      <LessonPage
        classId={CLASS_ID}
        subjectSlug={SUBJECT_SLUG}
        courseId={COURSE_ID}
        lessonId="lesson-2"
      />,
    );

    expect(html).toContain('A quiz for this lesson is coming soon');
    expect(html).not.toContain('Start Quiz');
  });
});