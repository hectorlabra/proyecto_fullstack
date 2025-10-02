# Guía de Deployment en Render

Esta guía describe el proceso completo para desplegar el proyecto en Render (base de datos, backend y frontend).

## 📋 Pre-requisitos

- Cuenta en [Render](https://render.com) (gratuita)
- Repositorio de GitHub con el código actualizado
- Variables de entorno documentadas en `back/.env.example`

---

## 1️⃣ Crear Base de Datos PostgreSQL

### Paso 1: Crear servicio PostgreSQL

1. Ir a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"PostgreSQL"**
3. Configurar:

   - **Name**: `medical-appointments-db` (o tu preferencia)
   - **Database**: `medical_appointments`
   - **User**: (auto-generado por Render)
   - **Region**: Elegir más cercana (ej: Oregon, USA)
   - **PostgreSQL Version**: 16 (o última disponible)
   - **Plan**: Free (o Starter si necesitas más recursos)

4. Click en **"Create Database"**

### Paso 2: Obtener URL de conexión

Una vez creada la base de datos:

1. Ir a la pestaña **"Info"**
2. Copiar **"Internal Database URL"** (comienza con `postgresql://`)
3. Guardar esta URL - la necesitarás para el backend

**Formato de la URL:**

```
postgresql://user:password@host:5432/database
```

### Paso 3: Documentar credenciales (opcional)

Crear archivo `specs/001-profesionalizacion-proyecto/quickstart.md` con:

```markdown
# Quickstart - Credenciales de Render

## Base de Datos PostgreSQL

- **Host**: [tu-host].render.com
- **Port**: 5432
- **Database**: medical_appointments
- **User**: [auto-generado]
- **Password**: [auto-generado]
- **Internal URL**: postgresql://...
```

> ⚠️ **IMPORTANTE**: No commitear este archivo. Agregarlo a `.gitignore`

---

## 2️⃣ Deploy Backend (Web Service)

### Paso 1: Crear Web Service

1. En Render Dashboard → **"New +"** → **"Web Service"**
2. Conectar repositorio de GitHub
3. Seleccionar tu repositorio `proyecto-fullstack`
4. Configurar:
   - **Name**: `medical-appointments-api` (o tu preferencia)
   - **Region**: Misma que la base de datos
   - **Branch**: `main`
   - **Root Directory**: `back`
   - **Runtime**: Node
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `node dist/server.js`
   - **Plan**: Free (o Starter)

### Paso 2: Configurar Variables de Entorno

En la sección **"Environment Variables"**, tienes **dos opciones**:

#### Opción A: URL completa (Recomendado - Más simple)

```bash
# Servidor
PORT=3000
APP_VERSION=1.0.0
NODE_ENV=production

# Base de Datos (copiar Internal Database URL de Render)
DATABASE_URL=postgresql://user:password@host:5432/database

# CORS (actualizar después de deploy frontend)
ALLOWED_ORIGINS=http://localhost:5173

# Rate Limiting
ENABLE_RATE_LIMIT=true
```

> 💡 **Ventaja**: Solo una variable, Render la proporciona automáticamente

#### Opción B: Variables individuales

```bash
# Servidor
PORT=3000
APP_VERSION=1.0.0
NODE_ENV=production

# Base de Datos (copiar de PostgreSQL creado)
DB_HOST=[host de Render]
DB_PORT=5432
DB_USERNAME=[user de Render]
DB_PASSWORD=[password de Render]
DB_DATABASE=medical_appointments
DB_SSL=true

# CORS (actualizar después de deploy frontend)
ALLOWED_ORIGINS=http://localhost:5173

# Rate Limiting
ENABLE_RATE_LIMIT=true
```

> � **Nota**: Si usas `DATABASE_URL`, TypeORM debe estar configurado para parsearla. Si usas variables individuales, asegúrate de incluir `DB_SSL=true`

### Paso 3: Deploy

1. Click en **"Create Web Service"**
2. Render comenzará el build automáticamente
3. Esperar a que el deploy finalice (estado: Live)
4. Probar endpoint de health: `https://tu-backend.onrender.com/health`

**Respuesta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-02T...",
  "uptime": 123.45,
  "environment": "production",
  "database": "connected"
}
```

### Paso 4: Verificar Logs

En la pestaña **"Logs"**:

- Verificar que no haya errores
- Confirmar conexión a base de datos
- Ver mensajes de Pino logger

---

## 3️⃣ Deploy Frontend (Static Site)

### Paso 1: Configurar variable de API en código

Actualizar `front/src/helpers/myAppointments.js` o crear archivo de configuración:

```javascript
// front/src/config.js
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

Usar en axios:

```javascript
import axios from "axios";
import { API_URL } from "../config";

axios.get(`${API_URL}/appointments`);
```

### Paso 2: Crear Static Site

1. En Render Dashboard → **"New +"** → **"Static Site"**
2. Conectar repositorio de GitHub
3. Seleccionar tu repositorio `proyecto-fullstack`
4. Configurar:
   - **Name**: `medical-appointments-web` (o tu preferencia)
   - **Branch**: `main`
   - **Root Directory**: `front`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Paso 3: Configurar Variable de Entorno

En la sección **"Environment Variables"**:

```bash
VITE_API_URL=https://tu-backend.onrender.com
```

> 📝 **Nota**: Reemplazar `tu-backend` con el nombre real de tu Web Service

### Paso 4: Deploy

1. Click en **"Create Static Site"**
2. Render comenzará el build con Vite
3. Esperar a que finalice (estado: Live)
4. Acceder a la URL: `https://tu-frontend.onrender.com`

---

## 4️⃣ Configurar CORS en Producción

### Paso 1: Actualizar ALLOWED_ORIGINS

1. Ir al Web Service del backend en Render
2. Ir a **"Environment"**
3. Editar variable `ALLOWED_ORIGINS`:

```bash
ALLOWED_ORIGINS=https://tu-frontend.onrender.com,http://localhost:5173
```

> 💡 Incluir `http://localhost:5173` permite desarrollo local apuntando a backend productivo

### Paso 2: Reiniciar Backend

1. Click en **"Manual Deploy"** → **"Deploy latest commit"**
2. O esperar auto-deploy si hay cambios en el repo

### Paso 3: Validar CORS desde Navegador

1. Abrir `https://tu-frontend.onrender.com`
2. Abrir DevTools (F12) → Console
3. Intentar hacer login o cargar datos
4. **No debe haber errores de CORS**

**Error esperado si CORS mal configurado:**

```
Access to XMLHttpRequest at 'https://tu-backend.onrender.com/appointments'
from origin 'https://tu-frontend.onrender.com' has been blocked by CORS policy
```

**Correcto si CORS funciona:**

- Requests exitosos (status 200)
- Headers incluyen `Access-Control-Allow-Origin`

---

## 🔍 Troubleshooting

### Backend no inicia

**Síntoma**: Build exitoso pero servicio no responde

**Solución**:

1. Verificar logs en Render
2. Confirmar que `Start Command` sea `node dist/server.js`
3. Verificar que `PORT` esté en variables de entorno
4. Confirmar que `DB_SSL=true` para Render

### Error de compilación TypeScript (TS7016)

**Síntoma**: Build falla con errores como `Could not find a declaration file for module 'express'`

**Causa**: Render no instala `devDependencies` por defecto (donde están los `@types/*`)

**Solución**:

1. Ir a Web Service → **Settings** → **Build & Deploy**
2. Cambiar **Build Command** a: `npm install --include=dev && npm run build`
3. Click en **Save Changes**
4. Hacer **Manual Deploy** → **Deploy latest commit**

> 💡 El flag `--include=dev` instala también las devDependencies necesarias para compilar TypeScript

### Frontend no conecta con Backend

**Síntoma**: Requests fallan con error de red

**Solución**:

1. Verificar que `VITE_API_URL` esté configurada
2. Confirmar que backend esté Live
3. Probar backend directamente: `curl https://tu-backend.onrender.com/health`
4. Verificar CORS en variables de entorno del backend

### Error de conexión a base de datos

**Síntoma**: Backend crashea con error PostgreSQL

**Solución**:

1. Verificar credenciales de DB en variables de entorno
2. Confirmar `DB_SSL=true`
3. Usar "Internal Database URL" de Render (no externa)
4. Verificar que base de datos esté Live en Render

### Plan Free se duerme

**Síntoma**: Primera request muy lenta (15-30 segundos)

**Explicación**:

- Render Free tier duerme servicios después de 15 min de inactividad
- Primera request despierta el servicio (cold start)

**Soluciones**:

- Actualizar a plan Starter ($7/mes) para keep-alive
- Implementar ping service (ej: UptimeRobot)
- Advertir a usuarios del delay inicial

---

## 📊 Monitoreo Post-Deploy

### Healthcheck automático

Render hace ping a `/health` cada 30 segundos. Si falla, marca el servicio como unhealthy.

### Logs estructurados

Ver logs en Render Dashboard:

- Requests con request-id
- Errores con stack traces
- Conexiones a base de datos
- Performance de endpoints

### Métricas

En Render Dashboard → pestaña **"Metrics"**:

- CPU usage
- Memory usage
- Request latency
- Error rate

---

## 🚀 Siguientes Pasos

Después del deployment:

1. **Ejecutar seed** (opcional, solo desarrollo):

   ```bash
   # Conectarse a base de datos con psql
   psql postgresql://user:pass@host:5432/db
   # Ejecutar seed manualmente si es necesario
   ```

2. **Probar funcionalidad completa**:

   - Registro de usuario
   - Login
   - Crear cita
   - Cancelar cita
   - Validar emails únicos

3. **Documentar URLs en README**:

   - Backend: `https://tu-backend.onrender.com`
   - Frontend: `https://tu-frontend.onrender.com`
   - OpenAPI docs: `https://tu-backend.onrender.com/docs`

4. **Compartir con reclutadores**:
   - URL del frontend deployed
   - Link al repositorio GitHub
   - Credenciales de usuario demo (si aplicables)

---

## 📝 Notas Importantes

- **Free tier limitations**:
  - 750 horas/mes de Web Service
  - 90 días de PostgreSQL gratis, luego $7/mes
  - Sleep después de 15 min inactividad
- **Auto-deploys**:

  - Render auto-deploya cuando haces push a `main`
  - Desactivar en Settings si prefieres deploy manual

- **Custom domains**:

  - Disponible en todos los planes
  - Configurar DNS en tu proveedor de dominio

- **SSL/HTTPS**:
  - Automático en Render (Let's Encrypt)
  - No requiere configuración

---

**Última actualización**: 2 de octubre de 2025  
**Autor**: Equipo de DevOps
