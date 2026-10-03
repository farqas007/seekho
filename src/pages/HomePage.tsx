import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ClassCard } from '../components/ui/ClassCard';
import { grades } from '../data/classes';
import { usePageTitle } from '../hooks/usePageTitle';
import './HomePage.css';

export function HomePage() {
  usePageTitle('Seekho - Free Learning Platform');

  return (
    <>
      <Header />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <section id="home" className="hero-section" tabIndex={-1}>
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to Seekho</h1>
              <p className="hero-subtitle">
                A free learning platform designed to make quality education
                accessible to every student.
              </p>
              <p className="hero-text">
                Learn at your own pace, explore concepts clearly, and build
                strong foundations for a bright future.
              </p>
            </div>
          </div>
        </section>

        <section id="classes" className="section" tabIndex={-1}>
          <div className="container">
            <h2 className="section-title">Choose Your Class</h2>
            <p className="section-subtitle">
              Find learning materials tailored to your grade level
            </p>
            <div className="classes-grid">
              {grades.map((grade) => (
                <ClassCard key={grade.id} grade={grade} />
              ))}
            </div>
          </div>
        </section>

        <section id="subjects" className="section bg-light" tabIndex={-1}>
          <div className="container">
            <h2 className="section-title">Subjects</h2>
            <p className="section-subtitle">
              Explore core subjects with engaging learning resources
            </p>
            <div className="placeholder-grid">
              <div className="placeholder-card">
                <h3>Mathematics</h3>
                <p>Concepts explained step by step</p>
              </div>
              <div className="placeholder-card">
                <h3>Science</h3>
                <p>Curiosity through exploration</p>
              </div>
              <div className="placeholder-card">
                <h3>English</h3>
                <p>Reading, writing and communication</p>
              </div>
              <div className="placeholder-card">
                <h3>Social Studies</h3>
                <p>Learn about the world around us</p>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="section" tabIndex={-1}>
          <div className="container">
            <h2 className="section-title">Courses</h2>
            <p className="section-subtitle">
              Structured learning paths for every student
            </p>
            <div className="placeholder-grid">
              <div className="placeholder-card">
                <h3>Foundation Course</h3>
                <p>Build strong basics across subjects</p>
              </div>
              <div className="placeholder-card">
                <h3>Practice Course</h3>
                <p>Reinforce learning with exercises</p>
              </div>
              <div className="placeholder-card">
                <h3>Revision Course</h3>
                <p>Quick recap before assessments</p>
              </div>
            </div>
          </div>
        </section>

        <section id="learning" className="section bg-light" tabIndex={-1}>
          <div className="container">
            <h2 className="section-title">Learning</h2>
            <p className="section-subtitle">
              A simple, structured path: Home → Class → Subject → Course →
              Lesson → Quiz
            </p>
            <div className="learning-steps">
              <div className="step">
                <span className="step-number">1</span>
                <h4>Select Class</h4>
                <p>Choose your grade level</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <h4>Pick Subject</h4>
                <p>Explore your interests</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <h4>Start Course</h4>
                <p>Follow a guided path</p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <h4>Take Quiz</h4>
                <p>Test your understanding</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
