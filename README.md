# QA Senior — Testes automatizados (Playwright + k6)

Resumo  
Este repositório contém um scaffold de testes automatizados para UI, API e performance:

- UI: Playwright Test (Page Object Model)
- API: Playwright Request
- Performance: k6

Objetivo: permitir execução local simples, depuração no VS Code e integração contínua (GitHub Actions) com artefatos (relatórios Playwright + k6).

Principais tecnologias
- Node.js (>= 18)
- Playwright Test
- k6
- Git / GitHub Actions

Requisitos
- Node.js >= 18 e npm
- Git
- (Opcional) k6 instalado localmente para rodar testes de carga
- VS Code recomendado

Estrutura do repositório
- tests/
  - ui/ — POMs e specs UI
  - api/ — testes API e schemas
- k6/ — scripts de carga
- .github/workflows/ — pipelines CI
- playwright.config.ts — configuração Playwright
- package.json — scripts úteis
- .env.example — variáveis de ambiente
- k6-results/ — resultados k6 (gerados)
- reports/ , playwright-report/ — relatórios gerados
- docs/ — documentação adicional

Configuração inicial (rápida)
1. Clonar e abrir no VS Code:
   git clone git@github.com:SEU_USUARIO/qa-senior-teste-nexdom.git
   cd qa-senior-teste-nexdom

2. Copiar variáveis de ambiente:
   cp .env.example .env
   (edite .env para HEADLESS, BASE_URL_UI, BASE_URL_API conforme necessário)

3. Instalar dependências:
   npm ci

4. Instalar navegadores do Playwright:
   npx playwright install

Scripts npm úteis
- npm run test:api — executa testes de API
- npm run test:ui — executa testes UI (chromium)
- npm run test — executa ambos (conforme package.json)
- npm run report:open — abre o último relatório Playwright
- npm run k6:run — cria k6-results (se necessário) e roda k6 salvando resultado com timestamp

Execução local — exemplos
- Tests API:
  npm run test:api

- Tests UI (headless por padrão):
  npm run test:ui
  Para ver o browser: HEADLESS=false em .env

- Abrir relatório Playwright:
  npm run report:open
  ou
  npx playwright show-report

- Rodar k6 (requer k6 instalado):
  npm run k6:run
  Resultado salvo em k6-results/result-YYYYMMDD-HHMMSS.json

Variáveis de ambiente (.env.example)
- HEADLESS=true         # false para ver o navegador
- BASE_URL_UI=http://localhost:3000
- BASE_URL_API=https://jsonplaceholder.typicode.com
- OUT_DIR=./k6-results

Boas práticas e notas técnicas
- POM (Page Object Model) organiza selectors e ações de UI.
- jsonplaceholder é um serviço público de teste — nem sempre persiste POST/PUT. Para CRUD persistente use json-server ou WireMock local.
- Garanta arquivos em UTF‑8 sem BOM (evita erros de leitura JSON).
- Para depurar no VS Code, execute sem depurador no terminal quando não for usar breakpoints (evita “Debugger attached.”).

CI (GitHub Actions)
- O workflow em .github/workflows/ci.yml inclui jobs para:
  - instalar dependências e navegadores Playwright
  - rodar testes API e UI
  - rodar k6 em job separado e publicar k6-results/ como artifact

Resolução de problemas comuns
- “Unexpected token '﻿'” ao ler package.json: remova BOM e regrave em UTF‑8 sem BOM.
- “remote origin already exists.”: git remote -v; git remote remove origin; git remote add origin <url>
- “src refspec main does not match any”: faça commit local e defina branch main antes do push.
- k6 connectex / WARN Request Failed: problema de rede / VPN / DNS. Teste com Test-NetConnection / curl / Invoke-WebRequest.

Melhorias sugeridas
- Usar mock local persistente (json-server / WireMock) para CRUD completos.
- Adicionar validação de contrato (ajv/jsonschema).
- Gerar HTML do k6 automaticamente e publicar como artifact no CI.
- Integrar visual-regression (Playwright snapshot / Percy).
- Integrar métricas com Grafana/InfluxDB para performance contínua.

Como contribuir
- Crie branch descritiva: feat/<assunto> ou fix/<assunto>
- Garanta npm run test passe localmente antes de abrir PR
- Atualize README/docs ao adicionar funcionalidades ou dependências

Autor / Contato
- Abner Rueda
