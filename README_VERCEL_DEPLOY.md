```markdown
# Deploy automático para Vercel (GitHub + GitHub Actions)

Este documento descreve passo-a-passo como conectar o repositório ao Vercel e como configurar o GitHub Actions workflow (já fornecido) que:
- faz testes, build do app e build do Storybook,
- faz upload do diretório `dist` (build estático),
- baixa o artifact no job de deploy e publica diretamente o conteúdo estático em Vercel sem rebuild.

> Pré-requisitos: acesso ao painel do Vercel e permissões de admin no repositório GitHub para criar secrets.

## 1) Criar token no Vercel
1. Acesse https://vercel.com/dashboard.
2. No canto superior direito clique no seu avatar → "Settings".
3. No menu lateral escolha "Tokens" (ou "Personal Tokens").
4. Clique em "Create Token" / "New Token".
5. Dê um nome (ex: github-actions-token) e copie o token gerado — você verá o valor só uma vez.

## 2) Obter Vercel Project ID e Org / Team ID
1. No dashboard do Vercel vá para o projeto que irá receber o deploy.
2. Project ID:
   - Abra o projeto → Settings → General → "Project ID" (copie o valor).
3. Org / Team ID:
   - No canto superior esquerdo, clique no nome da equipe/organização.
   - Abra Team or Account Settings → General → "Team ID" (ou "Organization ID") — copie.

## 3) Adicionar secrets no GitHub (repositório)
1. No GitHub, navegue ao repositório → Settings → "Secrets and variables" → "Actions".
2. Adicione três secrets:
   - VERCEL_TOKEN = <token criado no passo 1>
   - VERCEL_ORG_ID = <org/team id do passo 2>
   - VERCEL_PROJECT_ID = <project id do passo 2>

## 4) Adicionar o workflow ao repositório
1. Crie o arquivo `.github/workflows/ci-deploy-dist.yml` com o conteúdo fornecido.
2. Commit e push para a branch `main`.

## 5) O que acontece no fluxo de CI
- Ao push para `main` (ou abrir PR para `main`) o job `ci`:
  1. instala dependências,
  2. roda testes (vitest),
  3. roda `npm run build` (gera `dist`),
  4. roda `npm run build-storybook` (gera `storybook-static`),
  5. faz upload dos artifacts `dist` e `storybook`.
- Se `ci` terminar com sucesso, o job `deploy`:
  1. baixa o artifact `dist`,
  2. executa `npx vercel --prod --confirm --scope <ORG> --project <PROJECT> ./dist`
  3. publica o conteúdo estático em produção no projeto Vercel.

## 6) Verificar deploy e logs
- GitHub Actions → Actions → escolha o workflow run → veja logs passo-a-passo.
- Vercel Dashboard → Project → Deployments → verá a deployment correspondente.
- O Vercel CLI imprime o endereço no output do deploy step.

## 7) Dicas / troubleshooting
- Se o deploy falhar por falta de permissões:
  - Verifique se o token tem permissões para o projeto/organização.
  - Confirme se VERCEL_ORG_ID e VERCEL_PROJECT_ID estão corretos.
- Se preferir usar a integração nativa do Vercel (import from Git), você não precisa deste workflow; basta conectar o repo ao Vercel e ele fará builds automaticamente.

## 8) Deploy local (opcional)
- Script: `scripts/vercel-deploy-from-dist.sh`
- Uso: gere `dist` localmente com `npm run build` e execute:
  VERCEL_TOKEN=xxx VERCEL_ORG_ID=yyy VERCEL_PROJECT_ID=zzz ./scripts/vercel-deploy-from-dist.sh

```