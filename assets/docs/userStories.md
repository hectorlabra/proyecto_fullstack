# Historias de Usuario - Sistema de Gestión de Turnos Médicos

## Información del Proyecto

- **Tipo de establecimiento**: Consultorio Médico
- **Horarios de atención**: Lunes a Viernes de 8:00 AM a 6:00 PM

---

## 1. Historias de Usuario - Autenticación y Gestión de Usuarios

### HU-001: Registro de Usuario (Prioridad: Alta)

**Como** visitante del sitio web  
**Quiero** poder registrarme en la plataforma creando una cuenta  
**Para** poder acceder al sistema de reserva de turnos médicos

**Criterios de Aceptación:**

- El usuario debe proporcionar: nombre, apellido, email, teléfono y fecha de nacimiento
- El email debe ser único en el sistema
- Se debe crear automáticamente un usuario y contraseña
- El usuario recibe confirmación de registro exitoso

---

### HU-002: Inicio de Sesión (Prioridad: Alta)

**Como** usuario registrado  
**Quiero** poder iniciar sesión con mis credenciales  
**Para** acceder a mi cuenta y gestionar mis turnos médicos

**Criterios de Aceptación:**

- El usuario puede ingresar con username/email y contraseña
- Si las credenciales son incorrectas, se muestra un mensaje de error
- Al iniciar sesión exitosamente, el usuario es redirigido a su panel principal
- La sesión se mantiene activa hasta que el usuario cierre sesión

---

### HU-003: Cierre de Sesión (Prioridad: Media)

**Como** usuario autenticado  
**Quiero** poder cerrar mi sesión  
**Para** proteger mi información personal cuando termine de usar la aplicación

**Criterios de Aceptación:**

- Existe un botón/enlace claramente visible para cerrar sesión
- Al cerrar sesión, el usuario es redirigido a la página de inicio
- Todas las sesiones activas se invalidan correctamente

---

### HU-004: Visualización de Perfil (Prioridad: Media)

**Como** usuario autenticado  
**Quiero** poder ver mi información personal  
**Para** verificar que mis datos estén correctos y actualizados

**Criterios de Aceptación:**

- Se muestra nombre, apellido, email, teléfono y fecha de nacimiento
- La información se presenta de forma clara y organizada
- Los datos sensibles como contraseña no son visibles

---

### HU-005: Edición de Perfil (Prioridad: Media)

**Como** usuario autenticado  
**Quiero** poder actualizar mi información personal  
**Para** mantener mis datos de contacto actualizados

**Criterios de Aceptación:**

- Puedo editar nombre, apellido, teléfono
- El email puede ser modificado pero debe seguir siendo único
- Los cambios se guardan correctamente en la base de datos
- Recibo confirmación de que los cambios fueron guardados

---

## 2. Historias de Usuario - Gestión de Turnos

### HU-006: Visualización de Turnos Disponibles (Prioridad: Alta)

**Como** paciente autenticado  
**Quiero** ver los horarios disponibles para agendar citas  
**Para** elegir el día y hora que mejor se adapte a mi horario

**Criterios de Aceptación:**

- Se muestran solo fechas y horarios dentro del horario de atención (L-V 8AM-6PM)
- No se muestran fines de semana ni feriados
- Los horarios ya reservados no aparecen como disponibles
- Se puede navegar por diferentes fechas futuras

---

### HU-007: Reserva de Turno (Prioridad: Alta)

**Como** paciente autenticado  
**Quiero** poder reservar un turno médico  
**Para** ser atendido en una fecha y hora específica

**Criterios de Aceptación:**

- Puedo seleccionar fecha y hora de los horarios disponibles
- Puedo agregar notas adicionales sobre mi consulta
- El turno se reserva inmediatamente al confirmar
- Recibo confirmación visual de que el turno fue agendado exitosamente
- El horario seleccionado ya no aparece como disponible para otros usuarios

---

### HU-008: Visualización de Mis Turnos (Prioridad: Alta)

**Como** paciente autenticado  
**Quiero** ver todos mis turnos programados  
**Para** recordar cuándo debo asistir a mis citas médicas

**Criterios de Aceptación:**

- Se muestran todos mis turnos futuros ordenados por fecha
- Se muestra fecha, hora y estado de cada turno
- Se distinguen visualmente los turnos activos de los cancelados
- Puedo ver detalles adicionales como notas de la cita

---

### HU-009: Cancelación de Turnos (Prioridad: Alta)

**Como** paciente autenticado  
**Quiero** poder cancelar mis turnos  
**Para** liberar el horario si no puedo asistir a mi cita

**Criterios de Aceptación:**

- Solo puedo cancelar turnos hasta el día anterior a la fecha programada
- Se solicita confirmación antes de cancelar definitivamente
- El turno cancelado cambia su estado pero permanece en mi historial
- El horario cancelado vuelve a estar disponible para otros pacientes
- No puedo cancelar turnos del mismo día o días pasados

---

## 3. Resumen de Prioridades

### Prioridad Alta (Desarrollo Inmediato):

- HU-001: Registro de Usuario
- HU-002: Inicio de Sesión
- HU-006: Visualización de Turnos Disponibles
- HU-007: Reserva de Turno
- HU-008: Visualización de Mis Turnos
- HU-009: Cancelación de Turnos

### Prioridad Media (Desarrollo Posterior):

- HU-003: Cierre de Sesión
- HU-004: Visualización de Perfil
- HU-005: Edición de Perfil

---

## 4. Reglas de Negocio Identificadas

1. **Horarios de Atención**: Lunes a Viernes de 8:00 AM a 6:00 PM
2. **Cancelaciones**: Solo se permiten hasta el día anterior
3. **Autenticación**: Obligatoria para todas las operaciones de turnos
4. **Capacidad**: Ilimitada (múltiples pacientes pueden tener turnos a la misma hora)
5. **Fines de Semana**: No hay atención médica

---

**Total de Historias de Usuario**: 9  
**Estimación de Complejidad**: Media-Alta  
**Funcionalidades Core Cubiertas**: ✅ Autenticación, ✅ Gestión de Turnos, ✅ Gestión de Usuarios
