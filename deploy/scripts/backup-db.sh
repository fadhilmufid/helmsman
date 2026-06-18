#!/usr/bin/env bash
# Backup PostgreSQL from the running db container.
# Usage: ./backup-db.sh [output-dir]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEPLOY="$ROOT/deploy"
OUT_DIR="${1:-$ROOT/backups}"
STAMP="$(date +%Y%m%d_%H%M%S)"
PROJECT_SLUG="${PROJECT_SLUG:-todo-app}"

mkdir -p "$OUT_DIR"

# Load compose env if present
if [[ -f "$DEPLOY/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$DEPLOY/.env"
  set +a
fi

POSTGRES_USER="${POSTGRES_USER:-app}"
POSTGRES_DB="${POSTGRES_DB:-app_db}"
CONTAINER="${PROJECT_SLUG}-db-1"
OUT_FILE="$OUT_DIR/${POSTGRES_DB}_${STAMP}.sql"

# Resolve container name from compose project
if ! docker ps --format '{{.Names}}' | grep -q "${PROJECT_SLUG}.*db"; then
  CONTAINER="$(docker ps --format '{{.Names}}' | grep -E 'db-1$' | head -1 || true)"
fi

if [[ -z "${CONTAINER:-}" ]] || ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo "Error: db container not running. Start with: docker compose -f deploy/docker-compose.yml up -d"
  exit 1
fi

echo "Backing up $POSTGRES_DB from $CONTAINER -> $OUT_FILE"
docker exec "$CONTAINER" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$OUT_FILE"
echo "Backup complete: $OUT_FILE"
