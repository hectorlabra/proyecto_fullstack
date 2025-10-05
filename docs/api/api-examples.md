# Ejemplos de API

Este documento proporciona ejemplos prácticos de peticiones y respuestas de la API tanto para entornos de desarrollo local como de producción.

## URLs Base

- **Desarrollo Local**: `http://localhost:3000`
- **Producción (Render)**: `https://[tu-backend].onrender.com` _(se actualizará después del despliegue)_

## Endpoints de Health y Version

### GET /health

Endpoint de verificación de estado para verificar disponibilidad del servicio.

**Petición (Local)**:

```bash
curl -X GET http://localhost:3000/health
```

**Petición (Producción)**:

```bash
curl -X GET https://[tu-backend].onrender.com/health
```

**Respuesta** (200 OK):

```json
{
  "status": "ok",
  "timestamp": "2025-10-01T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

---

### GET /version

Retorna la versión actual de la API e información de build.

**Petición (Local)**:

```bash
curl -X GET http://localhost:3000/version
```

**Petición (Producción)**:

```bash
curl -X GET https://[tu-backend].onrender.com/version
```

**Respuesta** (200 OK):

```json
{
  "version": "1.0.0",
  "apiName": "API de Gestión de Turnos",
  "buildDate": "2025-10-01",
  "nodeVersion": "18.x"
}
```

---

## Endpoints de Usuarios

### POST /users/register

Registrar un nuevo usuario con credenciales.

**Petición**:

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "birthdate": "1990-05-15",
    "nDni": "12345678",
    "username": "juanperez",
    "password": "ContraseñaSegura123!"
  }'
```

**Respuesta** (201 Created):

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "birthdate": "1990-05-15",
  "nDni": "12345678",
  "credential": {
    "id": 1,
    "username": "juanperez"
  }
}
```

**Respuesta de Error** (400 Bad Request):

```json
{
  "error": "Validación fallida",
  "details": [
    {
      "field": "email",
      "message": "email debe ser una dirección de email válida"
    }
  ]
}
```

---

### POST /users/login

Autenticar usuario con credenciales.

**Petición**:

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juanperez",
    "password": "ContraseñaSegura123!"
  }'
```

**Respuesta** (200 OK):

```json
{
  "login": true,
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "nDni": "12345678"
  }
}
```

**Respuesta de Error** (401 Unauthorized):

```json
{
  "login": false,
  "message": "Credenciales inválidas"
}
```

---

### GET /users

Obtener todos los usuarios registrados.

**Petición**:

```bash
curl -X GET http://localhost:3000/users
```

**Respuesta** (200 OK):

```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "birthdate": "1990-05-15",
    "nDni": "12345678"
  },
  {
    "id": 2,
    "name": "María García",
    "email": "maria.garcia@example.com",
    "birthdate": "1985-08-22",
    "nDni": "87654321"
  }
]
```

---

### GET /users/:id

Obtener detalles de usuario por ID.

**Petición**:

```bash
curl -X GET http://localhost:3000/users/1
```

**Respuesta** (200 OK):

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "birthdate": "1990-05-15",
  "nDni": "12345678",
  "appointments": [
    {
      "id": 1,
      "date": "2025-10-15",
      "time": "10:00",
      "status": "active",
      "description": "Consulta general"
    }
  ]
}
```

**Respuesta de Error** (404 Not Found):

```json
{
  "error": "Usuario no encontrado",
  "userId": 1
}
```

---

## Endpoints de Turnos

### POST /appointments/schedule

Crear un nuevo turno.

**Petición**:

```bash
curl -X POST http://localhost:3000/appointments/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-15",
    "time": "10:00",
    "userId": 1,
    "description": "Consulta general"
  }'
```

**Respuesta** (201 Created):

```json
{
  "id": 1,
  "date": "2025-10-15",
  "time": "10:00",
  "status": "active",
  "description": "Consulta general",
  "userId": 1
}
```

**Respuesta de Error** (400 Bad Request):

```json
{
  "error": "Validación fallida",
  "details": [
    {
      "field": "date",
      "message": "date debe ser una cadena de fecha ISO 8601 válida"
    }
  ]
}
```

---

### GET /appointments

Obtener todos los turnos.

**Petición**:

```bash
curl -X GET http://localhost:3000/appointments
```

**Respuesta** (200 OK):

```json
[
  {
    "id": 1,
    "date": "2025-10-15",
    "time": "10:00",
    "status": "active",
    "description": "Consulta general",
    "user": {
      "id": 1,
      "name": "Juan Pérez"
    }
  },
  {
    "id": 2,
    "date": "2025-10-20",
    "time": "14:30",
    "status": "cancelled",
    "description": "Revisión médica",
    "user": {
      "id": 2,
      "name": "María García"
    }
  }
]
```

---

### GET /appointments/:id

Obtener detalles de turno por ID.

**Petición**:

```bash
curl -X GET http://localhost:3000/appointments/1
```

**Respuesta** (200 OK):

```json
{
  "id": 1,
  "date": "2025-10-15",
  "time": "10:00",
  "status": "active",
  "description": "Consulta general",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  }
}
```

---

### PUT /appointments/cancel/:id

Cancelar un turno existente.

**Petición**:

```bash
curl -X PUT http://localhost:3000/appointments/cancel/1 \
  -H "Content-Type: application/json"
```

**Respuesta** (200 OK):

```json
{
  "id": 1,
  "date": "2025-10-15",
  "time": "10:00",
  "status": "cancelled",
  "description": "Consulta general",
  "userId": 1
}
```

**Respuesta de Error** (404 Not Found):

```json
{
  "error": "Turno no encontrado",
  "appointmentId": 1
}
```

---

## Manejo de Errores

Todos los endpoints siguen un formato consistente de respuesta de error:

**Errores 4xx del Cliente**:

```json
{
  "error": "Mensaje de error describiendo el problema",
  "details": [] // Array opcional con errores de validación específicos por campo
}
```

**Errores 5xx del Servidor**:

```json
{
  "error": "Error interno del servidor",
  "message": "Ocurrió un error inesperado",
  "timestamp": "2025-10-01T10:30:00.000Z"
}
```

---

## Pruebas con Postman/Insomnia

Puedes importar esta colección para probar todos los endpoints:

1. Crear un nuevo entorno con la variable `BASE_URL`
2. Establecer `BASE_URL = http://localhost:3000` para pruebas locales
3. Actualizar a URL de producción después del despliegue

---

## Configuración de CORS

**Orígenes Permitidos**:

- Desarrollo: `http://localhost:5173` (servidor dev de Vite)
- Producción: `https://[tu-frontend].onrender.com`

**Peticiones Preflight**:

```bash
curl -X OPTIONS http://localhost:3000/users \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST"
```

---

**Última Actualización**: Octubre 2025  
**Para Especificación OpenAPI**: Ver `specs/001-profesionalizacion-proyecto/contracts/openapi.yaml`
