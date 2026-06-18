# Project Agent Config

Editable per-project mapping. Defaults below match [`GREENFIELD.MD`](../GREENFIELD.MD) opinionated stack.

## Stack

| App | Path | Framework | Dev port |
|-----|------|-----------|----------|
| Web | `platforms/web/` | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui | `3000` |
| API | `platforms/api/` | NestJS + TypeScript + Prisma | `3001` |
| DB | `platforms/db/` | PostgreSQL 16 | `5432` |

Auth: Auth.js (web) + NestJS Passport/JWT (api) — scaffold-first per [`CODE.MD`](../CODE.MD) section 9.

## Migrations

- **Path:** `platforms/api/prisma/`
- **Tool:** Prisma
- **Seed:** `npx prisma db seed` (demo user + sample todos)

## Docker

| App | Dockerfile path | Build context | Image tag |
|-----|-----------------|---------------|-----------|
| web | `platforms/web/docker/Dockerfile` | `platforms/web/` | `{project}-web` |
| api | `platforms/api/docker/Dockerfile` | `platforms/api/` | `{project}-api` |
| db | `platforms/db/docker/Dockerfile` | `platforms/db/` | `{project}-db` |

Use scaffold-provided Docker paths when present; document actual paths above.

## Deploy

- Compose: `deploy/docker-compose.yml`
- Compose env: `deploy/.env` (copy from `deploy/.env.example`)
- Image exports: `deploy/platforms/<app>/` (gitignored)
- Build script: `deploy/scripts/build.sh`
- Backup: `deploy/scripts/backup-db.sh` → `backups/`
- Restore: `deploy/scripts/restore-db.sh <file.sql>`

Startup sequence: db healthy → `prisma migrate deploy` → api healthy → web

## Environment files

| App | Example | Required vars |
|-----|---------|---------------|
| API | `platforms/api/.env.example` | `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT` |
| Web | `platforms/web/.env.example` | `NEXT_PUBLIC_API_URL`, `AUTH_SECRET`, `AUTH_URL` |

## Dev commands

| App | Install | Dev | Lint / verify | Test |
|-----|---------|-----|---------------|------|
| web | `npm install` | `npm run dev` | `npm run lint` | `npm test` |
| api | `npm install` | `npm run start:dev` | `npm run lint` | `npm test` |

## PR title format

`[{project}] <Title>` — e.g. `[todo-app] Add todo filters`

## Backup location

`backups/` at `{root}` (gitignored)

## Repo tree

```
{root}/
├── README.md                    # user-facing setup (from PROJECT/README.template.md)
├── .gitignore
├── platforms/
│   ├── web/
│   │   ├── .env.example
│   │   └── docker/Dockerfile
│   ├── api/
│   │   ├── prisma/
│   │   ├── .env.example
│   │   └── docker/Dockerfile
│   └── db/
│       └── docker/Dockerfile
├── deploy/
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── scripts/
│   │   ├── build.sh
│   │   ├── backup-db.sh
│   │   └── restore-db.sh
│   └── platforms/               # image .tar exports (gitignored)
├── backups/                     # db dumps (gitignored)
└── PROJECT/
```

Expand with actual paths as the project grows.
