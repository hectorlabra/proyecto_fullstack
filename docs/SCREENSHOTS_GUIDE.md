# Guía para Capturar Screenshots y GIF

## 📸 Screenshots Requeridas (mínimo 2)

### Screenshot 1: Home/Login

- **URL**: `https://tu-app.onrender.com/` o `http://localhost:5173/`
- **Contenido**: Página de inicio mostrando navbar y login/registro
- **Nombre**: `docs/screenshot-home.png`

### Screenshot 2: Dashboard de Turnos

- **URL**: `https://tu-app.onrender.com/mis-turnos` (logueado)
- **Contenido**: Vista de turnos del usuario con tarjetas de citas
- **Nombre**: `docs/screenshot-turnos.png`

### Screenshot 3 (Opcional): Crear Turno

- **URL**: `https://tu-app.onrender.com/create-appointment`
- **Contenido**: Formulario de creación de turno
- **Nombre**: `docs/screenshot-create.png`

---

## 🎬 GIF de Navegación (30-60 segundos)

### Flujo Recomendado:

1. **Inicio** → Mostrar home
2. **Login** → Ingresar credenciales demo
3. **Mis Turnos** → Ver lista de citas
4. **Crear Turno** → Completar formulario
5. **Confirmar** → Mostrar turno creado
6. **Cancelar** → Cambiar estado

### Herramientas para Grabar GIF:

#### macOS:

- **LICEcap** (gratuito): https://www.cockos.com/licecap/
- **Kap** (gratuito, moderno): https://getkap.co/
- **QuickTime + Convertidor**: Grabar con QuickTime → convertir a GIF con ezgif.com

#### Windows:

- **ScreenToGif** (gratuito): https://www.screentogif.com/
- **LICEcap** (gratuito): https://www.cockos.com/licecap/

#### Online (multiplataforma):

- **Recordit** (gratuito): http://recordit.co/
- **ezgif.com** (convertir video a GIF)

### Configuración Recomendada:

- **Resolución**: 1280x720 o 1920x1080
- **FPS**: 10-15 (para tamaño óptimo)
- **Duración**: 30-60 segundos
- **Tamaño máximo**: ~5-10MB
- **Nombre**: `docs/demo-navigation.gif`

---

## 🚀 Pasos para Completar T024

### 1. Iniciar aplicación localmente o usar Render

```bash
# Opción 1: Local (recomendado para mejores capturas)
cd back && npm run dev
cd front && npm run dev

# Opción 2: Usar deployment en Render
# Navegar a: https://tu-frontend.onrender.com
```

### 2. Capturar Screenshots

- Abre Chrome/Firefox con DevTools (F12) para vista responsive
- Captura cada vista con Cmd+Shift+4 (macOS) o Snipping Tool (Windows)
- Guarda como `screenshot-home.png`, `screenshot-turnos.png`, etc.

### 3. Grabar GIF

- Abre herramienta de grabación (Kap/ScreenToGif)
- Graba el flujo completo de navegación
- Exporta como `demo-navigation.gif`

### 4. Copiar a `docs/`

```bash
# Desde tu carpeta de descargas/capturas
cp ~/Downloads/screenshot-*.png docs/
cp ~/Downloads/demo-navigation.gif docs/
```

### 5. Verificar archivos

```bash
ls -lh docs/*.png docs/*.gif
```

---

## 📝 Checklist de Validación

- [ ] Al menos 2 screenshots en alta resolución (PNG)
- [ ] GIF de navegación fluido y completo
- [ ] Archivos nombrados consistentemente
- [ ] Tamaño de GIF razonable (<10MB)
- [ ] Imágenes muestran la UI real de producción/local

---

## 🔄 Una Vez Capturado

Avísame cuando hayas copiado los archivos a `docs/` y ejecutaré:

1. Verificar archivos con `ls docs/`
2. Actualizar `README.md` con enlaces a screenshots y GIF
3. Marcar T024 como completada
4. Commit: `docs: T024 añadir screenshots y GIF de navegación`
