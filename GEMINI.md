# GEMINI.md — Project Brain for VibeCoders

##  Purpose
**VibeCoders** is a social, collaborative platform for the new wave of LLM-native, self-taught, and community-minded developers. Inspired by GitHub, IndieHackers, and Twitter — but built for the prompt-native era.

The goal is to create a space where developers:
- Share AI prompts, code, and full projects
- Discuss theory, workflows, and agentic development
- Connect through profiles, posts, and following
- Learn by building in public

---

## Agent Notes

This `GEMINI.md` file was updated by a Gemini agent.
During the last session, the agent switched from Gemini Pro to Gemini Flash.

The following tasks were completed by **Gemini Flash**:
- **Implement create/read comments** (version 0.4.0 in CHANGELOG.md)
- **Finish profile and project views** (version 0.5.0 in CHANGELOG.md)
- **Add real authentication** (marked as complete, as the existing Supabase implementation was confirmed)

Following the previous session, a new agent performed the following cleanup tasks:
- Standardized API routes to use `try...catch` blocks and consistent `NextRequest` typing.
- Created `jsconfig.json` to enable path aliases and updated all relevant import paths.
- Removed the redundant `app/projects/page.tsx` file.
- Updated the styling of the new project form to align with the application's theme.
- Corrected Supabase SQL schema to properly link `user_id` foreign keys to `auth.users.id`, resolving authentication-related insertion errors.