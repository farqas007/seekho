export const HOME_ROUTE = '/';

/** Path for a class page: /class/class1 */
export function classPath(classId: string): string {
  return `/class/${encodeURIComponent(classId)}`;
}

/** Path for a subject page: /class/class1/subject/mathematics */
export function subjectPath(classId: string, subjectSlug: string): string {
  return `${classPath(classId)}/subject/${encodeURIComponent(subjectSlug)}`;
}

/** Path for a course page: /class/class1/subject/mathematics/course/numbers-and-counting */
export function coursePath(classId: string, subjectSlug: string, courseId: string): string {
  return `${subjectPath(classId, subjectSlug)}/course/${encodeURIComponent(courseId)}`;
}

/** Path for a lesson page: /class/class1/subject/mathematics/course/numbers-and-counting/lesson/lesson-1 */
export function lessonPath(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
): string {
  return `${coursePath(classId, subjectSlug, courseId)}/lesson/${encodeURIComponent(lessonId)}`;
}

/** Path for a quiz page: /class/class1/subject/mathematics/course/numbers-and-counting/lesson/lesson-1/quiz/quiz-1 */
export function quizPath(
  classId: string,
  subjectSlug: string,
  courseId: string,
  lessonId: string,
  quizId: string,
): string {
  return `${lessonPath(classId, subjectSlug, courseId, lessonId)}/quiz/${encodeURIComponent(quizId)}`;
}

export type RouteMatch =
  | { name: 'home' }
  | { name: 'class'; classId: string }
  | { name: 'subject'; classId: string; subjectSlug: string }
  | { name: 'course'; classId: string; subjectSlug: string; courseId: string }
  | { name: 'lesson'; classId: string; subjectSlug: string; courseId: string; lessonId: string }
  | {
      name: 'quiz';
      classId: string;
      subjectSlug: string;
      courseId: string;
      lessonId: string;
      quizId: string;
    }
  | { name: 'notFound'; path: string };

function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

/** Turns a browser pathname into a typed route the app can render. */
export function matchRoute(pathname: string): RouteMatch {
  const path = normalize(pathname);
  const segments = path.split('/').filter(Boolean).map(safeDecode);

  if (segments.length === 0) {
    return { name: 'home' };
  }

  if (segments[0] !== 'class') {
    return { name: 'notFound', path };
  }

  if (segments.length === 2) {
    return { name: 'class', classId: segments[1] };
  }

  if (segments.length === 4 && segments[2] === 'subject') {
    return { name: 'subject', classId: segments[1], subjectSlug: segments[3] };
  }

  if (segments.length === 6 && segments[2] === 'subject' && segments[4] === 'course') {
    return {
      name: 'course',
      classId: segments[1],
      subjectSlug: segments[3],
      courseId: segments[5],
    };
  }

  if (
    segments.length === 8 &&
    segments[2] === 'subject' &&
    segments[4] === 'course' &&
    segments[6] === 'lesson'
  ) {
    return {
      name: 'lesson',
      classId: segments[1],
      subjectSlug: segments[3],
      courseId: segments[5],
      lessonId: segments[7],
    };
  }

  if (
    segments.length === 10 &&
    segments[2] === 'subject' &&
    segments[4] === 'course' &&
    segments[6] === 'lesson' &&
    segments[8] === 'quiz'
  ) {
    return {
      name: 'quiz',
      classId: segments[1],
      subjectSlug: segments[3],
      courseId: segments[5],
      lessonId: segments[7],
      quizId: segments[9],
    };
  }

  return { name: 'notFound', path };
}
