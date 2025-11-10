```markdown
# DataPulse — Painel de Monitoramento em Tempo Real

Projeto React (Vite) com Tailwind CSS, Recharts e Framer Motion.

Features:
- Cards KPI (CPU, Rede, Temperatura, Usuários)
- Gráficos: Line (CPU) e Bar (Rede)
- Simulação local de API (hook useSimulatedApi) atualizando a cada VITE_POLL_INTERVAL
- Tema dark com gradientes animados
- Animações de entrada com Framer Motion
- Testes: Vitest + Testing Library
- Storybook para componentes
- CI: GitHub Actions (build, tests, build-storybook) e deploy para Vercel a partir do artifact dist

Como rodar:
1. Instale: npm install
2. Desenvolvimento: npm run dev
3. Testes: npm run test
4. Storybook: npm run storybook
5. Build: npm run build
6. Preview build: npm run preview

Deploy:
- Use o workflow `.github/workflows/ci-deploy-dist.yml` para CI e deploy automático (requer secrets VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID).
- Alternativamente conecte o repositório ao Vercel (import from Git) e configure as variáveis VITE_* no painel.

```