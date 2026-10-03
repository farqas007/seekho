import type { Course } from '../../data/courses';
import { CourseCard } from './CourseCard';
import './CourseGrid.css';

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
    return <p className="courses-empty">{emptyMessage ?? 'Courses for this subject are coming soon.'}</p>;
  }

  return (
    <ul className="courses-grid">
      {courses.map((course) => (
        <li key={`${course.classId}-${course.subjectSlug}-${course.courseId}`} className="courses-grid-item">
          <CourseCard course={course} classId={classId} />
        </li>
      ))}
    </ul>
  );
}
