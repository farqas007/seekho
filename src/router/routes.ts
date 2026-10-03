export const HOME_ROUTE = '/';

/** Path for a class page: /class/class1 */
export function classPath(classId: string): string {
  return `/class/${encodeURIComponent(classId)}`;
}

/** Path for a subject page: /class/class1/subject/mathematics */
export function subjectPath(classId: string, subjectSlug: string): string {
  return `${classPath(classId)}/subject/${encodeURIComponent(subjectSlug)}`;
}

/** Path for a course page: /class/class1/subject/mathematics/course/numbers-made-simple */
export function coursePath(classId: string, subjectSlug: string, courseId: string): string {
  return `${subjectPath(classId, subjectSlug)}/course/${encodeURIComponent(courseId)}`;
}

export type RouteMatch =
  | { name: 'home' }
  | { name: 'class'; classId: string }
  | { name: 'subject'; classId: string; subjectSlug: string }
  | { name: 'course'; classId: string; subjectSlug: string; courseId: string }
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

  return { name: 'notFound', path };
}
