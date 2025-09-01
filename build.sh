#!/usr/bin/env bash
# exit on error
set -o errexit

# Instala as dependências do backend
npm install --prefix backend

# Força a instalação de TODAS as dependências do frontend (incluindo as de desenvolvimento)
npm install --prefix frontend --production=false

# Executa o build do frontend
npm run build --prefix frontend