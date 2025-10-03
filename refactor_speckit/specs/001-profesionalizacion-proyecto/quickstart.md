# Quickstart

## Local Development

### 1. Backend

```bash
cd back
cp .env.example .env
# Editar .env con tus credenciales locales de PostgreSQL
npm install
npm run dev
```

Variables requeridas en `.env`:

- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- `NODE_ENV=development`
- `ALLOWED_ORIGINS=http://localhost:5173`

### 2. Frontend

```bash
cd front
npm install
npm run dev
```

### 3. Seed de datos (opcional)

```bash
cd back
npm run seed
```

Usuarios demo creados:

- admin.sistema / Admin123!
- maria.gonzalez / Maria123!
- carlos.rodriguez / Carlos123!

---

## Render Deployment (free tier)

> 📖 **Guía completa**: Ver [`docs/deployment-render.md`](../../docs/deployment-render.md)

### 1. Base de Datos PostgreSQL

- Crear instancia en Render: PostgreSQL 16
- Database: `medical_appointments`
- Copiar **Internal Database URL**
- Documentar credenciales (NO commitear)

### 2. Backend (Web Service)

- **Root Directory**: `back`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node dist/server.js`
- **Environment Variables**:
  ```
  PORT=3000
  APP_VERSION=1.0.0
  NODE_ENV=production
  DB_HOST=[de Render]
  DB_PORT=5432
  DB_USERNAME=[de Render]
  DB_PASSWORD=[de Render]
  DB_DATABASE=medical_appointments
  DB_SSL=true
  ALLOWED_ORIGINS=https://tu-frontend.onrender.com,http://localhost:5173
  ENABLE_RATE_LIMIT=true
  ```
- **Health Check**: `/health`

### 3. Frontend (Static Site)

- **Root Directory**: `front`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**:
  ```
  VITE_API_URL=https://tu-backend.onrender.com
  ```

### 4. Configurar CORS

- Actualizar `ALLOWED_ORIGINS` en backend con URL de frontend productivo
- Reiniciar backend en Render
- Validar desde navegador (no debe haber errores CORS)

### 5. Documentar URLs

Actualizar README con:

- 🌐 Frontend: `https://tu-proyecto-web.onrender.com`
- 🔧 Backend: `https://tu-proyecto-api.onrender.com`
- 📚 Docs: `https://tu-proyecto-api.onrender.com/docs`

---

## Verificación Manual

### Backend

- [ ] `/health` retorna status ok
- [ ] `/version` retorna APP_VERSION
- [ ] `/docs` muestra Swagger UI
- [ ] Logs de Pino sin errores
- [ ] Conexión a DB exitosa

### Frontend

- [ ] Home carga correctamente
- [ ] Login/Register funcional
- [ ] Mis Turnos muestra appointments
- [ ] Crear Turno crea appointment
- [ ] Cancelar Turno funciona
- [ ] No hay errores CORS en console

### Accesibilidad

- [ ] Foco visible (outline 3px)
- [ ] Navegación por teclado
- [ ] Contraste WCAG AA
- [ ] Skip link funciona
- [ ] ARIA labels presentes

### Seguridad

- [ ] Helmet headers configurados
- [ ] Rate limiting activo (100 req/15min)
- [ ] CORS con allowlist
- [ ] Variables sensibles en .env (no en código)
- [ ] Logging no expone passwords
