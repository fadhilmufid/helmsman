#!/usr/bin/env bash
# Build all platform images and export timestamped .tar files.
# Customize PROJECT_SLUG and app list per PROJECT/AGENTS.MD
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEPLOY="$ROOT/deploy"
STAMP="$(date +%Y%m%d_%H%M%S)"
PROJECT_SLUG="${PROJECT_SLUG:-todo-app}"

APPS=(db api web)

mkdir -p "$DEPLOY/platforms"

for app in "${APPS[@]}"; do
  TAG="${PROJECT_SLUG}-${app}"
  CONTEXT="$ROOT/platforms/${app}"
  DOCKERFILE="$CONTEXT/docker/Dockerfile"

  if [[ ! -f "$DOCKERFILE" ]]; then
    echo "Skip $app: no Dockerfile at $DOCKERFILE"
    continue
  fi

  echo "Building $TAG from $CONTEXT..."
  docker build -t "${TAG}:latest" -f "$DOCKERFILE" "$CONTEXT"

  OUT_DIR="$DEPLOY/platforms/$app"
  mkdir -p "$OUT_DIR"
  TAR="$OUT_DIR/${STAMP}.tar"
  LATEST="$OUT_DIR/latest.tar"

  echo "Exporting $TAR..."
  docker save -o "$TAR" "${TAG}:latest"
  cp "$TAR" "$LATEST"
  echo "Exported ${TAG}:latest -> $TAR"
done

echo "Build complete. Timestamp: $STAMP"
