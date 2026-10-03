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

// Quiz data, one quiz per written lesson. Numbers Made Simple
// (numbers-and-counting) keeps its original quizzes, and Addition Made Easy
// (addition-made-easy) has a quiz for each of its seven lessons.
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
  {
    quizId: 'addition-quiz-1',
    lessonId: 'addition-lesson-1',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Introduction to Addition - Quiz',
    description: 'Five short questions about joining two groups together.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Which word tells us to join two groups into one bigger group?',
        options: [
          { optionId: 'a', text: 'Taking away' },
          { optionId: 'b', text: 'Adding' },
          { optionId: 'c', text: 'Comparing' },
          { optionId: 'd', text: 'Sharing out' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'You have 2 balloons and someone brings 3 more. How many balloons are there now?',
        options: [
          { optionId: 'a', text: '4' },
          { optionId: 'b', text: '5' },
          { optionId: 'c', text: '6' },
          { optionId: 'd', text: '3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'Three birds sit on a branch and two birds fly over to them. How many birds are on the branch?',
        options: [
          { optionId: 'a', text: '5' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '6' },
          { optionId: 'd', text: '2' },
        ],
        correctOptionId: 'a',
      },
      {
        questionId: 'q4',
        prompt: 'What do we call the answer we get when we add?',
        options: [
          { optionId: 'a', text: 'A total' },
          { optionId: 'b', text: 'A group' },
          { optionId: 'c', text: 'A drawing' },
          { optionId: 'd', text: 'A number before' },
        ],
        correctOptionId: 'a',
      },
      {
        questionId: 'q5',
        prompt: 'Which word do we say between two numbers when we add them?',
        options: [
          { optionId: 'a', text: 'Minus' },
          { optionId: 'b', text: 'Plus' },
          { optionId: 'c', text: 'After' },
          { optionId: 'd', text: 'Smallest' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'addition-quiz-2',
    lessonId: 'addition-lesson-2',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Adding One More - Quiz',
    description: 'Five short questions about counting up by one.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is 6 plus one more?',
        options: [
          { optionId: 'a', text: '5' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '6' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'Which number is one more than 9?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '10' },
          { optionId: 'c', text: '11' },
          { optionId: 'd', text: '7' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'You have 3 crayons and your friend gives you one more. How many crayons do you have?',
        options: [
          { optionId: 'a', text: '2' },
          { optionId: 'b', text: '3' },
          { optionId: 'c', text: '4' },
          { optionId: 'd', text: '5' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q4',
        prompt: 'You count on from 7 to add one more. Which number do you land on?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '8' },
          { optionId: 'c', text: '9' },
          { optionId: 'd', text: '10' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q5',
        prompt: 'Which number is one more than 0?',
        options: [
          { optionId: 'a', text: '1' },
          { optionId: 'b', text: '2' },
          { optionId: 'c', text: '3' },
          { optionId: 'd', text: '0' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    quizId: 'addition-quiz-3',
    lessonId: 'addition-lesson-3',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Adding Within 5 - Quiz',
    description: 'Five short questions about adding two small numbers.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is 2 plus 3?',
        options: [
          { optionId: 'a', text: '4' },
          { optionId: 'b', text: '5' },
          { optionId: 'c', text: '6' },
          { optionId: 'd', text: '3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'What is 4 plus 1?',
        options: [
          { optionId: 'a', text: '3' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '5' },
          { optionId: 'd', text: '6' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q3',
        prompt: 'Which sum has a total of 5 or less?',
        options: [
          { optionId: 'a', text: '3 plus 2' },
          { optionId: 'b', text: '2 plus 4' },
          { optionId: 'c', text: '4 plus 4' },
          { optionId: 'd', text: '3 plus 3' },
        ],
        correctOptionId: 'a',
      },
      {
        questionId: 'q4',
        prompt: 'A plate holds 3 cookies and we add one more cookie. How many cookies are there?',
        options: [
          { optionId: 'a', text: '3' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '5' },
          { optionId: 'd', text: '2' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q5',
        prompt: 'You start at 1 and count on three times. Which number do you reach?',
        options: [
          { optionId: 'a', text: '3' },
          { optionId: 'b', text: '4' },
          { optionId: 'c', text: '5' },
          { optionId: 'd', text: '2' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'addition-quiz-4',
    lessonId: 'addition-lesson-4',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Adding Within 10 - Quiz',
    description: 'Five short questions about totals up to ten.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is 6 plus 3?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '9' },
          { optionId: 'c', text: '10' },
          { optionId: 'd', text: '7' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'What is 5 plus 5?',
        options: [
          { optionId: 'a', text: '9' },
          { optionId: 'b', text: '10' },
          { optionId: 'c', text: '11' },
          { optionId: 'd', text: '8' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'Which sum has a total of exactly ten?',
        options: [
          { optionId: 'a', text: '4 plus 5' },
          { optionId: 'b', text: '6 plus 4' },
          { optionId: 'c', text: '8 plus 1' },
          { optionId: 'd', text: '3 plus 3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'There are 7 plates on a table and 2 more arrive. How many plates are there now?',
        options: [
          { optionId: 'a', text: '5' },
          { optionId: 'b', text: '8' },
          { optionId: 'c', text: '9' },
          { optionId: 'd', text: '10' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q5',
        prompt: 'You start counting on from 8 to add 2 more. How many counting steps do you take?',
        options: [
          { optionId: 'a', text: '1' },
          { optionId: 'b', text: '2' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '10' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'addition-quiz-5',
    lessonId: 'addition-lesson-5',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Adding Using Pictures - Quiz',
    description: 'Five short questions about drawing and counting shapes.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'You draw 3 stars and then 2 more stars. How many stars do you draw altogether?',
        options: [
          { optionId: 'a', text: '4' },
          { optionId: 'b', text: '5' },
          { optionId: 'c', text: '6' },
          { optionId: 'd', text: '3' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'You draw 4 circles and 4 more circles. What is the total?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '9' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q3',
        prompt: 'What do we do first when we use pictures to add?',
        options: [
          { optionId: 'a', text: 'Count backwards' },
          { optionId: 'b', text: 'Draw the two groups' },
          { optionId: 'c', text: 'Write the answer' },
          { optionId: 'd', text: 'Guess quickly' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Six triangles and three more triangles make how many triangles?',
        options: [
          { optionId: 'a', text: '7' },
          { optionId: 'b', text: '8' },
          { optionId: 'c', text: '9' },
          { optionId: 'd', text: '10' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q5',
        prompt: 'Why do pictures help us to add?',
        options: [
          { optionId: 'a', text: 'They look pretty' },
          { optionId: 'b', text: 'We can count the shapes' },
          { optionId: 'c', text: 'They take less space' },
          { optionId: 'd', text: 'They hide the numbers' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    quizId: 'addition-quiz-6',
    lessonId: 'addition-lesson-6',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Simple Addition Stories - Quiz',
    description: 'Five short questions about finding sums inside stories.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'Meera has 4 pens and her mother gives her 3 more. How many pens does she have?',
        options: [
          { optionId: 'a', text: '6' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '5' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'Five birds flew to a tree and two more came. How many birds are on the tree?',
        options: [
          { optionId: 'a', text: '5' },
          { optionId: 'b', text: '6' },
          { optionId: 'c', text: '7' },
          { optionId: 'd', text: '8' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q3',
        prompt: 'In an addition story, what do we look for first?',
        options: [
          { optionId: 'a', text: 'The names of the people' },
          { optionId: 'b', text: 'The two groups to add' },
          { optionId: 'c', text: 'The colours' },
          { optionId: 'd', text: 'The answer' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Asha had 6 sweets and a shop gave her 2 more. How many sweets does she have?',
        options: [
          { optionId: 'a', text: '4' },
          { optionId: 'b', text: '7' },
          { optionId: 'c', text: '8' },
          { optionId: 'd', text: '9' },
        ],
        correctOptionId: 'c',
      },
      {
        questionId: 'q5',
        prompt: 'Which sum matches the story "three apples and four apples"?',
        options: [
          { optionId: 'a', text: '3 plus 4' },
          { optionId: 'b', text: '4 minus 3' },
          { optionId: 'c', text: '7 plus 1' },
          { optionId: 'd', text: '1 plus 3' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  {
    quizId: 'addition-quiz-7',
    lessonId: 'addition-lesson-7',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    title: 'Addition Practice - Quiz',
    description: 'Five short questions that mix all our addition skills.',
    estimatedMinutes: 5,
    questions: [
      {
        questionId: 'q1',
        prompt: 'What is 5 plus 4?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '9' },
          { optionId: 'c', text: '10' },
          { optionId: 'd', text: '7' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q2',
        prompt: 'What is 7 plus 2?',
        options: [
          { optionId: 'a', text: '8' },
          { optionId: 'b', text: '9' },
          { optionId: 'c', text: '10' },
          { optionId: 'd', text: '11' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q3',
        prompt: 'Which sum has a total of 8?',
        options: [
          { optionId: 'a', text: '3 plus 3' },
          { optionId: 'b', text: '5 plus 3' },
          { optionId: 'c', text: '4 plus 2' },
          { optionId: 'd', text: '6 plus 1' },
        ],
        correctOptionId: 'b',
      },
      {
        questionId: 'q4',
        prompt: 'Ravi counts on from 6 to add 3 more. Which numbers does he say?',
        options: [
          { optionId: 'a', text: '6, 7, 8, 9' },
          { optionId: 'b', text: '6, 8, 9' },
          { optionId: 'c', text: '3, 6, 9' },
          { optionId: 'd', text: '9, 8, 7' },
        ],
        correctOptionId: 'a',
      },
      {
        questionId: 'q5',
        prompt: 'After finding an answer, what is a good way to check it?',
        options: [
          { optionId: 'a', text: 'Count the same set again' },
          { optionId: 'b', text: 'Guess a bigger number' },
          { optionId: 'c', text: 'Skip the question' },
          { optionId: 'd', text: 'Change the question' },
        ],
        correctOptionId: 'a',
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