# GEMINI.md — Project Brain for VibeCoders

## Purpose
**VibeCoders** is a social, collaborative platform for a new wave of LLM-native, self-taught, and community-minded developers.  
It is designed to foster sharing of code, AI prompt logs, theory, and projects, enabling a “vibe” culture for learning, building, and connecting in public.

---

## Core Entities

### User
- id (UUID)
- username (unique)
- bio (text, optional)
- avatar_url (optional)
- created_at (timestamp)

### Project
- id (UUID)
- user_id (FK → users)
- title (string)
- description (text, optional)
- github_url (optional)
- tags (array, optional)
- created_at (timestamp)

### PromptLog
- id (UUID)
- user_id (FK → users)
- title (string)
- prompt (text)
- output (text, optional)
- lesson (text, optional)
- tools (array, optional)
- category (“Prompts” | “Code” | “Theory”)
- created_at (timestamp)

### Comment
- id (UUID)
- user_id (FK → users)
- post_type (“project” | “prompt_log”)
- post_id (FK → post)
- content (text)
- created_at (timestamp)

### Follow
- follower_id (FK → users)
- following_id (FK → users)
- created_at (timestamp)

---

## High-Level Workflow

1. **User visits feed:**  
   - Sees a toggleable stream of Prompts, Code, Theory posts
   - “Welcome to VibeCoders” banner and Discord link

2. **Sign up / Auth:**  
   - Account creation (planned: Supabase Auth, social sign-in)

3. **Posting:**  
   - User can create a Project or PromptLog post
   - Projects can link GitHub; PromptLogs record prompts/outputs/lessons

4. **Profile:**  
   - Public profile: username, avatar, bio, posts
   - Private actions: edit profile, see own drafts (planned)

5. **Interaction:**  
   - Like, comment on posts (follows planned for future)

6. **API:**  
   - REST endpoints via Next.js App Router API routes
   - Data persisted in Supabase tables as per schema above

---

## Key Design/UX Notes

- Clean, modern UI (Tailwind CSS), minimal friction
- MVP-first: ship working version, then iterate
- Only non-empty files in production (Next.js/Vercel requirement)
- Components: Navbar, WelcomeBanner, PostFeed, ProfileCard, ProjectCard, PromptLogCard, CommentSection, FAB, etc.
- Mobile-first and desktop responsive

---

## Deployment/Dev

- Next.js 14+ App Router
- Supabase Postgres
- Tailwind CSS
- Vercel for live deploy (auto from GitHub)
- All secrets in `.env.local` and Vercel environment variables

---

## Current Status

- Skeleton MVP deployed, working config
- UI functional, ready for styling and real data
- API endpoints stubbed (ready for logic)
- Next step: connect Supabase logic, style the site, launch with custom domain

---

## Open Questions

- Most important community features to build first?
- Should posts be further categorized or tagged?
- What onboarding makes sense for LLM-native/junior devs?

---

## Tasks/Goals

- [ ] Polish UI (colors, spacing, cards, avatars)
- [ ] Implement create/read comments
- [ ] Finish profile and project views
- [ ] Add real authentication
- [ ] Prepare launch copy and visuals

---

**This file serves as the single source of truth for VibeCoders project goals, schema, flows, and status. Update as the project grows!**

---
