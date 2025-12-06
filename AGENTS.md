# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next 16 App Router entry point with route segments (about, guides, resources, tools) plus `layout.tsx`, `error.tsx`, `not-found.tsx`, and `loading.tsx`.
- `src/components`: Shared UI primitives and feature blocks; re-exported via `index.ts`. Use these before adding new patterns.
- `src/content/guides`: MDX guides consumed by the guides routes.
- `src/lib`: Calculations, constants, and utilities for forms and dates; keep domain logic here.
- `src/store`: Zustand stores (e.g., day tracker) with a lightweight `index.ts` barrel.
- `public`: Static assets (icons, images). `docs/` holds contributor-facing docs; `scripts/` is reserved for future tooling.

## Build, Test, and Development Commands
- `npm run dev` (or `pnpm dev`): Start the local dev server on :3000.
- `npm run build`: Production build for Next + Tailwind; run before release to catch routing/MDX issues.
- `npm run start`: Serve the built app locally for smoke testing.
- `npm run lint`: ESLint (Next config) across TS/TSX/MDX; fix warnings before pushing.

## Coding Style & Naming Conventions
- TypeScript + React App Router. Prefer server components; add `"use client"` only when hooks or state are required.
- Tailwind 4 via `globals.css`; compose classes with `clsx`, `class-variance-authority`, and `tailwind-merge`. Keep inline styles rare.
- Files in `src/components` use lowercase kebab filenames with named exports; type props locally with `type` or `interface`.
- Indent with 2 spaces. Favor small, pure helpers in `src/lib` rather than duplicating logic in routes or components.

## Testing Guidelines
- No automated suite is committed yet; add unit/interaction tests alongside new features using `*.test.ts[x]` or `*.spec.ts[x]` under `src` or `tests`.
- For UI flows, prefer Playwright or React Testing Library; ensure new tests run cleanly in CI once configured.
- Minimum gate today: run `npm run lint` and, when relevant, `npm run build` before opening a PR.

## Commit & Pull Request Guidelines
- Follow conventional commits (e.g., `feat:`, `refactor:`) as used in the current history.
- PRs should include a short scope/intent summary, linked issue, screenshots for UI changes, and the commands/tests executed (lint/build/tests). Note risks or rollout steps if any.
- Keep diffs focused; avoid mixing unrelated refactors with feature work.

## Security & Configuration Tips
- Store secrets in `.env.local` (gitignored) and mirror them in Vercel project settings; never commit credentials.
- Review `next.config.ts`, `vercel.json`, and `unsplash.config.json` before deploys to ensure allowed domains and asset settings remain intact.
