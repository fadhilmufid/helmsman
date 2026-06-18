# {Project Name}

{One-line description of the app.}

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development without Docker)

## Quick start (Docker)

1. Copy environment files:

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

- Web: http://localhost:{WEB_PORT:-3000}
- API health: http://localhost:{API_PORT:-3001}/health

## Demo account (dev seeds)

After first boot with seeds enabled:

| Email | Password |
|-------|----------|
| demo@example.com | password123 |

## Local development (without Docker)

### Database

Start PostgreSQL (or use `docker compose up db` only) and set `DATABASE_URL` in `platforms/api/.env`.

### API

```bash
cd platforms/api
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
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
| `deploy/scripts/build.sh` | Build and export Docker images to `deploy/platforms/` |
| `deploy/scripts/backup-db.sh` | Backup database to `backups/` |
| `deploy/scripts/restore-db.sh <file.sql>` | Restore database from backup |

## Project structure

```
platforms/web/     # Next.js frontend
platforms/api/     # NestJS API + Prisma migrations
platforms/db/      # PostgreSQL Docker image
deploy/            # Docker Compose and ops scripts
PROJECT/           # AI agent config and feature docs
```

## License

{License or "Private — all rights reserved."}
