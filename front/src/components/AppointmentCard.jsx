import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { Card, CardHeader, CardContent, CardActions } from "./ui/Card";
import { StatusBadge } from "./ui/Badge";
import { Button } from "./ui/Button";
import "../styles/ui/appointment-card.css";

const AppointmentCard = ({ appointment, onAppointmentUpdate }) => {
  const { id, date, time, status, notes, user } = appointment;
  const { cancelAppointment: cancelAppointmentContext, isLoading } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatTime24h = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const canCancel = () => {
    if (
      status === "canceled" ||
      status === "cancelled" ||
      status === "completed"
    ) {
      return false;
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return appointmentDate >= tomorrow;
  };

  const cancelAppointment = async () => {
    try {
      const result = await cancelAppointmentContext(id);

      if (result.success) {
        if (onAppointmentUpdate) {
          onAppointmentUpdate();
        }
        setShowConfirmDialog(false);
      } else {
        alert(`Error al cancelar la cita: ${result.error}`);
      }
    } catch (error) {
      console.error("Error al cancelar cita:", error);
      alert(`Error al cancelar la cita: ${error.message}`);
    }
  };

  const handleCancelClick = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelDialog = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Card className="appointment-card-container">
        <CardHeader className="appointment-card-header">
          <h3 className="appointment-card-title">Cita #{id}</h3>
          <StatusBadge status={status} />
        </CardHeader>

        <CardContent>
          <div className="appointment-card-info">
            <div className="appointment-card-row">
              <span className="appointment-card-icon" aria-hidden="true">
                📅
              </span>
              <span className="appointment-card-label">Fecha:</span>
              <span className="appointment-card-value">
                {formatDate(date)}
              </span>
            </div>

            <div className="appointment-card-row">
              <span className="appointment-card-icon" aria-hidden="true">
                🕐
              </span>
              <span className="appointment-card-label">Hora:</span>
              <span className="appointment-card-value">
                {formatTime24h(time)}
              </span>
            </div>

            {user && (
              <>
                <div className="appointment-card-row">
                  <span className="appointment-card-icon" aria-hidden="true">
                    👤
                  </span>
                  <span className="appointment-card-label">Paciente:</span>
                  <span className="appointment-card-value">
                    {user.firstName} {user.lastName}
                  </span>
                </div>

                <div className="appointment-card-row">
                  <span className="appointment-card-icon" aria-hidden="true">
                    📧
                  </span>
                  <span className="appointment-card-label">Email:</span>
                  <span className="appointment-card-value">{user.email}</span>
                </div>
              </>
            )}
          </div>

          {notes && (
            <div className="appointment-card-notes">
              <p className="appointment-card-notes-title">Notas</p>
              <p className="appointment-card-notes-text">{notes}</p>
            </div>
          )}
        </CardContent>

        <CardActions className="appointment-card-actions">
          {canCancel() && (
            <Button
              variant="danger"
              onClick={handleCancelClick}
              disabled={isLoading}
            >
              {isLoading ? "Cancelando..." : "Cancelar Cita"}
            </Button>
          )}

          {!canCancel() && status !== "canceled" && status !== "cancelled" && (
            <p className="appointment-card-info-text">
              {status === "completed"
                ? "Esta cita ya fue completada"
                : "Las citas solo pueden cancelarse hasta el día anterior"}
            </p>
          )}

          {(status === "canceled" || status === "cancelled") && (
            <p className="appointment-card-info-text">Esta cita fue cancelada</p>
          )}
        </CardActions>
      </Card>

      {showConfirmDialog && (
        <div className="dialog-overlay" onClick={handleCancelDialog}>
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <h3 id="dialog-title">Confirmar Cancelación</h3>
            <p>
              ¿Estás seguro de que deseas cancelar tu cita del{" "}
              {formatDate(date)} a las {formatTime24h(time)}?
            </p>
            <p className="dialog-warning">Esta acción no se puede deshacer.</p>
            <div className="dialog-actions">
              <Button
                variant="secondary"
                onClick={handleCancelDialog}
                disabled={isLoading}
              >
                No, mantener cita
              </Button>
              <Button
                variant="danger"
                onClick={cancelAppointment}
                disabled={isLoading}
              >
                {isLoading ? "Cancelando..." : "Sí, cancelar cita"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
