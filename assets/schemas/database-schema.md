# Estructura de Base de Datos - Sistema de Gestión de Turnos Médicos

## Información del Proyecto

- **Tipo de establecimiento**: Consultorio Médico
- **Sistema de Base de Datos**: PostgreSQL/MySQL

---

## 1. Entidades Principales

### 1.1 Entidad: Users (Usuarios)

**Descripción**: Almacena la información personal de los pacientes del consultorio médico.

| Atributo    | Tipo de Dato | Longitud | Restricciones                       | Descripción                     |
| ----------- | ------------ | -------- | ----------------------------------- | ------------------------------- |
| id          | INT          | -        | PRIMARY KEY, AUTO_INCREMENT         | Identificador único del usuario |
| firstName   | VARCHAR      | 100      | NOT NULL                            | Nombre del paciente             |
| lastName    | VARCHAR      | 100      | NOT NULL                            | Apellido del paciente           |
| email       | VARCHAR      | 255      | UNIQUE, NOT NULL                    | Correo electrónico del paciente |
| phone       | VARCHAR      | 20       | NOT NULL                            | Número de teléfono              |
| dateOfBirth | DATE         | -        | NOT NULL                            | Fecha de nacimiento             |
| createdAt   | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP           | Fecha de creación del registro  |
| updatedAt   | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Fecha de última actualización   |

**Reglas de Negocio:**

- El email debe ser único en todo el sistema
- La fecha de nacimiento no puede ser posterior a la fecha actual
- Todos los campos son obligatorios

---

### 1.2 Entidad: Credentials (Credenciales)

**Descripción**: Almacena las credenciales de autenticación de cada usuario.

| Atributo     | Tipo de Dato | Longitud | Restricciones                       | Descripción                          |
| ------------ | ------------ | -------- | ----------------------------------- | ------------------------------------ |
| id           | INT          | -        | PRIMARY KEY, AUTO_INCREMENT         | Identificador único de la credencial |
| userId       | INT          | -        | FOREIGN KEY, UNIQUE, NOT NULL       | Referencia al usuario (Users.id)     |
| username     | VARCHAR      | 50       | UNIQUE, NOT NULL                    | Nombre de usuario para login         |
| passwordHash | VARCHAR      | 255      | NOT NULL                            | Contraseña encriptada (hash)         |
| createdAt    | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP           | Fecha de creación del registro       |
| updatedAt    | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Fecha de última actualización        |

**Relaciones:**

- `userId` → `Users.id` (Relación 1:1 - Un usuario tiene una credencial)

**Reglas de Negocio:**

- El username debe ser único en todo el sistema
- La contraseña debe ser almacenada encriptada (nunca en texto plano)
- Cada usuario puede tener solo una credencial activa

---

### 1.3 Entidad: Appointments (Turnos)

**Descripción**: Almacena la información de los turnos médicos agendados por los pacientes.

| Atributo  | Tipo de Dato | Longitud | Restricciones                       | Descripción                                             |
| --------- | ------------ | -------- | ----------------------------------- | ------------------------------------------------------- |
| id        | INT          | -        | PRIMARY KEY, AUTO_INCREMENT         | Identificador único del turno                           |
| userId    | INT          | -        | FOREIGN KEY, NOT NULL               | Referencia al paciente (Users.id)                       |
| date      | DATE         | -        | NOT NULL                            | Fecha de la cita médica                                 |
| time      | TIME         | -        | NOT NULL                            | Hora de la cita médica                                  |
| status    | ENUM         | -        | NOT NULL, DEFAULT 'scheduled'       | Estado del turno ('scheduled', 'canceled', 'completed') |
| notes     | TEXT         | -        | NULL                                | Notas adicionales del paciente sobre la consulta        |
| createdAt | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP           | Fecha de creación del registro                          |
| updatedAt | TIMESTAMP    | -        | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Fecha de última actualización                           |

**Relaciones:**

- `userId` → `Users.id` (Relación N:1 - Un usuario puede tener muchos turnos)

**Reglas de Negocio:**

- La fecha no puede ser anterior a la fecha actual
- Los turnos solo pueden agendarse de lunes a viernes
- El horario debe estar entre 8:00 AM y 6:00 PM
- Los turnos pueden cancelarse hasta el día anterior
- Múltiples pacientes pueden tener turnos a la misma hora (capacidad ilimitada)

---

## 2. Diagrama Entidad-Relación

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│     Users         │       │   Credentials     │       │  Appointments     │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id (PK)           │───┐   │ userId (FK)     │       │ id (PK)         │
│ firstName         │   │   │ username        │       │ userId (FK)     │───┐
│ lastName          │   │   │ passwordHash    │       │ date            │   │
│ email             │   │   │ createdAt       │       │ time            │   │
│ phone             │   │   │ updatedAt       │       │ status          │   │
│ dateOfBirth       │   │   └─────────────────┘       │ notes           │   │
│ createdAt         │   │                           │ createdAt       │   │
│ updatedAt         │   │                           │ updatedAt       │   │
└───────────────────┘   │                           └─────────────────┘   │
        ↑               │                                   ↑             │
        └───────────────┘                                   └─────────────┘
                                    1:N
```

---

## 3. Índices Recomendados

### 3.1 Índices Primarios

- `Users.id` (PRIMARY KEY - automático)
- `Credentials.id` (PRIMARY KEY - automático)
- `Appointments.id` (PRIMARY KEY - automático)

### 3.2 Índices Únicos

- `Users.email` (UNIQUE - automático)
- `Credentials.username` (UNIQUE - automático)
- `Credentials.userId` (UNIQUE - automático)

### 3.3 Índices de Rendimiento

- `Appointments.userId` (Para consultas de turnos por usuario)
- `Appointments.date` (Para consultas por fecha)
- `Appointments.status` (Para filtrar por estado)
- Índice compuesto: `Appointments(date, time)` (Para verificar disponibilidad)

---

## 4. Restricciones de Integridad

### 4.1 Restricciones de Clave Foránea

```sql
-- Credentials.userId referencia Users.id
ALTER TABLE Credentials
ADD CONSTRAINT fk_credentials_user
FOREIGN KEY (userId) REFERENCES Users(id)
ON DELETE CASCADE;

-- Appointments.userId referencia Users.id
ALTER TABLE Appointments
ADD CONSTRAINT fk_appointments_user
FOREIGN KEY (userId) REFERENCES Users(id)
ON DELETE CASCADE;
```

### 4.2 Restricciones de Dominio

```sql
-- Validación de horarios de atención
ALTER TABLE Appointments
ADD CONSTRAINT chk_appointment_time
CHECK (time BETWEEN '08:00:00' AND '18:00:00');

-- Validación de días laborables (lunes a viernes)
ALTER TABLE Appointments
ADD CONSTRAINT chk_appointment_weekday
CHECK (EXTRACT(DOW FROM date) BETWEEN 1 AND 5);

-- Validación de fecha futura
ALTER TABLE Appointments
ADD CONSTRAINT chk_appointment_future_date
CHECK (date >= CURRENT_DATE);
```

---

## 5. Consultas SQL Básicas

### 5.1 Autenticación de Usuario

```sql
-- Verificar credenciales de login
SELECT u.id, u.firstName, u.lastName, u.email
FROM Users u
INNER JOIN Credentials c ON u.id = c.userId
WHERE c.username = ? AND c.passwordHash = ?;
```

### 5.2 Turnos Disponibles

```sql
-- Obtener horarios disponibles para una fecha específica
SELECT DISTINCT time_slot
FROM (
    SELECT TIME '08:00:00' + INTERVAL (generate_series(0, 19) * 30) MINUTE as time_slot
) time_slots
WHERE time_slot NOT IN (
    SELECT time
    FROM Appointments
    WHERE date = ? AND status = 'scheduled'
);
```

### 5.3 Turnos de un Usuario

```sql
-- Obtener turnos futuros de un usuario
SELECT id, date, time, status, notes
FROM Appointments
WHERE userId = ? AND date >= CURRENT_DATE
ORDER BY date ASC, time ASC;
```

---

## 6. Consideraciones de Seguridad

1. **Encriptación de Contraseñas**: Las contraseñas deben ser hasheadas usando algoritmos seguros (bcrypt, Argon2)
2. **Validación de Datos**: Todos los inputs deben ser validados antes de insertar en la base de datos
3. **Prevención de SQL Injection**: Usar prepared statements para todas las consultas
4. **Auditoría**: Los campos `createdAt` y `updatedAt` permiten rastrear cambios
5. **Eliminación en Cascada**: Al eliminar un usuario, se eliminan automáticamente sus credenciales y turnos

---

**Total de Entidades**: 3 (Users, Credentials, Appointments)  
**Relaciones Implementadas**: ✅ 1:1 (Users-Credentials), ✅ 1:N (Users-Appointments)  
**Requisitos Cumplidos**: ✅ Usuarios, ✅ Turnos, ✅ Credenciales
