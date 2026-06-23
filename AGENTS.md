# Repository guide

This repo holds two independent parts:

- [`helmsman/`](helmsman/) — the **Helmsman instruction pack** (documentation only). For the
  agent workflow and rules, read [`helmsman/AGENTS.md`](helmsman/AGENTS.md). Do not flatten or
  copy that pack to the repo root.
- [`site/`](site/) — a **Next.js** landing page that explains Helmsman.

## Cursor Cloud specific instructions

There are two distinct components; treat them separately.

### `helmsman/` (instruction pack)
- Documentation only: Markdown plus `LICENSE`. Nothing to install, build, run, or unit-test.
- Sanity check is internal Markdown link validity. Links into `helmsman/project/` (e.g.
  `INFRASTRUCTURE.md`, `DESIGN.md`, `project/design/`, `project/documents/`) are **expected to be
  missing** in a fresh clone — they are gitignored, per-project files agents generate at runtime.

### `site/` (Next.js landing page)
- Stack: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Package manager: npm.
- All commands run **inside `site/`** (this is not a workspace/monorepo tool setup):
  `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`.
- `npm install` for the site is handled by the startup update script; if you add dependencies,
  re-run `npm install` in `site/` — the dev server does not pick up new packages on its own.
- Fonts are loaded via `next/font/google` at build time, so the first dev build needs network
  access; subsequent builds are cached.
