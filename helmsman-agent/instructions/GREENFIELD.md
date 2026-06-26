# Greenfield Bootstrap Guide

How to **build a new app from scratch** after clarify. Stack and layout are **user-chosen** (or delegated with **Recommended:** defaults). For an existing codebase, use [`BROWNFIELD.md`](BROWNFIELD.md) instead.

**Read-only template.** Gates and read order: [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md). Production bar: [`RULES.md`](RULES.md) §5. E2E: [`RULES.md`](RULES.md) §6. Pack isolation (never put app code inside `{pack}`): [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §0.

---

## 0. Recommendations, not auto-build

This file does **not** authorize skipping clarify or writing code on its own.

| Rule | Detail |
|------|--------|
| **Always ask first** | Per [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §3 — including **stack** and **layout**, even for short prompts |
| **Recommended: labels** | Propose defaults in the clarify batch; the user confirms or delegates |
| **Wait for confirmation** | Proceed only after the user confirms or says *"use your recommendations"* / *"you decide"* |
| **Record then build** | Write `project/*`, then `project/plans/` and `project/tasks/` ([`PLAN.md`](PLAN.md), [`TASK.md`](TASK.md)) before scaffold/code |

---

## 1. Platform model (canonical)

Everything runnable or deployable lives under `{root}/platforms/` (fixed parent name, always plural) — never inside `{pack}`. Child slugs are **kebab-case**; document every slug in `project/PROJECT-INFRASTRUCTURE.md` and the Gate D plan **platform inventory**.

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

Slugs are **user-chosen at clarify** — use `postgresql`, not `db`, when that is the actual engine.

### The four concerns

Every new project must address all four; document paths in `project/PROJECT-INFRASTRUCTURE.md`.

| Concern | What every greenfield project must have | Examples |
|---------|----------------------------------------|----------|
| **App** | Application platforms under `platforms/<app>/` | `platforms/web`, `platforms/api` |
| **Docker** | Every platform (service + app) containerized | `platforms/<slug>/docker/` or pinned image |
| **Deploy / Build** | Compose, image export, scripts | `deploy/`, `deploy/platforms/<slug>/` |
| **Data** | Service platform for DB/storage + migrations in the backend app | `platforms/postgresql`, migrations in `platforms/api/` |

**Service platform vs migrations:** services run DB/storage/cache/queue (`platforms/postgresql/`); migrations and seeds live **inside the backend app** (`platforms/api/migrations/`). A standalone `platforms/migration/` is created **only when the user requests** a separate runner.

### Layout rules

- Document each `platforms/<slug>/` in INFRASTRUCTURE and the plan inventory.
- **Service platforms first** — create postgresql, minio, etc. and compose **before** application scaffold (Phase B).
- Each platform has its own `.env` + `.env.example` — never a shared root `.env` for app config.
- Every platform is dockerizable or uses a pinned image with healthcheck.
- Stack-specific bootstrap commands → `project/PROJECT-AGENTS.md`.

**Do:** verify all four concerns and E2E cycles (§5) before bootstrap complete; list every slug in the plan inventory; export built images to `deploy/platforms/<slug>/` when using the pipeline (§3).

**Don't:** leave a platform without container config or healthcheck; scaffold app code before service platforms + compose exist; use vague `platforms/db/` when the engine is PostgreSQL; create `platforms/migration/` unless asked; commit `.tar`, backup dumps, or `.env`.

---

## 2. Clarify topics (greenfield)

Ask in one batch per [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §3. **Recommended:** values are proposals — not locked until written to `project/*`.

| Topic | What to resolve |
|-------|-----------------|
| Project slug | `{project}` name — kebab-case |
| **Service platforms** | Which infra slugs: `postgresql`, `minio`, `redis`, … |
| **Application platforms** | Which app slugs: `web`, `api`, `worker`, … |
| Stack | Framework and runtime **per application platform** |
| Auth | Needed? Type? — per [`CODE.md`](CODE.md) §9 when multi-user |
| Database | Engine, hosting path |
| Migrations | Path inside backend (default) or standalone runner |
| Docker | Dockerfile location per app |
| Deploy | Target environment; `deploy/` layout |
| Design | Theme, component library — per [`DESIGN.md`](DESIGN.md) → `project/PROJECT-DESIGN.md`. Default when silent: neutral grayscale light ([`DESIGN.md`](DESIGN.md) §3) |
| Responsive strategy | mobile-first / desktop-first / balanced ([`DESIGN.md`](DESIGN.md) §10) when web UI in scope |
| Delivery scope | What the user asked for — implement at full production quality |
| Quality bar | production-ready (default) or MVP ([`RULES.md`](RULES.md) §5) |
| Feature docs | Which `project/documents/{feature}/` files per [`DOCUMENT.md`](DOCUMENT.md) |

After clarify, write (field definitions in [`OVERVIEW.md`](OVERVIEW.md) §2):

| File | Content |
|------|---------|
| `project/PROJECT-OVERVIEW.md` | Mode, slug, purpose, delivery scope, quality bar, audience |
| `project/PROJECT-INFRASTRUCTURE.md` | Platform inventory (service + app), stack, ports, Docker, deploy, migrations |
| `project/PROJECT-AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/PROJECT-DESIGN.md` | Component library, theme, responsive strategy, breakpoints |

Use official framework scaffolds per [`CODE.md`](CODE.md) §9 — search fresh scaffold commands for the confirmed stack.

---

## 3. Docker, deploy, and build pipeline

Document all paths in `project/PROJECT-INFRASTRUCTURE.md`; dev commands in `project/PROJECT-AGENTS.md`. **This pack contains no `deploy/`** — implement the chosen layout in the target project, adjusting service names and migration commands to the confirmed stack (don't copy stack-specific examples from memory).

### Environment variables

- Each platform documents vars in its own `.env.example`; copy to `.env` in the same folder; never commit `.env`.
- Compose may reference per-app `env_file` paths — document them in `project/PROJECT-INFRASTRUCTURE.md`.

### Docker conventions

- Container build config per `platforms/<slug>/` (service and application).
- **Default** for application platforms when the scaffold provides none: `platforms/<slug>/docker/Dockerfile`.
- Service platforms: pinned image in compose or `platforms/<slug>/docker/Dockerfile`.
- Runtime orchestration compose typically in `deploy/`; wire services with `depends_on` + healthchecks.
- Startup order: DB healthy → migrations complete → backend apps → frontend apps.

### Three-phase production pipeline

| Phase | What | Where |
|-------|------|-------|
| **1. Build** | `docker build` per platform (apps + custom service images) | Dockerfile path in `project/PROJECT-INFRASTRUCTURE.md` |
| **2. Export** | `docker save` timestamped `.tar` + `latest.tar` per slug | `deploy/platforms/<slug>/` (gitignored) |
| **3. Run** | `docker load` then `docker compose up` | `deploy/docker-compose.yml` |

Typical `deploy/` layout: `docker-compose.yml` (healthchecks + `depends_on`), `.env.example`, `scripts/build.sh` (build/tag/export), `scripts/backup-db.sh` / `restore-db.sh` (when DB in scope).

### Backup and restore

- Dump against the running DB container to a gitignored location (paths in `project/PROJECT-INFRASTRUCTURE.md`); back up before production schema migrations.
- Restore: accept a backup path, stop dependents, restore, restart, verify health.
- Never commit `.tar` or backup files; timestamp image exports for rollback; verify compose build after Dockerfile changes; run the full E2E cycle (§5, [`RULES.md`](RULES.md) §6).

---

## 4. Bootstrap playbook

**After clarify** and `project/*` are written, follow this order. Phases B–F are order-of-work guidance — **do not copy these bullets (or PLAN phase-map bullets) into the TASK file as steps.** Expand each into file-level steps per [`TASK.md`](TASK.md) §1.4–§1.5.

### Phase A — Plan (no application code yet)

1. Confirm clarify complete — decisions recorded in `project/*`.
1b. Create `{root}/AGENTS.md` from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md) (merge Helmsman sections if it exists).
2. Write `project/PROJECT-OVERVIEW.md`, `-INFRASTRUCTURE.md`, `-AGENTS.md`, `-DESIGN.md` (index only).
2b. Create `project/design/` required files per [`DESIGN.md`](DESIGN.md) §1 (when web UI is in scope) — Gate C.
3. Create `project/documents/{feature}/` per [`DOCUMENT.md`](DOCUMENT.md) (§A.5 below) — Gate C.
4. Create `project/plans/{timestamp}_bootstrap-{slug}.md` per [`PLAN.md`](PLAN.md) — platform inventory, phases, E2E matrix.
5. Create one exhaustive standalone `project/tasks/{timestamp}_{task-slug}.md` from the plan per [`TASK.md`](TASK.md).
6. Create `{root}/README.md` from the §7 template (draft OK).

**STOP — do not create `platforms/`, `deploy/`, or any application files until Phase A steps 1–5 are complete.**

### Phase A.5 — Required feature documents (Gate C)

Per feature slug, create under `project/documents/{feature-slug}/` **before** Phase B: `business-requirements-document.md`, `functional-specification-document.md`, `technical-documentation.md` (always); `api-specification-document.md` (when API in scope); `user-interface-specification-document.md` (when web UI in scope). Content rules: [`DOCUMENT.md`](DOCUMENT.md).

### Phase B — Service platforms and compose (infra first)

Before any application scaffold; each is its own TASK step.

7. Create service platform folders (`platforms/postgresql/`, `platforms/minio/`, …) — docker config, volumes, `.env.example` per slug.
8. Create `deploy/docker-compose.yml` — all platforms wired with `depends_on` + healthchecks.
9. Per-platform `.env.example`.
10. Verify service layer: `docker compose up` → all service healthchecks pass → `docker compose down`.

### Phase C — Backend / services

11. Scaffold backend platform(s) — official starter for the confirmed stack.
12. Data models and migrations — [`CODE.md`](CODE.md) §11.
13. Production baseline — [`CODE.md`](CODE.md) §16 for APIs.
14. Auth — [`CODE.md`](CODE.md) §9 when required.
15. Feature APIs — per `project/documents/`; response `code` per [`CODE.md`](CODE.md) §8.
16. Dev seeds — when useful for local dev.

### Phase D — Frontend (when in scope)

17. Scaffold frontend platform(s) — official starter.
18. Component library — [`DESIGN.md`](DESIGN.md) → `project/PROJECT-DESIGN.md`.
19. Auth UI — [`CODE.md`](CODE.md) §9 when required.
20. API client and pages — per DOCUMENT and [`CODE.md`](CODE.md) §8 scenarios.

### Phase E — Docker and deploy

21. Docker per application platform — document paths in `project/PROJECT-INFRASTRUCTURE.md`.
22. Update compose — add app services; healthchecks and startup order.
23. Deploy scripts — build all images, backup, restore per §3.
24. Add `{root}/.gitignore` per §6.

### Phase F — Verify (Gate F)

25. Local E2E — compose up → health → smoke → down.
26. Deploy E2E — build all images → save → load → compose up → smoke.
27. Run Definition of Done (§5).
28. Mark task complete per [`TASK.md`](TASK.md).
29. Append `project/histories/` — link plan, task, E2E results.

---

## 5. Definition of Done (greenfield)

Not complete until **all** pass in the **built project** (paths from `project/PROJECT-INFRASTRUCTURE.md`):

| # | Gate |
|---|------|
| 1 | **Local E2E:** compose up → all platforms healthy → smoke → compose down |
| 2 | **Deploy E2E:** build all images → save → load → compose up → smoke |
| 3 | Migrations applied; dev seeds run without error (when applicable) |
| 4 | Auth works when required; data scoped correctly |
| 5 | Delivery-scope features complete — polished UX, all documented flows (responsive on all primary viewports when web in scope) |
| 6 | Destructive actions confirm; soft delete when [`CODE.md`](CODE.md) §11 applies |
| 7 | API responses include `code` ([`CODE.md`](CODE.md) §8); frontend handles documented scenarios |
| 8 | Build script produces timestamped image exports for every platform (when using §3 pipeline) |
| 9 | Backup script produces a database dump (when DB in scope) |
| 10 | Lint and tests pass per `project/PROJECT-AGENTS.md` for each touched platform |
| 11 | `project/documents/{feature}/` reflects what was built |
| 12 | `project/design/` complete when web UI in scope |
| 13 | `project/plans/` and `project/tasks/` marked complete; E2E results recorded |
| 14 | `project/histories/` bootstrap entry links plan, task, E2E |
| 15 | `{root}/README.md` has setup instructions (not `{pack}/README.md`) |
| 16 | `{root}/AGENTS.md` exists with Helmsman sections |

**Testing standard:** integration tests for critical endpoints/features; lint/typecheck green per app; E2E smoke when web in scope. Do not mark bootstrap complete with failing or missing critical tests.

---

## 6. Root `.gitignore` template

Create at `{root}/.gitignore` on bootstrap:

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

# other-references — user reference dumps
other-references/**
!other-references/README.md

# project — local agent workspace
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

Create at `{root}/README.md` on bootstrap. Fill `{placeholders}` from `project/PROJECT-INFRASTRUCTURE.md` and `project/PROJECT-AGENTS.md` — not from memory.

````markdown
# {Project Name}

{One-line description of the app.}

## Prerequisites

Copy from `project/PROJECT-AGENTS.md` (runtime and tools per app), for example:

- {Runtime for app 1 — e.g. Node.js 20+, Go 1.22+}
- {Runtime for app 2}
- Docker and Docker Compose (if using containerized deploy)

## Quick start (Docker)

When `project/PROJECT-INFRASTRUCTURE.md` documents a compose-based deploy:

1. Copy environment files:

```bash
cp {deploy-path}/.env.example {deploy-path}/.env
# Repeat per app — paths from project/PROJECT-INFRASTRUCTURE.md
cp {app-path}/.env.example {app-path}/.env
```

2. Edit `.env` files — set secrets documented in each app's `.env.example`.

3. Start services:

```bash
docker compose -f {compose-path}/docker-compose.yml up --build
```

4. Open the app:

- {Frontend URL and port}
- {API health or status URL, if applicable}

## Local development (without Docker)

Per-app commands from `project/PROJECT-AGENTS.md`:

### {App name — e.g. API / backend}

```bash
cd {app-path}
{install, migrate, seed, run commands}
```

### {App name — e.g. web / frontend}

```bash
cd {app-path}
{install and dev commands}
```

## Scripts

| Script | Purpose |
|--------|---------|
| `{build-script-path}` | Build and export images or artifacts |
| `{backup-script-path}` | Database or data backup |
| `{restore-script-path}` | Restore from backup |

## Project structure

```
{app-path}/        # {role — from project/PROJECT-INFRASTRUCTURE.md}
deploy/            # {deploy layout, if applicable}
project/           # agent workspace — config and feature docs (local)
other-references/  # optional user reference dumps (local only)
```

## License

{License or "Private — all rights reserved."}
````

---

## 8. Agent rules

**Do:** confirm greenfield mode; pass gates A–F before any platform code; ask stack and delivery scope even with recommendations; create plan then exhaustive task before code; create feature docs and design before Phase B; create service platforms before app scaffold; run local + deploy E2E before complete; proactively add sensible quality (validation, accessibility, observability, seeds) when it doesn't change the core goal; target production deployability in Phases B–E.

**Don't:** skip clarify because you have recommendations; skip gates; write `platforms/` before `project/*`, docs, design, plan, and task exist; scaffold apps before services; default to MVP/stubs unless the user asks; apply this file to brownfield repos without a restructure request.

---

## Related

- [`BROWNFIELD.md`](BROWNFIELD.md) — existing codebase adoption
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture
- [`CODE.md`](CODE.md) — coding rules, scaffold-first, production baseline
- [`../README.md`](../README.md) — user-facing repo overview
