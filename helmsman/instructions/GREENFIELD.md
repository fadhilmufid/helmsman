# Greenfield Bootstrap Guide

**Integration:** Part of the connected instruction set — read [`RULES.md`](RULES.md) after [`AGENTS.md`](../AGENTS.md). Blueprint in `project/plans/` ([`PLAN.md`](PLAN.md)); **exhaustive standalone** steps in `project/tasks/` ([`TASK.md`](TASK.md)).

**Read-only template** — how to **build a new app from scratch** after clarify. Stack and layout are **user-chosen** (or delegated with **Recommended:** defaults).

Related: [`RULES.md`](RULES.md), [`PLAN.md`](PLAN.md), [`TASK.md`](TASK.md), [`BROWNFIELD.md`](BROWNFIELD.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`DOCUMENT.md`](DOCUMENT.md).

For an **existing** codebase, use [`BROWNFIELD.md`](BROWNFIELD.md) instead.

---

## 0. Recommendations, not auto-build

`GREENFIELD.md` does **not** authorize skipping clarify or writing application code on its own.

| Rule | Detail |
|------|--------|
| **Always ask first** | Per [`AGENTS.md`](../AGENTS.md) section 3 — including **stack** and **layout**, even for short prompts |
| **Recommended:** labels | Propose defaults in the clarify batch; user confirms or delegates |
| **Wait for confirmation** | Proceed only after the user confirms or says *"use your recommendations"* / *"you decide"* |
| **Record then build** | Write `project/*`, create `project/plans/` then `project/tasks/` per [`PLAN.md`](PLAN.md) and [`TASK.md`](TASK.md) before scaffold/code |
| **Greenfield layout** | New projects in this instruction set use `platforms/` (see §1) — brownfield repos document actual paths instead |

---

## 1. Greenfield layout convention

**Applies only to greenfield** — not when adopting an existing repo ([`BROWNFIELD.md`](BROWNFIELD.md)).

Everything runnable or deployable lives under `{root}/platforms/` (fixed parent name, always plural). **`{root}` is the app repo root** — parent of `helmsman/` when the pack is installed. **Never** put `platforms/` inside `{pack}`.

Child slugs are **kebab-case** — document every slug in `project/INFRASTRUCTURE.md` and the Gate D plan **platform inventory**.

### Platform kinds

| Kind | Examples | Required per slug |
|------|----------|-------------------|
| **Service** | `postgresql`, `minio`, `redis`, `rabbitmq` | `docker/` or pinned image, volumes, healthcheck, `.env.example`, compose role |
| **Application** | `web`, `api`, `worker`, `app` | Source code, Dockerfile, `.env.example`, depends on services |

| Architecture | Example `platforms/` children |
|--------------|-------------------------------|
| Split full-stack + DB + storage | `web`, `api`, `postgresql`, `minio` |
| Monolith | `app`, `postgresql` |
| Microservices | `gateway`, `users-api`, `orders-api`, `postgresql`, `redis` |
| Worker + API | `api`, `worker`, `postgresql` |

Slugs are **user-chosen at clarify** — `postgresql` not `db` when that is the actual engine.

### Required four concerns (greenfield)

Every new project must address these four concerns. Document paths in `project/INFRASTRUCTURE.md`.

| Requirement | What every greenfield project must have | Examples |
|-------------|----------------------------------------|----------|
| **App** | Application platforms under `platforms/<app>/` | `platforms/web`, `platforms/api` |
| **Docker** | Every platform (service + app) is containerized | `platforms/<slug>/docker/` or pinned image |
| **Deploy / Build** | Compose, image export, scripts | `deploy/`, `deploy/platforms/<slug>/` |
| **Data** | Service platform for DB/storage + migrations in backend app | `platforms/postgresql`, migrations in `platforms/api/` |

#### Service platforms vs migrations

| Sub-concern | Purpose | Example paths |
|-------------|---------|---------------|
| **Service platform** | Run DB, object storage, cache, queue | `platforms/postgresql/`, `platforms/minio/` |
| **Migrations** | Schema changes and seeds | Inside backend app (`platforms/api/migrations/`); standalone `platforms/migration/` only when user requests |

Migrations do **not** live in the service platform folder.

#### Platforms layout rules

- Each `platforms/<slug>/` is documented in INFRASTRUCTURE and the plan platform inventory
- **Service platforms first** — create postgresql, minio, etc. and compose **before** application scaffold (Phase B)
- `platforms/migration/` is **optional** — only when user explicitly requests a separate migration runner
- Each platform has own `.env` + `.env.example` — never a shared root `.env` for app config
- **Every** platform must be dockerizable or use a pinned image with healthcheck
- Stack-specific bootstrap commands → `project/AGENTS.md`

#### Hard rules

**Do:**

- Verify all four requirements and E2E cycles (§5) before bootstrap complete
- List every slug in plan platform inventory and `project/INFRASTRUCTURE.md`
- Export built images to `deploy/platforms/<slug>/` when using the three-phase pipeline (§3)
- Run `docker compose up` then `docker compose down` as part of verification

**Don't:**

- Leave a platform without documented container config or healthcheck
- Scaffold application code before service platforms and compose exist
- Use vague `platforms/db/` when the engine is PostgreSQL — prefer `platforms/postgresql/`
- Create `platforms/migration/` unless user asks
- Commit `.tar` files, backup dumps, or `.env`
- Copy or hoist `{pack}` (`helmsman/`) contents to `{root}` — see [`AGENTS.md`](../AGENTS.md) §0
- Scaffold `instructions/`, `project/`, or the **full** pack `AGENTS.md` at `{root}` — **required** thin `{root}/AGENTS.md` from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md) is the only allowed exception
- Put app code inside `{pack}`

---

## 2. Clarify topics (greenfield)

Ask in one batch per AGENTS §3. **Recommended:** values are proposals — not locked until written to `project/*`.

| Topic | What to resolve |
|-------|-----------------|
| Project slug | `{project}` name — kebab-case |
| **Service platforms** | Which infra slugs: `postgresql`, `minio`, `redis`, etc. |
| **Application platforms** | Which app slugs: `web`, `api`, `worker`, etc. |
| Stack | Framework and runtime **per application platform** |
| Auth | Needed? Type? — per [`CODE.md`](CODE.md) section 9 when multi-user |
| Database | Engine, hosting path |
| Migrations | Path inside backend (default) or standalone runner |
| Docker | Dockerfile location per app |
| Deploy | Target environment; `deploy/` layout |
| Design | Theme, component library — per [`DESIGN.md`](DESIGN.md) → `project/DESIGN.md`. **Recommended when user silent:** neutral grayscale light theme per DESIGN.md §3 |
| Responsive strategy | mobile-first / desktop-first / balanced — per [`DESIGN.md`](DESIGN.md) §10; record in `project/DESIGN.md` (when web UI in scope) |
| Delivery scope | What the user asked for — implement at **full production quality**, not stripped down |
| Quality bar | Full / production-ready — per [`RULES.md`](RULES.md) §5 |
| Feature docs | Which `project/documents/{feature}/` files per [`DOCUMENT.md`](DOCUMENT.md) |

After clarify, write:

| File | Content |
|------|---------|
| `project/OVERVIEW.md` | Slug, purpose, delivery scope, quality bar |
| `project/INFRASTRUCTURE.md` | Platform inventory (service + app), stack, ports, Docker, deploy, migrations |
| `project/AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/DESIGN.md` | Component library, theme, responsive strategy, breakpoints |

Use official framework scaffolds per [`CODE.md`](CODE.md) section 9 — search fresh scaffold commands for the **confirmed** stack.

---

## 3. Docker, deploy, and build pipeline (greenfield)

Document all paths in `project/INFRASTRUCTURE.md`. Dev commands in `project/AGENTS.md`.

### Environment variables

- Each platform under `platforms/` documents vars in its own `.env.example`
- Copy to `.env` in the same app folder — never commit `.env`
- Compose may reference per-app `env_file` paths — document in `project/INFRASTRUCTURE.md`

### Docker conventions

- Container build config documented per `platforms/<slug>/` (service and application)
- **Default** for application platforms when scaffold provides none: `platforms/<slug>/docker/Dockerfile`
- Service platforms: pinned image in compose or `platforms/<slug>/docker/Dockerfile`
- Runtime orchestration compose typically in `deploy/`
- Wire services with `depends_on` and healthchecks
- DB healthy before migrations; migrations before dependent app services

### Three-phase production pipeline

| Phase | What | Where |
|-------|------|-------|
| **1. Build** | `docker build` per platform (apps + custom service images) | Dockerfile path in `project/INFRASTRUCTURE.md` |
| **2. Export** | `docker save` timestamped `.tar` + `latest.tar` | `deploy/platforms/<slug>/` (gitignored) |
| **3. Run** | `docker load` then `docker compose up` | `deploy/docker-compose.yml` |

Startup sequence (typical): db healthy → migrations complete → backend apps → frontend apps.

#### Build script behavior

1. Build each image from documented path (every application platform + custom service images)
2. Tag images per `project/INFRASTRUCTURE.md`
3. Export timestamped `.tar` files to `deploy/platforms/<slug>/`
4. Write `latest.tar` copy per slug

#### Agent rules

- Timestamp image exports for rollback
- Never commit `.tar` files
- Verify compose build after Dockerfile changes
- Run full E2E cycle: compose up → health → smoke → compose down (see §5)

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
1b. **Create `{root}/AGENTS.md`** from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md) — merge Helmsman sections if file already exists (required per AGENTS §0)
2. **Write `project/OVERVIEW.md`**, **`project/INFRASTRUCTURE.md`**, **`project/AGENTS.md`**, **`project/DESIGN.md`** (index only)
2b. **Create `project/design/`** required files per [`DESIGN.md`](DESIGN.md) §1 **before** platform code (when web UI is in scope)
3. **Create `project/documents/{feature}/`** per [`DOCUMENT.md`](DOCUMENT.md) **before** platform code
4. **Create `project/plans/{timestamp}_bootstrap-{slug}.md`** per [`PLAN.md`](PLAN.md) — platform inventory, phases, E2E matrix
5. **Create one exhaustive standalone `project/tasks/{timestamp}_{task-slug}.md`** from the plan per [`TASK.md`](TASK.md) — **Application map** (§1.4a) then every deliverable as a file-level step; no forbidden shorthand (§1.4); follow §5.1; no parent/child split
6. **Create** `{root}/README.md` from §7 template (draft OK)

**STOP — do not create `platforms/`, `deploy/`, or any application files until steps 1–5 of Phase A are complete.** Step 2b (design) is Gate C when web UI is in scope.

**Hard rule — Phase B–F below are order-of-work guidance only.** Do **not** copy these playbook bullets or PLAN phase-map bullets into the TASK file as steps. Expand each bullet to file-level steps per [`TASK.md`](TASK.md) §1.4–§1.5 and §5.1.

### Phase A.5 — Required feature documents (Gate C)

For each feature slug, create these files under `project/documents/{feature-slug}/` **before** Phase B:

| File | When required |
|------|---------------|
| `business-requirements-document.md` | Always for bootstrap / new features |
| `functional-specification-document.md` | Always for bootstrap / new features |
| `technical-documentation.md` | Always for bootstrap / new features |
| `api-specification-document.md` | When API is in scope |
| `user-interface-specification-document.md` | When web UI is in scope |

See [`DOCUMENT.md`](DOCUMENT.md) for content rules.

### Phase B — Service platforms and compose (infra first)

**Before any application scaffold.** Each step is a separate TASK step per [`TASK.md`](TASK.md) §1.7.

7. **Create service platform folders** — e.g. `platforms/postgresql/`, `platforms/minio/` — docker config, volumes, `.env.example` per slug in plan inventory
8. **Create `deploy/docker-compose.yml`** — all platforms wired with `depends_on` and healthchecks
9. **Per-platform `.env.example`** — vars each slug needs
10. **Verify service layer:** `docker compose up` → all service healthchecks pass → `docker compose down`

### Phase C — Backend / services

11. **Scaffold backend application platform(s)** — official starter for confirmed stack
12. **Data models and migrations** — per [`CODE.md`](CODE.md) section 11 when applicable
13. **Production baseline** — per CODE §16 for APIs
14. **Auth** — per CODE §9 when required
15. **Feature APIs** — per `project/documents/`; response `code` per CODE §8
16. **Dev seeds** — when useful for local dev

### Phase D — Frontend (when in scope)

17. **Scaffold frontend application platform(s)** — official starter for confirmed stack
18. **Component library** — per [`DESIGN.md`](DESIGN.md) → `project/DESIGN.md`
19. **Auth UI** — per CODE §9 when required
20. **API client and pages** — per DOCUMENT and CODE §8 scenarios

### Phase E — Docker and deploy

21. **Docker per application platform** — document paths in `project/INFRASTRUCTURE.md`
22. **Update compose** — add app services; healthchecks and startup order
23. **Deploy scripts** — build all images, backup, restore per §3
24. **Add `{root}/.gitignore`** — per §6

### Phase F — Verify (Gate F)

25. **Local E2E** — compose up → health → smoke → compose down
26. **Deploy E2E** — build all images → save → load → compose up → smoke
27. **Run Definition of Done** (§5)
28. **Mark task complete** per [`TASK.md`](TASK.md)
29. **Append `project/histories/`** — link plan, task, E2E results

---

## 5. Definition of Done (greenfield)

Not complete until **all** pass in the **built project** (paths from `project/INFRASTRUCTURE.md`):

| # | Gate |
|---|------|
| 1 | **Local E2E:** `docker compose up` → all platforms healthy → smoke test → `docker compose down` |
| 2 | **Deploy E2E:** build all platform images → save → load → compose up → smoke test |
| 3 | Migrations applied; dev seeds run without error (when applicable) |
| 4 | Auth works when required; data scoped correctly |
| 5 | Delivery-scope features work completely — polished UX, all documented flows (responsive per `project/design/` on all primary viewports when web in scope) |
| 6 | Destructive actions use confirmation; soft delete when CODE §11 applies |
| 7 | API responses include `code` when CODE §8 applies; frontend handles documented scenarios |
| 8 | Build script produces timestamped image exports for **every** platform (when using §3 pipeline) |
| 9 | Backup script produces a database dump (when DB in scope) |
| 10 | Lint and tests pass per `project/AGENTS.md` for each touched platform |
| 11 | `project/documents/{feature}/` reflects what was built |
| 12 | `project/design/` complete when web UI in scope |
| 13 | `project/plans/` and `project/tasks/` marked complete; E2E results recorded |
| 14 | `project/histories/` bootstrap entry links plan, task, E2E |
| 15 | `{root}/README.md` (app readme) has setup instructions — not `{pack}/README.md` |
| 16 | `{root}/AGENTS.md` exists with Helmsman sections (from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md)) |

### Testing standard

Per AGENTS §5: integration tests for critical endpoints/features; lint/typecheck green per app; E2E smoke test when web is in scope. **Do not mark bootstrap complete with failing or missing critical tests.**

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

# other-references — user reference dumps (see other-references/README.md)
other-references/**
!other-references/README.md

# project — local workspace (see project/histories|documents|tasks|design/README.md)
project/**
!project/histories/
!project/documents/
!project/tasks/
!project/design/
!project/plans/
project/histories/**
!project/histories/README.md
project/documents/**
!project/documents/README.md
project/tasks/**
!project/tasks/README.md
project/design/**
!project/design/README.md
project/plans/**
!project/plans/README.md
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
project/           # agent workspace — config and feature docs (local)
other-references/     # Optional user reference dumps (local only)
```

## License

{License or "Private — all rights reserved."}
````

---

## 8. Agent rules

**Do:**

- Confirm greenfield mode per AGENTS §1
- Pass AGENTS §1.5 execution gates before any platform code
- Ask stack and delivery scope even when you have recommendations
- Follow bootstrap playbook **after** user confirms or delegates
- Create `project/plans/` per Phase A step 4 before platform code
- Create exhaustive standalone `project/tasks/` from plan per Phase A step 5
- Create `project/documents/{feature}/` per Phase A.5 before Phase B
- Create `project/design/` + `project/DESIGN.md` index per Phase A step 2b before Phase B when web UI is in scope
- Create **service platforms** (postgresql, minio, …) in Phase B **before** application scaffold
- Run local and deploy E2E cycles before marking bootstrap complete
- Proactively add sensible quality improvements (validation, accessibility, observability, seed data) — record in docs/task when they do not change the core goal
- Record deploy/compose patterns in `project/INFRASTRUCTURE.md` after clarify — not from this template verbatim
- Phases B–E target **production deployability** — healthchecks, env examples, backup, startup order — not local-dev-only wiring

**Don't:**

- Skip clarify because you have recommendations
- Skip AGENTS Gates A–F — read, document, plan, task, then code
- Write `platforms/` before `project/*`, feature docs, design specs, plan, and task exist
- Scaffold application platforms before service platforms and compose
- Default to MVP, stubs, or skeleton implementations unless user explicitly asks for MVP
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
- [`../AGENTS.md`](../AGENTS.md) — agent gate, clarify, task workflow
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture
- [`CODE.md`](CODE.md) — coding rules, scaffold-first, production baseline
