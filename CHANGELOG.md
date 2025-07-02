# Changelog

## [0.5.0] - 2025-07-02

### Added
- Implemented user profile view at `app/profile/page.tsx`.
- Updated `api/user` to fetch current user data.
- Profile page displays user's email, join date, and their `PromptLog` and `Project` posts.

## [0.4.0] - 2025-07-02

### Added
- Implemented create/read comments functionality.
- Updated `CommentSection.tsx` to display and allow submission of comments.
- Integrated `CommentSection` into `app/prompt-logs/[id]/page.tsx` and `app/projects/[id]/page.tsx`.

## [0.3.0] - 2025-07-02

### Changed
- Polished UI with a new dark mode color scheme.
- Updated `tailwind.config.js` with a custom color palette.
- Refined global styles in `styles/global.css`.
- Applied new styles to `Navbar`, `WelcomeBanner`, `ProjectCard`, `PromptLogCard`, `PostFeed`, `PostFAB`, and tab buttons on `app/page.tsx`.

## [0.2.0] - 2025-07-02

### Added
- Implemented creating and viewing `Project` posts.
- Created API route `api/projects` with GET and POST handlers.
- Built a functional form at `app/projects/new/page.tsx`.
- Updated `ProjectCard` component to display project details.
- Main feed now correctly displays both `Project` and `PromptLog` posts.

## [0.1.0] - 2025-07-02

### Added
- Implemented creating and viewing `PromptLog` posts.
- Created API route `api/prompt-logs` with GET and POST handlers.
- Built a functional form at `app/prompt-logs/new/page.tsx`.
- Main feed at `app/page.tsx` now fetches and displays `PromptLog` posts.
- Created `PromptLogCard` component to display posts.
- Refactored main page and `PostFeed` to use server-side data fetching.
