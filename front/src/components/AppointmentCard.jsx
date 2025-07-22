import React from "react";
import { getStatusLabel, getStatusColor } from "../helpers/myAppointments";

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

  const statusColor = getStatusColor(status);
  const statusLabel = getStatusLabel(status);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px 0",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>Turno #{id}</h3>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: statusColor,
          }}
        >
          {statusLabel}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "4px 0", fontSize: "16px", fontWeight: "600" }}>
          📅 {formatDate(date)}
        </p>
        <p style={{ margin: "4px 0", fontSize: "16px", fontWeight: "600" }}>
          🕐 {formatTime(time)}
        </p>
      </div>

      {user && (
        <div style={{ marginBottom: "12px" }}>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
            👤 Paciente: {user.firstName} {user.lastName}
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
            📧 {user.email}
          </p>
        </div>
      )}

      {notes && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "8px",
            borderRadius: "4px",
            marginTop: "12px",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
            💬 <strong>Notas:</strong> {notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
