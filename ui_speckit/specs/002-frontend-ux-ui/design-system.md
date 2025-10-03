# 002 · Sistema de Diseño (UX/UI Salud)

Estado: Propuesto · Última actualización: 2025-10-03

## Principios

- Profesional y humano: transmitir confianza clínica sin perder calidez y cercanía.
- Claridad clínica: priorizar legibilidad y precisión (fecha, hora, estado de cita).
- Accesibilidad primero: contraste, foco visible y controles de fecha/hora utilizables.
- Rendimiento y simplicidad: estilos predecibles y animaciones ligeras.

## Design Tokens (CSS Variables)

Definidos en `front/src/styles/variables.css` e importados en `main.jsx`.

Paleta clínica y semántica de citas:

```css
:root {
  /* Brand Salud */
  --color-primary: #0ea5a8; /* teal profesional */
  --color-primary-contrast: #ffffff;
  --color-accent: #2563eb; /* azul para enlaces/acciones */
  --color-bg: #ffffff;
  --color-surface: #f8fafc; /* slate-50 */
  --color-surface-alt: #f1f5f9; /* slate-100 */
  --color-text: #0f172a; /* slate-900 */
  --color-text-muted: #475569; /* slate-600 */
  --color-border: #e2e8f0; /* slate-200 */

  /* Estados de Cita */
  --color-success: #16a34a; /* confirmada */
  --color-warning: #f59e0b; /* pendiente */
  --color-danger: #ef4444; /* cancelada/error */
  --color-info: #0891b2; /* recordatorio/info */

  --focus-ring: 2px solid #2563eb;
}
```

## Tipografía

- Base 16px; Escala modular 1.125; Inter/Roboto recomendadas.
- Microcopy cercano y claro ("Tu próxima cita", "Confirmada"). Evitar jerga técnica.

## Layout & Grid

- Mobile-first; breakpoints: 480, 768, 1024, 1280.
- Contenedor máx 1200px; padding `var(--space-4)` móvil, `--space-8` escritorio.
- Zonas semánticas: encabezado (identidad), navegación (vistas), contenido (citas), pie (ayuda/soporte).

## Componentes Base y de Dominio

- Button: primary/secondary/ghost/danger; estados visibles y accesibles.
- Input/TextField: etiquetas claras; ejemplo de fecha/hora; `aria-invalid` y `aria-describedby`.
- Card: contenedor limpio para información clínica (sin datos sensibles innecesarios).
- Navbar: simple, alto contraste, foco visible.
- Badge de Estado: Confirmada, Pendiente, Cancelada, No-show (colores semánticos).
- AppointmentCard: fecha (dd/mm/yyyy), hora 24h, profesional, especialidad, ubicación; acciones reprogramar/cancelar.
- TimeSlotPicker: selección de franjas horarias con teclado, lectura de disponibilidad.
- DoctorAvatar + SpecialtyTag: foto/placeholder + especialidad.

## Iconografía e Imágenes

- Iconos médicos (estetoscopio, calendario, ubicación) en SVG; `aria-hidden="true"` si decorativos.
- Imágenes sobrias (clínicas, consultorios) y diversidad representativa.

## Motion & Transiciones

- Duración 150–250ms; `ease-out` para entradas.
- Respetar `prefers-reduced-motion` y evitar animaciones distractoras en listados de citas.

## Estados de Carga y Error

- Skeletons para listado de citas y detalles.
- Spinners para acciones breves.
- Toasts accesibles: confirmaciones de reserva/cancelación y errores de red.

## Microcopy (tono salud)

- Empático y directo: “Tu cita ha sido confirmada para el 12/10 a las 10:30.”
- Evitar culpa: “No pudimos confirmar la acción. Intenta nuevamente.”

## Ejemplo (Badge de estado)

```html
<span class="badge badge-success">Confirmada</span>
<span class="badge badge-warning">Pendiente</span>
<span class="badge badge-danger">Cancelada</span>
```
