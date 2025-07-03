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

---

## Current Session Updates (July 2, 2025)

This session focused on resolving critical build and type-checking errors encountered during Vercel deployment, following an attempt to update the site's design.

**Key Issues Addressed:**
- **Tailwind CSS Utility Class Recognition:** Resolved `Cannot apply unknown utility class \`bg-background\`` error by ensuring correct Tailwind CSS compilation and application in `styles/global.css`. The initial attempt to change the theme was reverted to debug compilation issues.
- **Next.js `searchParams` Type Error:** Fixed `Type '{ searchParams: { tab: string; }; }' does not satisfy the constraint 'PageProps'` in `app/page.tsx` by adjusting the `searchParams` prop type definition and access pattern to align with Next.js Server Component expectations.
- **Next.js Dynamic Route `params` Type Error:** Resolved similar `Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'` errors in `app/projects/[id]/page.tsx` and `app/prompt-logs/[id]/page.tsx`. The solution involved explicitly typing `params` as `Promise<{ id: string }>` and `await`ing it, which was an unconventional but necessary workaround for the specific type inference issue in the Vercel build environment.
- **Supabase Client Import and Initialization:** Corrected `Cannot find module './supabase'` and `Module '"./supabase/client"' has no exported member 'supabase'` errors in `lib/auth.ts` by ensuring `createClient` was correctly imported and used to instantiate the Supabase client.
- **Supabase `cookies()` Type Inference Issue:** Addressed the persistent `Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'` error in `lib/supabase/server.ts`. This was a challenging issue where `cookies()` from `next/headers` was incorrectly inferred as a Promise by the Vercel build environment. The final resolution involved making the `get`, `set`, and `remove` methods `async` and explicitly `await`ing the `cookies()` call within them.

**Code-wise Context:**
The persistent type errors, particularly those related to `Promise<ReadonlyRequestCookies>` and `PageProps` constraints on `params` and `searchParams`, suggest potential discrepancies in how Next.js's types are resolved or interpreted within the Vercel build environment compared to local development. The solutions implemented were direct workarounds for these specific type inference issues, ensuring the code compiles successfully on Vercel. A clean `npm install` and clearing Vercel cache were also crucial steps in resolving these issues.
