# Project Agent Config

Editable per-project mapping. Values below are **GREENFIELD recommendations** — confirm via clarify-before-build per [`AGENTS.MD`](../AGENTS.MD) section 2 before treating as final.

## Stack

| App | Path | Framework (recommended) | Dev port |
|-----|------|-------------------------|----------|
| Web | `platforms/web/` | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui | `3000` |
| API | `platforms/api/` | Go 1.22+ + Gin + GORM + golang-migrate | `3001` |
| DB | `platforms/db/` | PostgreSQL 16 | `5432` |

Auth (recommended): Auth.js (web) + JWT middleware on Gin (api) — scaffold-first per [`CODE.MD`](../CODE.MD) section 9.

## Migrations

- **Path:** `platforms/api/migrations/`
- **Tool:** golang-migrate (SQL files)
- **Seed:** `go run cmd/seed` or `make seed` (demo user + sample todos)

## Docker

| App | Dockerfile path | Build context | Image tag |
|-----|-----------------|---------------|-----------|
| web | `platforms/web/docker/Dockerfile` | `platforms/web/` | `{project}-web` |
| api | `platforms/api/docker/Dockerfile` | `platforms/api/` | `{project}-api` |
| db | `platforms/db/docker/Dockerfile` | `platforms/db/` | `{project}-db` |

## Deploy (created at bootstrap — not in instruction template)

Agents create in the **target project**; examples in [`GREENFIELD.MD`](../GREENFIELD.MD) section 8:

- Compose: `deploy/docker-compose.yml`
- Compose env: `deploy/.env` (from `deploy/.env.example`)
- Image exports: `deploy/platforms/<app>/` (gitignored)
- Scripts: `deploy/scripts/build.sh`, `backup-db.sh`, `restore-db.sh`

Startup sequence: db healthy → golang-migrate up → api healthy → web

## Environment files

| App | Example | Required vars |
|-----|---------|---------------|
| API | `platforms/api/.env.example` | `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT` |
| Web | `platforms/web/.env.example` | `NEXT_PUBLIC_API_URL`, `AUTH_SECRET`, `AUTH_URL` |

## Dev commands

| App | Install | Dev | Lint / verify | Test |
|-----|---------|-----|---------------|------|
| web | `npm install` | `npm run dev` | `npm run lint` | `npm test` |
| api | `go mod download` | `go run cmd/server` | `golangci-lint run` | `go test ./...` |

## PR title format

`[{project}] <Title>` — e.g. `[todo-app] Add todo filters`

## Backup location

`backups/` at `{root}` (gitignored)

## Repo tree

```
{root}/
├── README.md
├── .gitignore
├── platforms/
│   ├── web/
│   ├── api/
│   │   ├── migrations/
│   │   ├── cmd/server/
│   │   ├── cmd/seed/
│   │   └── internal/
│   └── db/
├── deploy/                      # created at bootstrap (see GREENFIELD.MD §8)
├── backups/
└── PROJECT/
```

Expand with actual paths after clarify and bootstrap.
