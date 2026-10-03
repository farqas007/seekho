import { lessonPath } from '../../router/routes';
import './LessonList.css';

export interface LessonListItem {
  lessonId: string;
  order: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  status: 'available' | 'coming-soon';
}

export interface LessonListProps {
  classId: string;
  subjectSlug: string;
  courseId: string;
  lessons: LessonListItem[];
  emptyStateMessage?: string;
}

/**
 * Reusable lesson list UI. Shows lessons in order with lesson number, title,
 * summary, estimated time and status. Provides accessible links to lessons.
 */
export function LessonList({
  classId,
  subjectSlug,
  courseId,
  lessons,
  emptyStateMessage = 'Lessons coming soon',
}: LessonListProps) {
  if (lessons.length === 0) {
    return (
      <div className="lesson-list-empty" role="status">
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <ol className="lesson-list">
      {lessons.map((lesson) => {
        const isAvailable = lesson.status === 'available';
        const href = lessonPath(classId, subjectSlug, courseId, lesson.lessonId);
        const statusLabel = isAvailable ? 'Available' : 'Coming soon';

        return (
          <li key={lesson.lessonId} className="lesson-list-item">
            <a
              href={href}
              className="lesson-list-link"
              aria-label={`Lesson ${lesson.order}: ${lesson.title}, ${statusLabel}${
                isAvailable ? `, about ${lesson.estimatedMinutes} minutes` : ''
              }`}
            >
              <div className="lesson-list-number" aria-hidden="true">
                {lesson.order}
              </div>
              <div className="lesson-list-content">
                <h3 className="lesson-list-title">{lesson.title}</h3>
                <p className="lesson-list-summary">{lesson.summary}</p>
                <div className="lesson-list-meta">
                  <span className="lesson-list-time">{lesson.estimatedMinutes} min</span>
                  <span className="lesson-list-status">{statusLabel}</span>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
