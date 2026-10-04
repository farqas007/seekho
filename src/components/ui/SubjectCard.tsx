import type { Subject } from '../../data/subjects';
import { subjectAreaLabels } from '../../data/subjects';
import { Link } from '../../router/Link';
import { Badge } from './Badge';
import { Card } from './Card';
import { SubjectIcon } from './SubjectIcon';
import './SubjectCard.css';

export type SubjectCardProps = {
  subject: Subject;
  /**
   * Route of the subject page. The class page passes
   * `subjectPath(gradeId, subject.slug)`; leaving it out renders the name as
   * plain text, which is handy for previews.
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
        <Badge>{subjectAreaLabels[subject.area]}</Badge>
      </div>

      <h3 className="subject-card-title">
        {href === undefined ? (
          subject.name
        ) : (
          <Link to={href} className="subject-card-link stretched-link">
            {subject.name}
          </Link>
        )}
      </h3>

      <p className="subject-card-desc">{subject.description}</p>

      <p className="subject-card-meta">{courseLabel}</p>
    </Card>
  );
}
