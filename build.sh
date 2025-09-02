#!/usr/bin/env bash
set -euo pipefail

echo "==> Building frontend"
cd frontend

if [ -f package-lock.json ]; then
  # tenta ci; se der erro de lock, usa install
  (npm ci) || (echo "npm ci falhou; removendo lockfile e usando npm install..." && rm -f package-lock.json && npm install)
else
  npm install
fi

npm run build
cd -

echo "==> Frontend built at frontend/build"
