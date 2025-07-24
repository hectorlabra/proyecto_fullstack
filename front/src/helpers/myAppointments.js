// Datos de muestra para turnos - simulan la estructura del backend
export const myAppointments = [
  {
    id: 1,
    date: "2025-07-25",
    time: "09:30",
    status: "scheduled",
    notes: "Consulta de rutina - Control general",
    createdAt: "2025-07-20T10:00:00.000Z",
    updatedAt: "2025-07-20T10:00:00.000Z",
    userId: 1,
    user: {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "123456789",
    },
  },
  {
    id: 2,
    date: "2025-07-28",
    time: "14:15",
    status: "scheduled",
    notes: "Seguimiento de tratamiento",
    createdAt: "2025-07-21T08:30:00.000Z",
    updatedAt: "2025-07-21T08:30:00.000Z",
    userId: 1,
    user: {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "123456789",
    },
  },
  {
    id: 3,
    date: "2025-07-30",
    time: "11:00",
    status: "scheduled",
    notes: "Consulta especializada - Cardiología",
    createdAt: "2025-07-22T09:15:00.000Z",
    updatedAt: "2025-07-22T09:15:00.000Z",
    userId: 1,
    user: {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "123456789",
    },
  },
  {
    id: 4,
    date: "2025-07-18",
    time: "16:45",
    status: "completed",
    notes: "Consulta completada - Resultados de laboratorio revisados",
    createdAt: "2025-07-15T14:20:00.000Z",
    updatedAt: "2025-07-18T17:00:00.000Z",
    userId: 1,
    user: {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "123456789",
    },
  },
  {
    id: 5,
    date: "2025-07-20",
    time: "10:30",
    status: "canceled",
    notes: "Cancelado por el paciente - Reagendar",
    createdAt: "2025-07-18T11:45:00.000Z",
    updatedAt: "2025-07-20T08:00:00.000Z",
    userId: 1,
    user: {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@email.com",
      phone: "123456789",
    },
  },
];

// Estados disponibles para los turnos (coinciden con el backend)
export const AppointmentStatus = {
  SCHEDULED: "scheduled",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  ACTIVE: "active", // Nuevo estado que usa el backend
};

// Funciones auxiliares para trabajar con turnos
export const getStatusLabel = (status) => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
    case AppointmentStatus.ACTIVE: // El backend usa "active" para turnos programados
      return "Programado";
    case AppointmentStatus.CANCELLED:
      return "Cancelado";
    case AppointmentStatus.COMPLETED:
      return "Completado";
    case "active":
      return "Programado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Estado desconocido";
  }
};

// Función para obtener la clase CSS según el estado
export const getStatusClass = (status) => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
    case AppointmentStatus.ACTIVE:
    case "active":
      return "status-active";
    case AppointmentStatus.CANCELLED:
    case "cancelled":
      return "status-cancelled";
    case AppointmentStatus.COMPLETED:
      return "status-completed";
    default:
      return "status-unknown";
  }
};
