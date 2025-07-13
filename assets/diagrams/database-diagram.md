# Diagrama Entidad-Relación - Sistema de Gestión de Turnos

## Archivos de Diagramas Mermaid

Este documento hace referencia a los siguientes archivos de diagramas Mermaid:

- **`database-erd.mmd`** - Diagrama Entidad-Relación principal
- **`appointment-states.mmd`** - Diagrama de estados de los turnos
- **`system-flow.mmd`** - Diagrama de flujo del sistema

## Representación Visual del Modelo de Datos

### Diagrama ER Principal

Ver archivo: `database-erd.mmd`

### Diagrama de Estados de Turnos

Ver archivo: `appointment-states.mmd`

### Diagrama de Flujo del Sistema

Ver archivo: `system-flow.mmd`

## Tipos de Relaciones

### 1. Users ↔ Credentials (1:1)

- **Cardinalidad**: Un usuario tiene exactamente una credencial
- **Tipo**: Identificativa (la credencial no existe sin el usuario)
- **Clave Foránea**: `Credentials.userId` → `Users.id`
- **Restricción**: `UNIQUE` en `userId` para garantizar 1:1

### 2. Users ↔ Appointments (1:N)

- **Cardinalidad**: Un usuario puede tener múltiples turnos
- **Tipo**: No identificativa (el turno puede existir independientemente)
- **Clave Foránea**: `Appointments.userId` → `Users.id`
- **Restricción**: No hay límite en cantidad de turnos por usuario

## Estados de Datos

### Flujo de Estados de Appointments

Los turnos pueden tener los siguientes estados:

- **scheduled**: Turno activo y confirmado
- **canceled**: Turno cancelado por el usuario
- **completed**: Turno finalizado (cita realizada)

**Regla importante**: Los turnos solo pueden cancelarse hasta el día anterior a la fecha programada.

## Flujo de Datos Típico

### Diagrama de Procesos del Sistema

Ver archivo: `system-flow.mmd`

### Registro de Usuario

```
1. Crear registro en USERS
   ↓
2. Crear registro en CREDENTIALS
   ↓
3. Usuario puede hacer login
```

### Reserva de Turno

```
1. Usuario autenticado (verificación en CREDENTIALS)
   ↓
2. Seleccionar fecha/hora disponible
   ↓
3. Crear registro en APPOINTMENTS (status: 'scheduled')
   ↓
4. Confirmación al usuario
```

### Cancelación de Turno

```
1. Usuario autenticado
   ↓
2. Buscar turno en APPOINTMENTS (status: 'scheduled')
   ↓
3. Verificar fecha (debe ser futura y no mismo día)
   ↓
4. Actualizar status a 'canceled'
```

## Índices y Performance

### Índices Críticos para Performance

- `Users.email` - Para login por email
- `Credentials.username` - Para login por username
- `Appointments.userId` - Para obtener turnos del usuario
- `Appointments.date` - Para consultar disponibilidad por fecha
- `Appointments(date, time, status)` - Índice compuesto para verificar horarios disponibles

### Consultas Más Frecuentes

1. **Login**: Buscar usuario por username/email y verificar password
2. **Turnos Disponibles**: Buscar horarios libres para una fecha
3. **Mis Turnos**: Obtener todos los turnos de un usuario
4. **Cancelar Turno**: Actualizar status de un turno específico
