#!/usr/bin/env bash
# (opcional) script local para publicar o diretório dist local no Vercel usando o token
# Uso: VERCEL_TOKEN=xxx VERCEL_ORG_ID=yyy VERCEL_PROJECT_ID=zzz ./scripts/vercel-deploy-from-dist.sh

set -euo pipefail

if [ ! -d "dist" ]; then
  echo "Diretório dist não encontrado. Rode: npm run build"
  exit 1
fi

if [ -z "${VERCEL_TOKEN:-}" ] || [ -z "${VERCEL_ORG_ID:-}" ] || [ -z "${VERCEL_PROJECT_ID:-}" ]; then
  echo "Variáveis VERCEL_TOKEN, VERCEL_ORG_ID e VERCEL_PROJECT_ID devem ser definidas no ambiente."
  exit 1
fi

echo "Deploying ./dist to Vercel (project: $VERCEL_PROJECT_ID, org: $VERCEL_ORG_ID)..."
npx --yes vercel@latest --token "$VERCEL_TOKEN" --prod --confirm --scope "$VERCEL_ORG_ID" --project "$VERCEL_PROJECT_ID" ./dist

echo "Deploy finalizado."