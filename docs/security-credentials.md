# Guía de Seguridad - Gestión de Credenciales

## ⚠️ Reglas Críticas

### 1. Variables de Entorno

- **NUNCA** commitear archivos `.env` al repositorio
- **SIEMPRE** usar `.env.example` con valores placeholder
- **VERIFICAR** que `.env` esté en `.gitignore`

### 2. Credenciales en Código

#### ✅ PERMITIDO (Solo en desarrollo)

- Credenciales hardcodeadas en `seed-database.ts` para datos de prueba
- Valores por defecto seguros en configuración de desarrollo
- Tokens y API keys de servicios de testing/sandbox

#### ❌ PROHIBIDO

- Credenciales de producción en código fuente
- API keys reales en archivos commiteados
- Passwords de usuarios reales o servicios productivos
- Tokens de autenticación permanentes

### 3. Archivo .gitignore

Actualmente ignora:

```
.env
node_modules/
dist/
*.log
```

### 4. Validación Pre-Commit

Para prevenir commits accidentales de credenciales, considerar:

```bash
# Instalar herramienta de validación (futuro)
npm install --save-dev git-secrets
# o
npm install --save-dev detect-secrets
```

### 5. Credenciales de Seed (Desarrollo)

Las contraseñas en `seed-database.ts` son:

- **Propósito**: Solo para desarrollo local y testing
- **Documentadas**: En README.md con tabla de usuarios demo
- **Protegidas**: Script no se ejecuta si `NODE_ENV=production`

**Usuarios de prueba:**
| Username | Password | Rol |
|----------|----------|-----|
| admin.sistema | Admin123! | Admin |
| maria.gonzalez | Maria123! | Usuario |
| carlos.rodriguez | Carlos123! | Usuario |

> ⚠️ Estos usuarios NO deben existir en producción

### 6. Checklist de Seguridad

Antes de cada deploy a producción:

- [ ] `.env` NO está en el repositorio
- [ ] `.env.example` solo tiene placeholders
- [ ] Variables de producción configuradas en Render/Vercel
- [ ] `NODE_ENV=production` en entorno productivo
- [ ] Seed script bloqueado para producción
- [ ] API keys rotadas desde desarrollo
- [ ] Logs no exponen credenciales (ver `logger.ts` redact)

### 7. Rotación de Credenciales

Si se expone accidentalmente una credencial:

1. **Inmediato**: Revocar/cambiar la credencial
2. Actualizar en servicio de producción (Render secrets)
3. Revertir commit si fue pusheado
4. Reescribir historia git si es necesario:
   ```bash
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch archivo_sensible' \
     --prune-empty --tag-name-filter cat -- --all
   ```
5. Forzar push (con cuidado): `git push origin --force --all`

### 8. Logging Seguro

El logger de Pino está configurado para redactar campos sensibles:

```typescript
redact: {
  paths: ["password", "*.password", "authorization", "*.token"],
  censor: "[REDACTED]",
}
```

### 9. Para Nuevos Desarrolladores

1. Copiar `.env.example` a `.env`
2. Solicitar credenciales de desarrollo al líder del proyecto
3. **NUNCA** compartir credenciales por Slack/Email sin cifrar
4. Usar herramientas seguras: 1Password, Bitwarden, HashiCorp Vault

### 10. Contacto en Caso de Incidente

Si descubres credenciales expuestas:

- Notificar inmediatamente al equipo
- Documentar: qué, cuándo, dónde se expuso
- Seguir protocolo de rotación

---

**Última actualización**: 2 de octubre de 2025
**Responsable**: Equipo de DevOps/Seguridad
