import type { GradeStage } from './classes';
import { grades } from './classes';
import type { SubjectSlug } from './subjects';

/** How hard a course is, used for labelling only. */
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Availability of a course. Every course is `coming-soon` while only
 * placeholder metadata exists; flip a template to `available` once its lessons
 * and quizzes are written.
 */
export type CourseStatus = 'available' | 'coming-soon';

/** Where a course sits inside a subject, in learning order. */
export type CourseStage = 'Getting started' | 'Building skills' | 'Applying and revising';

/**
 * A reusable course blueprint. One set per subject is enough for every class,
 * so adding real course content means replacing these entries instead of
 * writing hundreds of class-specific copies.
 */
export type CourseTemplate = {
  /** Unique inside its subject. Becomes the courseId in URLs. */
  id: string;
  stage: CourseStage;
  title: string;
  description: string;
  level: CourseLevel;
  /** Lessons at primary level; scaled for other stages in `createCourse`. */
  lessonCount: number;
  status: CourseStatus;
};

/**
 * A course as pages read it, always tied to one class and one subject:
 * Class → Subject → Course → Lesson → Quiz.
 */
export type Course = {
  courseId: string;
  classId: string;
  subjectSlug: SubjectSlug;
  title: string;
  description: string;
  level: CourseLevel;
  stage: CourseStage;
  lessonCount: number;
  status: CourseStatus;
};

export const courseLevelLabels: Record<CourseLevel, string> = {
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
};

export const courseStatusLabels: Record<CourseStatus, string> = {
  available: 'Ready to learn',
  'coming-soon': 'Available soon',
};

/**
 * Original placeholder courses, three per subject in learning order. The
 * titles and descriptions are ours; nothing here is copied course material.
 */
export const courseTemplates: Record<SubjectSlug, readonly CourseTemplate[]> = {
  mathematics: [
    {
      id: 'numbers-and-counting',
      stage: 'Getting started',
      title: 'Numbers Made Simple',
      description: 'Counting, reading and writing numbers with everyday examples.',
      level: 'Beginner',
      lessonCount: 7,
      status: 'available',
    },
    {
      id: 'addition-made-easy',
      stage: 'Building skills',
      title: 'Addition Made Easy',
      description: 'Putting groups together with simple sums, pictures and short stories.',
      level: 'Beginner',
      lessonCount: 7,
      status: 'available',
    },
    {
      id: 'subtraction-made-easy',
      stage: 'Building skills',
      title: 'Subtraction Made Easy',
      description: 'Taking things away, counting back and finding how many are left with pictures and short stories.',
      level: 'Beginner',
      lessonCount: 7,
      status: 'available',
    },
    {
      id: 'shapes-and-patterns',
      stage: 'Building skills',
      title: 'Shapes and Patterns',
      description: 'Recognising shapes, spotting patterns and sorting objects.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'maths-challenge-corner',
      stage: 'Applying and revising',
      title: 'Maths Challenge Corner',
      description: 'Step-by-step practice on problems that mix several skills.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  english: [
    {
      id: 'reading-together',
      stage: 'Getting started',
      title: 'Reading Together',
      description: 'Reading short passages aloud and talking about what happened.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'writing-with-clarity',
      stage: 'Building skills',
      title: 'Writing with Clarity',
      description: 'Sentences, paragraphs and the punctuation that makes them clear.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'words-in-action',
      stage: 'Applying and revising',
      title: 'Words in Action',
      description: 'Choosing the right word and using it well in own writing.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  science: [
    {
      id: 'curiosity-starts-here',
      stage: 'Getting started',
      title: 'Curiosity Starts Here',
      description: 'Looking closely at plants, animals and the world around us.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'how-things-work',
      stage: 'Building skills',
      title: 'How Things Work',
      description: 'Simple observations turned into everyday explanations.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'experiments-at-home',
      stage: 'Applying and revising',
      title: 'Experiments at Home',
      description: 'Safe, low-cost experiments and what each one shows.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  'social-studies': [
    {
      id: 'places-around-us',
      stage: 'Getting started',
      title: 'Places Around Us',
      description: 'Maps, directions and how a community is arranged.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'people-and-stories',
      stage: 'Building skills',
      title: 'People and Stories',
      description: 'Lives, work and change, told through short timelines.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'how-we-govern',
      stage: 'Applying and revising',
      title: 'How We Govern',
      description: 'Rules, rights and the institutions that look after everyone.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  computer: [
    {
      id: 'devices-and-safety',
      stage: 'Getting started',
      title: 'Devices and Safety',
      description: 'Parts of a computer, safe habits and confident everyday use.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'typing-and-files',
      stage: 'Building skills',
      title: 'Typing and Files',
      description: 'Keyboard skills, naming, saving and finding work again.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'first-steps-in-coding',
      stage: 'Applying and revising',
      title: 'First Steps in Coding',
      description: 'Breaking a task into steps that a machine could follow.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  arts: [
    {
      id: 'lines-and-colours',
      stage: 'Getting started',
      title: 'Lines and Colours',
      description: 'Drawing what you see with confident, pressure-free strokes.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'shape-and-space',
      stage: 'Building skills',
      title: 'Shape and Space',
      description: 'Proportion, depth and composition in a picture or craft piece.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'creative-project',
      stage: 'Applying and revising',
      title: 'Creative Project',
      description: 'Plan, build and finish an original piece of your own work.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  'value-education': [
    {
      id: 'good-habits-daily',
      stage: 'Getting started',
      title: 'Good Habits Daily',
      description: 'Small routines for kindness, sharing and responsibility.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'listening-and-speaking',
      stage: 'Building skills',
      title: 'Listening and Speaking',
      description: 'Respectful conversations, apologies and honest feedback.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'choosing-well',
      stage: 'Applying and revising',
      title: 'Choosing Well',
      description: 'Balanced choices when pressure, temptation or rules disagree.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  health: [
    {
      id: 'clean-and-healthy',
      stage: 'Getting started',
      title: 'Clean and Healthy',
      description: 'Handwashing, food choices and routines that protect health.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'body-in-motion',
      stage: 'Building skills',
      title: 'Body in Motion',
      description: 'Exercise, rest, sleep and how the body responds to each.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'safety-everywhere',
      stage: 'Applying and revising',
      title: 'Safety Everywhere',
      description: 'Staying safe at school, on the road and online.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
  phonics: [
    {
      id: 'first-sounds',
      stage: 'Getting started',
      title: 'First Sounds',
      description: 'Listening for letter sounds and matching sound to symbol.',
      level: 'Beginner',
      lessonCount: 8,
      status: 'coming-soon',
    },
    {
      id: 'blending-together',
      stage: 'Building skills',
      title: 'Blending Together',
      description: 'Sounding out words and joining sounds into readable chunks.',
      level: 'Intermediate',
      lessonCount: 10,
      status: 'coming-soon',
    },
    {
      id: 'reading-with-flow',
      stage: 'Applying and revising',
      title: 'Reading with Flow',
      description: 'Reading phrases and short lines with rhythm and confidence.',
      level: 'Advanced',
      lessonCount: 12,
      status: 'coming-soon',
    },
  ],
};

/** Older classes need more steps, pre-primary learners need fewer. */
const stageLessonScale: Record<GradeStage, number> = {
  'Pre-Primary': 0.5,
  Primary: 1,
  'Middle School': 1.25,
  Secondary: 1.5,
};

const minLessons = 4;

function scaledLessonCount(lessonCount: number, stage: GradeStage): number {
  return Math.max(minLessons, Math.round(lessonCount * stageLessonScale[stage]));
}

/** True when a string matches a subject Seekho knows about. */
export function isSubjectSlug(value: string): value is SubjectSlug {
  return Object.hasOwn(courseTemplates, value);
}

/** Combines a class and subject into the key used by the lookup maps. */
function courseKey(classId: string, subjectSlug: string): string {
  return `${classId}/${subjectSlug}`;
}

function createCourse(
  classId: string,
  subjectSlug: SubjectSlug,
  stage: GradeStage,
  template: CourseTemplate,
): Course {
  return {
    courseId: template.id,
    classId,
    subjectSlug,
    title: template.title,
    description: template.description,
    level: template.level,
    stage: template.stage,
    lessonCount: scaledLessonCount(template.lessonCount, stage),
    status: template.status,
  };
}

function buildCourseIndex(): Map<string, Course[]> {
  const index = new Map<string, Course[]>();

  for (const grade of grades) {
    for (const subjectSlug of Object.keys(courseTemplates) as SubjectSlug[]) {
      const list = courseTemplates[subjectSlug].map((template) =>
        createCourse(grade.id, subjectSlug, grade.stage, template),
      );
      index.set(courseKey(grade.id, subjectSlug), list);
    }
  }

  return index;
}

const courseIndex = buildCourseIndex();

/** Every course Seekho currently plans, across all classes and subjects. */
export const courses: readonly Course[] = [...courseIndex.values()].flat();

/** Courses for one subject inside one class. Empty when either is unknown. */
export function getCoursesForSubject(classId: string, subjectSlug: string): Course[] {
  return courseIndex.get(courseKey(classId, subjectSlug)) ?? [];
}

/** How many courses a subject page should advertise. Zero for unknown ids. */
export function getCourseCountForSubject(classId: string, subjectSlug: string): number {
  return getCoursesForSubject(classId, subjectSlug).length;
}

/**
 * Finds one course inside a class and subject. Returns undefined when the
 * class, subject or course id does not match, so pages can show a friendly
 * message instead of rendering a broken course.
 */
export function getCourseById(
  classId: string,
  subjectSlug: string,
  courseId: string,
): Course | undefined {
  return getCoursesForSubject(classId, subjectSlug).find(
    (course) => course.courseId === courseId,
  );
}
