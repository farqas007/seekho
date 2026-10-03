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
  {
    lessonId: 'lesson-3',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 3,
    title: 'Counting Beyond 9',
    summary: 'Learn to count from 10 to 20 in a simple and fun way.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Now we know numbers 0 to 9. Let us learn how to count a little further.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Numbers go on in order', '10 is one ten and zero ones', 'We count one by one'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['After 9 comes 10. Then we keep counting up to 20 by saying the next number each time.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['Count ten fingers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Then count a few more up to 20.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Count out loud from 10 to 20 while clapping your hands.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['After 9 comes 10. We can count forward from 10 to 20.'],
      },
    },
  },
  {
    lessonId: 'lesson-4',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 4,
    title: 'Comparing Numbers',
    summary: 'Compare numbers to find out which is bigger or smaller.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Let us learn how to compare two numbers to see which one is more or less.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Bigger means more', 'Smaller means less', 'Same means equal'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['When we compare numbers, we look to see which has more things and which has fewer things.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['5 apples are more than 2 apples. So 5 is bigger than 2.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Compare two groups of objects around you and say which group has more.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['We can say if a number is bigger, smaller, or the same as another number.'],
      },
    },
  },
  {
    lessonId: 'lesson-5',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 5,
    title: 'Before and After',
    summary: 'Find the number that comes before or after a given number.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Numbers come in order. Let us find what comes before and after each number.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Before means the number just before', 'After means the number just after', 'Counting helps us find them'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['If we count in order, the number before is the one we said first, and the number after is the next one we say.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['For the number 5, the number before is 4 and the number after is 6.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Say a number from 1 to 10 and tell what comes before and after it.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['We can find the number just before and just after any number up to 20.'],
      },
    },
  },
  {
    lessonId: 'lesson-6',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 6,
    title: 'Ordering Numbers',
    summary: 'Arrange numbers in order from smallest to biggest.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Let us learn to put numbers in the right order from smallest to biggest.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Smallest comes first', 'Biggest comes last', 'We look at each number carefully'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['To order numbers, we compare them and arrange them from the smallest value to the biggest value.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['The numbers 3, 1, 5 in order from smallest to biggest are 1, 3, 5.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Take three numbers from 1 to 10 and arrange them in order from smallest to biggest.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['We can arrange numbers in order from smallest to biggest.'],
      },
    },
  },
  {
    lessonId: 'lesson-7',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 7,
    title: 'Simple Number Practice',
    summary: 'Practice counting, writing and comparing numbers in fun ways.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: ['Let us put everything we have learnt into some simple practice.'],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: ['Count carefully', 'Compare numbers', 'Use before and after'],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: ['We can use counting, comparing, before-after and ordering to solve simple number tasks.'],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: ['Count 10 pencils, find which is bigger between 7 and 4, and say what comes after 9.'],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: ['Count objects from 0 to 20, compare two numbers, and find before and after for a few numbers.'],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: ['We can use all our number skills to practice counting, comparing and ordering numbers.'],
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
