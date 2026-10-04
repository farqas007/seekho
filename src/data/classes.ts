export type GradeStage = 'Pre-Primary' | 'Primary' | 'Middle School' | 'Secondary';

export type Grade = {
  /** Stable id used in URLs: /class/<id> */
  id: string;
  name: string;
  /** Short tagline shown on the class cards. */
  description: string;
  /** Broad learning stage this class belongs to. */
  stage: GradeStage;
  /** Short description shown on the class page. */
  summary: string;
};

export const grades: Grade[] = [
  {
    id: 'nursery',
    name: 'Nursery',
    description: 'Play-based early learning',
    stage: 'Pre-Primary',
    summary:
      'Our starting point for little learners, with gentle play-based activities for letters, numbers and movement.',
  },
  {
    id: 'kg1',
    name: 'KG 1',
    description: 'Foundational skills',
    stage: 'Pre-Primary',
    summary:
      'Young learners meet sounds, shapes and stories through simple activities that build everyday confidence.',
  },
  {
    id: 'kg2',
    name: 'KG 2',
    description: 'Pre-primary readiness',
    stage: 'Pre-Primary',
    summary:
      'A readiness step that strengthens reading habits, number sense and curiosity before the primary years begin.',
  },
  {
    id: 'class1',
    name: 'Class 1',
    description: 'Fun with basics',
    stage: 'Primary',
    summary:
      'The first primary year focuses on reading fluency, number sense and discovering the world around us.',
  },
  {
    id: 'class2',
    name: 'Class 2',
    description: 'Growing confidence',
    stage: 'Primary',
    summary:
      'Learners practise what they know and start applying it, with clearer habits of reading and writing.',
  },
  {
    id: 'class3',
    name: 'Class 3',
    description: 'Core concepts',
    stage: 'Primary',
    summary:
      'Core concepts take shape here: solid number work, wider vocabulary and an introduction to social studies.',
  },
  {
    id: 'class4',
    name: 'Class 4',
    description: 'Curiosity building',
    stage: 'Primary',
    summary:
      'A year of growing curiosity, where learners connect subjects with the places, people and events around them.',
  },
  {
    id: 'class8',
    name: 'Class 8',
    description: 'Strong foundations',
    stage: 'Middle School',
    summary:
      'Strong foundations are consolidated here, with steady practice to prepare for the board years ahead.',
  },
  {
    id: 'class5',
    name: 'Class 5',
    description: 'Skill development',
    stage: 'Primary',
    summary:
      'Skills become more independent: multi-step problems, structured writing and organised study habits.',
  },
  {
    id: 'class9',
    name: 'Class 9',
    description: 'Advanced concepts',
    stage: 'Secondary',
    summary:
      'Advanced concepts arrive, and every subject starts pointing towards the annual examination.',
  },
  {
    id: 'class6',
    name: 'Class 6',
    description: 'Middle school start',
    stage: 'Middle School',
    summary:
      'The middle school journey begins, with science, mathematics and social studies taught in more depth.',
  },
  {
    id: 'class10',
    name: 'Class 10',
    description: 'Board readiness',
    stage: 'Secondary',
    summary:
      'The final year of school, focused on board readiness through clear explanations and structured practice.',
  },
  {
    id: 'class7',
    name: 'Class 7',
    description: 'Deeper learning',
    stage: 'Middle School',
    summary:
      'Learners handle longer explanations and start connecting ideas across subjects instead of in isolation.',
  },
];

/** Returns the grade for a route id such as `class1`, or undefined when unknown. */
export function getGradeById(id: string): Grade | undefined {
  return grades.find((grade) => grade.id === id);
}
