import { describe, expect, it } from 'vitest';
import { getCoursesForSubject, getCourseById } from '../src/data/courses';
import { getLessonById, getLessonsForCourse, type Lesson } from '../src/data/lessons';
import { getQuestionsForQuiz, getQuizForLesson, type Quiz } from '../src/data/quizzes';
import { coursePath, lessonPath, matchRoute, quizPath } from '../src/router/routes';

const CLASS_ID = 'class1';
const SUBJECT_SLUG = 'mathematics';
const COURSE_ID = 'addition-made-easy';
const COURSE_TITLE = 'Addition Made Easy';

const EXISTING_COURSE_ID = 'numbers-and-counting';

/** Every lesson of the new course, in the order a learner meets them. */
const EXPECTED_LESSONS = [
  { lessonId: 'addition-lesson-1', title: 'Introduction to Addition' },
  { lessonId: 'addition-lesson-2', title: 'Adding One More' },
  { lessonId: 'addition-lesson-3', title: 'Adding Within 5' },
  { lessonId: 'addition-lesson-4', title: 'Adding Within 10' },
  { lessonId: 'addition-lesson-5', title: 'Adding Using Pictures' },
  { lessonId: 'addition-lesson-6', title: 'Simple Addition Stories' },
  { lessonId: 'addition-lesson-7', title: 'Addition Practice' },
] as const;

const LESSON_IDS = EXPECTED_LESSONS.map((lesson) => lesson.lessonId);

/** Thrown instead of `!` so the helpers below stay readable. */
function quizFor(lessonId: string): Quiz {
  const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);

  if (quiz === undefined) {
    throw new Error(`expected a quiz for ${lessonId}`);
  }

  return quiz;
}

describe('Addition Made Easy course', () => {
  it('exists with its original course metadata', () => {
    const course = getCourseById(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(course).toBeDefined();
    expect(course?.courseId).toBe(COURSE_ID);
    expect(course?.title).toBe(COURSE_TITLE);
    expect(course?.description).not.toBe('');
    expect(course?.level).toBe('Beginner');
  });

  it('belongs to class 1 mathematics', () => {
    const course = getCourseById(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(course?.classId).toBe(CLASS_ID);
    expect(course?.subjectSlug).toBe(SUBJECT_SLUG);

    const courseIds = getCoursesForSubject(CLASS_ID, SUBJECT_SLUG).map(
      (entry) => entry.courseId,
    );
    expect(courseIds).toContain(COURSE_ID);
  });

  it('is not reachable from another subject and has no lessons outside class 1', () => {
    // Course templates exist for every class by design, exactly like
    // Numbers Made Simple, but the written lessons belong to class 1 only.
    expect(getCourseById(CLASS_ID, 'english', COURSE_ID)).toBeUndefined();
    expect(getCourseById('class2', SUBJECT_SLUG, COURSE_ID)).toBeDefined();
    expect(getLessonsForCourse('class2', SUBJECT_SLUG, COURSE_ID)).toEqual([]);
    expect(getLessonsForCourse(CLASS_ID, 'english', COURSE_ID)).toEqual([]);
    expect(
      getLessonById('class2', SUBJECT_SLUG, COURSE_ID, 'addition-lesson-1'),
    ).toBeUndefined();
  });

  it('lists 6 to 8 lessons and each lesson belongs to the course', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons.length).toBeGreaterThanOrEqual(6);
    expect(lessons.length).toBeLessThanOrEqual(8);
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

  it('orders the lessons in learning order', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons.map((lesson) => lesson.lessonId)).toEqual(LESSON_IDS);
    expect(lessons.map((lesson) => lesson.title)).toEqual(
      EXPECTED_LESSONS.map((lesson) => lesson.title),
    );

    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.order).toBe(index + 1);
    }
  });

  it('gives every lesson all six content blocks', () => {
    const blocks = [
      'intro',
      'keyPoints',
      'explanation',
      'example',
      'practice',
      'recap',
    ] as const;

    for (const lessonId of LESSON_IDS) {
      const lesson = getLessonById(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      expect(lesson).toBeDefined();

      if (lesson === undefined) {
        continue;
      }

      for (const block of blocks) {
        expect(lesson.content[block]).toBeDefined();
      }

      expect(lesson.content.intro?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.keyPoints?.list?.length ?? 0).toBeGreaterThanOrEqual(2);
      expect(lesson.content.explanation?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.example?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.practice?.content?.length ?? 0).toBeGreaterThan(0);
      expect(lesson.content.recap?.content?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it('has a quiz for every lesson', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    expect(lessons).toHaveLength(LESSON_IDS.length);

    for (const lesson of lessons) {
      expect(getQuizForLesson(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lesson.lessonId)).toBeDefined();
    }
  });

  it('maps every quiz back to its own lesson and course', () => {
    for (const lessonId of LESSON_IDS) {
      const quiz = quizFor(lessonId);

      expect(quiz.lessonId).toBe(lessonId);
      expect(quiz.courseId).toBe(COURSE_ID);
      expect(quiz.classId).toBe(CLASS_ID);
      expect(quiz.subjectSlug).toBe(SUBJECT_SLUG);
      expect(quiz.title).not.toBe('');
      expect(quiz.description).not.toBe('');
    }
  });

  it('gives every quiz 4 to 5 questions with unique ids and options', () => {
    for (const lessonId of LESSON_IDS) {
      const questions = getQuestionsForQuiz(quizFor(lessonId));

      expect(questions.length).toBeGreaterThanOrEqual(4);
      expect(questions.length).toBeLessThanOrEqual(5);

      const questionIds = questions.map((question) => question.questionId);
      expect(new Set(questionIds).size).toBe(questionIds.length);

      for (const question of questions) {
        expect(question.prompt).not.toBe('');
        expect(question.options.length).toBeGreaterThanOrEqual(2);

        const optionIds = question.options.map((option) => option.optionId);
        expect(new Set(optionIds).size).toBe(optionIds.length);

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
    for (const lessonId of LESSON_IDS) {
      const lessonUrl = lessonPath(CLASS_ID, SUBJECT_SLUG, COURSE_ID, lessonId);
      const quiz = quizFor(lessonId);
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

  it('has its own course URL', () => {
    expect(coursePath(CLASS_ID, SUBJECT_SLUG, COURSE_ID)).toBe(
      `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${COURSE_ID}`,
    );
  });
});

describe('existing Numbers Made Simple content is untouched', () => {
  it('keeps its course in the class 1 mathematics list', () => {
    const courseIds = getCoursesForSubject(CLASS_ID, SUBJECT_SLUG).map(
      (entry) => entry.courseId,
    );

    expect(courseIds).toContain(EXISTING_COURSE_ID);
    expect(courseIds).toContain('shapes-and-patterns');
    expect(courseIds).toContain('maths-challenge-corner');
  });

  it('keeps its seven lessons with the original ids and order', () => {
    const lessons = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, EXISTING_COURSE_ID);

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

  it('keeps its original quizzes for their own lessons', () => {
    const expectedQuizIds: Record<string, string> = {
      'lesson-1': 'quiz-1',
      'lesson-3': 'quiz-3',
      'lesson-4': 'quiz-4',
      'lesson-5': 'quiz-5',
      'lesson-6': 'quiz-6',
      'lesson-7': 'quiz-7',
    };

    for (const lesson of getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, EXISTING_COURSE_ID)) {
      const quiz = getQuizForLesson(CLASS_ID, SUBJECT_SLUG, EXISTING_COURSE_ID, lesson.lessonId);

      // lesson-2 never had a quiz and still has none.
      if (expectedQuizIds[lesson.lessonId] === undefined) {
        expect(quiz).toBeUndefined();
        continue;
      }

      expect(quiz?.courseId).toBe(EXISTING_COURSE_ID);
      expect(quiz?.lessonId).toBe(lesson.lessonId);
      expect(quiz?.quizId).toBe(expectedQuizIds[lesson.lessonId]);
    }
  });

  it('keeps the demo quiz URL unchanged', () => {
    const path = quizPath(CLASS_ID, SUBJECT_SLUG, EXISTING_COURSE_ID, 'lesson-1', 'quiz-1');

    expect(path).toBe(
      `/class/${CLASS_ID}/subject/${SUBJECT_SLUG}/course/${EXISTING_COURSE_ID}/lesson/lesson-1/quiz/quiz-1`,
    );
  });
});

/** Guards against a lesson id being reused by the new course. */
describe('lesson ids are not shared between courses', () => {
  it('keeps the new lesson ids inside addition-made-easy only', () => {
    const newLessons: Lesson[] = getLessonsForCourse(CLASS_ID, SUBJECT_SLUG, COURSE_ID);

    for (const lesson of newLessons) {
      expect(getLessonById(CLASS_ID, SUBJECT_SLUG, EXISTING_COURSE_ID, lesson.lessonId))
        .toBeUndefined();
    }
  });
});