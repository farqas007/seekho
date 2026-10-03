import type { Grade } from './classes';
import type { SubjectSlug } from './subjects';

/** A single answer choice inside a question. */
export interface QuizOption {
  /** Unique inside its question. Referenced by `QuizQuestion.correctOptionId`. */
  optionId: string;
  text: string;
}

/** One multiple-choice question. `correctOptionId` is only read when scoring. */
export interface QuizQuestion {
  questionId: string;
  prompt: string;
  options: QuizOption[];
  /** Never rendered before the learner submits the quiz. */
  correctOptionId: string;
}

/**
 * A quiz as pages read it, always tied to the lesson it checks:
 * Class → Subject → Course → Lesson → Quiz.
 */
export interface Quiz {
  /** Unique inside its course. Becomes the quizId in URLs. */
  quizId: string;
  lessonId: string;
  courseId: string;
  classId: Grade['id'];
  subjectSlug: SubjectSlug;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: QuizQuestion[];
}

/** Learner choices for one sitting, keyed by questionId. */
export type QuizAnswers = Readonly<Record<string, string | undefined>>;

/** Outcome of one quiz attempt. Kept local to the browser - nothing is stored. */
export interface QuizScore {
  correctCount: number;
  total: number;
  /** Rounded whole number, 0-100. Zero when there are no questions. */
  percentage: number;
}

// Small initial dataset - intentionally limited.
// Only lesson-1 of the Numbers Made Simple course (numbers-and-counting) has a
// quiz, so the demo stays tiny while the shape is ready for real content.
const quizzesData: Quiz[] = [
  {
    quizId: 'quiz-1',
    lessonId: 'lesson-1',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Counting from 0 to 9 - Quiz',
    description: 'Five short questions to check what you remember about counting.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which number comes just after 3?',
        options: [
          { optionId: 'a', text: '2' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '5' },
          { optionId: 'd', text: '9' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'You have one apple. Someone gives you one more apple. How many apples do you have now?',
        options: [
          { optionId: 'a', text: '0' },
          { optionId: 'b', text: '1' },
          { optionId: 'c', text: '2' },
          { optionId: 'd', text: '3' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q3',
        prompt: 'Zero tells us that there are no objects. Which number shows no objects?',
        options: [
          { optionId: 'a', text: '1' },
          { optionId: 'b', text: '0' },
          { optionId: 'c', text: '4' },
          { optionId: 'd', text: '7' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Which group of numbers is in the correct counting order?',
        options: [
          { optionId: 'a', text: '9, 8, 7' },
          { optionId: 'b', text: '5, 6, 7' },
          { optionId: 'c', text: '7, 6, 5' },
          { optionId: 'd', text: '1, 3, 9' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q5',
        prompt: 'Which of these numbers is the biggest?',
        options: [
          { optionId: 'a', text: '7' },
          { optionId: 'b', text: '2' },
          { optionId: 'c', text: '1' },
          { optionId: 'd', text: '4' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    quizId: 'quiz-3',
    lessonId: 'lesson-3',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Counting Beyond 9 - Quiz',
    description: 'Test your skills in counting from 10 to 20.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which number comes after 9?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '10' },
          { optionId: 'c', text: '7' },
          { optionId: 'd', text: '6' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'What comes after 11?',
        options: [
          { optionId: 'a', text: '10' },
          { optionId: 'b', text: '12' },
          { optionId: 'c', text: '9' },
          { optionId: 'd', text: '13' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'Which number is between 14 and 16?',
        options: [
          { optionId: 'a', text: '13' },
          { optionId: 'b', text: '17' },
          { optionId: 'c', text: '15' },
          { optionId: 'd', text: '18' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q4',
        prompt: 'What comes just before 20?',
        options: [
          { optionId: 'a', text: '19' },
          { optionId: 'b', text: '18' },
          { optionId: 'c', text: '21' },
          { optionId: 'd', text: '17' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    quizId: 'quiz-4',
    lessonId: 'lesson-4',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Comparing Numbers - Quiz',
    description: 'Compare numbers to see which is bigger or smaller.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which is bigger, 5 or 2?',
        options: [
          { optionId: 'a', text: '2' },
          { optionId: 'b', text: '5' },
          { optionId: 'c', text: 'Both same' },
          { optionId: 'd', text: 'None' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'Which number is smaller?',
        options: [
          { optionId: 'a', text: '3' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: '9' },
          { optionId: 'd', text: '10' },
        ],
        correctOptionId: 'a',
      },
      {
        questionId: 'q3',
        prompt: 'Are 4 and 4 the same?',
        options: [
          { optionId: 'a', text: 'No, 4 is bigger' },
          { optionId: 'b', text: 'Yes, they are equal' },
          { optionId: 'c', text: 'No, 4 is smaller' },
          { optionId: 'd', text: 'No' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Which is bigger, 1 or 10?',
        options: [
          { optionId: 'a', text: '1' },
          { optionId: 'b', text: '10' },
          { optionId: 'c', text: 'Both equal' },
          { optionId: 'd', text: 'Both same' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'quiz-5',
    lessonId: 'lesson-5',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Before and After - Quiz',
    description: 'Find numbers that come before and after.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'What comes just before 5?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '7' },
          { optionId: 'd', text: '3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'What comes just after 7?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '8' },
          { optionId: 'c', text: '5' },
          { optionId: 'd', text: '9' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'What comes just before 10?',
        options: [
          { optionId: 'a', text: '11' },
          { optionId: 'b', text: '9' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '12' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'What comes just after 0?',
        options: [
          { optionId: 'a', text: '2' },
          { optionId: 'b', text: '1' },
          { optionId: 'c', text: '3' },
          { optionId: 'd', text: '4' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'quiz-6',
    lessonId: 'lesson-6',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Ordering Numbers - Quiz',
    description: 'Arrange numbers in the correct order.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which order is smallest to biggest for 3, 1, 5?',
        options: [
          { optionId: 'a', text: '5, 3, 1' },
          { optionId: 'b', text: '1, 3, 5' },
          { optionId: 'c', text: '3, 5, 1' },
          { optionId: 'd', text: '5, 1, 3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'Which is the smallest number?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '2' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '4' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'Which is the biggest number?',
        options: [
          { optionId: 'a', text: '1' },
          { optionId: 'b', text: '9' },
          { optionId: 'c', text: '3' },
          { optionId: 'd', text: '5' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Put 4, 2, 6 in order from smallest to biggest. Which comes first?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '2' },
          { optionId: 'c', text: '4' },
          { optionId: 'd', text: 'All same' },
        ],
        correctOptionId: 'b',
      },
    ],
  },  {
    quizId: 'quiz-7',
    lessonId: 'lesson-7',
    courseId: 'numbers-and-counting',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Simple Number Practice - Quiz',
    description: 'Practice all the number skills we have learnt.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Count forward - what comes after 19?',
        options: [
          { optionId: 'a', text: '18' },
          { optionId: 'b', text: '20' },
          { optionId: 'c', text: '17' },
          { optionId: 'd', text: '16' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'Which is bigger, 7 or 4?',
        options: [
          { optionId: 'a', text: '4' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: 'Both same' },
          { optionId: 'd', text: 'They are equal' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'What comes just before 1?',
        options: [
          { optionId: 'a', text: '2' },
          { optionId: 'b', text: '0' },
          { optionId: 'c', text: '3' },
          { optionId: 'd', text: '4' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Arrange 5, 2, 8 from smallest to biggest. The middle number is?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '5' },
          { optionId: 'c', text: '2' },
          { optionId: 'd', text: 'None' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q5',
        prompt: 'How many objects are shown when we say 10?',
        options: [
          { optionId: 'a', text: '0' },
          { optionId: 'b', text: '10' },
          { optionId: 'c', text: '1' },
          { optionId: 'd', text: '5' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
function matches(
  quiz: Quiz,
  classId: string,
  subjectSlug: string,
  courseId: string,
): boolean {
  return (
    quiz.classId === classId &&
    quiz.subjectSlug === subjectSlug &&
    quiz.courseId === courseId
  );
}

/**
 * Quizzes written for one lesson, in the order they should be taken. Empty when
 * the class, subject, course or lesson is unknown, so pages can show a friendly
 * message instead of a broken quiz.
 */
export function getQuizzesForLesson(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
): Quiz[] {
  return quizzesData.filter(
    (quiz) => matches(quiz, classId, subjectSlug, courseId) && quiz.lessonId === lessonId,
  );
}

/**
 * The quiz a learner is offered for a lesson. The first quiz of that lesson is
 * returned, or undefined when the lesson has none yet.
 */
export function getQuizForLesson(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
): Quiz | undefined {
  return getQuizzesForLesson(classId, subjectSlug, courseId, lessonId)[0];
}

/**
 * Finds one quiz inside a class, subject and course. Returns undefined when any
 * of the ids do not match, so the quiz page can show a friendly message.
 */
export function getQuizById(
  classId: string,
  subjectSlug: string,
  courseId: string,
  quizId: string,
): Quiz | undefined {
  return quizzesData.find(
    (quiz) => matches(quiz, classId, subjectSlug, courseId) && quiz.quizId === quizId,
  );
}

/** Questions of a quiz in the order they should be asked. */
export function getQuestionsForQuiz(quiz: Quiz): QuizQuestion[] {
  return quiz.questions;
}

/** True when the quiz can actually be taken, so the UI can hide the start link. */
export function hasQuestions(quiz: Quiz): boolean {
  return quiz.questions.length > 0;
}

/**
 * Scores one sitting. Unanswered questions count as incorrect, so an unfinished
 * quiz can still be submitted, and an empty quiz scores 0.
 */
export function scoreQuiz(questions: QuizQuestion[], answers: QuizAnswers): QuizScore {
  const correctCount = questions.filter(
    (question) => answers[question.questionId] === question.correctOptionId,
  ).length;

  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return { correctCount, total, percentage };
}