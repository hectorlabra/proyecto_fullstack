# Tasks: Profesionalización Integral del Proyecto

**Input**: Design documents from `/specs/001-profesionalizacion-proyecto/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → OK
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, docs, scripts
   → Tests/Contracts: contract docs/checklists
   → Core: API health/version, CORS, logging, seed; UX/UI + accesibilidad
   → Integration: Deploy Render (DB, backend, frontend), CORS
   → Polish: README final, capturas/GIF, checklist de verificación
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Prefer tests/contracts before implementation
5. Number tasks sequentially (T001, T002...)
6. Validate completeness y dependencias
```

## Format: `[ID] [P?] Description`

- [P]: Puede ejecutarse en paralelo (archivos distintos, sin dependencias)
- Incluye rutas de archivo exactas

## Phase 3.1: Setup

- [x] T001 Crear estructura de documentación en `docs/` (nuevo): `docs/architecture.md`, `docs/api-examples.md`
- [x] T002 Crear `LICENSE` (MIT) en la raíz del repo: `./LICENSE`
- [x] T003 Crear `CONTRIBUTING.md` en la raíz con guía breve de contribución: `./CONTRIBUTING.md`
- [x] T004 Actualizar `README.md` (raíz) con secciones: Visión, Stack, Arquitectura, Cómo correr (local/Render), Variables, Demo URLs, Capturas/GIF, Decisiones, Trade-offs, Roadmap, Cómo Evaluarlo, Contribución, Licencia

## Phase 3.2: Tests First (Contratos y verificación)

- [x] T005 [P] Completar `specs/001-profesionalizacion-proyecto/contracts/openapi.yaml` con ejemplos de respuesta para `/health` y `/version`
- [x] T006 [P] Crear checklist de verificación contractual en `specs/001-profesionalizacion-proyecto/contracts/checklist.md` (curl/examples) alineado con OpenAPI
- [x] T007 [P] Documentar ejemplos en `docs/api-examples.md` (requests locales y producción)

## Phase 3.3: Core Implementation

- [x] T008 Backend: Implementar `GET /health` en `back/src/routes/index.ts` (o nuevo `back/src/routes/healthRouter.ts`) y montarlo en `back/src/index.ts`
- [x] T009 Backend: Implementar `GET /version` en `back/src/routes/index.ts` y montarlo en `back/src/index.ts`
- [x] T010 Backend: Exponer documentación de API en `GET /docs` usando el contrato `specs/001-profesionalizacion-proyecto/contracts/openapi.yaml` (servir UI o JSON; enlazar desde README)
- [x] T011 Backend: Configurar CORS con allowlist por env var en `back/src/index.ts` y documentar variable en `back/.env.example`
- [x] T012 Backend: A\u00f1adir limitaci\u00f3n b\u00e1sica de tasa a endpoints p\u00fablicos (nivel suave) en `back/src/index.ts` y documentar comportamiento
- [x] T013 Backend: Añadir logging estructurado y manejo de errores consistente en `back/src/index.ts` y/o `back/src/middlewares/`
- [x] T014 Backend: Actualizar `back/.env.example` con nuevas variables: `ALLOWED_ORIGINS`, `APP_VERSION`, `ENABLE_RATE_LIMIT`
- [x] T015 Backend: Actualizar seed para incluir 1 admin, 2 usuarios y ~5 citas en `back/src/scripts/seed-database.ts` y documentar credenciales de demo en README
- [x] T016 Frontend: Accesibilidad (WCAG 2.1 A + subset AA): agregar skip link, foco visible, roles semánticos, alt text y navegación por teclado (archivos en `front/src/components/` y `front/src/views/`)
- [x] T017 Frontend: Ajustes responsive (móvil/desktop) y estados de carga y error claros (archivos en `front/src/views/` y `front/src/components/`)
- [x] T018 Frontend: Revisar navegación y consistencia en `front/src/App.jsx` y `front/src/components/Navbar.jsx`

## Phase 3.4: Hardening & Refactor

- [x] T027 Backend: app/server split
  - Crear `back/src/app.ts` con configuración de app (middlewares, rutas)
  - Crear `back/src/server.ts` para listen + inicialización DB
  - Actualizar `back/src/index.ts` para delegar en server
- [x] T028 Backend: Middleware global de errores y tipos
  - `back/src/middlewares/error.middleware.ts` + tipos de errores de dominio
  - Respuestas 4xx/5xx consistentes
- [x] T029 Backend: Seguridad y rendimiento
  - Integrar `helmet` y `compression` con configuración segura
- [x] T030 Backend: Validación de variables de entorno
  - Añadir validación con zod/env-var en `back/src/config/envs.ts`
- [x] T031 Backend: Logging estructurado
  - Integrar `pino` o `winston` con niveles por entorno y sin secretos
- [x] T032 Backend: Producción sin `synchronize`
  - Asegurar `synchronize: false` en prod y documentar migraciones en quickstart
- [x] T033 Frontend: ErrorBoundary y fallback UI elegante
  - Añadir ErrorBoundary global y manejo de errores por ruta/componente
- [x] T034 Monitoreo mínimo
  - Agregar correlación simple por request-id en logs y encabezados de respuesta
- [x] T035 Normalizar estados de turnos entre back y front
  - Homologar nombres de estados (e.g., "scheduled", "cancelled", "completed") en `front/src/helpers/myAppointments.js` y entidades back
- [x] T036 Remover credenciales sensibles del repo
  - Remover `.vscode/settings.json` del control de versiones si contiene API keys; rotar si necesario
- [x] T037 Asegurar TypeORM synchronize off en producción
  - Verificar `data-source.ts` y documentar migraciones en quickstart
- [x] T038 Definir nuevas variables en .env.example
  - Añadir ALLOWED_ORIGINS, APP_VERSION, ENABLE_RATE_LIMIT a `back/.env.example`

## Phase 3.5: Integration (Render)

- [x] T019 [P] Crear base de datos PostgreSQL en Render y registrar URL en `specs/001-profesionalizacion-proyecto/quickstart.md`
- [x] T020 Deploy backend (Web Service) en Render: variables de entorno, build (tsc), start (node dist/index.js), healthcheck `/health`, SSL DB si aplica
- [x] T021 Deploy frontend (Static Site) en Render: build con Vite y configuración de URL de API
- [x] T022 Configurar CORS en prod: allowlist con dominio de front Render + `http://localhost` (dev); validar desde navegador

## Phase 3.6: Documentation Final

- [x] T023 [P] Completar `docs/architecture.md` con diagrama simple (frontend ⇄ backend ⇄ DB) y enlazar en README
- [ ] T024 [P] Agregar capturas (≥2) y un GIF corto de navegación en `docs/` y enlazar en `README.md`
- [x] T025 Finalizar `README.md`: incluir sección "Cómo evaluarlo", URLs públicas, English Summary, y enlaces a `/docs`, `/health`, `/version`
- [x] T026 Ejecutar checklist de verificación manual (accesibilidad básica, rutas, seed, endpoints, CORS) y registrar resultados en `specs/001-profesionalizacion-proyecto/research.md` sección "Verificación"

## Dependencies

- T004 (README) depende de T001 (estructura docs) para enlaces correctos
- T008–T014 (backend) se apoyan en T005–T007 (contratos/checklists)
- T019–T022 (deploy) dependen de T008–T014 completos y T027–T038 (hardening/refactor)
- T025 (README final) depende de deploy (URLs públicas) y capturas (T024)

## Parallel Execution Examples

```
# Paralelizar verificación y documentación de contratos
T005, T006, T007

# Paralelizar documentación final una vez deploy listo
T023, T024
```

## Validation Checklist

- [x] Todos los endpoints documentados tienen ejemplos en OpenAPI y api-examples
- [x] Accesibilidad básica aplicada en vistas clave
- [x] README permite evaluar el proyecto en <5 minutos
- [x] Deploy en Render operativo (front/back/DB) con CORS configurado
- [x] Seed de datos presente y documentado
- [x] Hardening aplicado: errores globales, helmet/compression, env validation, logging estructurado, ErrorBoundary
