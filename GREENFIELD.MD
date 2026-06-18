# Greenfield Bootstrap Guide

**Read-only template** — **recommendation catalog** for clarify-before-build when starting a new app (e.g. *"create todo app"*).

Related: [`AGENTS.MD`](AGENTS.MD) section 2 (clarify-before-build), [`CODE.MD`](CODE.MD), [`DESIGN.MD`](DESIGN.MD), [`DOCUMENT.MD`](DOCUMENT.MD).

---

## 0. Recommendations, not auto-build

`GREENFIELD.MD` does **not** authorize skipping clarify or writing `platforms/` code on its own.

| Rule | Detail |
|------|--------|
| **Always ask first** | Per [`AGENTS.MD`](AGENTS.MD) section 2 — including **stack**, even for minimal prompts |
| **Recommended:** labels | Use values from this file as **Recommended:** answers in the clarify batch |
| **Wait for confirmation** | Proceed only after the user confirms choices or explicitly says *"use your recommendations"* / *"you decide"* |
| **Stubs are not decisions** | Pre-filled `PROJECT/*` examples do **not** skip clarify |
| **Record then build** | Write confirmed decisions to `PROJECT/*` before any `platforms/` code |

---

## 1. Recommended Stack

Present these in clarify; apply only after user approval. Scaffold per [`CODE.MD`](CODE.MD) section 9.

| App | Path | Recommended stack | Dev port |
|-----|------|-------------------|----------|
| Web | `platforms/web/` | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui | `3000` |
| API | `platforms/api/` | Go 1.22+ + Gin + GORM + golang-migrate | `3001` |
| DB | `platforms/db/` | PostgreSQL 16 (Docker) | `5432` |
| Auth | web + api | Auth.js (web) + JWT middleware on Gin (api) | per CODE §9 |

| Concern | Recommended |
|---------|-------------|
| Migrations | `platforms/api/migrations/` (golang-migrate SQL files) |
| ORM | GORM models in `platforms/api/internal/models/` |
| API validation | `go-playground/validator` + request DTOs |
| Web validation | Zod + react-hook-form |
| Component library | shadcn/ui + Radix + lucide-react |

### Scaffold commands (search fresh each time)

```bash
# Web
npx create-next-app@latest platforms/web --typescript --tailwind --eslint --app --src-dir

# API — Go module + dependencies (document layout in PROJECT/HISTORY)
mkdir -p platforms/api && cd platforms/api
go mod init github.com/{org}/{project}/api
go get github.com/gin-gonic/gin gorm.io/gorm gorm.io/driver/postgres
go get github.com/golang-migrate/migrate/v4
go get github.com/go-playground/validator/v10
go get github.com/golang-jwt/jwt/v5 golang.org/x/crypto/bcrypt

# Migrations
migrate create -ext sql -dir migrations -seq create_todos
```

---

## 2. Recommended MVP — Todo App

Use as **Recommended:** answers when the user says *"create todo app"* with no other detail:

| Decision | Recommended |
|----------|-------------|
| Project slug | `todo-app` (kebab-case) |
| Platform apps | `web` + `api` + `db` |
| Auth | **Required** — todos scoped per user |
| MVP scope | Authenticated full CRUD (index, create, edit, detail, soft-delete) |
| Feature docs | Adapt [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) |
| Theme | Dark, content-first, mobile-first per [`DESIGN.MD`](DESIGN.MD) |

---

## 3. Bootstrap Playbook

**After clarify is complete** and decisions are recorded in `PROJECT/*`, follow this order.

### Phase A — Plan (no `platforms/` code yet)

1. **Clarify** — one batch per AGENTS §2 with **Recommended:** values from this file
2. **Write `PROJECT/OVERVIEW.MD`** — slug, purpose, MVP scope
3. **Write `PROJECT/AGENTS.MD`** — confirmed stack, ports, Docker paths, dev commands
4. **Write `PROJECT/DESIGN.MD`** — component library, theme, breakpoints
5. **Create `PROJECT/DOCUMENT/{feature}/`** specs per [`DOCUMENT.MD`](DOCUMENT.MD) **before** platform code
6. **Copy** [`PROJECT/README.template.md`](PROJECT/README.template.md) → `{root}/README.md`

### Phase B — Infrastructure

7. **Scaffold `platforms/db/`** — PostgreSQL Docker image; document in PROJECT
8. **Create `deploy/` in the target project** — adapt examples from [section 8](#8-deploy-examples-reference-only); this instruction repo does not ship a `deploy/` folder
9. **Create per-app `.env.example`**:
   - `platforms/api/.env.example` — `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT`
   - `platforms/web/.env.example` — `NEXT_PUBLIC_API_URL`, Auth.js secrets

### Phase C — API (Go)

10. **Scaffold `platforms/api/`** — Go module, Gin router, project layout (`cmd/server`, `internal/`)
11. **GORM models** — UUID PK + `deleted_at` on all entities per CODE §11
12. **golang-migrate** — SQL migrations in `platforms/api/migrations/`
13. **Production baseline** per CODE §16 — health, validator, CORS, logging, central error JSON
14. **JWT auth** — protect all routes except `/health` and auth endpoints
15. **CRUD API** — per feature DOCUMENT; every response has `code` per CODE §8
16. **Dev seeds** — `go run cmd/seed` (or Makefile `make seed`) — demo user + sample todos

### Phase D — Web

17. **Scaffold `platforms/web/`** via `create-next-app`
18. **Install component library** — shadcn/ui per DESIGN §4
19. **Auth scaffold** — Auth.js per CODE §9
20. **API client** — typed fetch; all response scenarios per CODE §8
21. **CRUD pages** — mobile-first index (search/filter/sort/pagination), forms, delete modal

### Phase E — Docker & Deploy

22. **Docker per app** — `platforms/<app>/docker/Dockerfile`; document in PROJECT
23. **Wire `deploy/docker-compose.yml`** — db healthy → migrate → api healthy → web
24. **Create `deploy/scripts/`** — `build.sh`, `backup-db.sh`, `restore-db.sh` (see section 8)
25. **Add `{root}/.gitignore`** — per section 6

### Phase F — Verify

26. **Run Definition of Done** (section 5)
27. **Append `PROJECT/HISTORY/`** entry for bootstrap

---

## 4. Environment Variables

### Compose-level (`deploy/.env.example` — create in target project)

| Variable | Purpose |
|----------|---------|
| `POSTGRES_USER` | DB user |
| `POSTGRES_PASSWORD` | DB password |
| `POSTGRES_DB` | Database name |
| `API_PORT` | Host port for API (default `3001`) |
| `WEB_PORT` | Host port for web (default `3000`) |
| `PROJECT_SLUG` | Docker image prefix |

### API (`platforms/api/.env.example`)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `CORS_ORIGIN` | Allowed web origin (e.g. `http://localhost:3000`) |
| `PORT` | API listen port (default `3001`) |

### Web (`platforms/web/.env.example`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL |
| `AUTH_SECRET` | Auth.js session secret |
| `AUTH_URL` | Web app URL for Auth.js callbacks |

---

## 5. Definition of Done (Greenfield)

Not complete until **all** pass (deploy paths exist in the **built project**, not in this template):

| # | Gate |
|---|------|
| 1 | `deploy/docker-compose.yml` exists; `docker compose up` — all services healthy |
| 2 | golang-migrate applied; dev seeds run without error |
| 3 | Auth works; data scoped to authenticated user |
| 4 | Full CRUD in browser at mobile viewport |
| 5 | Delete uses confirmation modal; soft delete in DB |
| 6 | Every API response has `code`; frontend handles documented scenarios |
| 7 | `deploy/scripts/build.sh` produces timestamped `.tar` exports |
| 8 | `deploy/scripts/backup-db.sh` produces a database dump |
| 9 | Lint and tests pass on `platforms/web` and `platforms/api` |
| 10 | `PROJECT/DOCUMENT/{feature}/` reflects what was built |
| 11 | `PROJECT/HISTORY/` bootstrap entry appended |
| 12 | Root `README.md` has setup instructions |

### Testing minimum

Per AGENTS §8: API integration tests per CRUD endpoint (happy path, `NOT_FOUND`, `VALIDATION_FAILED`); lint/typecheck green; optional Playwright smoke test.

---

## 6. Root `.gitignore` Template

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
```

---

## 7. Agent Rules

**Do:**

- Read this file for greenfield **recommendations** to include in clarify batches
- Ask stack and MVP even when this file lists defaults
- Follow bootstrap playbook **after** user confirms or delegates
- Use [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) for todo apps

**Don't:**

- Skip clarify because `GREENFIELD.MD` or `PROJECT/*` stubs exist
- Write `platforms/` before decisions are recorded in `PROJECT/*`
- Assume NestJS/Node for API when user confirmed Go (or vice versa)
- Expect a `deploy/` folder in this instruction template — create it in the target project

---

## 8. Deploy examples (reference only)

**This instruction repo does not contain `deploy/`.** Copy and adapt these when bootstrapping a real project.

### `deploy/docker-compose.yml` (example — Go migrate)

```yaml
services:
  db:
    image: ${PROJECT_SLUG:-todo-app}-db:latest
    build:
      context: ../platforms/db
      dockerfile: docker/Dockerfile
    env_file: [.env]
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-app}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      POSTGRES_DB: ${POSTGRES_DB:-app_db}
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-app} -d ${POSTGRES_DB:-app_db}"]
      interval: 5s
      retries: 10
    ports: ["5432:5432"]

  migrate:
    image: ${PROJECT_SLUG:-todo-app}-api:latest
    build:
      context: ../platforms/api
      dockerfile: docker/Dockerfile
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER:-app}:${POSTGRES_PASSWORD:-changeme}@db:5432/${POSTGRES_DB:-app_db}?sslmode=disable
    command: ["migrate", "-path", "/migrations", "-database", "${DATABASE_URL}", "up"]
    depends_on:
      db: { condition: service_healthy }
    restart: "no"

  api:
    image: ${PROJECT_SLUG:-todo-app}-api:latest
    build:
      context: ../platforms/api
      dockerfile: docker/Dockerfile
    env_file: [../platforms/api/.env]
    ports: ["${API_PORT:-3001}:3001"]
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3001/health || exit 1"]
      interval: 10s
      retries: 5
    depends_on:
      migrate: { condition: service_completed_successfully }

  web:
    image: ${PROJECT_SLUG:-todo-app}-web:latest
    build:
      context: ../platforms/web
      dockerfile: docker/Dockerfile
    env_file: [../platforms/web/.env]
    ports: ["${WEB_PORT:-3000}:3000"]
    depends_on:
      api: { condition: service_healthy }

volumes:
  pgdata:
```

### `deploy/.env.example` (example)

```
POSTGRES_USER=app
POSTGRES_PASSWORD=changeme
POSTGRES_DB=app_db
API_PORT=3001
WEB_PORT=3000
PROJECT_SLUG=todo-app
```

### `deploy/scripts/build.sh` (example)

Shell script: loop `db api web`, `docker build` from `platforms/<app>/docker/Dockerfile`, `docker save` timestamped `.tar` to `deploy/platforms/<app>/` plus `latest.tar`. See AGENTS §6 build script behavior.

### `deploy/scripts/backup-db.sh` (example)

Shell script: `pg_dump` from running db container to `backups/{db}_{timestamp}.sql`. Requires compose running.

### `deploy/scripts/restore-db.sh` (example)

Shell script: accept backup path arg, stop api/web, `psql` restore into db container, restart services.

---

## Related

- [`README.MD`](README.MD) — document index
- [`AGENTS.MD`](AGENTS.MD) — clarify-before-build, testing, checklist
- [`CODE.MD`](CODE.MD) — coding rules, production baseline (§16)
- [`PROJECT/DOCUMENT/todo-management/`](PROJECT/DOCUMENT/todo-management/) — reference todo specs
