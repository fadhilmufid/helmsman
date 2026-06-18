# Greenfield Bootstrap Guide

**Read-only template** — opinionated defaults for building a new app from scratch when the user delegates to recommendations (*"use your recommendations"*, *"you decide"*, or a minimal prompt like *"create todo app"*).

Apply these defaults unless the user or `PROJECT/*` specifies otherwise. Record all decisions in `PROJECT/*` before writing `platforms/` code.

Related: [`AGENTS.MD`](AGENTS.MD) section 2 (clarify-before-build), [`CODE.MD`](CODE.MD), [`DESIGN.MD`](DESIGN.MD), [`DOCUMENT.MD`](DOCUMENT.MD).

---

## 1. Default Stack

Use when no stack is specified. Scaffold via official commands per [`CODE.MD`](CODE.MD) section 9 — do not hand-roll boilerplate.

| App | Path | Stack | Dev port (default) |
|-----|------|-------|-------------------|
| Web | `platforms/web/` | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui | `3000` |
| API | `platforms/api/` | NestJS + TypeScript + Prisma | `3001` |
| DB | `platforms/db/` | PostgreSQL 16 (Docker) | `5432` |
| Auth | web + api | Auth.js (web) + NestJS Passport/JWT (api) | per CODE §9 auth scaffold |

| Concern | Default |
|---------|---------|
| Migrations | `platforms/api/prisma/` (inside backend) |
| Component library | shadcn/ui + Radix + lucide-react |
| Validation | Zod (api + web forms) |
| ORM | Prisma |

### Scaffold commands (search fresh for latest flags)

```bash
# Web
npx create-next-app@latest platforms/web --typescript --tailwind --eslint --app --src-dir

# API
npx @nestjs/cli new platforms/api

# DB — customize deploy/docker-compose.yml and platforms/db/ per PROJECT/AGENTS.MD
```

---

## 2. Default MVP — Todo App

When the user says *"create todo app"* with no other detail:

| Decision | Default |
|----------|---------|
| Project slug | `todo-app` (kebab-case from app name) |
| Platform apps | `web` + `api` + `db` |
| Auth | **Required** — todos are scoped per user |
| MVP scope | Authenticated full CRUD for todos (index, create, edit, detail, soft-delete) |
| Feature docs | Adapt [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) |
| Theme | Dark, content-first, mobile-first per [`DESIGN.MD`](DESIGN.MD) |

---

## 3. Bootstrap Playbook

**Follow this order.** Do not skip steps or scaffold apps out of sequence.

### Phase A — Plan (no `platforms/` code yet)

1. **Clarify** — one batch per [`AGENTS.MD`](AGENTS.MD) section 2; offer defaults from this file
2. **Write `PROJECT/OVERVIEW.MD`** — slug, purpose, MVP scope
3. **Write `PROJECT/AGENTS.MD`** — stack, ports, Docker paths, dev commands, repo tree
4. **Write `PROJECT/DESIGN.MD`** — component library, theme, breakpoints
5. **Create `PROJECT/DOCUMENT/{feature}/`** specs per [`DOCUMENT.MD`](DOCUMENT.MD) **before** any platform code
6. **Copy** [`PROJECT/README.template.md`](PROJECT/README.template.md) → `{root}/README.md` (user-facing setup guide)

### Phase B — Infrastructure

7. **Scaffold `platforms/db/`** — PostgreSQL compose service; document in `PROJECT/AGENTS.MD`
8. **Create `deploy/docker-compose.yml`** from [`deploy/docker-compose.yml`](deploy/docker-compose.yml) stub — customize image names, env, ports
9. **Create per-app `.env.example`** files:
   - `platforms/api/.env.example` — `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT`
   - `platforms/web/.env.example` — `NEXT_PUBLIC_API_URL`, Auth.js secrets

### Phase C — API

10. **Scaffold `platforms/api/`** via NestJS official starter
11. **Add Prisma** — schema with UUID PK + `deleted_at` on all entities per [`CODE.MD`](CODE.MD) section 11
12. **Run initial migration** — `prisma migrate dev`
13. **Add production baseline** per [`CODE.MD`](CODE.MD) section 16 — health, validation, CORS, logging, central error handler
14. **Auth scaffold** — Passport/JWT; protect all routes except `/health` and auth endpoints
15. **CRUD API** — full endpoints per feature DOCUMENT; every response has `code` per CODE §8
16. **Dev seeds** — sample user + sample todos (`prisma db seed`)

### Phase D — Web

17. **Scaffold `platforms/web/`** via `create-next-app`
18. **Install component library** — shadcn/ui per [`DESIGN.MD`](DESIGN.MD) section 4
19. **Auth scaffold** — Auth.js per CODE §9
20. **API client** — typed fetch wrapper; handle all response scenarios per CODE §8
21. **CRUD pages** — mobile-first index (search/filter/sort/pagination), create, edit, detail, delete confirmation modal

### Phase E — Docker & Deploy

22. **Docker per app** — `platforms/<app>/docker/Dockerfile` (or scaffold path); document in PROJECT
23. **Wire compose** — db healthy → migrate → api healthy → web; healthchecks on all services
24. **Customize `deploy/scripts/`** — `build.sh`, `backup-db.sh`, `restore-db.sh` per PROJECT
25. **Add `.gitignore` at `{root}`** — ignore `.env`, `deploy/platforms/*.tar`, `backups/`, `node_modules/`

### Phase F — Verify

26. **Run Definition of Done** (section 5 below)
27. **Append `PROJECT/HISTORY/`** entry for greenfield bootstrap

---

## 4. Environment Variables

### Compose-level (`deploy/.env.example`)

Copy to `deploy/.env` for local compose. Never commit `deploy/.env`.

| Variable | Purpose |
|----------|---------|
| `POSTGRES_USER` | DB user |
| `POSTGRES_PASSWORD` | DB password |
| `POSTGRES_DB` | Database name |
| `API_PORT` | Host port for API (default `3001`) |
| `WEB_PORT` | Host port for web (default `3000`) |

### API (`platforms/api/.env.example`)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing secret for access tokens |
| `CORS_ORIGIN` | Allowed web origin (e.g. `http://localhost:3000`) |
| `PORT` | API listen port (default `3001`) |

### Web (`platforms/web/.env.example`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL (e.g. `http://localhost:3001`) |
| `AUTH_SECRET` | Auth.js session secret |
| `AUTH_URL` | Web app URL for Auth.js callbacks |

---

## 5. Definition of Done (Greenfield)

A greenfield task is **not complete** until every item passes:

| # | Gate |
|---|------|
| 1 | `docker compose -f deploy/docker-compose.yml up` — all services healthy |
| 2 | Migrations applied; dev seeds load without error |
| 3 | Auth: register/login works; data scoped to authenticated user |
| 4 | Full CRUD works in browser at mobile viewport width |
| 5 | Delete uses confirmation modal; rows soft-deleted (`deleted_at` set) |
| 6 | Every API response includes `code`; frontend handles all documented scenarios |
| 7 | `deploy/scripts/build.sh` produces timestamped `.tar` exports per app |
| 8 | `deploy/scripts/backup-db.sh` produces a database dump |
| 9 | Lint, typecheck, and tests pass on `platforms/web` and `platforms/api` |
| 10 | `PROJECT/DOCUMENT/{feature}/` reflects what was built |
| 11 | `PROJECT/HISTORY/` entry appended for bootstrap |
| 12 | Root `README.md` (user-facing) has setup and run instructions |

### Testing minimum (greenfield)

Per [`AGENTS.MD`](AGENTS.MD) section 8:

- API integration tests for each CRUD endpoint — happy path, `NOT_FOUND`, `VALIDATION_FAILED`
- Lint + typecheck green per app (CODE §15)
- Optional: one Playwright smoke test (login → create → delete)

### CI (optional)

Add `.github/workflows/ci.yml` at `{root}` when ready:

- Lint + test `platforms/api` and `platforms/web` on push/PR
- Document path in `PROJECT/AGENTS.MD` when added

---

## 6. Root `.gitignore` Template

Agents create or merge at `{root}/.gitignore` on greenfield bootstrap:

```
# Secrets
.env
**/.env
!**/.env.example

# Dependencies
node_modules/

# Build / export
deploy/platforms/
*.tar

# Backups
backups/
*.sql
*.dump

# OS / IDE
.DS_Store
.idea/
.vscode/
```

---

## 7. Agent Rules

**Do:**

- Read this file when the task is greenfield or user delegates stack/MVP decisions
- Offer one clarify batch with these defaults; proceed on approval or *"use recommendations"*
- Follow the bootstrap playbook order in section 3
- Use [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) as the reference spec for todo apps

**Don't:**

- Skip DOCUMENT specs before `platforms/` code
- Mark greenfield complete before Definition of Done passes
- Commit `.env`, `.tar`, or backup dumps
- Hand-roll auth, UI primitives, or app boilerplate when scaffolds exist

---

## Related

- [`README.MD`](README.MD) — document index and read order
- [`AGENTS.MD`](AGENTS.MD) — workflow, clarify-before-build, testing, checklist
- [`CODE.MD`](CODE.MD) — coding rules, production baseline (section 16)
- [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) — reference todo feature specs
- [`deploy/`](deploy/) — compose and ops script stubs
