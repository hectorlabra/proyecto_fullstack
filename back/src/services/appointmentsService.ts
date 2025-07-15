import { Appointment } from "../interfaces/Appointment";

// Array de turnos de prueba (mock data)
let appointments: Appointment[] = [
  {
    id: 1,
    date: "2025-07-20",
    time: "09:00",
    userId: 1,
    status: "active",
    notes: "Consulta general",
  },
  {
    id: 2,
    date: "2025-07-21",
    time: "10:30",
    userId: 2,
    status: "active",
    notes: "Revisión mensual",
  },
  {
    id: 3,
    date: "2025-07-22",
    time: "14:00",
    userId: 3,
    status: "cancelled",
    notes: "Cancelado por el paciente",
  },
  {
    id: 4,
    date: "2025-07-23",
    time: "16:15",
    userId: 1,
    status: "active",
    notes: "Seguimiento",
  },
  {
    id: 5,
    date: "2025-07-24",
    time: "11:45",
    userId: 4,
    status: "active",
    notes: "Primera consulta",
  },
  {
    id: 6,
    date: "2025-07-25",
    time: "13:30",
    userId: 5,
    status: "cancelled",
    notes: "Reagendado",
  },
];

let nextAppointmentId = 7;

/**
 * DTO para la creación de un nuevo turno.
 */
export type CreateAppointmentDto = Omit<Appointment, "id" | "status">;

/**
 * Obtiene todos los turnos
 * @returns Array de todos los turnos
 */
export const getAllAppointments = (): Appointment[] => {
  return appointments;
};

/**
 * Obtiene un turno por su ID
 * @param id - ID del turno a buscar
 * @returns Turno encontrado o undefined si no existe
 */
export const getAppointmentById = (id: number): Appointment | undefined => {
  return appointments.find((appointment) => appointment.id === id);
};

/**
 * Crea un nuevo turno
 * @param appointmentData - Datos del turno (date, time, userId, notes opcional)
 * @returns Turno creado
 */
export const createAppointment = (
  appointmentData: CreateAppointmentDto
): Appointment => {
  // Validar que el userId existe (esto debería verificarse contra la base de usuarios)
  if (!appointmentData.userId) {
    throw new Error("NO PUEDE HABER UN TURNO SIN ID DE USUARIO");
  }

  // Validar formato de fecha (básico)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(appointmentData.date)) {
    throw new Error("El formato de fecha debe ser YYYY-MM-DD");
  }

  // Validar formato de hora (básico)
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(appointmentData.time)) {
    throw new Error("El formato de hora debe ser HH:mm");
  }

  // Verificar que no haya conflicto de horario para el mismo usuario
  const existingAppointment = appointments.find(
    (apt) =>
      apt.userId === appointmentData.userId &&
      apt.date === appointmentData.date &&
      apt.time === appointmentData.time &&
      apt.status === "active"
  );

  if (existingAppointment) {
    throw new Error(
      "Ya existe un turno activo para este usuario en la misma fecha y hora"
    );
  }

  const newAppointment: Appointment = {
    id: nextAppointmentId++,
    date: appointmentData.date,
    time: appointmentData.time,
    userId: appointmentData.userId,
    status: "active",
    notes: appointmentData.notes || "",
  };

  appointments.push(newAppointment);
  return newAppointment;
};

/**
 * Cancela un turno cambiando su estado a "cancelled"
 * @param id - ID del turno a cancelar
 * @returns Turno cancelado o null si no se encontró
 */
export const cancelAppointment = (id: number): Appointment | null => {
  const appointmentIndex = appointments.findIndex(
    (appointment) => appointment.id === id
  );

  if (appointmentIndex === -1) {
    return null; // Turno no encontrado
  }

  appointments[appointmentIndex].status = "cancelled";
  return appointments[appointmentIndex];
};
