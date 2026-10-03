export const HOME_ROUTE = '/';

/** Path for a class page: /class/class1 */
export function classPath(classId: string): string {
  return `/class/${encodeURIComponent(classId)}`;
}

/** Path reserved for the next step: /class/class1/subject/mathematics */
export function subjectPath(classId: string, subjectSlug: string): string {
  return `${classPath(classId)}/subject/${encodeURIComponent(subjectSlug)}`;
}

export type RouteMatch =
  | { name: 'home' }
  | { name: 'class'; classId: string }
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

  if (segments[0] === 'class' && segments.length === 2) {
    return { name: 'class', classId: segments[1] };
  }

  return { name: 'notFound', path };
}
