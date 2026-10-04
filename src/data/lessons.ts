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

// Lessons are plain data: one entry per lesson, matched by class, subject and
// course id. Three Class 1 Mathematics courses are written so far -
// Numbers Made Simple (numbers-and-counting), Addition Made Easy
// (addition-made-easy) and Subtraction Made Easy (subtraction-made-easy).
// Every lesson keeps the same six content blocks.
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
  {
    lessonId: 'addition-lesson-1',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 1,
    title: 'Introduction to Addition',
    summary: 'Learn that addition joins two groups of objects into one bigger group.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'You already know how to count a group of things. Now let us learn what to do when two groups meet.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Addition joins two groups into one bigger group',
          'We say plus when we add',
          'The answer we get is called the total',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When we put two groups of things together, we are adding. We say the number in the first group, then plus, then the number in the second group. The answer we find is the total.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Three birds sit on a branch and two birds fly over to join them. We say three plus two. Counting all the birds together gives a total of five.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Find two small groups of things at home, such as spoons or socks. Count each group, then say the two numbers together as one addition.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Adding joins two groups. We say the numbers, say plus, and the answer we find is the total.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-2',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 2,
    title: 'Adding One More',
    summary: 'Add one more object by counting up by one from a number you know.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'The easiest sum to learn is adding one more. Let us make that first step a habit.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Adding one more means counting up by one',
          'The new number is one bigger than the old one',
          'Counting on from a number we know is the easiest way',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When we add one more, we do not start counting from zero again. We say the number we have and count on by one. The number we land on is the answer.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'You have four pencils in your hand and your friend lends you one more. Count on from four: four, five. So four plus one is five.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Say a number between one and eight, then add one more out loud. Do this ten times and watch the numbers march forward.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Adding one more is counting on by one. The number we land on is one bigger than the number we started with.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-3',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 3,
    title: 'Adding Within 5',
    summary: 'Add two small numbers together and find totals up to five.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Small numbers are friendly. If we can join two numbers up to five, we have a strong start.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Two small numbers can be joined very quickly',
          'Every number we use in this lesson stays at five or below',
          'Saying each number slowly keeps us from skipping a step',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When the numbers are small, we can hold them in our head. We say the first number, say plus, say the second number, and then count on from the first number to reach the total.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'A tree has two leaves and we draw two more. Start at two and count on twice: two, three, four. The total is four leaves.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Draw two small groups of dots, using numbers up to five. Add the two numbers and write the total next to your drawing.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Adding numbers up to five is quick. Say both numbers, then count on from the first to find the total.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-4',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 4,
    title: 'Adding Within 10',
    summary: 'Find totals up to ten and learn which number to start counting from.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Now the numbers grow a little. Ten is a friendly stopping point for Class 1 addition.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'A total up to ten is still easy to find',
          'Starting from the bigger number saves counting steps',
          'Counting on means starting at a number and moving forward',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'Counting on from the smaller number works, but it takes more steps. If we start at the bigger number and count on only as many steps as the smaller number, we arrive at the total with less counting.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'There are six balloons tied up and three more arrive. Count on from six: six, seven, eight, nine. The total is nine balloons.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Roll a dice twice and add the two numbers. Say your sum out loud, then count on from the bigger number to check your answer.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'To add within ten, count on from one of the numbers. Starting at the bigger number gives fewer steps to the total.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-5',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 5,
    title: 'Adding Using Pictures',
    summary: 'Draw the two groups and count every shape to see the total.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Some sums are easier to see than to say. A quick drawing can show the answer straight away.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'One shape stands for one object',
          'Draw the two groups side by side',
          'Touch every shape as you count the total',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When a sum feels confusing, draw it. Draw a shape for each object in the first group, leave a small space, then draw the second group. Counting every shape together gives the total.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'To add four and three, draw four stars in a row and then three more stars. Count all the stars from one to seven. The total is seven.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Choose three sums and draw pictures for them. Count the pictures carefully to find each total, then check with counting on.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Pictures show addition clearly. Draw one shape per object and count the shapes to find the total.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-6',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 6,
    title: 'Simple Addition Stories',
    summary: 'Read a short story, find the two groups and add them together.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Numbers in stories are fun because something is happening. Let us turn those stories into sums.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'A story about joining is really an addition sum',
          'Look for the two groups in the story',
          'Say the sum, then give the answer',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'Many short word problems are addition dressed up. We read the story twice, find out how many things there are to start with and how many are added, and then add those two numbers.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Ravi has three marbles in his pocket. His friend gives him two more marbles. Three plus two is five, so Ravi has five marbles.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Make up a short story using your own toys or snacks. Write the two groups in your story and add them.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'A story that joins two groups is an addition sum. Find the two groups, add them, and share the total.',
        ],
      },
    },
  },
  {
    lessonId: 'addition-lesson-7',
    courseId: 'addition-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 7,
    title: 'Addition Practice',
    summary: 'Put all the addition skills together with mixed sums and a checking habit.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'We have learnt one step at a time. Let us now mix the steps and grow more confident.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Count on from the first number to find the total',
          'Pictures, counting on and stories all check each other',
          'Counting again is how we check our answer',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'Good mathematicians check their work. We read a sum, count on to find the total, and then count the same set once more in a different way to be sure the answer is right.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Five plus four. Count on from five: six, seven, eight, nine. To check, draw nine shapes in a row and count them one by one. The answer nine is correct.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Write six sums with totals up to ten and solve them. Then say each sum and its answer out loud to a friend before you check it with a drawing.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'We can add within ten by counting on. Counting a second way, with pictures or a story, checks that our answer is correct.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-1',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 1,
    title: 'Introduction to Subtraction',
    summary: 'Learn that subtraction takes objects away and tells us how many are left.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'You already know how to count a group of things. Now let us learn what happens when some of those things go away.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Subtraction takes objects away from a group',
          'We say minus when we subtract',
          'The objects that stay behind are called what is left',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When some objects leave a group, we are subtracting. We say how many there were, we say minus, and we say how many went away. Then we work out how many are left behind.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Five fish swim in a bowl and two fish are lifted out to look at. Five minus two leaves three fish in the bowl.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Gather a small group of toys such as blocks or coins. Count them, quietly take two away, and ask a friend to work out how many are left.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Subtraction takes objects away. We say the first number, say minus, say the number that went away, and find how many are left.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-2',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 2,
    title: 'Taking Away One',
    summary: 'Subtract one by stepping back to the number just before the one you said.',
    estimatedMinutes: 10,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Taking away just one is the smallest subtraction there is, so it is a smart habit to build first.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Taking away one makes a number one smaller',
          'We count back by one to find the answer',
          'The number just before the one we said is the answer',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When only one object goes away we do not need to count the whole group again. We say the number we had and step back once, to the number just before it. That smaller number is what is left.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'A basket holds six mangoes and one mango is given away. Count back one from six: six, five. Five mangoes stay in the basket.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Say a number between one and ten to someone at home. Ask them to take away one and say the number they land on.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Taking away one means counting back by one. The number just before the number we started with is what is left.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-3',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 3,
    title: 'Subtracting Within 5',
    summary: 'Subtract small numbers and count back to answers up to five.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Numbers up to five are easy to picture in our head, which makes them the perfect place to become quick.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Small numbers are quick to subtract',
          'We count back one step for each object taken away',
          'Saying each step slowly stops us from skipping one',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'With small numbers we can hold the whole group in our head. We say the first number, then count back once for every object that went away. The number we reach is how many are left.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'A plate holds four cookies and two of them are eaten. Count back from four: three, two. Two cookies are left on the plate.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Draw two short rows of dots using numbers up to five. Choose some dots to take away in your head, then write how many are left.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Subtracting within five means counting back a few steps from the number we started with and naming the number we land on.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-4',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 4,
    title: 'Subtracting Within 10',
    summary: 'Count back carefully to find how many are left when the numbers reach ten.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'The numbers are bigger now, but the method stays the same. Ten is a comfortable place to stop.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Counting back is still the best tool',
          'One step back means one object taken away',
          'Saying each step clearly keeps us on track',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'We start at the number we had and step back once for every object that went away. The only difficulty now is that there are more steps, so each number must be said clearly so no step is missed.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Eight balloons are tied to a gate and three float away. Count back from eight: seven, six, five. Five balloons stay at the gate.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Roll a dice to find how many you have, then roll it again to find how many go away. Count back out loud and say how many are left.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'To subtract within ten we count back one step for each object taken away, and the number we land on is what is left.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-5',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 5,
    title: 'Subtraction Using Pictures',
    summary: 'Draw each object, cross out the ones that go away and count what is left.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'A drawing can make a subtraction clear before the numbers feel difficult. Paper and pencil are our best helpers.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Draw one shape for every object',
          'Cross out the shapes that are taken away',
          'Count only the shapes that are not crossed out',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'Draw a shape for each object, one shape for one object and never more. Cross out the shapes that go away. Now count the shapes you did not cross out, because that count is the answer.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'To take three away from seven, draw seven leaves in a row. Cross out three of them and four leaves are still drawn, so four are left.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Choose three subtraction sums within ten. Draw each one, cross out the objects that go away, and count the shapes that are left.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'Pictures make subtraction visible. Cross out what goes away and count the shapes that stay.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-6',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 6,
    title: 'Simple Subtraction Stories',
    summary: 'Read a short story, find both numbers and count back to solve it.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Stories bring numbers into real life, and many short stories are subtraction dressed up.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Words like away, left, gave and spent are clues',
          'We need the number we start with and the number that goes away',
          'Reading a story twice keeps us from missing a number',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'In a subtraction story we are hunting for two numbers: how many there were to begin with, and how many went away. We read the story twice, find those two numbers and count back to answer the question.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Priya had eight crayons in her box and two of them snapped. The broken crayons were thrown away, so eight minus two leaves six crayons in the box.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Make up a short story about your own toys where some of them are taken away. Write the two numbers and solve the story you wrote.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'A story where things go away is a subtraction sum. Find both numbers in the story and count back to answer it.',
        ],
      },
    },
  },
  {
    lessonId: 'subtraction-lesson-7',
    courseId: 'subtraction-made-easy',
    classId: 'class1',
    subjectSlug: 'mathematics',
    order: 7,
    title: 'Subtraction Practice',
    summary: 'Mix counting back, pictures and stories, and check each answer by adding it back.',
    estimatedMinutes: 15,
    status: 'available',
    content: {
      intro: {
        type: 'intro',
        title: 'Introduction',
        content: [
          'Skills become strong when we mix them, so let us now practise subtraction from several directions.',
        ],
      },
      keyPoints: {
        type: 'keyPoints',
        title: 'Key Points',
        list: [
          'Counting back, pictures and stories all check each other',
          'Adding the answer back is a strong way to check',
          'Reading the whole question first prevents silly mistakes',
        ],
      },
      explanation: {
        type: 'explanation',
        title: 'Explanation',
        content: [
          'When an answer does not feel right we can check it. We count back to find the answer, then add that answer to the number that was taken away. If we land on the number we started with, our answer is correct.',
        ],
      },
      example: {
        type: 'example',
        title: 'Example',
        content: [
          'Nine minus four. Count back: nine, eight, seven, six, five. Five is left. To check, add five and four and we reach nine again.',
        ],
      },
      practice: {
        type: 'practice',
        title: 'Practice',
        content: [
          'Write six subtraction sums within ten and solve them. Check each one by adding your answer back, and circle the sums you got right.',
        ],
      },
      recap: {
        type: 'recap',
        title: 'Recap',
        content: [
          'We subtract within ten by counting back, and we check our answers by adding them back again to reach the starting number.',
        ],
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
