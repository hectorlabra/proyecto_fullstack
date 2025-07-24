import React, { useState } from "react";
import { getStatusLabel, getStatusClass } from "../helpers/myAppointments";
import "../styles/AppointmentCard.css";

const AppointmentCard = ({ appointment, onAppointmentUpdate }) => {
  const { id, date, time, status, notes, user } = appointment;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  // Verificar si la cita puede ser cancelada
  const canCancel = () => {
    if (status === "cancelled" || status === "completed") {
      return false;
    }

    // Verificar si es al menos un día antes
    const appointmentDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return appointmentDate >= tomorrow;
  };

  // Función para cancelar la cita
  const cancelAppointment = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/appointments/cancel/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al cancelar la cita");
      }

      // Notificar al componente padre que se actualizó una cita
      if (onAppointmentUpdate) {
        onAppointmentUpdate();
      }

      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error al cancelar cita:", error);
      alert(`Error al cancelar la cita: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler para mostrar el diálogo de confirmación
  const handleCancelClick = () => {
    setShowConfirmDialog(true);
  };

  // Handler para cancelar el diálogo
  const handleCancelDialog = () => {
    setShowConfirmDialog(false);
  };

  const statusLabel = getStatusLabel(status);
  const statusClass = getStatusClass(status);

  return (
    <>
      <div className="appointment-card">
        <div className="appointment-header">
          <h3 className="appointment-id">Turno #{id}</h3>
          <div className={`appointment-status ${statusClass}`}>
            {statusLabel}
          </div>
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

        {/* Botones de acción */}
        <div className="appointment-actions">
          {canCancel() && (
            <button
              className="cancel-btn"
              onClick={handleCancelClick}
              disabled={isLoading}
            >
              {isLoading ? "Cancelando..." : "Cancelar Cita"}
            </button>
          )}

          {!canCancel() && status !== "cancelled" && (
            <p className="cancel-info">
              {status === "completed"
                ? "Esta cita ya fue completada"
                : "Las citas solo pueden cancelarse hasta el día anterior"}
            </p>
          )}

          {status === "cancelled" && (
            <p className="cancel-info cancelled-text">
              Esta cita fue cancelada
            </p>
          )}
        </div>
      </div>

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Confirmar Cancelación</h3>
            <p>
              ¿Estás seguro de que deseas cancelar tu cita del{" "}
              {formatDate(date)} a las {formatTime(time)}?
            </p>
            <p className="dialog-warning">Esta acción no se puede deshacer.</p>
            <div className="dialog-actions">
              <button
                className="dialog-cancel-btn"
                onClick={handleCancelDialog}
                disabled={isLoading}
              >
                No, mantener cita
              </button>
              <button
                className="dialog-confirm-btn"
                onClick={cancelAppointment}
                disabled={isLoading}
              >
                {isLoading ? "Cancelando..." : "Sí, cancelar cita"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
