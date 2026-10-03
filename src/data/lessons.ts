import type { Grade } from './classes';
type GradeId = Grade['id'];
import type { SubjectSlug } from './subjects';

export type LessonStatus = 'available' | 'coming-soon';

export type LessonContentBlockType = 'intro' | 'keyPoints' | 'explanation' | 'example' | 'practice' | 'recap';

export interface LessonContentBlock {
  type: LessonContentBlockType;
  title?: string;
  content?: string[]; // Original placeholder text lines
  list?: string[]; // Optional bullet list for this block
}

export interface Lesson {
  lessonId: string;
  courseId: string;
  classId: GradeId;
  subjectSlug: SubjectSlug;
  order: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  status: LessonStatus;
  content: {
    intro?: LessonContentBlock;
    keyPoints?: LessonContentBlock;
    explanation?: LessonContentBlock;
    example?: LessonContentBlock;
    practice?: LessonContentBlock;
    recap?: LessonContentBlock;
  };
}

// Small initial dataset - intentionally limited
// Only the Numbers Made Simple course (numbers-and-counting) has a couple of lessons for demonstration
const lessonsData: Lesson[] = [
  {
    lessonId: 'lesson-1',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 1,
    title: 'Counting from 0 to 9',
    summary: 'Learn to count from 0 to 9 using familiar, everyday objects.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['We start our number journey by counting small sets of items we see every day.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Each number stands for a count of objects', 'Numbers are said in order', 'Zero means there are no objects'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['Counting means naming numbers in order while pointing to each object one by one. This helps us know how many items we have.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['If you have three apples, you count: one, two, three. The last number tells you how many apples there are.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Try counting objects around you like pencils, stones, or buttons from 0 to 9.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['You can count from 0 to 9 by pointing to each object. The last number gives the total count.'],
      },
    },
  },
  {
    lessonId: 'lesson-2',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 2,
    title: 'Writing Numbers 0 to 9',
    summary: 'Learn how to write numbers 0 to 9 in a clear and neat way.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Now that we can count, let us learn to write the numbers we say.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Each number has its own shape', 'Practice helps with neat writing', 'We write numbers from left to right'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['Writing numbers means forming the correct shape for each digit. We take our time and practice each number a few times.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['The number 5 is written with a curve and a line - it shows five items.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Write numbers 0 to 9 on paper, saying each number aloud as you write it.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['Each number has a shape. With practice, we can write 0 to 9 neatly.'],
      },
    },
  },
];

export function getLessonsForCourse(
  classId: string,
  subjectSlug: string,
  courseId: string,
): Lesson[] {
  return lessonsData
    .filter(
      (lesson) =>
        lesson.classId === classId &&
        lesson.subjectSlug === subjectSlug &&
        lesson.courseId === courseId,
    )
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
): Lesson | undefined {
  return lessonsData.find(
    (lesson) =>
      lesson.classId === classId &&
      lesson.subjectSlug === subjectSlug &&
      lesson.courseId === courseId &&
      lesson.lessonId === lessonId,
  );
}

export function getLessonIndex(
  lessons: Lesson[],
  lessonId: string,
): number {
  return lessons.findIndex((lesson) => lesson.lessonId === lessonId);
}

export function getPreviousLesson(lessons: Lesson[], currentLessonId: string): Lesson | undefined {
  const index = getLessonIndex(lessons, currentLessonId);
  if (index <= 0) return undefined;
  return lessons[index - 1];
}

export function getNextLesson(lessons: Lesson[], currentLessonId: string): Lesson | undefined {
  const index = getLessonIndex(lessons, currentLessonId);
  if (index < 0 || index === lessons.length - 1) return undefined;
  return lessons[index + 1];
}
