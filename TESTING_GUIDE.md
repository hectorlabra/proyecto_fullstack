# 🧪 Guía Completa de Pruebas para la API

Esta guía te permitirá probar todos los endpoints implementados usando ThunderClient, Postman o Insomnia.

## 📋 Configuración Base

- **URL Base**: `http://localhost:3000`
- **Headers para todas las peticiones POST/PUT**:
  ```
  Content-Type: application/json
  ```

---

## 👥 PRUEBAS DE USUARIOS

### 1. GET /users - Obtener todos los usuarios

```
GET http://localhost:3000/users
```

**Resultado esperado**: Lista de 5 usuarios preconfigurados

### 2. GET /users/:id - Obtener usuario por ID

```
GET http://localhost:3000/users/1
```

**Resultado esperado**: Detalles del usuario con ID 1 (John Doe)

### 3. GET /users/:id - Usuario no encontrado

```
GET http://localhost:3000/users/999
```

**Resultado esperado**: Error 404 "Usuario no encontrado"

### 4. POST /users/register - Registrar nuevo usuario

```
POST http://localhost:3000/users/register
Content-Type: application/json

{
  "name": "Carlos López",
  "email": "carlos.lopez@email.com",
  "birthdate": "1993-06-15",
  "nDni": "99887766",
  "username": "carlos_lopez",
  "password": "mipassword123"
}
```

**Resultado esperado**: Usuario creado con status 201

### 5. POST /users/register - Error por email duplicado

```
POST http://localhost:3000/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "john.doe@email.com",
  "birthdate": "1990-01-01",
  "nDni": "11111111",
  "username": "test_user",
  "password": "password123"
}
```

**Resultado esperado**: Error 400 "El email ya está registrado"

### 6. POST /users/login - Login exitoso

```
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Resultado esperado**: Login exitoso con datos del usuario

### 7. POST /users/login - Credenciales inválidas

```
POST http://localhost:3000/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "wrongpassword"
}
```

**Resultado esperado**: Error 401 "Credenciales inválidas"

---

## 📅 PRUEBAS DE TURNOS (APPOINTMENTS)

### 8. GET /appointments - Obtener todos los turnos

```
GET http://localhost:3000/appointments
```

**Resultado esperado**: Lista de 6 turnos preconfigurados

### 9. GET /appointments/:id - Obtener turno por ID

```
GET http://localhost:3000/appointments/1
```

**Resultado esperado**: Detalles del turno con ID 1

### 10. GET /appointments/:id - Turno no encontrado

```
GET http://localhost:3000/appointments/999
```

**Resultado esperado**: Error 404 "Turno no encontrado"

### 11. POST /appointments/schedule - Crear nuevo turno

```
POST http://localhost:3000/appointments/schedule
Content-Type: application/json

{
  "userId": 1,
  "date": "2025-07-30",
  "time": "15:00",
  "notes": "Consulta de seguimiento"
}
```

**Resultado esperado**: Turno creado con status 201

### 12. POST /appointments/schedule - Error por datos faltantes

```
POST http://localhost:3000/appointments/schedule
Content-Type: application/json

{
  "userId": 1,
  "date": "2025-07-30"
}
```

**Resultado esperado**: Error 400 "userId, date y time son requeridos"

### 13. POST /appointments/schedule - Error por formato de fecha inválido

```
POST http://localhost:3000/appointments/schedule
Content-Type: application/json

{
  "userId": 1,
  "date": "30/07/2025",
  "time": "15:00"
}
```

**Resultado esperado**: Error 400 "El formato de fecha debe ser YYYY-MM-DD"

### 14. POST /appointments/schedule - Error por conflicto de horario

```
POST http://localhost:3000/appointments/schedule
Content-Type: application/json

{
  "userId": 1,
  "date": "2025-07-20",
  "time": "09:00"
}
```

**Resultado esperado**: Error 400 "Ya existe un turno activo para este usuario en la misma fecha y hora"

### 15. PUT /appointments/cancel/:id - Cancelar turno

```
PUT http://localhost:3000/appointments/cancel/1
```

**Resultado esperado**: Turno cancelado exitosamente

### 16. PUT /appointments/cancel/:id - Error por turno no encontrado

```
PUT http://localhost:3000/appointments/cancel/999
```

**Resultado esperado**: Error 404 "Turno no encontrado"

---

## 🎯 CASOS DE PRUEBA ADICIONALES

### 17. Validación de IDs no numéricos

```
GET http://localhost:3000/users/abc
GET http://localhost:3000/appointments/xyz
```

**Resultado esperado**: Error 400 "ID inválido"

### 18. Campos requeridos vacíos en registro

```
POST http://localhost:3000/users/register
Content-Type: application/json

{
  "name": "",
  "email": "test@email.com"
}
```

**Resultado esperado**: Error 400 con mensaje de campos obligatorios

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] ✅ GET /users devuelve la lista completa
- [ ] ✅ GET /users/:id funciona con ID válido
- [ ] ✅ GET /users/:id retorna 404 con ID inexistente
- [ ] ✅ POST /users/register crea usuario correctamente
- [ ] ✅ POST /users/register valida emails duplicados
- [ ] ✅ POST /users/login autentica correctamente
- [ ] ✅ POST /users/login rechaza credenciales inválidas
- [ ] ✅ GET /appointments devuelve la lista completa
- [ ] ✅ GET /appointments/:id funciona con ID válido
- [ ] ✅ GET /appointments/:id retorna 404 con ID inexistente
- [ ] ✅ POST /appointments/schedule crea turno correctamente
- [ ] ✅ POST /appointments/schedule valida campos requeridos
- [ ] ✅ POST /appointments/schedule valida formatos de fecha/hora
- [ ] ✅ POST /appointments/schedule evita conflictos de horario
- [ ] ✅ PUT /appointments/cancel/:id cancela turnos
- [ ] ✅ PUT /appointments/cancel/:id maneja IDs inexistentes

---

## 🎉 ESTADO ACTUAL DEL PROYECTO

✅ **FASE 1 COMPLETADA**: Interfaces de entidades implementadas
✅ **FASE 2 COMPLETADA**: Servicios implementados con datos mock
✅ **FASE 3 COMPLETADA**: Controladores actualizados
✅ **FASE 4 EN PROGRESO**: Pruebas de integración

## 📝 NOTAS IMPORTANTES

1. **Datos Mock**: El sistema utiliza arrays en memoria, los datos se reinician al reiniciar el servidor
2. **Validaciones**: Se implementaron validaciones básicas de formato y campos requeridos
3. **Manejo de Errores**: Todos los endpoints manejan errores apropiadamente
4. **Códigos HTTP**: Se utilizan códigos de estado HTTP semánticamente correctos
5. **Estructura**: El código está bien organizado en capas (rutas → controladores → servicios)

¡Todas las actividades han sido implementadas exitosamente! 🎯
