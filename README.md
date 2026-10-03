# Seekho

Seekho is a free learning platform built to make quality education easy to
access. Students start by picking their class, then move through subjects to
reach courses, lessons and quizzes.

Current status: **Home → Class → Subject → Course → Lesson → Quiz**. Every step
is live: classes, subjects, courses, lessons and short quizzes at the end of a
lesson.

## Features

- Homepage with hero, class list, subject overview, course overview and the
  learning-path steps.
- Class selection for all 13 grades: Nursery, KG 1, KG 2 and Class 1 to Class 10.
- A dedicated class page per grade, reachable at `/class/<grade-id>`, showing
  the class name, a short description and its subject cards.
- A dedicated subject page per subject, reachable at
  `/class/<grade-id>/subject/<subject-slug>`, with breadcrumbs, back
  navigation and a list of that subject's courses.
- Course cards that link to `/class/<grade-id>/subject/<subject-slug>/course/<course-id>`
  and list that course's lessons in learning order.
- Lesson pages with intro, key points, explanation, example, practice and recap
  sections, previous/next lesson navigation and a "Start Quiz" entry point.
- Quiz pages at
  `/class/<grade-id>/subject/<subject-slug>/course/<course-id>/lesson/<lesson-id>/quiz/<quiz-id>`:
  one question at a time, selectable options, previous/next navigation,
  "Submit Quiz" on the last question, then a score screen with the correct
  count, the percentage, a per-question review, "Retry Quiz" and "Back to
  Lesson".
- Subject cards that are already structured for
  Class → Subject → Course → Lesson → Quiz.
- Clear "Back to Classes" and subject-level back navigation plus breadcrumbs
  on the class, subject, course, lesson and quiz pages.
- Responsive layout for mobile, tablet and desktop, with semantic HTML,
  keyboard-friendly links and focus management on navigation.
- All content is original placeholder text, ready to be replaced by real
  curriculum data.

## Tech stack

- React 19 + TypeScript
- Vite for dev server and production build
- Oxlint for linting
- Vitest for the unit tests over data, routing and scoring helpers
- No UI framework and no routing library — routing is a small History API layer
  inside `src/router` (see below)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build locally
npm run lint     # run oxlint
npm test         # run the unit tests once
```

## Project structure

```
src/
  components/
    layout/    Header, Footer, Breadcrumbs and shared page layout CSS
    ui/        Card, ClassCard, SubjectCard, CourseCard, CourseGrid, SubjectIcon, BackLink
    course/    LessonList
  data/
    classes.ts   Grade data for the 13 classes
    subjects.ts  Subject templates and the subject list for each grade
    courses.ts   Course templates, course lists per class/subject and lookup helpers
    lessons.ts   Lesson content per class/subject/course plus lesson navigation helpers
    quizzes.ts   Quiz questions per lesson plus quiz lookup and scoring helpers
  hooks/
    usePageTitle.ts
  pages/
    HomePage, ClassPage, SubjectPage, CoursePage, LessonPage, QuizPage, NotFoundPage
  router/
    Router.tsx        History API provider
    Link.tsx          Anchor that navigates without a reload
    routes.ts         Path builders and the route matcher
    routerContext.ts  Router context and useRouter hook
  App.tsx             Router + route to page mapping
  main.tsx
tests/
  routes.test.ts      Route matching and path building
  quizzes.test.ts     Quiz lookup, question data and score calculation
```

## Routing

Routing is intentionally tiny and dependency-free. `src/router/Router.tsx`
listens to `popstate`, pushes new entries with the History API and exposes the
current location through `useRouter()`. `src/router/Link.tsx` is a normal
anchor that intercepts plain left clicks, so modified clicks and "open in new
tab" keep working.

Routes:

| Path | Page |
| --- | --- |
| `/` | `HomePage` |
| `/class/<grade-id>` | `ClassPage` (for example `/class/class1`) |
| `/class/<grade-id>/subject/<subject-slug>` | `SubjectPage` (for example `/class/class1/subject/mathematics`) |
| `/class/<grade-id>/subject/<subject-slug>/course/<course-id>` | `CoursePage` |
| `/class/<grade-id>/subject/<subject-slug>/course/<course-id>/lesson/<lesson-id>` | `LessonPage` |
| `/class/<grade-id>/subject/<subject-slug>/course/<course-id>/lesson/<lesson-id>/quiz/<quiz-id>` | `QuizPage` |
| anything else | `NotFoundPage` |

The demo quiz URL is
`/class/class1/subject/mathematics/course/numbers-and-counting/lesson/lesson-1/quiz/quiz-1`.

Each path has a matching builder in `src/router/routes.ts` (`classPath`,
`subjectPath`, `coursePath`, `lessonPath`, `quizPath`), so pages and tests build
URLs instead of writing strings by hand.

Hash links such as `/#classes` are supported, so the header navigation keeps
working on inner pages.

The app is a single page application, so a static host must rewrite unknown
paths to `index.html` for deep links like `/class/class1` to work.

## Quizzes

`src/data/quizzes.ts` holds the quiz content and everything the quiz page needs:

- `getQuizForLesson(classId, subjectSlug, courseId, lessonId)` — the quiz
  offered for a lesson, or `undefined` when the lesson has none yet.
- `getQuizzesForLesson(...)` — every quiz of a lesson, in order.
- `getQuizById(classId, subjectSlug, courseId, quizId)` — one quiz, or
  `undefined` when any id is unknown.
- `getQuestionsForQuiz(quiz)` and `hasQuestions(quiz)` — question access plus the
  check the lesson page uses before showing "Start Quiz".
- `scoreQuiz(questions, answers)` — correct count, total and rounded percentage.
  Unanswered questions count as incorrect and an empty quiz scores 0.

Quiz state (current question, chosen answers, result) is local React state only.
Nothing is persisted, and there is no authentication, backend or progress
tracking yet, so a refresh restarts the quiz. `correctOptionId` is only read
while scoring, so the right answer is never revealed before the quiz is
submitted; afterwards the result screen shows what was chosen and what was
correct.

Unknown class, subject, course, lesson or quiz ids and quizzes without
questions all render a friendly message with breadcrumbs and a way back, using
the same pattern as the other pages.

## Adding real curriculum content

All learning content is data, not markup:

- Add or edit a class in `src/data/classes.ts`.
- Add a subject in `subjectTemplates` inside `src/data/subjects.ts`, then list
  its slug for the grades that should show it in `gradeSubjects`. A grade can
  override the display name and description per subject.
- Add a course template in `courseTemplates` inside `src/data/courses.ts`; it
  then exists for every grade, with the lesson count scaled per stage.
- Add lesson content in `src/data/lessons.ts` and its quiz in
  `src/data/quizzes.ts`. A lesson only needs the matching class, subject and
  course ids.
- `getSubjectsForGrade()`, `getSubjectBySlug()`, `getLessonsForCourse()` and
  `getQuizForLesson()` are the read helpers the pages use.

## Tests

`npm test` runs Vitest over the pure logic: quiz lookup and the shape of the
question data, score calculation, route matching and path building. The tests
live in `tests/` and are typechecked by `tsconfig.test.json`.

## Notes

- No authentication, backend, database, payments, admin panel or video
  functionality is included.
- No third-party or copyrighted course material is used; descriptions and quiz
  questions are original placeholders.

## Linting

The Oxlint config lives in `.oxlintrc.json`. For type-aware rules in a
production setup, add `oxlint-tsgolint` and enable `options.typeAware` — see
the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules).

> Learning path: Home → Class → Subject → Course → Lesson → Quiz.
