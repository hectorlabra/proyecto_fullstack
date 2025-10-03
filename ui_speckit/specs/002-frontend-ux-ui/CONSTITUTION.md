# UX/UI SpecKit Constitution – Salud (Citas Médicas)

Version: 1.1.0 · Ratified: 2025-10-03 · Last Amended: 2025-10-03

## Core Principles

### I. Tokens-First (Single Source of Truth)

- Colores, tipografías, spacings y elevaciones definidos como design tokens (CSS variables).
- Componentes y vistas consumen tokens; prohibido hardcodear valores visuales salvo excepciones documentadas.

### II. Healthcare by Design (Seguridad, Empatía, Precisión)

- Mostrar lo justo y necesario; evitar exponer datos sensibles en listados.
- Precisión en fecha/hora (formato local 24h, zonas horarias si aplica).
- Microcopy empática y clara, sin alarmismo.

### III. Accessibility by Default (WCAG 2.1 AA)

- Foco visible, contraste válido, navegación por teclado completa.
- Controles de fecha/hora accesibles y lectura clara de cambios de estado/confirmaciones.

### IV. Performance Budgets

- LCP < 2.5s (p95), CLS < 0.1, INP < 200ms (p75) en 4G rápido.
- Split por rutas, lazy-load, imágenes optimizadas.

### V. UX Consistente de Dominio

- Estados de citas: pendiente, confirmada, cancelada, no-show.
- Páginas con patrones previsibles: listado → detalle → acción (confirmar/reprogramar).

### VI. Observabilidad y Errores Amables

- Errores visibles (toasts) y registrables sin datos sensibles.
- Diferenciar red/validación/servidor con mensajes adecuados.

### VII. Simplicidad y Versionado

- Mantener simple (YAGNI). Documentar cambios visuales.
- Versionar design system en cambios significativos.

## Standards & Tooling

- Frontend: React 19, React Router 7, Vite 7, ESLint 9.
- Estilos: CSS variables + archivos CSS; `prefers-reduced-motion/scheme`.
- A11y: axe DevTools/CLI; pruebas con teclado y lector.
- i18n/l10n: formato de fecha/hora local (es-AR/es-ES) y textos en español neutro.
- Contratos: UI guiada por OpenAPI; validación UX sin duplicar reglas del server.

## Development Workflow & Quality Gates

1. Spec → Clarify → Plan → Tasks → Implement → Review.
2. Gates por PR:
   - Build: `vite build` sin errores.
   - Lint: ESLint PASS; sin anti-patrones a11y.
   - A11y: axe 0 issues críticos; teclado OK.
   - Perf: Lighthouse Perf ≥ 85, Acc ≥ 95 (páginas impactadas).
3. Code Review Checklist:
   - Usa tokens; foco visible; mensajes claros y empáticos.
   - Sin valores mágicos ni estilos inline innecesarios.
   - No logs de datos sensibles.

## Governance

- Esta constitución rige cambios de UI/UX de salud.
- PRs deben indicar impactos visuales, de accesibilidad y de privacidad.
- Enmiendas vía PR con justificación y guía de migración cuando aplique.
