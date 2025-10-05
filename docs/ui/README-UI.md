# Sistema de Diseño UI - Medi Citas

Sistema de componentes y tokens centralizado para la aplicación "Medi Citas". Implementación completa basada en especificación JSON de handoff diseñador→desarrollador.

## 📐 Arquitectura

```
front/src/
├── styles/
│   └── variables.css       # Tokens centralizados (colores, spacing, typography)
├── components/
│   └── ui/                 # Componentes base prefijo "Mc"
│       ├── McButton.jsx
│       ├── McInputField.jsx
│       ├── McBadge.jsx
│       ├── McCard.jsx
│       ├── McModal.jsx
│       ├── McToast.jsx
│       └── McSkeleton.jsx
└── hooks/
    ├── useToast.jsx        # Context + hook para toasts
    ├── useMediaQuery.js    # Breakpoints responsive
    └── useLoadingState.js  # Estado de carga
```

## 🎨 Design Tokens

Todos los valores de diseño están centralizados en `styles/variables.css` como CSS Custom Properties. **Nunca uses valores hard-coded** (hex, px) directamente en componentes.

### Paleta de Colores

```css
/* Marca - Salud */
--color-primary: #0ea5a8; /* Teal principal */
--color-primary-hover: #0c8e90;
--color-primary-soft: #d5f4f5; /* Fondo suave */

--color-accent: #2563eb; /* Azul acento */
--color-accent-hover: #1d4ed8;
--color-accent-soft: #dbeafe;

/* Backgrounds */
--color-bg: #ffffff;
--color-bg-soft: #f8fafc;
--color-surface: #f8fafc;
--color-surface-elevated: #ffffff;

/* Text */
--color-text: #0f172a;
--color-text-secondary: #1e293b;
--color-text-muted: #475569;
--color-text-inverse: #ffffff;

/* Borders */
--color-border: #cbd5e1;
--color-border-light: #e2e8f0;

/* Semánticos */
--color-success: #16a34a;
--color-success-bg: #dcfce7;
--color-warning: #f59e0b;
--color-danger: #ef4444;
--color-info: #0891b2;
```

### Espaciado (escala 4px)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Tipografía

```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, ...;
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;

--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Radios, Sombras, Transiciones

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

--shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.06), ...;
--shadow-md: 0 6px 16px rgba(15, 23, 42, 0.08), ...;
--shadow-lg: 0 16px 32px rgba(15, 23, 42, 0.12), ...;

--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 240ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Z-index

```css
--z-base: 0;
--z-dropdown: 1000;
--z-modal: 1200;
--z-toast: 1300;
```

## 🧩 Componentes

### McButton

Botón con 5 variantes, 3 tamaños, estados loading/disabled, iconos opcionales.

```jsx
import McButton from './components/ui/McButton';
import { CalendarIcon } from './components/icons';

// Variantes: primary, accent, ghost, outline, danger
<McButton variant="primary" size="lg" onClick={handleClick}>
  Crear Cita
</McButton>

// Con icono
<McButton
  variant="accent"
  icon={<CalendarIcon size={20} />}
  iconPosition="left"
>
  Ver Mis Citas
</McButton>

// Loading
<McButton variant="primary" loading={isSubmitting}>
  Guardando...
</McButton>

// Full width
<McButton variant="outline" fullWidth>
  Botón completo
</McButton>
```

**Props:**

- `variant`: `'primary' | 'accent' | 'ghost' | 'outline' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `loading`: `boolean` - Muestra spinner, desactiva click
- `disabled`: `boolean`
- `fullWidth`: `boolean`
- `icon`: `ReactNode` - Icono SVG
- `iconPosition`: `'left' | 'right'`

---

### McInputField

Campo de entrada con label, validación inline, estados error/success.

```jsx
import McInputField from "./components/ui/McInputField";

<McInputField
  label="Correo electrónico"
  name="email"
  type="email"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  error={errors.email}
  helperText="Te enviaremos confirmación aquí"
  required
  autoComplete="email"
/>;
```

**Props:**

- `label`: `string`
- `name`: `string` (required)
- `type`: `string` - `'text' | 'email' | 'password' | 'number'` etc.
- `error`: `string` - Mensaje de error (activa estado visual)
- `helperText`: `string` - Texto de ayuda
- `required`: `boolean`
- `autoComplete`: `string`

---

### McBadge

Indicadores de estado compactos.

```jsx
import McBadge from './components/ui/McBadge';

<McBadge variant="success">Confirmada</McBadge>
<McBadge variant="warning">Pendiente</McBadge>
<McBadge variant="danger">Cancelada</McBadge>
<McBadge variant="info">Próxima</McBadge>
<McBadge variant="default" size="sm">Beta</McBadge>
```

**Variantes:** `default | success | warning | danger | info`  
**Tamaños:** `sm | md | lg`

---

### McCard

Contenedor elevado con header/body/footer opcionales.

```jsx
import McCard from './components/ui/McCard';

<McCard
  header={<h3>Cita Dr. González</h3>}
  footer={<button>Ver detalles</button>}
>
  <p>15 de octubre, 10:00 AM</p>
  <p>Cardiología - Consulta general</p>
</McCard>

// Card interactiva (clickeable)
<McCard interactive onClick={handleCardClick}>
  <p>Hacer clic aquí para abrir</p>
</McCard>
```

**Props:**

- `header`: `ReactNode`
- `footer`: `ReactNode`
- `interactive`: `boolean` - Convierte en button, hover/focus
- `onClick`: `function`

---

### McModal

Dialog modal accesible con cierre ESC, overlay, trap de foco.

```jsx
import McModal from "./components/ui/McModal";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<McModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar cancelación"
  size="md"
  footer={
    <>
      <McButton variant="ghost" onClick={() => setIsOpen(false)}>
        Volver
      </McButton>
      <McButton variant="danger" onClick={handleConfirm}>
        Confirmar
      </McButton>
    </>
  }
>
  <p>¿Estás seguro de cancelar esta cita?</p>
</McModal>;
```

**Props:**

- `isOpen`: `boolean` (required)
- `onClose`: `function` (required)
- `title`: `string`
- `size`: `'sm' | 'md' | 'lg' | 'xl'`
- `footer`: `ReactNode`
- `closeOnOverlayClick`: `boolean` (default: true)
- `showCloseButton`: `boolean` (default: true)

**Accesibilidad:**

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Cierre con ESC
- Previene scroll del body mientras está abierto

---

### McToast

Notificación temporal (usar via hook `useToast`).

```jsx
import { useToast } from "./hooks/useToast.jsx";

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success("Cita creada correctamente");
  };

  const handleError = () => {
    toast.error("Error al guardar", 7000); // duración custom
  };

  const handleWarning = () => {
    toast.warning("Revisa tus datos");
  };

  return <button onClick={handleSuccess}>Guardar</button>;
}
```

**API del hook:**

- `toast.success(message, duration?)`
- `toast.error(message, duration?)`
- `toast.warning(message, duration?)`
- `toast.info(message, duration?)`
- `toast.addToast(message, variant, duration?)` - Manual

**Duración default:** 5000ms (5s)  
**Posición:** bottom-right (mobile: bottom full-width)

---

### McSkeleton

Placeholder animado para loading states.

```jsx
import McSkeleton from './components/ui/McSkeleton';

// Texto simple
<McSkeleton variant="text" width="60%" />

// Título
<McSkeleton variant="title" width="40%" />

// Bloque rectangular
<McSkeleton variant="rectangular" height={120} />

// Avatar circular
<McSkeleton variant="circular" />

// Múltiples líneas
<McSkeleton variant="text" count={3} />
```

**Variantes:** `text | title | circular | rectangular`  
**Props:** `width`, `height`, `count`

---

## 🪝 Hooks

### useToast

Ya documentado arriba. Debe envolver App con `<ToastProvider>` (ya implementado en `App.jsx`).

### useMediaQuery

Detecta breakpoints responsive.

```jsx
import { useMediaQuery, useBreakpoint } from "./hooks/useMediaQuery";

// Uso básico
const isMobile = useMediaQuery("(max-width: 767px)");

// Breakpoints predefinidos
const { isMobile, isTablet, isDesktop, isMd, isLg } = useBreakpoint();

if (isMobile) {
  return <MobileView />;
}
```

**Breakpoints Medi Citas:**

- `xs`: 0px
- `sm`: 480px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### useLoadingState

Gestiona estados de carga async.

```jsx
import { useLoadingState } from "./hooks/useLoadingState";

const { isLoading, startLoading, stopLoading, withLoading } = useLoadingState();

// Manual
const handleSubmit = async () => {
  startLoading();
  await saveData();
  stopLoading();
};

// Automático
const handleSubmit = () => {
  withLoading(async () => {
    await saveData();
  });
};

<McButton loading={isLoading}>Guardar</McButton>;
```

---

## 🎯 Guía de Uso

### Regla #1: Usar siempre tokens CSS

❌ **MAL:**

```css
.my-component {
  color: #0ea5a8;
  padding: 16px;
  border-radius: 12px;
}
```

✅ **BIEN:**

```css
.my-component {
  color: var(--color-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

### Regla #2: Respetar jerarquía semántica

```jsx
// Estados de cita
<McBadge variant="success">Confirmada</McBadge>
<McBadge variant="warning">Pendiente</McBadge>
<McBadge variant="danger">Cancelada</McBadge>

// Acciones principales
<McButton variant="primary">Crear Cita</McButton>
<McButton variant="accent">Ver Detalles</McButton>

// Acciones secundarias
<McButton variant="ghost">Cancelar</McButton>
<McButton variant="outline">Volver</McButton>

// Acciones destructivas
<McButton variant="danger">Eliminar</McButton>
```

### Regla #3: Accesibilidad obligatoria

```jsx
// ✅ Labels explícitos
<McInputField
  label="Nombre completo"
  name="fullName"
  required
  error={errors.fullName}
  aria-describedby="name-helper"
/>

// ✅ Roles ARIA en modales
<McModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Confirmar acción"  // genera aria-labelledby automáticamente
>
  ...
</McModal>

// ✅ Loading states comunicados
<McButton loading={isSubmitting} aria-busy={isSubmitting}>
  Guardando...
</McButton>
```

### Regla #4: Responsive mobile-first

```css
/* Mobile por defecto */
.my-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .my-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .my-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }
}
```

---

## 🚀 Añadir Nuevos Componentes

1. **Crear archivo en `components/ui/`** con prefijo `Mc`:

   ```
   McStepIndicator.jsx
   McStepIndicator.css
   ```

2. **Usar solo tokens de variables.css**

3. **Incluir estados accesibles:**

   - Hover, focus, active
   - Disabled, loading
   - ARIA roles cuando corresponda

4. **PropTypes obligatorio:**

   ```jsx
   McMyComponent.propTypes = {
     variant: PropTypes.oneOf(["primary", "secondary"]),
     children: PropTypes.node.isRequired,
   };
   ```

5. **Documentar en este README:**
   - Props
   - Ejemplo de uso
   - Variantes disponibles

---

## 🔍 Testing (futuro)

```bash
npm run test  # Jest + React Testing Library
```

Prioridades de testing:

- Render correcto de todos los componentes
- Estados interactivos (hover, focus, disabled)
- Accesibilidad (axe-core integration)
- Skeleton loading en vistas complejas

---

## 📦 Build & Deploy

```bash
npm run lint    # ESLint: 0 errores tolerados
npm run build   # Vite build production
npm run preview # Preview build localmente
```

**Regla lint custom:** No se permiten colores hex ni valores px fuera de tokens (implementar en futuro con plugin ESLint).

---

## 🌗 Dark Mode (extensión futura)

Los tokens ya incluyen soporte para `prefers-color-scheme: dark` en `variables.css`. Para activar manualmente:

1. Crear `AppThemeProvider` context
2. Agregar toggle UI en Navbar
3. Persistir preferencia en localStorage

---

## 🌍 Internacionalización (preparada)

Textos actualmente hard-coded en español. Para i18n:

1. Instalar `react-i18next` o similar
2. Extraer strings a diccionario `es-ES.json`
3. Implementar selector de idioma en Navbar

Formato de fecha/hora ya preparado:

- Fecha: DD/MM/YYYY
- Hora: HH:mm (24h)

---

## 📞 Soporte

Para dudas sobre implementación UI:

- Revisar especificación JSON completa en raíz del proyecto
- Consultar ejemplos en páginas existentes (Home, Navbar)
- Respetar design principles: Claridad, Confianza, Rapidez, Accesibilidad

**Última actualización:** 3 de octubre de 2025  
**Versión sistema UI:** 1.0.0
