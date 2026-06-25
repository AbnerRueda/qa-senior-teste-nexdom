# QA Senior Teste Nexdom - Automação (Playwright + k6)

Visão geral
Este repositório contém um scaffold de testes automatizados para UI (Playwright) e API (Playwright request) e um teste de performance com k6. Projetado para ser clonado, executado localmente e integrado em CI (GitHub Actions).

Pré-requisitos
- Node.js >= 18
- npm
- (Opcional) k6 instalado localmente se desejar rodar k6 localmente
- Git

Estrutura do repositório
- tests/
  - ui/ (POM + specs UI)
  - api/ (tests API)
- k6/ (scripts k6)
- playwright.config.ts
- package.json
- .env.example
- .github/workflows/ci.yml
- reports/ (gerados)
- docs/ (opcional)

Configuração inicial (local)
1. git clone git@github.com:SEU_USUARIO/qa-senior-teste-nexdom.git
2. cd qa-senior-teste-nexdom
3. cp .env.example .env 
4. npm ci
5. npx playwright install

Como executar
- Executar apenas testes de API:
  npm run test:api

- Executar apenas testes UI (headless por padrão):
  npm run test:ui

- Executar todos os testes:
  npm run test

- Abrir relatório Playwright (após execução):
  npm run report:open

- Executar k6 localmente (requer k6 instalado):
  npm run k6:run

Configurações úteis
- HEADLESS: definir HEADLESS=false em .env para ver o browser ao executar UI
- BASE_URL_UI e BASE_URL_API: sobrescrever para apontar a outros ambientes

Decisões e notas importantes
- Playwright foi escolhido por permitir automação UI e API no mesmo framework, relatórios integrados e execução paralela.
- URLs públicas: saucedemo.com (UI) e reqres.in (API). Reqres é uma API pública de teste que pode não persistir recursos criados; os testes contêm adaptações/validações considerando isso.
- POM (Page Object Model) para organizar selectors e ações de UI.
- Testes de contrato básicos (ex.: verificação de propriedades esperadas) incluídos; para validação mais estrita adicione JSON Schema validation.

CI (GitHub Actions)
O workflow em .github/workflows/ci.yml já configura:
- execução de testes API e UI
- instalação de browsers Playwright
- job separado para k6 (publica resultados como artifact)

Relatórios e artefatos
- Playwright gera um relatório HTML em playwright-report/ (publicado como artifact no CI).
- k6 gera JSON em k6-results/ quando executado.

Como contribuir / colaborar
- Crie uma branch com um nome descritivo.
- Garanta que npm run test passe localmente antes de abrir PR.
- Inclua testes e atualize README se adicionar dependências.

Possíveis melhorias
- Adicionar validação de contrato com jsonschema ou ajv.
- Substituir reqres.in por um mock local com persistência (json-server / WireMock) para testar CRUD completos.
- Integrar visual regression (Percy / Playwright comparison).
- Publicar relatórios (GitHub Pages ou serviço de relatórios).

Contato
- Autor: (Abner Rueda)
