import type { Subject } from '../../data/subjects';
import { subjectAreaLabels } from '../../data/subjects';
import { Link } from '../../router/Link';
import { Card } from './Card';
import { SubjectIcon } from './SubjectIcon';
import './SubjectCard.css';

export type SubjectCardProps = {
  subject: Subject;
  /**
   * Route of the subject page. Left out until the
   * Class → Subject → Course → Lesson → Quiz hierarchy continues, at which point
   * this card already renders the correct link.
   */
  href?: string;
};

export function SubjectCard({ subject, href }: SubjectCardProps) {
  const courseLabel =
    subject.courseCount > 0
      ? `${subject.courseCount} ${subject.courseCount === 1 ? 'course' : 'courses'}`
      : 'Courses coming soon';

  return (
    <Card className="subject-card">
      <div className="subject-card-head">
        <span className="subject-card-icon">
          <SubjectIcon name={subject.icon} />
        </span>
        <span className="subject-card-area">{subjectAreaLabels[subject.area]}</span>
      </div>

      <h3 className="subject-card-title">
        {href === undefined ? (
          subject.name
        ) : (
          <Link to={href} className="subject-card-link">
            {subject.name}
          </Link>
        )}
      </h3>

      <p className="subject-card-desc">{subject.description}</p>

      <p className="subject-card-meta">{courseLabel}</p>
    </Card>
  );
}
