import type { Course } from '../../data/courses';
import { CourseCard } from './CourseCard';
import { EmptyState } from './EmptyState';

export type CourseGridProps = {
  /** Class that owns the courses, needed to build each course link. */
  classId: string;
  courses: readonly Course[];
  /** Shown instead of the grid when a subject has no courses yet. */
  emptyMessage?: string;
};

/** Reusable responsive list of course cards for any subject page. */
export function CourseGrid({ classId, courses, emptyMessage }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <EmptyState
        description={emptyMessage ?? 'Courses for this subject are coming soon.'}
      />
    );
  }

  return (
    <ul className="card-grid">
      {courses.map((course) => (
        <li
          key={`${course.classId}-${course.subjectSlug}-${course.courseId}`}
          className="card-grid-item"
        >
          <CourseCard course={course} classId={classId} />
        </li>
      ))}
    </ul>
  );
}
