# Seekho

Seekho is a free learning platform built to make quality education easy to
access. Students start by picking their class, then move through subjects to
reach courses, lessons and quizzes.

Current status: **Home → Class → Subject → Course**. Course pages are
placeholder "coming soon" pages; lessons and quizzes come next.

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
  (the course page is a coming-soon placeholder until lesson content is added).
- Subject cards that are already structured for
  Class → Subject → Course → Lesson → Quiz.
- Clear "Back to Classes" and subject-level back navigation plus breadcrumbs
  on the class, subject and course pages.
- Responsive layout for mobile, tablet and desktop, with semantic HTML,
  keyboard-friendly links and focus management on navigation.
- All content is original placeholder text, ready to be replaced by real
  curriculum data.

## Tech stack

- React 19 + TypeScript
- Vite for dev server and production build
- Oxlint for linting
- No UI framework and no routing library — routing is a small History API layer
  inside `src/router` (see below)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build locally
npm run lint     # run oxlint
```

## Project structure

```
src/
  components/
    layout/    Header, Footer, Breadcrumbs and shared page layout CSS
    ui/        Card, ClassCard, SubjectCard, CourseCard, CourseGrid, SubjectIcon, BackLink
  data/
    classes.ts   Grade data for the 13 classes
    subjects.ts  Subject templates and the subject list for each grade
    courses.ts   Course templates, course lists per class/subject and lookup helpers
  hooks/
    usePageTitle.ts
  pages/
    HomePage, ClassPage, SubjectPage, CoursePage, NotFoundPage
  router/
    Router.tsx        History API provider
    Link.tsx          Anchor that navigates without a reload
    routes.ts         Path builders and the route matcher
    routerContext.ts  Router context and useRouter hook
  App.tsx             Router + route to page mapping
  main.tsx
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
| `/class/<grade-id>/subject/<subject-slug>/course/<course-id>` | `CoursePage` (coming soon) |
| anything else | `NotFoundPage` |

Hash links such as `/#classes` are supported, so the header navigation keeps
working on inner pages.

The app is a single page application, so a static host must rewrite unknown
paths to `index.html` for deep links like `/class/class1` to work.

## Adding real curriculum content

All learning content is data, not markup:

- Add or edit a class in `src/data/classes.ts`.
- Add a subject in `subjectTemplates` inside `src/data/subjects.ts`, then list
  its slug for the grades that should show it in `gradeSubjects`. A grade can
  override the display name and description per subject.
- `getSubjectsForGrade()` and `getSubjectBySlug()` are the read helpers used by
  the pages. `courseCount` is a placeholder for the upcoming course step.

## Notes

- No authentication, backend, database, payments, admin panel or video
  functionality is included.
- No third-party or copyrighted course material is used; descriptions are
  original placeholders.

## Linting

The Oxlint config lives in `.oxlintrc.json`. For type-aware rules in a
production setup, add `oxlint-tsgolint` and enable `options.typeAware` — see
the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules).