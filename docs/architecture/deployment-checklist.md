# 🚀 Checklist de Deployment Manual en Render

Este documento guía el proceso manual de deployment paso a paso.

## ✅ Pre-requisitos Completados

- [x] Código preparado con API_URL configurable
- [x] Backend con health check en `/health`
- [x] .env.example actualizado con todas las variables
- [x] CORS configurado con variable ALLOWED_ORIGINS
- [x] Logging estructurado con Pino
- [x] ErrorBoundary en frontend
- [x] Documentación completa en `docs/architecture/deployment-render.md`

---

## 📝 Pasos del Deployment

### 1. Crear PostgreSQL en Render (5 min)

- [ ] Ir a [Render Dashboard](https://dashboard.render.com)
- [ ] Click "New +" → "PostgreSQL"
- [ ] Configurar:
  - Name: `medical-appointments-db`
  - Database: `medical_appointments`
  - Region: Oregon (o más cercana)
  - Plan: Free
- [ ] Click "Create Database"
- [ ] **Copiar Internal Database URL** (empieza con `postgresql://`)
- [ ] Guardar URL de forma segura (NO commitear)

**Resultado esperado**: Base de datos creada y URL disponible

---

### 2. Deploy Backend en Render (10 min)

- [ ] En Render Dashboard → "New +" → "Web Service"
- [ ] Conectar repositorio GitHub
- [ ] Seleccionar repo `proyecto-fullstack`
- [ ] Configurar servicio:

  - Name: `medical-appointments-api`
  - Region: Oregon (misma que DB)
  - Branch: `main`
  - Root Directory: `back`
  - Runtime: Node
  - Build Command: `npm install --include=dev && npm run build`
  - Start Command: `node dist/server.js`
  - Plan: Free

- [ ] Agregar Environment Variables (copiar "Internal Database URL" de PostgreSQL):

  ```bash
  PORT=3000
  APP_VERSION=1.0.0
  NODE_ENV=production
  DATABASE_URL=[copiar Internal Database URL completa de Render]
  ALLOWED_ORIGINS=http://localhost:5173
  ENABLE_RATE_LIMIT=true
  ```

  > 💡 **Importante**: Usar DATABASE_URL completa, no variables separadas. El nombre de DB que crea Render es diferente.

- [ ] Click "Create Web Service"
- [ ] Esperar build (3-5 minutos)
- [ ] **Copiar URL del backend** (ej: `https://medical-appointments-api.onrender.com`)
- [ ] Probar health check: `https://tu-backend.onrender.com/health`

**Respuesta esperada del health check:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-02T...",
  "uptime": 45.67,
  "environment": "production",
  "database": "connected"
}
```

**Si falla**: Ver sección Troubleshooting en `docs/architecture/deployment-render.md`

---

### 3. Deploy Frontend en Render (10 min)

- [ ] En Render Dashboard → "New +" → "Static Site"
- [ ] Conectar repositorio GitHub
- [ ] Seleccionar repo `proyecto-fullstack`
- [ ] Configurar servicio:

  - Name: `medical-appointments-web`
  - Branch: `main`
  - Root Directory: `front`
  - Build Command: `npm install --include=dev && npm run build`
  - Publish Directory: `dist`

- [ ] Agregar Environment Variable:

  ```bash
  VITE_API_URL=https://tu-backend.onrender.com
  ```

  > ⚠️ Reemplazar con la URL real de tu backend del paso 2

- [ ] Click "Create Static Site"
- [ ] Esperar build (3-5 minutos)
- [ ] **Copiar URL del frontend** (ej: `https://medical-appointments-web.onrender.com`)
- [ ] Abrir URL en navegador y verificar que carga

**Resultado esperado**: Home page carga sin errores

---

### 4. Configurar CORS en Producción (5 min)

- [ ] Ir al Web Service del backend en Render
- [ ] Click en "Environment"
- [ ] Editar variable `ALLOWED_ORIGINS`:

  ```bash
  ALLOWED_ORIGINS=https://tu-frontend.onrender.com,http://localhost:5173
  ```

  > ⚠️ Reemplazar con la URL real de tu frontend del paso 3

- [ ] Click "Save Changes"
- [ ] Render redesplegará automáticamente (1-2 min)
- [ ] Esperar a que el servicio esté "Live" nuevamente

---

### 5. Validar Deployment Completo (10 min)

#### Backend

- [ ] Abrir: `https://tu-backend.onrender.com/health`
  - Debe retornar JSON con `status: "ok"`
- [ ] Abrir: `https://tu-backend.onrender.com/version`
  - Debe retornar `APP_VERSION: "1.0.0"`
- [ ] Abrir: `https://tu-backend.onrender.com/docs`
  - Debe mostrar Swagger UI con endpoints documentados
- [ ] Ver logs en Render Dashboard:
  - No debe haber errores críticos
  - Debe mostrar "Conexión a la base de datos establecida"

#### Frontend

- [ ] Abrir: `https://tu-frontend.onrender.com`
- [ ] Verificar navegación:
  - [ ] Home carga correctamente
  - [ ] Navbar visible
  - [ ] Links funcionan
- [ ] Abrir DevTools (F12) → Console:
  - [ ] No debe haber errores CORS
  - [ ] No debe haber errores 404 o 500

#### Funcionalidad E2E

- [ ] Registrar nuevo usuario:
  - Username: `test.deploy`
  - Email: `test.deploy@example.com`
  - Password: `Test123!`
  - Otros campos a elección
- [ ] Hacer login con usuario creado
- [ ] Ver "Mis Turnos" (debe estar vacío inicialmente)
- [ ] Crear una nueva cita
- [ ] Verificar que aparece en "Mis Turnos"
- [ ] Cancelar la cita (si la fecha lo permite)
- [ ] Hacer logout

**Si todo funciona**: ✅ Deployment exitoso!

---

### 6. Documentar URLs en README (5 min)

- [ ] Abrir `README.md` del proyecto
- [ ] Agregar sección "🌐 Deployment":

  ```markdown
  ## 🌐 Deployment

  El proyecto está desplegado en Render:

  - **Frontend**: https://tu-frontend.onrender.com
  - **Backend API**: https://tu-backend.onrender.com
  - **API Documentation**: https://tu-backend.onrender.com/docs
  - **Health Check**: https://tu-backend.onrender.com/health

  > ⚠️ **Nota**: Los servicios en plan free se duermen después de 15 min de inactividad.
  > La primera request puede tardar 15-30 segundos (cold start).
  ```

- [ ] Commitear y pushear cambios:
  ```bash
  git add README.md
  git commit -m "docs: agregar URLs de deployment en Render"
  git push origin main
  ```

---

## 🎯 Resultado Final

Al completar todos los pasos, deberías tener:

✅ Base de datos PostgreSQL en Render  
✅ Backend API desplegado y funcionando  
✅ Frontend desplegado y funcionando  
✅ CORS configurado correctamente  
✅ Funcionalidad completa verificada  
✅ URLs documentadas en README

---

## 🐛 Troubleshooting Común

### Error: "Cannot connect to database"

**Solución**: Verificar que `DB_SSL=true` y que usas la Internal Database URL

### Error: "CORS policy blocked"

**Solución**: Actualizar `ALLOWED_ORIGINS` en backend con URL exacta del frontend

### Error: "Service unavailable" en primera request

**Explicación**: Cold start del free tier (15-30 seg). Es normal.

### Build falla en backend

**Solución**: Verificar que `Build Command` sea `npm install --include=dev && npm run build`

### Build falla en frontend

**Solución**:

1. Verificar que `VITE_API_URL` esté configurada
2. Verificar que `Publish Directory` sea `dist`

---

## 📊 Monitoreo Post-Deploy

- **Logs**: Ver en Render Dashboard → Logs
- **Metrics**: Ver en Render Dashboard → Metrics
- **Status**: Recibir notificaciones si servicio cae

---

## 🔄 Próximos Deploys

Después del primer deployment:

1. Hacer cambios en código local
2. Commitear y pushear a GitHub:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   git push origin main
   ```
3. Render auto-despliega automáticamente (si está habilitado)
4. Verificar logs para confirmar deploy exitoso

---

**Tiempo total estimado**: 45 minutos  
**Última actualización**: 2 de octubre de 2025  
**Autor**: Equipo de DevOps
