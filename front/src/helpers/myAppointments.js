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

export const AppointmentStatus = {
  SCHEDULED: "scheduled",
  CANCELED: "canceled",
  COMPLETED: "completed",
};

export const getStatusLabel = (status) => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return "Programado";
    case AppointmentStatus.CANCELED:
    case "cancelled":
      return "Cancelado";
    case AppointmentStatus.COMPLETED:
      return "Completado";
    default:
      return "Estado desconocido";
  }
};

export const getStatusClass = (status) => {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return "status-scheduled";
    case AppointmentStatus.CANCELED:
    case "cancelled":
      return "status-canceled";
    case AppointmentStatus.COMPLETED:
      return "status-completed";
    default:
      return "status-unknown";
  }
};
