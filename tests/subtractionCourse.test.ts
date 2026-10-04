import { describe, expect, it } from 'vitest';
import { getCoursesForSubject, getCourseById } from '../src/data/courses';
import { getLessonById, getLessonsForCourse, type Lesson } from '../src/data/lessons';
import {
  getQuestionsForQuiz,
  getQuizzesForLesson,
  getQuizForLesson,
  type Quiz,
} from '../src/data/quizzes';
import { coursePath, lessonPath, matchRoute, quizPath } from '../src/router/routes';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'subtraction-made-easy';
const COURSE_TITLE = 'Subtraction Made Easy';

const NUMBERS_COURSE_ID = 'numbers-and-counting';
const ADDITION_COURSE_ID = 'addition-made-easy';

/** Every lesson of this course, in the order a learner meets them. */
const EXPECTED_LESSONS = [
  { lessonId: 'subtraction-lesson-1', title: 'Introduction to Subtraction' },
  { lessonId: 'subtraction-lesson-2', title: 'Taking Away One' },
  { lessonId: 'subtraction-lesson-3', title: 'Subtracting Within 5' },
  { lessonId: 'subtraction-lesson-4', title: 'Subtracting Within 10' },
  { lessonId: 'subtraction-lesson-5', title: 'Subtraction Using Pictures' },
  { lessonId: 'subtraction-lesson-6', title: 'Simple Subtraction Stories' },
  { lessonId: 'subtraction-lesson-7', title: 'Subtraction Practice' },
] as const;

const LESSON_IDS = EXPECTED_LESSONS.map((lesson) => lesson.lessonId);
const QUIZ_IDS = LESSON_IDS.map((lessonId) => lessonId.replace('lesson', 'quiz'));

const CONTENT_BLOCKS = [
  'intro',
  'keyPoints',
  'explanation',
  'example',
  'practice',
  'recap',
] as const;

/** Thrown instead of `!` so the helpers below stay readable. */
function quizFor(lessonId: string): Quiz {
  const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);

  if (quiz === undefined) {
    throw new Error(`expected a quiz for ${lessonId}`);
  }

  return quiz;
}

describe('Subtraction Made Easy course', () => {
  it('exists with its course metadata', () => {
    const course = getCourseById(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(course).toBeDefined();
    expect(course?.courseId).toBe(COURSE_ID);
    expect(course?.title).toBe(COURSE_TITLE);
    expect(course?.description).not.toBe('');
    expect(course?.description).not.toBe(
      getCourseById(CLASS_ID, SUBJECT_SLUG, ADDITION_COURSE_ID)?.description,
    );
    expect(course?.level).toBe('Beginner');
    expect(course?.stage).toBe('Building skills');
    expect(course?.status).toBe('available');
    expect(course?.lessonCount).toBe(7);
  });

  it('belongs to class 1 mathematics', () => {
    const course = getCourseById(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(course?.classId).toBe(CLASS_ID);
    expect(course?.subjectSlug).toBe(SUBJECT_SLUG);

    const courseIds = getCoursesForSubject(CLASS_ID, SUBJECT_SLUG).map(
      (entry) => entry.courseId,
    );
    expect(courseIds).toContain(COURSE_ID);
    expect(courseIds.indexOf(COURSE_ID)).toBe(
      courseIds.indexOf(ADDITION_COURSE_ID) + 1,
    );
  });

  it('has no written lessons in another class or subject', () => {
    expect(getCourseById(CLASS_ID, 'english', COURSE_ID)).toBeUndefined();
    expect(getLessonsForCourse('class2', SUBJECT_SLUG, COURSE_ID)).toEqual([]);
    expect(getLessonsForCourse(CLASS_ID, 'english', COURSE_ID)).toEqual([]);
    expect(
      getLessonById('class2', SUBJECT_SLUG, COURSE_ID, 'subtraction-lesson-1'),
    ).toBeUndefined();
    expect(
      getLessonById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, 'subtraction-lesson-404'),
    ).toBeUndefined();
  });

  it('has exactly 7 lessons that belong to the course', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons).toHaveLength(7);
    expect(lessons).toHaveLength(EXPECTED_LESSONS.length);

    for (const lesson of lessons) {
      expect(lesson.courseId).toBe(COURSE_ID);
      expect(lesson.classId).toBe(CLASS_ID);
      expect(lesson.subjectSlug).toBe(SUBJECT_SLUG);
      expect(lesson.status).toBe('available');
      expect(lesson.summary).not.toBe('');
      expect(lesson.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it('orders the lessons 1 to 7 in learning order', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons.map((lesson) => lesson.lessonId)).toEqual(LESSON_IDS);
    expect(lessons.map((lesson) => lesson.title)).toEqual(
      EXPECTED_LESSONS.map((lesson) => lesson.title),
    );
    expect(lessons.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);

    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.order).toBe(index + 1);
    }
  });

  it('gives every lesson all six content blocks with text', () => {
    for (const lessonId of LESSON_IDS) {
      const lesson = getLessonById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);

      expect(lesson).toBeDefined();

      if (lesson === undefined) {
        continue;
      }

      for (const block of CONTENT_BLOCKS) {
        expect(lesson.content[block]).toBeDefined();
        expect(lesson.content[block]?.type).toBe(block);
        expect(lesson.content[block]?.title).not.toBe('');
      }

      expect(lesson.content.intro?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.keyPoints?.list?.length ?? 0).toBeGreaterThanOrEqual(2);
      expect(lesson.content.explanation?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.example?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.practice?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.recap?.content?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it('has exactly one quiz for every lesson', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons).toHaveLength(LESSON_IDS.length);

    for (const lesson of lessons) {
      expect(
        getQuizzesForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lesson.lessonId),
      ).toHaveLength(1);
      expect(
        getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lesson.lessonId),
      ).toBeDefined();
    }
  });

  it('maps every quiz back to its own lesson and course', () => {
    for (const [index, lessonId] of LESSON_IDS.entries()) {
      const quiz = quizFor(lessonId);

      expect(quiz.quizId).toBe(QUIZ_IDS[index]);
      expect(quiz.lessonId).toBe(lessonId);
      expect(quiz.courseId).toBe(COURSE_ID);
      expect(quiz.classId).toBe(CLASS_ID);
      expect(quiz.subjectSlug).toBe(SUBJECT_SLUG);
      expect(quiz.title).toBe(`${EXPECTED_LESSONS[index].title} - Quiz`);
      expect(quiz.description).not.toBe('');
    }
  });

  it('gives every quiz exactly 5 questions with unique ids and options', () => {
    for (const lessonId of LESSON_IDS) {
      const questions = getQuestionsForQuiz(quizFor(lessonId));

      expect(questions).toHaveLength(5);

      const questionIds = questions.map((question) => question.questionId);
      expect(new Set(questionIds).size).toBe(questionIds.length);

      for (const question of questions) {
        expect(question.prompt).not.toBe('');
        expect(question.options.length).toBeGreaterThanOrEqual(2);

        const optionIds = question.options.map((option) => option.optionId);
        expect(new Set(optionIds).size).toBe(optionIds.length);

        const optionTexts = question.options.map((option) => option.text);
        expect(new Set(optionTexts).size).toBe(optionTexts.length);

        for (const option of question.options) {
          expect(option.text).not.toBe('');
        }
      }
    }
  });

  it('points every correctOptionId at a real option', () => {
    for (const lessonId of LESSON_IDS) {
      for (const question of getQuestionsForQuiz(quizFor(lessonId))) {
        expect(question.correctOptionId).toBeTruthy();

        const matches = question.options.filter(
          (option) => option.optionId === question.correctOptionId,
        );
        expect(matches).toHaveLength(1);
      }
    }
  });

  it('builds lesson and quiz URLs the router matches back', () => {
    expect(coursePath(CLASS_ID, SUBJECT_SLUG, COURSE_ID)).toBe(
      `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}`,
    );
    expect(matchRoute(coursePath(CLASS_ID, SUBJECT_SLUG, COURSE_ID))).toEqual({
      name: 'course',
      classId: CLASS_ID,
      subjectSlug: SUBJECT_SLUG,
      courseId: COURSE_ID,
    });

    for (const lessonId of LESSON_IDS) {
      const quiz = quizFor(lessonId);
      const lessonUrl = lessonPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      const quizUrl = quizPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId, quiz.quizId);

      expect(lessonUrl).toBe(
        `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}/lesson/${lessonId}`,
      );
      expect(matchRoute(lessonUrl)).toEqual({
        name: 'lesson',
        classId: CLASS_ID,
        subjectSlug: SUBJECT_SLUG,
        courseId: COURSE_ID,
        lessonId,
      });
      expect(quizUrl).toBe(`${lessonUrl}/quiz/${quiz.quizId}`);
      expect(matchRoute(quizUrl)).toEqual({
        name: 'quiz',
        classId: CLASS_ID,
        subjectSlug: SUBJECT_SLUG,
        courseId: COURSE_ID,
        lessonId,
        quizId: quiz.quizId,
      });
    }
  });

  it('does not reuse lesson or quiz ids from the other courses', () => {
    const subtractionLessons: Lesson[] = getLessonsForCourse(
      CLASS_ID,
      SUBJECT_SLUG,
      COURSE_ID,
    );

    for (const otherCourseId of [NUMBERS_COURSE_ID, ADDITION_COURSE_ID]) {
      for (const lesson of subtractionLessons) {
        expect(
          getLessonById(CLASS_ID, SUBJECT_SLUG, otherCourseId, lesson.lessonId),
        ).toBeUndefined();
      }

      for (const lessonId of LESSON_IDS) {
        expect(getQuizForLesson(CLASS_ID, SUBJECT_SLUG, otherCourseId, lessonId))
          .toBeUndefined();
      }
    }
  });
});

describe('existing Numbers Made Simple content is untouched', () => {
  it('keeps its course in the class 1 mathematics list', () => {
    const courseIds = getCoursesForSubject(CLASS_ID, SUBJECT_SLUG).map(
      (entry) => entry.courseId,
    );

    expect(courseIds).toContain(NUMBERS_COURSE_ID);
    expect(courseIds).toContain(ADDITION_COURSE_ID);
    expect(courseIds).toContain('shapes-and-patterns');
    expect(courseIds).toContain('maths-challenge-corner');
  });

  it('keeps its seven lessons with the original ids and order', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, NUMBERS_COURSE_ID);

    expect(lessons.map((lesson) => lesson.lessonId)).toEqual([
      'lesson-1',
      'lesson-2',
      'lesson-3',
      'lesson-4',
      'lesson-5',
      'lesson-6',
      'lesson-7',
    ]);
    expect(lessons[0]?.title).toBe('Counting from 0 to 9');
  });

  it('keeps its original quizzes for every lesson', () => {
    const expectedQuizIds: Record<string, string> = {
      'lesson-1': 'quiz-1',
      'lesson-2': 'quiz-2',
      'lesson-3': 'quiz-3',
      'lesson-4': 'quiz-4',
      'lesson-5': 'quiz-5',
      'lesson-6': 'quiz-6',
      'lesson-7': 'quiz-7',
    };

    for (const lesson of getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, NUMBERS_COURSE_ID)) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, NUMBERS_COURSE_ID, lesson.lessonId);

      expect(quiz?.courseId).toBe(NUMBERS_COURSE_ID);
      expect(quiz?.lessonId).toBe(lesson.lessonId);
      expect(quiz?.quizId).toBe(expectedQuizIds[lesson.lessonId]);
    }
  });

  it('keeps the demo quiz URL unchanged', () => {
    const path = quizPath(CLASS_ID, SUBJECT_SLUG, NUMBERS_COURSE_ID, 'lesson-1', 'quiz-1');

    expect(path).toBe(
      `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${NUMBERS_COURSE_ID}/lesson/lesson-1/quiz/quiz-1`,
    );
  });
});

describe('existing Addition Made Easy content is untouched', () => {
  it('keeps its course metadata', () => {
    const course = getCourseById(CLASS_ID, SUBJECT_SLUG, ADDITION_COURSE_ID);

    expect(course?.title).toBe('Addition Made Easy');
    expect(course?.level).toBe('Beginner');
    expect(course?.stage).toBe('Building skills');
    expect(course?.status).toBe('available');
  });

  it('keeps its seven lessons with the original ids, titles and order', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, ADDITION_COURSE_ID);

    expect(lessons.map((lesson) => lesson.lessonId)).toEqual([
      'addition-lesson-1',
      'addition-lesson-2',
      'addition-lesson-3',
      'addition-lesson-4',
      'addition-lesson-5',
      'addition-lesson-6',
      'addition-lesson-7',
    ]);
    expect(lessons[0]?.title).toBe('Introduction to Addition');
    expect(lessons[6]?.title).toBe('Addition Practice');

    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.order).toBe(index + 1);
    }
  });

  it('keeps one quiz per addition lesson with its original quiz id', () => {
    const additionLessons = getLessonsForCourse(
      CLASS_ID,
      SUBJECT_SLUG,
      ADDITION_COURSE_ID,
    );

    expect(additionLessons).toHaveLength(7);

    for (const [index, lesson] of additionLessons.entries()) {
      const quizzes = getQuizzesForLesson(
        CLASS_ID,
        SUBJECT_SLUG,
        ADDITION_COURSE_ID,
        lesson.lessonId,
      );

      expect(quizzes).toHaveLength(1);

      const quiz = quizzes[0];

      expect(quiz.quizId).toBe(`addition-quiz-${index + 1}`);
      expect(quiz.courseId).toBe(ADDITION_COURSE_ID);
      expect(quiz.lessonId).toBe(lesson.lessonId);
      expect(getQuestionsForQuiz(quiz)).toHaveLength(5);
    }
  });
});
