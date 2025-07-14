/**
 * Representa una cita agendada por un usuario.
 *
 * @property {number} id - Identificador único de la cita.
 * @property {string} date - Fecha de la cita en formato ISO (YYYY-MM-DD).
 * @property {string} time - Hora de la cita en formato HH:mm.
 * @property {number} userId - Identificador del usuario que reservó la cita.
 * @property {"active" | "cancelled"} status - Estado actual de la cita: "active" para activa o "cancelled" para cancelada.
 */
export interface Appointment {
  id: number;
  date: string;
  time: string;
  userId: number;
  status: "active" | "cancelled";
}
