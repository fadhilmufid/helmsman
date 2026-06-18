#!/usr/bin/env bash
# Restore PostgreSQL from a backup file.
# Usage: ./restore-db.sh <backup.sql>
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <backup.sql>"
  exit 1
fi

BACKUP_FILE="$1"
if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "Error: file not found: $BACKUP_FILE"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEPLOY="$ROOT/deploy"
PROJECT_SLUG="${PROJECT_SLUG:-todo-app}"

if [[ -f "$DEPLOY/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$DEPLOY/.env"
  set +a
fi

POSTGRES_USER="${POSTGRES_USER:-app}"
POSTGRES_DB="${POSTGRES_DB:-app_db}"
CONTAINER="$(docker ps --format '{{.Names}}' | grep -E "${PROJECT_SLUG}.*db|db-1$" | head -1 || true)"

if [[ -z "${CONTAINER:-}" ]]; then
  echo "Error: db container not running."
  exit 1
fi

echo "Stopping dependent services..."
docker compose -f "$DEPLOY/docker-compose.yml" stop web api 2>/dev/null || true

echo "Restoring $POSTGRES_DB from $BACKUP_FILE..."
docker exec -i "$CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$BACKUP_FILE"

echo "Restarting services..."
docker compose -f "$DEPLOY/docker-compose.yml" up -d api web

echo "Restore complete. Verify health endpoints."
