#!/usr/bin/env bash
set -euo pipefail

SECTION="${1:-auto}"
STAMP="$(date +%Y%m%d-%H%M%S)"
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
ARTIFACT_DIR="$ROOT/artifacts/reviews"
mkdir -p "$ARTIFACT_DIR"

cd "$ROOT"

echo "== Commit gate: ${SECTION} =="

echo "== Git status =="
git status --short

echo "== TypeScript =="
npm run ts

echo "== Tests, if configured =="
if node -e "const s=require('./package.json').scripts||{}; process.exit(s.test ? 0 : 1)" 2>/dev/null; then
  npm test
else
  echo "No npm test script found; skipping."
fi

echo "== CodeRabbit, if available =="
if command -v cr >/dev/null 2>&1; then
  cr --agent --type uncommitted | tee "$ARTIFACT_DIR/coderabbit-${SECTION}-${STAMP}.json" || true
elif command -v coderabbit >/dev/null 2>&1; then
  coderabbit review --plain | tee "$ARTIFACT_DIR/coderabbit-${SECTION}-${STAMP}.txt" || true
else
  echo "CodeRabbit CLI not found; skipping."
fi

echo "== Commit gate finished =="
