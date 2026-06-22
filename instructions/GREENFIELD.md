# Greenfield Bootstrap Guide

**Read-only template** — how to **build a new app from scratch** after clarify. Stack, layout, and tooling are **chosen by the user** (or delegated with **Recommended:** defaults) — this file does not prescribe a specific framework.

Related: [`README.md`](README.md), [`AGENTS.md`](AGENTS.md) section 0 (mode gate), [`BROWNFIELD.md`](BROWNFIELD.md), [`TASK.md`](TASK.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`DOCUMENT.md`](DOCUMENT.md).

For an **existing** codebase, use [`BROWNFIELD.md`](BROWNFIELD.md) instead.

---

## 0. Recommendations, not auto-build

`GREENFIELD.md` does **not** authorize skipping clarify or writing application code on its own.

| Rule | Detail |
|------|--------|
| **Always ask first** | Per [`AGENTS.md`](AGENTS.md) section 2 — including **stack** and **layout**, even for minimal prompts |
| **Recommended:** labels | Propose defaults in the clarify batch; user confirms or delegates |
| **Wait for confirmation** | Proceed only after the user confirms or says *"use your recommendations"* / *"you decide"* |
| **Record then build** | Write confirmed decisions to `project/*` and create a task plan per [`TASK.md`](TASK.md) before scaffold/code |
| **Greenfield layout** | New projects in this instruction set use `platforms/` (see §1) — brownfield repos document actual paths instead |

---

## 1. Greenfield layout convention

**Applies only to greenfield** — not when adopting an existing repo ([`BROWNFIELD.md`](BROWNFIELD.md)).

Runnable apps live under `{root}/platforms/` (fixed parent name, always plural). Child folder names are **kebab-case slugs** chosen at clarify — document every app in `project/INFRASTRUCTURE.md`.

| Architecture | Example `platforms/` children |
|--------------|-------------------------------|
| Split full-stack | `web`, `api`, `db` |
| Monolith | `app` (or project slug) |
| Microservices | `gateway`, `users-api`, `orders-api`, `db` |
| Worker + API | `api`, `worker`, `db` |
| Frontend only | `web` |

`web` / `api` / `db` are **example slugs only** — not required names.

### Minimum app requirements (greenfield)

Every new project must address these four concerns. Document paths in `project/INFRASTRUCTURE.md`.

| Requirement | What every greenfield project must have | Examples only |
|-------------|----------------------------------------|---------------|
| **App** | Application source under `platforms/<app>/` | `platforms/web`, `platforms/api`, `platforms/app` |
| **Docker** | Every runnable platform app is dockerizable | `platforms/<app>/docker/Dockerfile` |
| **Deploy / Build** | Build, export, compose, deployment, backup/restore | `deploy/`, `scripts/` |
| **DB** | DB infra, migrations, seeds, backup strategy | `platforms/db/`, migrations inside backend app |

#### DB infra vs migrations

| Sub-concern | Purpose | Example paths |
|-------------|---------|---------------|
| **DB infra** | Run/build database (compose, version, volumes) | `platforms/db/` (slug may differ) |
| **Migrations** | Schema changes and seeds | Inside backend by default (`platforms/<backend>/migrations/`); standalone `platforms/migration/` only when user explicitly requests |

Migrations do **not** belong in the DB infra folder. Document the exact migration path in `project/INFRASTRUCTURE.md`.

#### Platforms layout rules

- Each `platforms/<app>/` is a **standalone application** — runnable without sibling folders or a root workspace
- `platforms/migration/` is **optional** — only when user explicitly requests a separate migration runner
- Each app is **fully isolated**: own dependencies, config, secrets; own `.env` + `.env.example` — never a shared root `.env` for app config
- **Every** runnable app must be dockerizable; prefer scaffold Docker config; default when none: `platforms/<app>/docker/Dockerfile`
- Stack-specific bootstrap commands → `project/AGENTS.md`

#### Hard rules

**Do:**

- Verify all four requirements before considering bootstrap complete
- Read exact paths from `project/INFRASTRUCTURE.md`
- Prefer scaffold-provided Docker paths; document actual Dockerfile location
- Keep migrations inside backend unless user requested standalone runner
- Export built images to `deploy/platforms/<app>/` (gitignored) when using the three-phase pipeline (§3)
- Document full repo tree in `project/INFRASTRUCTURE.md`

**Don't:**

- Leave a runnable platform app without documented container build
- Force `platforms/<app>/docker/` when scaffold provides Docker elsewhere
- Create `platforms/migration/` unless user asks
- Commit `.tar` files, backup dumps, or `.env`

---

## 2. Clarify topics (greenfield)

Ask in one batch per AGENTS §2. **Recommended:** values are proposals — not locked until written to `project/*`.

| Topic | What to resolve |
|-------|-----------------|
| Project slug | `{project}` name — kebab-case |
| Platform apps | Which `platforms/<app>/` folders and role of each |
| Stack | Framework and runtime **per app** — user choice |
| Auth | Needed? Type? — per [`CODE.md`](CODE.md) section 9 when multi-user |
| Database | Engine, hosting path |
| Migrations | Path inside backend (default) or standalone runner |
| Docker | Dockerfile location per app |
| Deploy | Target environment; `deploy/` layout |
| Design | Theme, component library — per [`DESIGN.md`](DESIGN.md) → `project/DESIGN.md` |
| MVP scope | Smallest useful boundary for first delivery |
| Feature docs | Which `project/document/{feature}/` files per [`DOCUMENT.md`](DOCUMENT.md) |

After clarify, write:

| File | Content |
|------|---------|
| `project/OVERVIEW.md` | Slug, purpose, MVP scope |
| `project/INFRASTRUCTURE.md` | Platform slugs, stack per app, ports, Docker, deploy, db, migrations |
| `project/AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/DESIGN.md` | Component library, theme, breakpoints |

Use official framework scaffolds per [`CODE.md`](CODE.md) section 9 — search fresh scaffold commands for the **confirmed** stack.

---

## 3. Docker, deploy, and build pipeline (greenfield)

Document all paths in `project/INFRASTRUCTURE.md`. Dev commands in `project/AGENTS.md`.

### Environment variables

- Each app under `platforms/` documents vars in its own `.env.example`
- Copy to `.env` in the same app folder — never commit `.env`
- Compose may reference per-app `env_file` paths — document in `project/INFRASTRUCTURE.md`

### Docker conventions

- Container build config documented per runnable `platforms/<app>/`
- **Default** when scaffold provides none: `platforms/<app>/docker/Dockerfile`, build context `platforms/<app>/`
- Runtime orchestration compose typically in `deploy/`
- Wire services with `depends_on` and healthchecks
- DB healthy before migrations; migrations before dependent app services

### Three-phase production pipeline

| Phase | What | Where |
|-------|------|-------|
| **1. Build** | `docker build` per platform app | Dockerfile path in `project/INFRASTRUCTURE.md` |
| **2. Export** | `docker save` timestamped `.tar` + `latest.tar` | `deploy/platforms/<app>/` (gitignored) |
| **3. Run** | `docker load` then `docker compose up` | `deploy/docker-compose.yml` |

Startup sequence (typical): db healthy → migrations complete → backend apps → frontend apps.

#### Build script behavior

1. Build each image from documented Dockerfile path
2. Tag images per `project/INFRASTRUCTURE.md`
3. Export timestamped `.tar` files to `deploy/platforms/<app>/`
4. Write `latest.tar` copy per app

#### Agent rules

- Timestamp image exports for rollback
- Never commit `.tar` files
- Verify compose build after Dockerfile changes

### Backup and restore

- Dump against running db container; write to gitignored backup location (paths in `project/INFRASTRUCTURE.md`)
- Restore: accept backup path, stop dependents, restore, restart, verify health
- Backup before schema migrations in production
- Never commit backup files

---

## 4. Bootstrap playbook

**After clarify** and `project/*` are written, follow this order.

### Phase A — Plan (no application code yet)

1. **Confirm clarify complete** — decisions recorded in `project/*`
2. **Write `project/OVERVIEW.md`**, **`project/INFRASTRUCTURE.md`**, **`project/AGENTS.md`**, **`project/DESIGN.md`**
3. **Create `project/document/{feature}/`** per [`DOCUMENT.md`](DOCUMENT.md) **before** platform code
4. **Create `project/task/{timestamp}_{task-slug}.md`** — bootstrap plan per [`TASK.md`](TASK.md)
5. **Create** `{root}/README.md` from §7 template (draft OK; fill placeholders after `project/INFRASTRUCTURE.md` and `project/AGENTS.md` are complete)

### Phase B — Infrastructure scaffold

6. **DB infra** — per confirmed stack (e.g. database container or managed service config)
7. **Create `deploy/`** in target project — compose, env examples; this instruction repo does not ship `deploy/`
8. **Per-app `.env.example`** — vars each app needs

### Phase C — Backend / services

9. **Scaffold backend app(s)** — official starter for confirmed stack
10. **Data models and migrations** — per [`CODE.md`](CODE.md) section 11 when applicable
11. **Production baseline** — per CODE §16 for APIs
12. **Auth** — per CODE §9 when required
13. **Feature APIs** — per `project/document/`; response `code` per CODE §8
14. **Dev seeds** — when useful for local dev

### Phase D — Frontend (when in scope)

15. **Scaffold frontend app(s)** — official starter for confirmed stack
16. **Component library** — per [`DESIGN.md`](DESIGN.md) → `project/DESIGN.md`
17. **Auth UI** — per CODE §9 when required
18. **API client and pages** — per DOCUMENT and CODE §8 scenarios

### Phase E — Docker and deploy

19. **Docker per runnable app** — document paths in `project/INFRASTRUCTURE.md`
20. **Wire compose** — healthchecks and startup order
21. **Deploy scripts** — build, backup, restore per §3
22. **Add `{root}/.gitignore`** — per §6

### Phase F — Verify

23. **Run Definition of Done** (§5)
24. **Mark task complete** per [`TASK.md`](TASK.md)
25. **Append `project/history/`** — link task file

---

## 5. Definition of Done (greenfield)

Not complete until **all** pass in the **built project** (paths from `project/INFRASTRUCTURE.md`):

| # | Gate |
|---|------|
| 1 | Documented deploy path works — all services healthy (e.g. `docker compose up` when using compose) |
| 2 | Migrations applied; dev seeds run without error (when applicable) |
| 3 | Auth works when required; data scoped correctly |
| 4 | MVP features work in target UI (mobile viewport when web is in scope) |
| 5 | Destructive actions use confirmation; soft delete when CODE §11 applies |
| 6 | API responses include `code` when CODE §8 applies; frontend handles documented scenarios |
| 7 | Build script produces timestamped image exports (when using §3 pipeline) |
| 8 | Backup script produces a database dump (when DB in scope) |
| 9 | Lint and tests pass per `project/AGENTS.md` for each touched app |
| 10 | `project/document/{feature}/` reflects what was built |
| 11 | Bootstrap task marked complete in `project/task/` |
| 12 | `project/history/` bootstrap entry appended |
| 13 | Root `README.md` has setup instructions |

### Testing minimum

Per AGENTS §4: integration tests for critical endpoints/features; lint/typecheck green per app; optional E2E smoke test when web is in scope.

---

## 6. Root `.gitignore` template

Create at `{root}/.gitignore` on greenfield bootstrap:

```
.env
**/.env
!**/.env.example
node_modules/
deploy/platforms/
*.tar
backups/
*.sql
*.dump
.DS_Store
.idea/
.vscode/

# ai_references — user reference dumps (see ai_references/README.md)
ai_references/**
!ai_references/README.md

# project — local workspace (see project/history|document|task/README.md)
project/**
!project/history/
!project/document/
!project/task/
project/history/**
!project/history/README.md
project/document/**
!project/document/README.md
project/task/**
!project/task/README.md
```

---

## 7. Root README template

Create at `{root}/README.md` on greenfield bootstrap. Fill `{placeholders}` from `project/INFRASTRUCTURE.md` and `project/AGENTS.md` — not from memory.

````markdown
# {Project Name}

{One-line description of the app.}

## Prerequisites

Copy from `project/AGENTS.md` (runtime and tools per app), for example:

- {Runtime for app 1 — e.g. Node.js 20+, Go 1.22+}
- {Runtime for app 2}
- Docker and Docker Compose (if using containerized deploy)

## Quick start (Docker)

When `project/INFRASTRUCTURE.md` documents a compose-based deploy:

1. Copy environment files:

```bash
cp {deploy-path}/.env.example {deploy-path}/.env
# Repeat per app — paths from project/INFRASTRUCTURE.md
cp {app-path}/.env.example {app-path}/.env
```

2. Edit `.env` files — set secrets documented in each app's `.env.example`.

3. Start services:

```bash
docker compose -f {compose-path}/docker-compose.yml up --build
```

4. Open the app:

- {Frontend URL and port from project/INFRASTRUCTURE.md}
- {API health or status URL, if applicable}

## Dev seeds (optional)

If `project/AGENTS.md` documents seed data, list demo accounts or sample credentials here after first boot.

## Local development (without Docker)

Per-app commands from `project/AGENTS.md`:

### {App name — e.g. database}

{How to start DB locally or via compose service only; env var paths from project/INFRASTRUCTURE.md}

### {App name — e.g. API / backend}

```bash
cd {app-path}
{install, migrate, seed, run commands from project/AGENTS.md}
```

### {App name — e.g. web / frontend}

```bash
cd {app-path}
{install and dev commands from project/AGENTS.md}
```

## Scripts

Document scripts from `project/INFRASTRUCTURE.md` (when present):

| Script | Purpose |
|--------|---------|
| `{build-script-path}` | Build and export images or artifacts |
| `{backup-script-path}` | Database or data backup |
| `{restore-script-path}` | Restore from backup |

## Project structure

Copy the repo tree from `project/INFRASTRUCTURE.md`:

```
{app-path}/        # {role — from project/INFRASTRUCTURE.md}
{app-path}/        # {role}
deploy/            # {deploy layout, if applicable}
project/           # system workspace — config and feature docs (local)
ai_references/     # Optional user reference dumps (local only)
```

## License

{License or "Private — all rights reserved."}
````

---

## 8. Agent rules

**Do:**

- Confirm greenfield mode per AGENTS §0
- Ask stack and MVP even when you have recommendations
- Follow bootstrap playbook **after** user confirms or delegates
- Create bootstrap task plan per [`TASK.md`](TASK.md) before platform code
- Record deploy/compose patterns in `project/INFRASTRUCTURE.md` after clarify — not from this template verbatim

**Don't:**

- Skip clarify because you have recommendations
- Write `platforms/` before `project/*` and task plan exist
- Apply this file to brownfield repos without user request to restructure
- Expect a `deploy/` folder in this instruction template — create it in the target project

---

## 9. Deploy patterns (reference only)

**This instruction repo does not contain `deploy/`.** After clarify, document the chosen compose layout, env vars, and scripts in `project/INFRASTRUCTURE.md` and implement them in the target project.

Typical greenfield pattern:

- `deploy/docker-compose.yml` — orchestration with healthchecks and `depends_on`
- `deploy/.env.example` — compose-level secrets and ports
- `deploy/scripts/build.sh` — build, tag, export `.tar` per §3
- `deploy/scripts/backup-db.sh` / `restore-db.sh` — when DB in scope

Adjust service names, slugs, and migration commands to the **confirmed** stack — do not copy stack-specific examples from memory.

---

## Related

- [`../README.md`](../README.md) — user-facing repo overview
- [`BROWNFIELD.md`](BROWNFIELD.md) — existing codebase adoption
- [`../AGENTS.md`](../AGENTS.md) — system gate, clarify, task workflow
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture
- [`CODE.md`](CODE.md) — coding rules, scaffold-first, production baseline
