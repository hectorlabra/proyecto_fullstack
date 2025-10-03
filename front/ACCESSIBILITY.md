# Checklist WCAG 2.1 AA - Frontend

Este checklist debe ser verificado en cada Pull Request que modifique componentes UI.

## ✅ Perceptible

### Alternativas de texto
- [ ] Todas las imágenes tienen atributo `alt` descriptivo
- [ ] Iconos decorativos usan `aria-hidden="true"`
- [ ] Iconos funcionales tienen texto alternativo

### Multimedia con tiempo
- [ ] Videos tienen subtítulos
- [ ] Audio tiene transcripciones

### Adaptable
- [ ] El contenido se presenta correctamente sin CSS
- [ ] El orden de lectura es lógico
- [ ] Las instrucciones no dependen solo de características sensoriales

### Distinguible
- [ ] Contraste de texto: mínimo 4.5:1 (texto normal), 3:1 (texto grande)
- [ ] El texto puede ampliarse hasta 200% sin pérdida de funcionalidad
- [ ] No usar solo color para transmitir información
- [ ] El audio de fondo se puede pausar o el volumen se puede controlar

---

## ✅ Operable

### Accesible por teclado
- [ ] Toda la funcionalidad está disponible mediante teclado
- [ ] No hay "trampas de teclado" (keyboard traps)
- [ ] El orden de tabulación es lógico
- [ ] Focus visible en todos los elementos interactivos

### Tiempo suficiente
- [ ] Los límites de tiempo pueden extenderse/desactivarse
- [ ] Las pausas automáticas pueden detenerse
- [ ] No hay parpadeos/flashes más de 3 veces por segundo

### Navegable
- [ ] Se puede saltar bloques repetitivos (skip links)
- [ ] Todas las páginas tienen títulos descriptivos
- [ ] El orden de foco es significativo
- [ ] El propósito de los enlaces es claro por su texto
- [ ] Existen múltiples formas de navegar (menú, breadcrumbs, etc.)
- [ ] Los encabezados y etiquetas son descriptivos

### Modalidades de entrada
- [ ] Gestos multitoque tienen alternativas de un solo toque
- [ ] No hay eventos exclusivos de "down" sin alternativa
- [ ] Las etiquetas de los controles coinciden con su nombre accesible

---

## ✅ Comprensible

### Legible
- [ ] El idioma de la página está declarado (`lang` attribute)
- [ ] Los cambios de idioma están marcados
- [ ] Las abreviaturas están explicadas

### Predecible
- [ ] El foco no causa cambios de contexto inesperados
- [ ] Cambiar un control no causa cambios de contexto sin advertencia
- [ ] La navegación es consistente entre páginas
- [ ] Los componentes se identifican de forma consistente

### Asistencia a la entrada
- [ ] Los errores se identifican y describen claramente
- [ ] Las etiquetas de formularios están presentes
- [ ] Se proporcionan sugerencias para corregir errores
- [ ] Los envíos importantes pueden revertirse/confirmarse

---

## ✅ Robusto

### Compatible
- [ ] HTML válido (sin errores de parsing)
- [ ] Elementos tienen nombres, roles y valores correctos (ARIA)
- [ ] Mensajes de estado usan `role="status"` o `aria-live`

---

## 🔧 Herramientas de Verificación

### Automáticas
- [ ] axe DevTools (Chrome/Firefox extension)
- [ ] WAVE (Web Accessibility Evaluation Tool)
- [ ] Lighthouse Accessibility Audit (Chrome DevTools)
- [ ] eslint-plugin-jsx-a11y (ya integrado)

### Manuales
- [ ] Navegación solo con teclado (Tab, Enter, Espacio, Flechas)
- [ ] Lector de pantalla (NVDA, JAWS, VoiceOver)
- [ ] Zoom de página al 200%
- [ ] Modo alto contraste del OS

---

## 📋 Componentes del Proyecto

### Estado de Accesibilidad

| Componente | WCAG AA | Teclado | Screen Reader | Notas |
|------------|---------|---------|---------------|-------|
| Button | ✅ | ✅ | ✅ | Focus visible, labels claros |
| Input | ✅ | ✅ | ✅ | Labels, error messages, help text |
| Card | ✅ | ✅ | ✅ | Semántica correcta |
| Badge | ✅ | ✅ | ✅ | Colores con contraste 4.5:1+ |
| Modal | ✅ | ✅ | ✅ | Focus trap, Esc para cerrar |
| Toast | ✅ | N/A | ✅ | aria-live regions |
| Breadcrumbs | ✅ | ✅ | ✅ | nav + aria-label |
| Skeleton | ✅ | N/A | ✅ | aria-busy |
| Spinner | ✅ | N/A | ✅ | aria-label descriptivo |
| Navbar | ✅ | ✅ | ✅ | Skip link, nav role |

---

## 🎯 Criterios de Aceptación

Para que un PR sea aprobado:

1. **Automatizado**: Pasar lint (eslint-plugin-jsx-a11y)
2. **Manual**: Verificar puntos marcados en este checklist
3. **Navegación teclado**: Probar flujo completo con Tab
4. **Contraste**: Verificar con herramientas (mínimo 4.5:1)
5. **Screen reader**: Probar con NVDA/VoiceOver al menos

---

## 📚 Referencias

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [a11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**Última actualización**: Enero 2025  
**Responsable**: Frontend Team  
**Nivel objetivo**: WCAG 2.1 AA
