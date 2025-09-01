#!/usr/bin/env bash
# exit on error
set -o errexit

# Instala as dependências do backend
npm install --prefix backend

# Instala as dependências do frontend E executa o build
npm install --prefix frontend
npm run build --prefix frontend