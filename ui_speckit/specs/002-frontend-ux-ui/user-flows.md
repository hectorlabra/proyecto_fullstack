# 002 · User Flows (Journeys) – Citas Médicas

## Mapa de pantallas

- Home (Landing)
- Login / Registro (consentimiento y términos)
- Mis Citas (Listado)
- Nueva Cita (Formulario + Selección de horario)
- Reprogramar/Cancelar (Diálogo de confirmación)
- Dashboard (Métricas)

## Flujos clave

### 1) Autenticación (Login/Registro)

- Home → CTAs claros: “Reservar cita” / “Ingresar”.
- Login: validación en tiempo real con mensajes claros.
- Registro: password strength, confirmación; aviso de privacidad.
- Éxito: toast “Bienvenido” → redirige a Mis Citas.

### 2) Mis Citas (Paciente)

- Carga: skeleton 3–6 elementos.
- Listado: AppointmentCard con fecha (dd/mm/yyyy), hora (24h), profesional, especialidad, ubicación, estado.
- Acciones rápidas: Reprogramar / Cancelar (dialog accesible).
- Vacío: estado con CTA “Reservar tu primera cita”.
- Error: toast con reintento.

### 3) Nueva Cita

- Selección de especialidad/profesional (opcional) → calendario/slots.
- TimeSlotPicker: disponibilidad por día con navegación por teclado.
- Form: motivo/observaciones (opcional), confirmación.
- Pre-envío: modal de confirmación (“Confirmar cita para 12/10 10:30”).
- Éxito: toast “Cita confirmada” + redirect a Mis Citas.

### 4) Reprogramar / Cancelar

- Reprogramar: abre selector de horarios; mantiene contexto.
- Cancelar: modal con confirmación; feedback de éxito.

### 5) Dashboard

- KPIs: total de citas, próximas 7 días, canceladas, no-show.
- Lista compacta de próximas citas (3–5).

## Navegación y breadcrumbs

- Breadcrumbs: Home / Mis Citas / Nueva.
- Navbar con estado activo y foco visible.
- Rutas: `/login`, `/register`, `/appointments`, `/appointments/new`, `/appointments/:id/reschedule`, `/dashboard`.

## Estados y Mensajes (tono salud)

- Claros, empáticos y accionables.
- Ejemplos:
  - Éxito: “Tu cita ha sido confirmada para el 12/10 a las 10:30.”
  - Error red: “No pudimos cargar tus citas. Reintenta.”
  - Vacío: “Aún no tienes citas. Reserva tu primera cita.”
