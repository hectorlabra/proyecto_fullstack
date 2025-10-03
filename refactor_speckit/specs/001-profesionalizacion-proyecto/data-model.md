# Data Model Overview

Alta nivel de entidades actuales (derivado del backend existente):

## User

- id
- name
- email
- phone? (según entidad)
- relationships: Credential (1:1), Appointments (1:N)

## Credential

- id
- email (o username)
- passwordHash
- user (1:1 User)

## Appointment

- id
- dateTime
- status (p. ej., scheduled/cancelled)
- description/notes
- user (N:1 User)

Notas:

- Usar entidades/DTOs como fuente única de validación.
- Migraciones TypeORM reflejan cambios de schema.
