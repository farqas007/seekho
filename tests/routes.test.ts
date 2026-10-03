import { describe, expect, it } from 'vitest';
import {
  HOME_ROUTE,
  classPath,
  coursePath,
  lessonPath,
  matchRoute,
  quizPath,
  subjectPath,
} from '../src/router/routes';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'numbers-and-counting';
const LESSON_ID = 'lesson-1';
const QUIZ_ID = 'quiz-1';

describe('route matching', () => {
  it('matches the learning path from home to quiz', () => {
    expect(matchRoute(HOME_ROUTE)).toEqual({ name: 'home' });
    expect(matchRoute(classPath(CLASS_ID))).toEqual({ name: 'class', classId: CLASS_ID });
    expect(matchRoute(subjectPath(CLASS_ID, SUBJECT_SLUG))).toEqual({
      name: 'subject',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
    });
    expect(matchRoute(coursePath(CLASS_ID, SUBJECT_SLUG, COURSE_ID))).toEqual({
      name: 'course',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
    });
    expect(matchRoute(lessonPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID))).toEqual({
      name: 'lesson',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
      lessonId: LESSON_ID,
    });
    expect(matchRoute(quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID, QUIZ_ID))).toEqual({
      name: 'quiz',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
      lessonId: LESSON_ID,
      quizId: QUIZ_ID,
    });
  });

  it('builds the documented quiz URL', () => {
    expect(quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID, QUIZ_ID)).toBe(
      `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${LESSON_ID}/quiz/${QUIZ_ID}`,
    );
  });

  it('encodes ids with unusual characters', () => {
    const path = quizPath(CLASS_ID, SUBJECT_SLUG, 'course one', LESSON_ID, 'quiz/1');

    expect(path).toContain('course/course%20one');
    expect(path).toContain('quiz/quiz%2F1');
    expect(matchRoute(path)).toEqual({
      name: 'quiz',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: 'course one',
      lessonId: LESSON_ID,
      quizId: 'quiz/1',
    });
  });

  it('ignores a trailing slash', () => {
    const path = `${quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID, QUIZ_ID)}/`;

    expect(matchRoute(path)).toMatchObject({ name: 'quiz', quizId: QUIZ_ID });
  });

  it('rejects quiz URLs with a missing or extra segment', () => {
    const base = `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${LESSON_ID}`;

    expect(matchRoute(`${base}/quiz`)).toEqual({ name: 'notFound', path: `${base}/quiz` });
    expect(matchRoute(`${base}/quiz/${QUIZ_ID}/extra`)).toEqual({
      name: 'notFound',
      path: `${base}/quiz/${QUIZ_ID}/extra`,
    });
    expect(matchRoute(`${base}/answers/${QUIZ_ID}`)).toEqual({
      name: 'notFound',
      path: `${base}/answers/${QUIZ_ID}`,
    });
  });

  it('rejects a quiz segment in the wrong position', () => {
    const path = `/class/${CLASS_ID}/quiz/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${LESSON_ID}/${QUIZ_ID}`;

    expect(matchRoute(path)).toEqual({ name: 'notFound', path });
  });

  it('still reports unknown top-level paths as not found', () => {
    expect(matchRoute('/quiz/quiz-1')).toEqual({ name: 'notFound', path: '/quiz/quiz-1' });
  });
});