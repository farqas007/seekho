import type { Course } from '../../data/courses';
import { courseStatusLabels } from '../../data/courses';
import { coursePath } from '../../router/routes';
import { Link } from '../../router/Link';
import { Card } from './Card';
import './CourseCard.css';

export type CourseCardProps = {
  course: Course;
  /** Class id that owns the course, used to build the course link. */
  classId: string;
  /**
   * Optional link override. The course id in the URL is unique per class and
   * subject, so the default path is correct in normal use.
   */
  href?: string;
};

/**
 * Reusable course card. The whole card is clickable through the title link,
 * which keeps one focusable element per card and a visible focus ring.
 */
export function CourseCard({ course, classId, href }: CourseCardProps) {
  const lessonLabel = `${course.lessonCount} ${course.lessonCount === 1 ? 'lesson' : 'lessons'}`;
  const to = href ?? coursePath(classId, course.subjectSlug, course.courseId);

  return (
    <Card className={`course-card course-card-${course.status}`}>
      <div className="course-card-head">
        <span className="course-card-stage">{course.stage}</span>
        <span className="course-card-status">{courseStatusLabels[course.status]}</span>
      </div>

      <h3 className="course-card-title">
        <Link to={to} className="course-card-link">
          {course.title}
        </Link>
      </h3>

      <p className="course-card-desc">{course.description}</p>

      <dl className="course-card-meta">
        <div className="course-card-meta-item">
          <dt className="course-card-meta-label">Level</dt>
          <dd className="course-card-meta-value">{course.level}</dd>
        </div>
        <div className="course-card-meta-item">
          <dt className="course-card-meta-label">Lessons</dt>
          <dd className="course-card-meta-value">{lessonLabel}</dd>
        </div>
      </dl>
    </Card>
  );
}
