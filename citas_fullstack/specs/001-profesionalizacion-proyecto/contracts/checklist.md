# Checklist de Verificación Contractual

Este documento proporciona un checklist sistemático para verificar que todos los endpoints de la API cumplen con el contrato definido en `openapi.yaml`.

## 📋 Cómo Usar Este Checklist

1. **Desarrollo Local**: Ejecutar estos comandos contra `http://localhost:3000`
2. **Producción**: Ejecutar contra la URL de Render después del deploy
3. **Marcar** cada ítem como ✅ cuando pase la verificación
4. **Documentar** cualquier discrepancia encontrada

---

## 🔍 Endpoints de Monitoreo

### ✅ GET /health

**Objetivo**: Verificar que el endpoint de health check retorna el estado correcto del servicio.

**Comando Local**:

```bash
curl -X GET http://localhost:3000/health -H "Content-Type: application/json" | jq
```

**Comando Producción**:

```bash
curl -X GET https://[tu-api].onrender.com/health -H "Content-Type: application/json" | jq
```

**Verificaciones**:

- [ ] Retorna status code `200`
- [ ] Respuesta contiene campo `status` con valor `"ok"`
- [ ] Respuesta contiene campo `timestamp` con formato ISO 8601
- [ ] Respuesta contiene campo `uptime` con valor numérico
- [ ] Respuesta contiene campo `environment` con valor válido (`development`, `production`, `test`)
- [ ] Content-Type es `application/json`

**Respuesta Esperada**:

```json
{
  "status": "ok",
  "timestamp": "2025-10-01T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

---

### ✅ GET /version

**Objetivo**: Verificar que el endpoint de versión retorna información correcta de la API.

**Comando Local**:

```bash
curl -X GET http://localhost:3000/version -H "Content-Type: application/json" | jq
```

**Comando Producción**:

```bash
curl -X GET https://[tu-api].onrender.com/version -H "Content-Type: application/json" | jq
```

**Verificaciones**:

- [ ] Retorna status code `200`
- [ ] Respuesta contiene campo `version` con formato SemVer (ej. `"1.0.0"`)
- [ ] Respuesta contiene campo `apiName` con nombre descriptivo
- [ ] Respuesta contiene campo `buildDate` (opcional)
- [ ] Respuesta contiene campo `nodeVersion` (opcional)
- [ ] Content-Type es `application/json`

**Respuesta Esperada**:

```json
{
  "version": "1.0.0",
  "apiName": "API de Gestión de Turnos",
  "buildDate": "2025-10-01",
  "nodeVersion": "18.x"
}
```

---

## 👤 Endpoints de Usuarios

### ✅ POST /users/register

**Objetivo**: Registrar un nuevo usuario con credenciales válidas.

**Comando Local**:

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan.perez.test@example.com",
    "birthdate": "1990-05-15",
    "nDni": "12345678",
    "username": "juanperez_test",
    "password": "ContraseñaSegura123!"
  }' | jq
```

**Verificaciones - Caso Exitoso (201)**:

- [ ] Retorna status code `201 Created`
- [ ] Respuesta contiene `id` del usuario creado
- [ ] Respuesta contiene todos los campos del usuario (name, email, birthdate, nDni)
- [ ] Respuesta NO contiene la contraseña en texto plano
- [ ] Respuesta contiene objeto `credential` con `id` y `username`
- [ ] Email y username son únicos (no duplicados)

**Verificaciones - Error de Validación (400)**:

```bash
# Email inválido
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "email-invalido",
    "birthdate": "1990-05-15",
    "nDni": "12345678",
    "username": "test",
    "password": "pass123"
  }' | jq
```

- [ ] Retorna status code `400 Bad Request`
- [ ] Respuesta contiene campo `error` con mensaje descriptivo
- [ ] Respuesta contiene array `details` con errores por campo

---

### ✅ POST /users/login

**Objetivo**: Autenticar usuario con credenciales correctas.

**Comando Local (Login Exitoso)**:

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juanperez_test",
    "password": "ContraseñaSegura123!"
  }' | jq
```

**Verificaciones - Login Exitoso (200)**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta contiene campo `login: true`
- [ ] Respuesta contiene objeto `user` con datos básicos
- [ ] Respuesta NO contiene la contraseña

**Comando Local (Login Fallido)**:

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario_inexistente",
    "password": "contraseña_incorrecta"
  }' | jq
```

**Verificaciones - Login Fallido (401)**:

- [ ] Retorna status code `401 Unauthorized`
- [ ] Respuesta contiene campo `login: false`
- [ ] Respuesta contiene campo `message` con error descriptivo

---

### ✅ GET /users

**Objetivo**: Obtener lista de todos los usuarios.

**Comando Local**:

```bash
curl -X GET http://localhost:3000/users -H "Content-Type: application/json" | jq
```

**Verificaciones**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta es un array de usuarios
- [ ] Cada usuario contiene: id, name, email, birthdate, nDni
- [ ] NO se incluyen contraseñas ni datos sensibles
- [ ] Array puede estar vacío si no hay usuarios (válido)

---

### ✅ GET /users/:id

**Objetivo**: Obtener detalles de un usuario específico con sus turnos.

**Comando Local (Usuario Existente)**:

```bash
curl -X GET http://localhost:3000/users/1 -H "Content-Type: application/json" | jq
```

**Verificaciones - Usuario Encontrado (200)**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta contiene datos completos del usuario
- [ ] Respuesta incluye array `appointments` con turnos del usuario
- [ ] Cada turno tiene: id, date, time, status, description

**Comando Local (Usuario No Existente)**:

```bash
curl -X GET http://localhost:3000/users/99999 -H "Content-Type: application/json" | jq
```

**Verificaciones - Usuario No Encontrado (404)**:

- [ ] Retorna status code `404 Not Found`
- [ ] Respuesta contiene campo `error` con mensaje descriptivo
- [ ] Respuesta incluye el `userId` que no se encontró

---

## 📅 Endpoints de Turnos

### ✅ POST /appointments/schedule

**Objetivo**: Crear un nuevo turno para un usuario.

**Comando Local**:

```bash
curl -X POST http://localhost:3000/appointments/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-15",
    "time": "10:00",
    "userId": 1,
    "description": "Consulta general de prueba"
  }' | jq
```

**Verificaciones - Turno Creado (201)**:

- [ ] Retorna status code `201 Created`
- [ ] Respuesta contiene `id` del turno creado
- [ ] Respuesta contiene todos los campos: date, time, status, description, userId
- [ ] Campo `status` tiene valor por defecto `"active"`
- [ ] Fecha es válida (formato ISO 8601)
- [ ] Hora tiene formato `HH:MM`

**Verificaciones - Error de Validación (400)**:

```bash
# Fecha inválida
curl -X POST http://localhost:3000/appointments/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "date": "fecha-invalida",
    "time": "10:00",
    "userId": 1,
    "description": "Test"
  }' | jq
```

- [ ] Retorna status code `400 Bad Request`
- [ ] Respuesta indica el campo con error y mensaje descriptivo

---

### ✅ GET /appointments

**Objetivo**: Obtener lista de todos los turnos.

**Comando Local**:

```bash
curl -X GET http://localhost:3000/appointments -H "Content-Type: application/json" | jq
```

**Verificaciones**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta es un array de turnos
- [ ] Cada turno contiene: id, date, time, status, description
- [ ] Cada turno incluye objeto `user` con datos básicos
- [ ] Array puede estar vacío si no hay turnos (válido)

---

### ✅ GET /appointments/:id

**Objetivo**: Obtener detalles de un turno específico.

**Comando Local (Turno Existente)**:

```bash
curl -X GET http://localhost:3000/appointments/1 -H "Content-Type: application/json" | jq
```

**Verificaciones - Turno Encontrado (200)**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta contiene datos completos del turno
- [ ] Respuesta incluye objeto `user` con información del paciente

**Comando Local (Turno No Existente)**:

```bash
curl -X GET http://localhost:3000/appointments/99999 -H "Content-Type: application/json" | jq
```

**Verificaciones - Turno No Encontrado (404)**:

- [ ] Retorna status code `404 Not Found`
- [ ] Respuesta contiene campo `error` con mensaje descriptivo

---

### ✅ PUT /appointments/cancel/:id

**Objetivo**: Cancelar un turno existente.

**Comando Local**:

```bash
curl -X PUT http://localhost:3000/appointments/cancel/1 \
  -H "Content-Type: application/json" | jq
```

**Verificaciones - Turno Cancelado (200)**:

- [ ] Retorna status code `200 OK`
- [ ] Respuesta contiene el turno con `status: "cancelled"`
- [ ] Todos los demás campos permanecen sin cambios
- [ ] No se puede cancelar un turno ya cancelado (validar idempotencia)

**Verificaciones - Turno No Encontrado (404)**:

```bash
curl -X PUT http://localhost:3000/appointments/cancel/99999 \
  -H "Content-Type: application/json" | jq
```

- [ ] Retorna status code `404 Not Found`
- [ ] Respuesta contiene mensaje de error apropiado

---

## 🔒 Verificaciones de Seguridad

### CORS

**Comando**:

```bash
curl -X OPTIONS http://localhost:3000/users \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

**Verificaciones**:

- [ ] Headers CORS presentes en respuesta
- [ ] `Access-Control-Allow-Origin` contiene origen permitido
- [ ] `Access-Control-Allow-Methods` incluye métodos necesarios
- [ ] Peticiones desde orígenes no permitidos son rechazadas

### Contraseñas

- [ ] Contraseñas NUNCA se retornan en respuestas de API
- [ ] Contraseñas se almacenan hasheadas con bcrypt en BD
- [ ] Login valida contraseñas correctamente contra hash

---

## 📊 Resumen de Verificación

### Local Development

| Endpoint                     | Status | Notas |
| ---------------------------- | ------ | ----- |
| GET /health                  | ⬜     |       |
| GET /version                 | ⬜     |       |
| POST /users/register         | ⬜     |       |
| POST /users/login            | ⬜     |       |
| GET /users                   | ⬜     |       |
| GET /users/:id               | ⬜     |       |
| POST /appointments/schedule  | ⬜     |       |
| GET /appointments            | ⬜     |       |
| GET /appointments/:id        | ⬜     |       |
| PUT /appointments/cancel/:id | ⬜     |       |

### Production (Render)

| Endpoint                     | Status | Notas |
| ---------------------------- | ------ | ----- |
| GET /health                  | ⬜     |       |
| GET /version                 | ⬜     |       |
| POST /users/register         | ⬜     |       |
| POST /users/login            | ⬜     |       |
| GET /users                   | ⬜     |       |
| GET /users/:id               | ⬜     |       |
| POST /appointments/schedule  | ⬜     |       |
| GET /appointments            | ⬜     |       |
| GET /appointments/:id        | ⬜     |       |
| PUT /appointments/cancel/:id | ⬜     |       |

---

## 🐛 Registro de Problemas

Si encuentras discrepancias entre el contrato y la implementación, documéntalas aquí:

### Problema 1

- **Endpoint**:
- **Esperado**:
- **Actual**:
- **Severidad**: (Crítica / Alta / Media / Baja)
- **Fecha**:

---

**Última Actualización**: Octubre 2025  
**Versión del Contrato**: 1.0.0
