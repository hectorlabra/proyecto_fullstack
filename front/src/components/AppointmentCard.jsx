import React from "react";
import { getStatusLabel } from "../helpers/myAppointments";
import "../styles/AppointmentCard.css";

const AppointmentCard = ({ appointment }) => {
  const { id, date, time, status, notes, user } = appointment;

  // Formatear fecha para mostrar de manera más legible
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Formatear hora para mostrar en formato 12 horas
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const statusLabel = getStatusLabel(status);

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3 className="appointment-id">Turno #{id}</h3>
        <div className={`appointment-status ${status}`}>{statusLabel}</div>
      </div>

      <div className="appointment-datetime">
        <p className="appointment-date">📅 {formatDate(date)}</p>
        <p className="appointment-time">🕐 {formatTime(time)}</p>
      </div>

      {user && (
        <div className="appointment-user-info">
          <p className="appointment-patient">
            👤 Paciente: {user.firstName} {user.lastName}
          </p>
          <p className="appointment-email">📧 {user.email}</p>
        </div>
      )}

      {notes && (
        <div className="appointment-notes">
          <p className="appointment-notes-text">
            💬 <strong>Notas:</strong> {notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
