# {Project Name}

{One-line description of the app.}

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (web local dev)
- Go 1.22+ (api local dev)

## Quick start (Docker)

1. Copy environment files (created during bootstrap):

```bash
cp deploy/.env.example deploy/.env
cp platforms/api/.env.example platforms/api/.env
cp platforms/web/.env.example platforms/web/.env
```

2. Edit `.env` files — set secrets (`JWT_SECRET`, `AUTH_SECRET`, `POSTGRES_PASSWORD`).

3. Start all services:

```bash
docker compose -f deploy/docker-compose.yml up --build
```

4. Open the app:

- Web: http://localhost:3000
- API health: http://localhost:3001/health

## Demo account (dev seeds)

After first boot with seeds enabled:

| Email | Password |
|-------|----------|
| demo@example.com | password123 |

## Local development (without Docker)

### Database

Start PostgreSQL (or `docker compose up db` only) and set `DATABASE_URL` in `platforms/api/.env`.

### API (Go)

```bash
cd platforms/api
go mod download
migrate -path migrations -database "$DATABASE_URL" up
go run cmd/seed
go run cmd/server
```

### Web

```bash
cd platforms/web
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `platforms/web/.env`.

## Scripts

| Script | Purpose |
|--------|---------|
| `deploy/scripts/build.sh` | Build and export Docker images |
| `deploy/scripts/backup-db.sh` | Backup database to `backups/` |
| `deploy/scripts/restore-db.sh <file.sql>` | Restore database |

## Project structure

```
platforms/web/     # Next.js frontend
platforms/api/     # Go API (Gin + GORM) + migrations
platforms/db/      # PostgreSQL Docker image
deploy/            # Docker Compose and ops scripts (created at bootstrap)
PROJECT/           # AI agent config and feature docs
```

## License

{License or "Private — all rights reserved."}
