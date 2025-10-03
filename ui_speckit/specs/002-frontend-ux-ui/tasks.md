# 002 · Tareas (Roadmap) – Citas Médicas

Nota: Mantener PRs pequeños por paquete de trabajo. Cada tarea incluye criterios de aceptación.

## Fase 1: Diseño Moderno (Branding Salud)

1. Crear `variables.css` con tokens clínicos.
   - AC: Paleta salud (teal/azul), estados de cita (success/warning/danger/info), tipografías y espacios.
2. Botón base (primary/secondary/ghost/danger) con foco visible.
   - AC: Variantes y disabled con alto contraste; snapshot visual si aplica.
3. Input/TextField accesible (incluye date/time de ejemplo).
   - AC: `aria-invalid` y `aria-describedby` funcionando; ejemplos dd/mm/yyyy y 24h.
4. Card y Navbar con tokens + responsive.
   - AC: Breakpoints y padding coherentes.
5. Badge de Estado de Cita.
   - AC: Confirmada/Pendiente/Cancelada/No-show; texto + color.

## Fase 2: UX Mejorada (Dominio)

6. Skeletons para listado de citas y detalle.
   - AC: `aria-busy` durante carga; respetar reduced-motion.
7. Spinner minimal para acciones.
   - AC: Inline/centrado; oculto a lectores si decorativo.
8. Toast notifications accesibles (role="status").
   - AC: Mensajes de confirmación/cancelación/reprogramación.
9. Breadcrumbs y rutas contextuales.
   - AC: `nav[aria-label="breadcrumbs"]` y enlaces funcionando.
10. AppointmentCard (datos clave + acciones).
   - AC: Fecha/hora 24h, profesional, especialidad, ubicación; botones Reprogramar/Cancelar.

## Fase 3: Accesibilidad & Performance

11. Checklist WCAG en plantilla de PR (con sección salud).
   - AC: Incluye date/time, estados no solo por color, tamaño tap target.
12. Focus management y navegación por teclado global.
   - AC: Outline visible; skip-to-content opcional.
13. Optimización de imágenes y code-splitting.
   - AC: Lazy en vistas pesadas; Lighthouse Perf ≥ 85.

## Fase 4: Componentes Avanzados

14. TimeSlotPicker accesible (selección de horarios).
   - AC: Operable con teclado, lee slot actual; manejo de no-disponible.
15. Modal de confirmación clínica.
   - AC: `role="dialog"`, `aria-modal="true"`, cerrar con Esc; textos claros.
16. Formularios con validación en vivo.
   - AC: Deshabilitar submit si inválido; mensajes claros y empáticos.
17. Dashboard de métricas simple.
   - AC: KPIs (total, próximas, canceladas, no-show) con layout responsive.

## Cierre

18. Informe Lighthouse + Axe + métricas UX de dominio.
   - AC: Reporte en docs (valores/indicadores) y seguimiento de mejoras.
