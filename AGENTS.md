# Agent Instructions

General agent workflow for any project using this instruction set. **Read-only template** — do not edit during normal project work.

Project-specific stack, folder layout, and config: [`PROJECT/`](PROJECT/). Start with [`README.MD`](README.MD).

## 1. Before You Start

1. Read [`README.MD`](README.MD) — two-tier system and `{root}` terminology
2. Read this file, [`CODE.MD`](CODE.MD), [`DESIGN.MD`](DESIGN.MD), [`HISTORY.MD`](HISTORY.MD), [`DOCUMENT.MD`](DOCUMENT.MD)
3. For greenfield tasks, read [`GREENFIELD.MD`](GREENFIELD.MD) — default stack, bootstrap playbook, Definition of Done
4. Read [`PROJECT/OVERVIEW.MD`](PROJECT/OVERVIEW.MD) → [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) → [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD)
5. Scan [`PROJECT/HISTORY/`](PROJECT/HISTORY/) newest first for recent context
6. When working on a known feature, scan [`PROJECT/DOCUMENT/{feature}/`](PROJECT/DOCUMENT/) for existing specs

## 2. Clarify Before Build

**Ask first, code second.** On every task, scan what the user request and existing `PROJECT/*` files do **not** specify. Do not write or edit files under `platforms/`, `deploy/`, or `PROJECT/` config (except to record answers) until every unspecified decision needed for the task is resolved.

If the user says *"use your recommendations"*, *"you decide"*, or similar — apply documented defaults from this instruction set (including [`GREENFIELD.MD`](GREENFIELD.MD) when greenfield), record them in `PROJECT/*`, then proceed.

**`GREENFIELD.MD` does not bypass clarify.** Even when greenfield recommendations exist, agents must still ask (one batch) and wait for confirmation or explicit delegation before writing `platforms/` code. Pre-filled `PROJECT/*` stubs are examples, not locked decisions.

### How to ask

- Use structured questions (e.g. Cursor `AskQuestion`) when multiple valid options exist
- Send **one batch** of related questions per turn — do not drip-feed across many turns unless the user answers partially
- Every question must state: what is missing, why it matters (which rule or file it affects), and a **Recommended:** default

### Clarification checklist

Ask only what is still unspecified for this task:

| Area | What to resolve | Typical recommendation |
|------|-----------------|------------------------|
| Greenfield | New app from scratch? Stack and playbook | [`GREENFIELD.MD`](GREENFIELD.MD) — **always ask**; use as **Recommended:** answers; never skip clarify; proceed only after user confirms or says *"use recommendations"* |
| Purpose and scope | What the app/feature does, MVP boundaries | Smallest useful MVP; todo app → authenticated CRUD per GREENFIELD |
| Project slug | `{project}` name | Derived from app name, kebab-case (e.g. `todo-app`) |
| Platform apps | `web`, `api`, `db`, etc. | `web` + `api` + `db` for full-stack |
| Stack | Framework per app | **Ask every greenfield task** — Recommended: Go Gin+GORM api, Next.js web per [`GREENFIELD.MD`](GREENFIELD.MD) unless `PROJECT/*` already locked |
| Auth | Needed? Type? | **Required** for multi-user apps (e.g. todos); auth scaffold per [`CODE.MD`](CODE.MD) section 9 |
| Database | Engine, hosting | PostgreSQL in `platforms/db/` |
| Migrations | Path | Inside backend (default per section 3) |
| Docker | Dockerfile location | Scaffold Docker if present; else `platforms/<app>/docker/` |
| Deploy | Target environment | Create `deploy/` in target project per [`GREENFIELD.MD`](GREENFIELD.MD) section 8 examples |
| Design | Theme, density, accent, component library | Document in `PROJECT/DESIGN.MD` — dark, content-first, mobile-first; popular UI library for web |
| Layout (web) | Mobile-first responsive | Per [`DESIGN.MD`](DESIGN.MD) — mobile default, enhance for desktop; document breakpoints in `PROJECT/DESIGN.MD` |
| UI components | Component library for web | Per [`DESIGN.MD`](DESIGN.MD) — popular npm/GitHub library; document in `PROJECT/DESIGN.MD` |
| Feature docs | Which DOCUMENT files | Per [`DOCUMENT.MD`](DOCUMENT.MD) complexity table; todo app → adapt [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) |
| Data conventions | UUID PKs, soft delete | Per [`CODE.MD`](CODE.MD) section 11 — UUID + `deleted_at` on all entities |
| CRUD scope | Full page/API surface for entity features | Per [`CODE.MD`](CODE.MD) section 11 — index, create, edit, detail, delete modal |
| API conventions | Response codes + scenarios | Per [`CODE.MD`](CODE.MD) section 8 — `code` on every response; frontend scenario matrix |

### After answers

1. Write decisions to the right `PROJECT/*` files (`OVERVIEW`, `AGENTS`, `DESIGN`) and `PROJECT/DOCUMENT/{feature}/` when building a feature
2. Then proceed to scaffold and code per existing rules

### When clarification can be skipped

- The user already specified the detail in the current message or a prior turn
- `PROJECT/*` already documents it and the task does not change it
- Truly trivial typo or format-only edits with zero behavioral or config impact

## 3. Minimum App Requirements

Every project must address these four concerns. Runnable apps always live under `{root}/platforms/` (fixed name, always plural). Which child apps exist (`web`, `api`, `migration`, `db`, etc.) and where docker/deploy paths live are per-project — document them in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD).

| Requirement | What every project must have | Examples only (not prescriptive) |
|-------------|------------------------------|----------------------------------|
| **App** | Application source code — frontend, backend, migration runner, or monolith | `platforms/web`, `platforms/api`, `src/` |
| **Docker** | Every runnable platform app must be dockerizable (working container build) — path from scaffold or `platforms/<app>/docker/` when added manually | `platforms/web/docker/`, `platforms/api/Dockerfile` |
| **Deploy / Build** | Build, export, compose, deployment, backup/restore | `deploy/`, `scripts/`, `ops/` |
| **DB** | Database infrastructure, schema migrations, seeds, backup strategy | `platforms/db/`, `platforms/api/migrations/` or `platforms/api/prisma/` (migrations default in backend) |

The **DB** requirement covers two separate concerns — do not conflate them:

| Sub-concern | Purpose | Example paths |
|-------------|---------|---------------|
| **DB infra** | Run/build PostgreSQL (compose, version, volumes, init SQL) | `platforms/db/` |
| **Migrations** | Schema changes and seeds | Inside backend by default (`platforms/api/migrations/`, `platforms/api/prisma/`, etc.); standalone `platforms/migration/` only when user explicitly requests it |

Migrations do **not** belong in the DB infra folder. Document the exact migration path in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD). If using a standalone migration app, note the user request in `PROJECT/HISTORY/`.

### Platforms layout

Runnable apps always live under `{root}/platforms/` — **fixed name, always plural**, not derived from the project or app slug. Child folders (`web`, `api`, `migration`, etc.) are per-project — document them in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD):

- `platforms/web`, `platforms/api`, `platforms/db`, etc. are **standalone applications** — each runnable on its own without depending on sibling folders or a root workspace
- `platforms/migration/` is **optional** — only when the user explicitly requests a separate migration runner; otherwise migrations live in the backend app
- Each app is **fully isolated**: its own dependencies, config, and secrets (e.g. `package.json` + `node_modules`, `.env` + `.env.example`, lockfile, or whatever that stack uses — not every app is Node/npm). Each app has its own `.env` inside its folder — never a shared root `.env` for app config
- No assumed monorepo root workspace — do not require a single shared install at `{root}`
- **Every** runnable app under `platforms/<app>/` must be dockerizable; if the scaffold includes Docker config, keep it and document the path — otherwise add container build files (default: `platforms/<app>/docker/`)
- Stack-specific bootstrap, scaffolds, and package manager commands are defined per project in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)

### Hard rules

**Do:**
- Verify all four requirements (app, docker, deploy/build, db) are covered before considering the project complete
- Read exact paths, stack, ports, and naming from [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) — app subfolders under `platforms/` are per-project
- Ensure every runnable `platforms/<app>/` can be built as a container
- Prefer scaffold-provided Docker config; document actual Dockerfile path in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- When scaffold has no Docker, add `platforms/<app>/docker/Dockerfile` — co-located with the app, never a shared root `docker/` folder
- Keep schema migrations inside the backend app unless the user explicitly requested a standalone migration runner
- Export built images to `deploy/platforms/<app>/` (gitignored) — see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- Document the full repo tree in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)

**Don't:**
- Don't assume user-defined folder names for docker, deploy, etc. — but runnable apps always live under `platforms/`
- Don't leave a runnable platform app without a working container build
- Don't force `platforms/<app>/docker/` when the scaffold already provides Docker at a different path
- Don't create a standalone `platforms/migration/` app unless the user explicitly asks for one
- Don't hardcode tech stack or app subfolder layout in general docs
- Don't commit `.tar` files, database backup dumps, or `.env`

## 4. Dev Environment

### Prerequisites

See [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) for runtime, package manager, and dev commands for this project.

### Environment variables

- Each app under `platforms/` documents vars in its own `.env.example` (e.g. `platforms/api/.env.example`)
- Copy to `.env` in the same app folder before running that app — never commit `.env`
- Docker compose may reference per-app `env_file` paths — see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)

## 5. Docker Conventions

- **Every** runnable app under `platforms/<app>/` has container build config documented in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- **Default** when scaffold provides none: `platforms/<app>/docker/Dockerfile`, build context `platforms/<app>/`
- **Scaffold-provided:** use the scaffold's Dockerfile/compose paths as-is; record them in PROJECT
- Build context is the parent app folder (`platforms/<app>/`), not `{root}` — unless PROJECT documents otherwise for scaffold paths
- Runtime orchestration compose lives in `deploy/` — see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- Wire services with explicit `depends_on` and healthchecks
- Database must be healthy before dependent services run migrations
- Named volumes and image tags — defined in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- Pass env vars via per-app `env_file` or `environment` in compose (paths per PROJECT)

## 6. Build & Deployment

Every production build follows a **three-phase pipeline**. Paths are defined in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD).

| Phase | What | Where |
|-------|------|-------|
| **1. Build** | `docker build` per platform app | Dockerfile path per [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) (default: `platforms/<app>/docker/Dockerfile`, context `platforms/<app>/`) |
| **2. Export** | `docker save` timestamped `.tar` + `latest.tar` | `deploy/platforms/<app>/` (gitignored) |
| **3. Run** | `docker load` then `docker compose up` | `deploy/docker-compose.yml` — startup sequence via `depends_on` / healthchecks |

Startup sequence (typical): db healthy → migrations complete → api → web — per PROJECT compose.

### Build script behavior

Build scripts (paths in PROJECT) must:

1. Build each image from the Dockerfile path documented in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) for that app (default: `platforms/<app>/docker/Dockerfile`, context `platforms/<app>/`)
2. Tag images per [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
3. Export timestamped `.tar` files to `deploy/platforms/<app>/`
4. Write a `latest.tar` copy of the most recent export per app

### Load on target server

```bash
docker load -i deploy/platforms/api/latest.tar
docker load -i deploy/platforms/web/latest.tar
docker load -i deploy/platforms/db/latest.tar
docker compose -f deploy/docker-compose.yml up -d
```

### Agent rules

- Timestamp all image exports for rollback
- Never commit `.tar` files
- Verify compose build after Dockerfile changes

## 7. Backup & Restore

Backup and restore scripts (paths in PROJECT) must:

- Run database dump against the running db container
- Write to a gitignored backup location — see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) for `{project}` slug and paths

Restore scripts accept a backup file path, stop dependent services, restore, restart, and verify health.

### Agent rules

- Backup before schema migrations in production
- Never commit backup files

## 8. Testing Instructions

- Run lint and test per app under `platforms/` — see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
- Run migrations against a test DB before integration tests
- All tests green before merge
- Add or update tests for code you change
- Verify compose build after Docker or deploy changes

### Greenfield minimum

When bootstrapping a new app per [`GREENFIELD.MD`](GREENFIELD.MD), do not mark complete without:

- API integration tests for each CRUD endpoint — happy path, `NOT_FOUND`, `VALIDATION_FAILED`
- Lint + typecheck green per app (see [`CODE.MD`](CODE.MD) section 15)
- Optional but recommended: one Playwright smoke test (login → create → delete)

CI: add `.github/workflows/ci.yml` at `{root}` when ready; document path in `PROJECT/AGENTS.MD`.

## 9. PR Instructions

- Title format: see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) — typically `[{project}] <Title>`
- Run lint and test before committing
- Docker/deploy changes: verify compose build locally
- DB schema changes: migration in backend path (default) or standalone migration app (only when user requested) + backup note in PR
- New env vars: update the relevant `platforms/<app>/.env.example` and compose file (paths per PROJECT)
- UI: comply with [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD)
- Code: comply with [`CODE.MD`](CODE.MD)
- Feature work: update `PROJECT/DOCUMENT/{feature}/` per [`DOCUMENT.MD`](DOCUMENT.MD) when applicable
- AI changes: include `PROJECT/HISTORY/{timestamp}_{title}.md` in same commit

## 10. Agent Checklist

Before starting:

1. Read [`README.MD`](README.MD) and all `PROJECT/*` files
2. Scan `PROJECT/HISTORY/` newest first
3. Read [`CODE.MD`](CODE.MD) before writing code; [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD) before UI work
4. Unspecified decisions identified and resolved per section 2 (or user delegated to recommendations)?
5. Answers recorded in `PROJECT/*` / `PROJECT/DOCUMENT/` before first `platforms/` code?

During work:

6. Confirm all four minimum requirements are covered (app, docker, deploy/build, db)
7. Follow paths and stack exactly as defined in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD)
8. New env vars → update paths listed in PROJECT
9. Migration path is inside backend unless user explicitly opted into standalone `platforms/migration/`

After work:

10. Followed [`CODE.MD`](CODE.MD) and [`DESIGN.MD`](DESIGN.MD) — block comments, scaffold/package/auth rules, API codes + scenarios, entity/CRUD, component library, mobile-first?
11. Post-edit verification per [`CODE.MD`](CODE.MD) section 15 — zero errors on all changed files/apps?
12. [`PROJECT/DOCUMENT/`](PROJECT/DOCUMENT/) updated for feature work, or consciously skipped per [`DOCUMENT.MD`](DOCUMENT.MD)?
13. Append `PROJECT/HISTORY/{timestamp}_{title}.md` per [`HISTORY.MD`](HISTORY.MD)
14. Update `PROJECT/*` only if project requirements changed — never edit general rule files unless user asks
15. Never commit `.env`, `.tar` files, or backup dumps

### Greenfield tasks only

When bootstrapping per [`GREENFIELD.MD`](GREENFIELD.MD), also verify Definition of Done (GREENFIELD section 5):

16. `deploy/docker-compose.yml` exists in the **built project** and `docker compose up` — all services healthy?
17. golang-migrate applied; dev seeds load?
18. Auth and full CRUD work at mobile viewport?
19. `deploy/scripts/build.sh` and `backup-db.sh` exist in the project and run successfully?
20. Root `README.md` (user-facing) created from [`PROJECT/README.template.md`](PROJECT/README.template.md)?
