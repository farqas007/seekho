import { describe, expect, it } from 'vitest';
import { getLessonById } from '../src/data/lessons';
import {
  getQuizzesForLesson,
  getQuestionsForQuiz,
  getQuizById,
  getQuizForLesson,
  hasQuestions,
  scoreQuiz,
  type Quiz,
} from '../src/data/quizzes';
import { lessonPath, matchRoute, quizPath } from '../src/router/routes';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'numbers-and-counting';
const LESSON_ID = 'lesson-1';
const QUIZ_ID = 'quiz-1';

function demoQuiz(): Quiz {
  const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID);

  if (quiz === undefined) {
    throw new Error('expected the demonstration quiz to exist');
  }

  return quiz;
}

describe('quiz lookup', () => {
  it('returns the demo quiz for its lesson', () => {
    const quiz = demoQuiz();

    expect(quiz.quizId).toBe(QUIZ_ID);
    expect(quiz.lessonId).toBe(LESSON_ID);
    expect(quiz.courseId).toBe(COURSE_ID);
    expect(quiz.classId).toBe(CLASS_ID);
    expect(quiz.subjectSlug).toBe(SUBJECT_SLUG);
    expect(quiz.title).not.toBe('');
    expect(quiz.description).not.toBe('');
  });

  it('keeps the demo dataset small and class 1 friendly', () => {
    const questions = getQuestionsForQuiz(demoQuiz());

    expect(questions.length).toBeGreaterThanOrEqual(3);
    expect(questions.length).toBeLessThanOrEqual(5);

    for (const question of questions) {
      expect(question.prompt).not.toBe('');
      expect(question.options.length).toBeGreaterThanOrEqual(2);
      expect(
        question.options.some((option) => option.optionId === question.correctOptionId),
      ).toBe(true);
    }
  });

  it('lists the quizzes of a lesson', () => {
    expect(getQuizzesForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID)).toHaveLength(1);
  });

  it('has no quiz for a lesson without one yet', () => {
    expect(getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, 'lesson-2')).toBeUndefined();
  });

  it('returns undefined for an unknown class, subject, course or quiz id', () => {
    expect(getQuizById('class99', SUBJECT_SLUG, COURSE_ID, QUIZ_ID)).toBeUndefined();
    expect(getQuizById(CLASS_ID, 'science', COURSE_ID, QUIZ_ID)).toBeUndefined();
    expect(getQuizById(CLASS_ID, SUBJECT_SLUG, 'shapes-and-patterns', QUIZ_ID)).toBeUndefined();
    expect(getQuizById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, 'quiz-404')).toBeUndefined();
    expect(getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, 'lesson-404')).toBeUndefined();
    expect(getQuizzesForLesson('class99', SUBJECT_SLUG, COURSE_ID, LESSON_ID)).toEqual([]);
  });

  it('treats a quiz without questions as empty', () => {
    const emptyQuiz: Quiz = { ...demoQuiz(), questions: [] };

    expect(hasQuestions(emptyQuiz)).toBe(false);
    expect(getQuestionsForQuiz(emptyQuiz)).toEqual([]);
  });
});

describe('quiz scoring', () => {
  const questions = getQuestionsForQuiz(demoQuiz());

  it('counts every correct answer', () => {
    const answers = Object.fromEntries(
      questions.map((question) => [question.questionId, question.correctOptionId]),
    );

    expect(scoreQuiz(questions, answers)).toEqual({
      correctCount: questions.length,
      total: questions.length,
      percentage: 100,
    });
  });

  it('treats unanswered questions as incorrect', () => {
    expect(scoreQuiz(questions, {})).toEqual({
      correctCount: 0,
      total: questions.length,
      percentage: 0,
    });

    const firstQuestion = questions[0];
    const answers = { [firstQuestion.questionId]: firstQuestion.correctOptionId };

    expect(scoreQuiz(questions, answers)).toEqual({
      correctCount: 1,
      total: questions.length,
      percentage: Math.round(100 / questions.length),
    });
  });

  it('ignores answers for other questions', () => {
    const answers = Object.fromEntries(
      questions
        .slice(1)
        .map((question) => [question.questionId, question.correctOptionId]),
    );

    expect(scoreQuiz(questions, answers).correctCount).toBe(questions.length - 1);
  });

  it('rounds the percentage to a whole number', () => {
    const threeQuestions = questions.slice(0, 3);
    const answers = { [threeQuestions[0].questionId]: threeQuestions[0].correctOptionId };

    expect(scoreQuiz(threeQuestions, answers)).toEqual({
      correctCount: 1,
      total: 3,
      percentage: 33,
    });
  });

  it('scores an empty quiz as zero', () => {
    expect(scoreQuiz([], {})).toEqual({ correctCount: 0, total: 0, percentage: 0 });
  });
});

describe('quiz links', () => {
  it('builds a quiz path under its lesson', () => {
    expect(quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID, QUIZ_ID)).toBe(
      `${lessonPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID)}/quiz/${QUIZ_ID}`,
    );
  });

  it('builds a path the router matches back to the same quiz', () => {
    const path = quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, LESSON_ID, QUIZ_ID);

    expect(matchRoute(path)).toEqual({
      name: 'quiz',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
      lessonId: LESSON_ID,
      quizId: QUIZ_ID,
    });
  });

  it('points at a lesson that exists', () => {
    const quiz = demoQuiz();
    const lesson = getLessonById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, quiz.lessonId);

    expect(lesson?.lessonId).toBe(quiz.lessonId);
  });
});