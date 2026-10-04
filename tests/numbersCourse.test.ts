import { describe, expect, it } from 'vitest';
import { getLessonById, getLessonsForCourse } from '../src/data/lessons';
import {
  getQuizById,
  getQuizForLesson,
  getQuestionsForQuiz,
} from '../src/data/quizzes';
import { matchRoute, quizPath } from '../src/router/routes';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'numbers-and-counting';

const EXISTING_LESSON_1 = 'lesson-1';
const EXISTING_QUIZ_1 = 'quiz-1';

const NEW_LESSONS = ['lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6', 'lesson-7'] as const;

describe('Numbers Made Simple course expansion', () => {
  it('all new lessons belong to numbers-and-counting', () => {
    for (const lessonId of NEW_LESSONS) {
      const lesson = getLessonById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      expect(lesson).toBeDefined();
      expect(lesson?.courseId).toBe(COURSE_ID);
      expect(lesson?.classId).toBe(CLASS_ID);
      expect(lesson?.subjectSlug).toBe(SUBJECT_SLUG);
    }
  });

  it('lesson ordering is correct', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);
    expect(lessons.length).toBeGreaterThanOrEqual(7);
    expect(lessons[0]?.lessonId).toBe('lesson-1');
    expect(lessons[1]?.lessonId).toBe('lesson-2');
    expect(lessons[2]?.lessonId).toBe('lesson-3');
    expect(lessons[3]?.lessonId).toBe('lesson-4');
    expect(lessons[4]?.lessonId).toBe('lesson-5');
    expect(lessons[5]?.lessonId).toBe('lesson-6');
    expect(lessons[6]?.lessonId).toBe('lesson-7');
    // verify order values match
    for (let i = 0; i < lessons.length; i++) {
      expect(lessons[i].order).toBe(i + 1);
    }
  });

  it('every new lesson has its corresponding quiz', () => {
    for (const lessonId of NEW_LESSONS) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      expect(quiz).toBeDefined();
    }
  });

  it('quiz lesson IDs match the lesson IDs', () => {
    for (const lessonId of NEW_LESSONS) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      expect(quiz?.lessonId).toBe(lessonId);
      expect(quiz?.courseId).toBe(COURSE_ID);
      expect(quiz?.classId).toBe(CLASS_ID);
      expect(quiz?.subjectSlug).toBe(SUBJECT_SLUG);
    }
  });

  it('each quiz has 4–5 questions', () => {
    for (const lessonId of NEW_LESSONS) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      const questions = quiz ? getQuestionsForQuiz(quiz) : [];
      expect(questions.length).toBeGreaterThanOrEqual(4);
      expect(questions.length).toBeLessThanOrEqual(5);
    }
  });

  it('every question has a valid correctOptionId', () => {
    for (const lessonId of NEW_LESSONS) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      const questions = quiz ? getQuestionsForQuiz(quiz) : [];
      for (const question of questions) {
        expect(question.correctOptionId).toBeTruthy();
        const hasMatchingOption = question.options.some(
          (option) => option.optionId === question.correctOptionId,
        );
        expect(hasMatchingOption).toBe(true);
      }
    }
  });

  it('existing quiz-1 still works', () => {
    const quiz = getQuizById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, EXISTING_QUIZ_1);
    expect(quiz).toBeDefined();
    expect(quiz?.quizId).toBe(EXISTING_QUIZ_1);
    expect(quiz?.lessonId).toBe(EXISTING_LESSON_1);
    const questions = getQuestionsForQuiz(quiz!);
    expect(questions.length).toBe(5);
  });

  it('existing route matching still works', () => {
    const existingPath = quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, EXISTING_LESSON_1, EXISTING_QUIZ_1);
    const expectedPath = `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${EXISTING_LESSON_1}/quiz/${EXISTING_QUIZ_1}`;
    expect(existingPath).toBe(expectedPath);
    const matched = matchRoute(existingPath);
    expect(matched).toEqual({
      name: 'quiz',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
      lessonId: EXISTING_LESSON_1,
      quizId: EXISTING_QUIZ_1,
    });
  });

  it('scoreQuiz still works', async () => {
    const { scoreQuiz } = await import('../src/data/quizzes');
    const quiz = getQuizById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, EXISTING_QUIZ_1);
    const questions = getQuestionsForQuiz(quiz!);
    const answers = Object.fromEntries(
      questions.map((q) => [q.questionId, q.correctOptionId]),
    );
    const result = scoreQuiz(questions, answers);
    expect(result.correctCount).toBe(questions.length);
    expect(result.total).toBe(questions.length);
    expect(result.percentage).toBe(100);
  });
});
