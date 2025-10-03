# 002 · Frontend UX/UI – Plan (Citas Médicas)

Estado: Propuesto · Responsable: Frontend Lead · Última actualización: 2025-10-03

## Visión

Entregar una experiencia de citas médicas que transmita confianza clínica y calidez humana, con diseño profesional, lenguaje claro y rendimiento sólido. La UI debe reflejar el contexto sanitario: seguridad, empatía, precisión (fecha/hora), y privacidad.

## Alcance

- Sistema de diseño con branding de salud: paleta clínica (teal/azules), tipografía legible y componentes reutilizables.
- Layout responsive (mobile-first) optimizado para uso en movilidad (pacientes) y escritorio (recepción).
- UX para el dominio: estados de cita (pendiente, confirmada, cancelada, no-show), recordatorios y reprogramación sencilla.
- Estados de carga elegantes (skeletons/spinners), errores amables con toasts y transiciones sutiles.
- Accesibilidad WCAG 2.1 AA con foco en controles de fecha/hora y lectura de contenido crítico por lector de pantalla.
- Performance: imágenes optimizadas, lazy loading, code splitting; LCP < 2.5s en 4G rápido.
- Componentes avanzados: modal de confirmación clínica, formularios con validación en tiempo real, dashboard de KPIs de citas.

Fuera de alcance (fase 002):

- Cambios funcionales del backend o en el modelo de negocio.
- Mecanismos de notificación (SMS/email) más allá de la UI (se simulan con toasts).

## Entregables por fase

- Fase 1 Diseño Moderno: design-system.md (branding salud), tokens CSS, componentes base (Button, Input, Card, Navbar), Badge de estado de cita.
- Fase 2 UX Mejorada: skeletons, spinner, toast notifications, breadcrumbs, TimeSlotPicker y AppointmentCard.
- Fase 3 Accesibilidad & Performance: checklist WCAG (fecha/hora, lectura de cambios), prefer-reduced-motion, Lighthouse/Web Vitals.
- Fase 4 Componentes Avanzados: Modal de confirmación, Formularios con validación en vivo, Dashboard (total, próximas, canceladas, no-show).

## Éxito (métricas)

- Lighthouse: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95.
- Web Vitals: LCP < 2.5s (p95), CLS < 0.1, INP < 200ms (p75).
- Accesibilidad: 0 issues críticos en axe; navegación por teclado completa.
- UX de dominio: tasa de finalización de reserva ≥ 80%, reprogramación en ≤ 3 pasos, errores de formulario < 3%.

## Riesgos y mitigaciones

- Ambigüedad de fecha/hora → usar formato local claro (dd/mm/yyyy, 24h), zonas horarias explícitas si aplica.
- Sobrecarga visual → jerarquía tipográfica, listas resumidas con detalles al expandir.
- Privacidad → evitar exponer datos sensibles en listados; truncado/ iniciales cuando corresponda.

## Plan de iteración

1. Tokens + branding + componentes base (1 semana)
2. Layout + navegación + AppointmentCard/Badge (1 semana)
3. TimeSlotPicker + estados UX (0.5 semana)
4. Accesibilidad + performance (1 semana)
5. Modal + Validación + Dashboard (1 semana)

## Criterios de aceptación

- Cumple Constitución UX/UI Salud y pasa lint + build + Lighthouse local.
- Documentación y microcopy coherentes con el contexto sanitario.
- No se rompen flujos existentes (Login, Registro, Mis Turnos, Crear/Reprogramar Turno).
