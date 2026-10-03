import type { Grade } from './classes';

export type SubjectSlug =
  | 'mathematics'
  | 'english'
  | 'science'
  | 'social-studies'
  | 'computer'
  | 'arts'
  | 'value-education'
  | 'health'
  | 'phonics';

export type SubjectArea = 'core' | 'language' | 'science' | 'social' | 'skills' | 'creative';

export type SubjectIconName =
  | 'calculator'
  | 'book'
  | 'flask'
  | 'globe'
  | 'monitor'
  | 'palette'
  | 'heart'
  | 'leaf'
  | 'sound';

export type SubjectTemplate = {
  slug: SubjectSlug;
  /** Default display name. A grade can override it with `GradeSubject.name`. */
  name: string;
  area: SubjectArea;
  description: string;
  icon: SubjectIconName;
};

/**
 * Every subject Seekho knows about. Add a subject here once and it becomes
 * available to all grades through `gradeSubjects` below.
 */
export const subjectTemplates: Record<SubjectSlug, SubjectTemplate> = {
  mathematics: {
    slug: 'mathematics',
    name: 'Mathematics',
    area: 'core',
    icon: 'calculator',
    description: 'Numbers, shapes and step-by-step problem solving.',
  },
  english: {
    slug: 'english',
    name: 'English',
    area: 'language',
    icon: 'book',
    description: 'Reading, writing and speaking with clear expression.',
  },
  science: {
    slug: 'science',
    name: 'Science',
    area: 'science',
    icon: 'flask',
    description: 'How the world works, explained through simple experiments.',
  },
  'social-studies': {
    slug: 'social-studies',
    name: 'Social Studies',
    area: 'social',
    icon: 'globe',
    description: 'History, geography and civics that shape our world.',
  },
  computer: {
    slug: 'computer',
    name: 'Computer',
    area: 'skills',
    icon: 'monitor',
    description: 'Everyday digital skills and safe, confident technology use.',
  },
  arts: {
    slug: 'arts',
    name: 'Arts',
    area: 'creative',
    icon: 'palette',
    description: 'Drawing, craft and creative expression for every learner.',
  },
  'value-education': {
    slug: 'value-education',
    name: 'Value Education',
    area: 'skills',
    icon: 'heart',
    description: 'Good habits, kindness and responsibility in daily life.',
  },
  health: {
    slug: 'health',
    name: 'Health and Hygiene',
    area: 'science',
    icon: 'leaf',
    description: 'Body awareness, hygiene and healthy everyday routines.',
  },
  phonics: {
    slug: 'phonics',
    name: 'Phonics',
    area: 'language',
    icon: 'sound',
    description: 'Letter sounds and early reading through rhythm and play.',
  },
};

/** How a subject is listed inside a class. Overrides are optional. */
export type GradeSubject = {
  slug: SubjectSlug;
  /** Use when a grade names the subject differently, e.g. "Environmental Studies". */
  name?: string;
  /** Use when a grade needs a different description. */
  description?: string;
};

/**
 * Subjects available in each grade, in display order.
 * Real curriculum content replaces these lists later without touching components.
 */
export const gradeSubjects: Record<Grade['id'], readonly GradeSubject[]> = {
  nursery: [
    { slug: 'phonics', description: 'Sounds and rhymes that make first words easy and fun.' },
    { slug: 'mathematics', name: 'Numbers and Shapes', description: 'Counting, comparing and spotting shapes through play.' },
    { slug: 'english', name: 'Language and Stories', description: 'Listening to stories and joining in with simple phrases.' },
    { slug: 'science', name: 'Nature and Discovery', description: 'Plants, animals and senses discovered through everyday play.' },
    { slug: 'arts', name: 'Art and Craft', description: 'Colours, clay and creative expression without pressure.' },
    { slug: 'health', name: 'Health and Hygiene', description: 'Clean hands, healthy food and safe habits at school.' },
  ],
  kg1: [
    { slug: 'phonics', description: 'Letter sounds and simple words through songs and games.' },
    { slug: 'mathematics', name: 'Numbers and Shapes', description: 'Counting to twenty, patterns and shape recognition.' },
    { slug: 'english', name: 'Language and Stories', description: 'Story time, vocabulary building and speaking in sentences.' },
    { slug: 'science', name: 'Nature and Discovery', description: 'Observation, nature walks and simple experiments.' },
    { slug: 'arts', name: 'Art and Craft', description: 'Drawing, colouring and simple craft projects.' },
    { slug: 'value-education', description: 'Sharing, kindness and classroom routines.' },
    { slug: 'health', name: 'Health and Hygiene', description: 'Personal hygiene and healthy daily habits.' },
  ],
  kg2: [
    { slug: 'phonics', description: 'Blending sounds into words for early reading.' },
    { slug: 'mathematics', name: 'Early Mathematics', description: 'Numbers to hundred, sorting and simple patterns.' },
    { slug: 'english', description: 'Phonics, picture reading and short sentence writing.' },
    { slug: 'science', name: 'Nature and Discovery', description: 'Living things, weather and hands-on exploration.' },
    { slug: 'arts', name: 'Art and Craft', description: 'Creative work with colour, paper and simple tools.' },
    { slug: 'value-education', description: 'Good behaviour, helping others and self-confidence.' },
    { slug: 'health', name: 'Health and Hygiene', description: 'Body parts, safety and healthy routines.' },
  ],
  class1: [
    { slug: 'mathematics', description: 'Counting, addition and shapes explained with pictures.' },
    { slug: 'english', description: 'Reading short passages and writing simple sentences.' },
    { slug: 'science', name: 'Environmental Studies', description: 'Plants, animals and the places we live in.' },
    { slug: 'arts', description: 'Drawing, colouring and craft with a little theory.' },
    { slug: 'computer', name: 'Computer Basics', description: 'Devices, mouse and keyboard skills in a safe setting.' },
    { slug: 'health', name: 'Health and Hygiene', description: 'Nutrition, hygiene and staying safe online.' },
  ],
  class2: [
    { slug: 'mathematics', description: 'Tables, mental maths and simple word problems.' },
    { slug: 'english', description: 'Story reading, grammar basics and paragraph writing.' },
    { slug: 'science', name: 'Environmental Studies', description: 'Living things and daily habits that keep us healthy.' },
    { slug: 'arts', description: 'Craft, colour theory and creative expression.' },
    { slug: 'computer', name: 'Computer Basics', description: 'Typing practice and safe use of devices.' },
    { slug: 'health', name: 'Health and Hygiene', description: 'Balanced food, exercise and personal care.' },
  ],
  class3: [
    { slug: 'mathematics', description: 'Multiplication, division and measurement.' },
    { slug: 'english', description: 'Reading comprehension and structured writing.' },
    { slug: 'science', name: 'Environmental Studies', description: 'Plants, food and the human body in simple terms.' },
    { slug: 'social-studies', description: 'Maps, communities and how places are organised.' },
    { slug: 'computer', name: 'Computer Basics', description: 'Files, typing and simple research habits.' },
    { slug: 'arts', description: 'Drawing skills and creative projects.' },
  ],
  class4: [
    { slug: 'mathematics', description: 'Fractions, area and reasoning through problems.' },
    { slug: 'english', description: 'Story writing, vocabulary and grammar in use.' },
    { slug: 'science', name: 'Environmental Studies', description: 'States of matter, plants and human health.' },
    { slug: 'social-studies', description: 'Direction, history timelines and local government.' },
    { slug: 'computer', name: 'Computer Basics', description: 'Typing speed, documents and online safety.' },
    { slug: 'arts', description: 'Perspective, colour and craft projects.' },
  ],
  class5: [
    { slug: 'mathematics', description: 'Decimals, patterns and word problem strategies.' },
    { slug: 'english', description: 'Essays, summarising and communication skills.' },
    { slug: 'science', name: 'Environmental Studies', description: 'Ecosystems, matter and the human body.' },
    { slug: 'social-studies', description: 'Maps, climate and civics with real examples.' },
    { slug: 'computer', name: 'Computer Basics', description: 'Presentations, spreadsheets and safe browsing.' },
    { slug: 'arts', description: 'Design thinking and creative problem solving.' },
  ],
  class6: [
    { slug: 'mathematics', description: 'Integers, fractions, algebra and geometry.' },
    { slug: 'english', description: 'Grammar, comprehension and writing for clarity.' },
    { slug: 'science', description: 'Physics, chemistry and biology introduced in order.' },
    { slug: 'social-studies', description: 'History, geography and civics with map work.' },
    { slug: 'computer', description: 'Programming basics and digital citizenship.' },
    { slug: 'arts', description: 'Visual art and design with practical projects.' },
  ],
  class7: [
    { slug: 'mathematics', description: 'Integers, rational numbers, algebra and mensuration.' },
    { slug: 'english', description: 'Reading analysis, letter writing and note making.' },
    { slug: 'science', description: 'Physics, chemistry and biology with practical ideas.' },
    { slug: 'social-studies', description: 'Medieval and modern history, climate and governance.' },
    { slug: 'computer', description: 'Algorithms, data basics and online safety habits.' },
    { slug: 'arts', description: 'Craft, composition and creative expression.' },
  ],
  class8: [
    { slug: 'mathematics', description: 'Algebra, geometry, mensuration and data handling.' },
    { slug: 'english', description: 'Character analysis, formal writing and grammar depth.' },
    { slug: 'science', description: 'Force and motion, chemical basis and life processes.' },
    { slug: 'social-studies', description: 'National movements, resources and democratic institutions.' },
    { slug: 'computer', description: 'Data handling, networks and responsible use of technology.' },
    { slug: 'arts', description: 'Design, proportion and creative projects.' },
  ],
  class9: [
    { slug: 'mathematics', description: 'Number systems, algebra and coordinate geometry.' },
    { slug: 'english', description: 'Literature, argument writing and precise vocabulary.' },
    { slug: 'science', description: 'Matter, motion, cells and experimental reasoning.' },
    { slug: 'social-studies', description: 'Democracy, globalisation and exam-style answers.' },
    { slug: 'computer', description: 'Python basics, networks and project work.' },
    { slug: 'value-education', description: 'Responsibility, ethics and preparing for the board years.' },
  ],
  class10: [
    {
      slug: 'mathematics',
      description: 'Full syllabus coverage with exam-focused practice and revision.',
    },
    { slug: 'english', description: 'Textiles, writing skills and board exam preparation.' },
    { slug: 'science', description: 'Complete physics, chemistry and biology with practicals.' },
    { slug: 'social-studies', description: 'History, geography, civics and map-based questions.' },
    { slug: 'computer', name: 'Computer Science', description: 'Coding, databases and computer science fundamentals.' },
    { slug: 'arts', description: 'Creative projects that build confidence and originality.' },
    { slug: 'value-education', description: 'Life skills, ethics and balanced choices.' },
  ],
};

/**
 * Placeholder course counts. Courses are the next step in the
 * Class → Subject → Course → Lesson → Quiz hierarchy, so this is where real
 * course lists will be counted from later.
 */
const placeholderCourseCounts: Record<SubjectSlug, number> = {
  mathematics: 0,
  english: 0,
  science: 0,
  'social-studies': 0,
  computer: 0,
  arts: 0,
  'value-education': 0,
  health: 0,
  phonics: 0,
};

export type Subject = {
  /** Unique id inside a class, e.g. `class1-mathematics`. */
  id: string;
  slug: SubjectSlug;
  gradeId: Grade['id'];
  name: string;
  description: string;
  area: SubjectArea;
  icon: SubjectIconName;
  /** Number of courses planned for this subject. Zero until courses exist. */
  courseCount: number;
};

export const subjectAreaLabels: Record<SubjectArea, string> = {
  core: 'Core',
  language: 'Language',
  science: 'Science',
  social: 'Social',
  skills: 'Skills',
  creative: 'Creative',
};

function toSubject(gradeId: Grade['id'], entry: GradeSubject): Subject {
  const template = subjectTemplates[entry.slug];
  return {
    id: `${gradeId}-${entry.slug}`,
    slug: entry.slug,
    gradeId,
    name: entry.name ?? template.name,
    description: entry.description ?? template.description,
    area: template.area,
    icon: template.icon,
    courseCount: placeholderCourseCounts[entry.slug],
  };
}

/** All subjects for a grade, in display order. */
export function getSubjectsForGrade(gradeId: Grade['id']): Subject[] {
  return gradeSubjects[gradeId].map((entry) => toSubject(gradeId, entry));
}

/** Finds one subject inside a grade. Used by the upcoming subject page. */
export function getSubjectBySlug(gradeId: Grade['id'], slug: string): Subject | undefined {
  const entry = gradeSubjects[gradeId].find((item) => item.slug === slug);
  return entry ? toSubject(gradeId, entry) : undefined;
}
