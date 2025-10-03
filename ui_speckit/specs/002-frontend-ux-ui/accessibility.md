# 002 · Accesibilidad (WCAG 2.1 AA) – Contexto Salud

## Requisitos generales

- Contraste mínimo 4.5:1 para texto normal; 3:1 para grande.
- Foco visible en todos los elementos interactivos (no eliminar outline).
- Navegación completa por teclado (Tab/Shift+Tab) sin trampas de foco.
- Semántica: headings jerárquicos y landmarks (`header`, `nav`, `main`, `footer`).
- Soporte `prefers-reduced-motion` para reducir distracciones.

## Consideraciones específicas en salud

- Tiempo y fecha: anuncio claro para lectores de pantalla ("12 de octubre de 2025 a las 10:30, hora local").
- Contenido crítico: confirmar acciones sensibles (cancelar/reprogramar) con diálogo accesible.
- Privacidad: evitar leer en voz alta datos no necesarios (usar `aria-hidden` donde aplique).
- Colores de estado: no depender solo del color (agregar texto/icono); paleta segura para daltonismo.
- Tamaño de objetivos táctiles: 44x44px mínimo en móviles para seleccionar horarios.

## Formularios (datos personales y de cita)

- Etiquetas claras; placeholders no sustituyen labels.
- Validación en vivo con mensajes concretos ("Formato de email inválido").
- `aria-invalid="true"` y `aria-describedby` apuntando a mensajes de error.
- Indicadores de progreso o estado (role="status") al enviar.

## Componentes

- Modal accesible: focus trap, `role="dialog"`, `aria-modal="true"`, encabezado con `id` y `aria-labelledby`.
- Date/Time pickers: totalmente operables con teclado; lectura del slot seleccionado.
- Toasts: `role="status"` o `aria-live="polite"`, sin bloquear interacción.
- Skeletons: contenedor con `aria-busy="true"` durante carga.

## Medios e imágenes

- `alt` descriptivo; `alt=""` si decorativas.
- Iconos decorativos con `aria-hidden="true"`.

## Testing y validación

- axe DevTools/CLI: 0 issues críticos antes de merge.
- Teclado + lector de pantalla (VoiceOver/NVDA) en flujos de cita.
- Lighthouse Accessibility ≥ 95.

## Checklist PR (extracto)

- [ ] Foco visible y orden lógico
- [ ] Contraste válido y estados no sólo por color
- [ ] Labels y descripciones presentes; date/time accesibles
- [ ] Componentes interactivos con roles/ARIA adecuados
- [ ] Soporte de `prefers-reduced-motion` y live regions
