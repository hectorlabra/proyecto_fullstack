# 🚀 Solución Rápida - Deployment en Render

## ✅ Problema Resuelto

Acabas de experimentar **dos errores comunes** al hacer deploy en Render:

### Error 1: TypeScript no compila (TS7016) ✅ RESUELTO

**Error**: `Could not find a declaration file for module 'express'`

**Causa**: Render no instala `devDependencies` por defecto

**Solución aplicada**:

- ✅ Actualizado Build Command a: `npm install --include=dev && npm run build`
- ✅ Documentado en `docs/deployment-render.md`

### Error 2: Database no existe (3D000) ✅ RESUELTO

**Error**: `database "medical_appointments" does not exist`

**Causa**: Render crea bases de datos con nombres únicos (ej: `medical_appointments_qivi`)

**Solución aplicada**:

- ✅ Agregado soporte para `DATABASE_URL` en el código
- ✅ `data-source.ts` ahora parsea DATABASE_URL automáticamente
- ✅ Documentado en guías de deployment

---

## 📋 Pasos para Completar tu Deployment

### 1. Actualizar Variables de Entorno en Render

1. Ve a tu **Web Service** en Render Dashboard
2. Click en **Environment** en el menú lateral
3. **Elimina** estas variables si existen:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `DB_DATABASE`
   - `DB_SSL`
4. **Agrega** una sola variable nueva:

   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://medical_appointments_qivi_user:tjMRQaS58JpjGSyp14hgS6BXFld8gi3X@dpg-d3fceh3uibrs73dr83k0-a/medical_appointments_qivi`

5. Click **Save Changes**

### 2. Verificar Build Command

1. En tu Web Service → **Settings** → **Build & Deploy**
2. Confirmar que **Build Command** sea:
   ```bash
   npm install --include=dev && npm run build
   ```
3. Si no lo es, actualízalo y guarda

### 3. Hacer Deploy

1. Click en **Manual Deploy** → **Deploy latest commit**
2. Esperar 3-5 minutos
3. Verificar logs (no debe haber errores)

### 4. Probar el Backend

Abrir en navegador o usar curl:

```bash
curl https://tu-backend.onrender.com/health
```

**Respuesta esperada**:

```json
{
  "status": "ok",
  "timestamp": "2025-10-02T...",
  "uptime": 123.45,
  "environment": "production",
  "database": "connected"
}
```

✅ Si ves `"database": "connected"`, todo funciona!

---

## 🔧 Si Aún Tienes Problemas

### Error: "CORS policy"

- Actualizar `ALLOWED_ORIGINS` después de deploy del frontend
- Ver sección 4️⃣ en `docs/deployment-render.md`

### Error: "Cold start" (15-30 segundos)

- Normal en Free tier de Render
- Primera request despierta el servicio
- Ver "Plan Free se duerme" en troubleshooting

### Backend no conecta a base de datos

1. Verificar que DATABASE_URL esté correcta
2. Copiar nuevamente "Internal Database URL" de PostgreSQL en Render
3. Confirmar que PostgreSQL service esté "Live"

---

## 📚 Documentación Completa

- **Guía completa**: `docs/deployment-render.md` (400+ líneas)
- **Checklist paso a paso**: `docs/deployment-checklist.md` (270+ líneas)
- **Variables de entorno**: `back/.env.example`

---

## 🎉 Siguientes Pasos

Una vez que el backend funcione:

1. **Deploy del Frontend** (Static Site en Render)

   - Build Command: `npm install --include=dev && npm run build`
   - Publish Directory: `dist`
   - Variable: `VITE_API_URL=https://tu-backend.onrender.com`

2. **Actualizar CORS** en backend

   - Editar `ALLOWED_ORIGINS` con URL del frontend deployed

3. **Probar E2E**

   - Registro de usuario
   - Login
   - Crear cita
   - Cancelar cita

4. **Documentar URLs** en README para reclutadores

---

**Última actualización**: 2 de octubre de 2025  
**Commits aplicados**:

- `fix: corregir build command para incluir devDependencies en Render` (9b85883)
- `feat: agregar soporte para DATABASE_URL en configuración de TypeORM` (91934e4)
- `docs: mejorar troubleshooting de errores de conexión` (d85f2ba)
