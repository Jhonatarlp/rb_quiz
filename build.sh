#!/usr/bin/env bash
set -euo pipefail

echo "==> Building frontend"
cd frontend
# usa o lockfile se existir (Render tem cache de deps)
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
cd -

echo "==> Frontend built at frontend/build"
