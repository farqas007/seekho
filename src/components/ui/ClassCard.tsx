import type { Grade } from '../../data/classes';
import { classPath } from '../../router/routes';
import { Link } from '../../router/Link';
import { Card } from './Card';
import './ClassCard.css';

type ClassCardProps = {
  grade: Grade;
};

export function ClassCard({ grade }: ClassCardProps) {
  return (
    <Card className="class-card">
      <p className="class-card-stage">{grade.stage}</p>
      <h3 className="class-card-title">
        <Link to={classPath(grade.id)} className="class-card-link stretched-link">
          {grade.name}
        </Link>
      </h3>
      <p className="class-card-desc">{grade.description}</p>
      <span className="class-card-cta" aria-hidden="true">
        View subjects
      </span>
    </Card>
  );
}
