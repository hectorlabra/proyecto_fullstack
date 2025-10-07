import { useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Card, CardHeader, CardContent, CardActions } from "./ui/Card";
import { StatusBadge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ConfirmModal } from "./ui/Modal";
import { CalendarIcon, ClockIcon, UserIcon, MailIcon } from "./icons";
import { parseLocalDate, normalizeToStartOfDay } from "../helpers/dateUtils";
import "../styles/ui/appointment-card.css";

const AppointmentCard = ({ appointment, onAppointmentUpdate }) => {
  const { id, date, time, status, notes, user } = appointment;
  const { cancelAppointment: cancelAppointmentContext, isLoading } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const formattedDate = useMemo(() => {
    if (!date) return "--";
    const parsedDate = parseLocalDate(date);
    if (!parsedDate) return date;
    try {
      return new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(parsedDate);
    } catch {
      return date;
    }
  }, [date]);

  const formattedTime = useMemo(() => {
    if (!time) return "--";
    return time.slice(0, 5);
  }, [time]);

  const canCancel = useMemo(() => {
    if (!date) return false;
    if (
      ["canceled", "cancelled", "completed"].includes(
        (status || "").toLowerCase()
      )
    ) {
      return false;
    }

    const parsedDate = parseLocalDate(date);
    if (!parsedDate) {
      return false;
    }

    const appointmentDate = normalizeToStartOfDay(parsedDate);
    const today = normalizeToStartOfDay(new Date());

    if (!appointmentDate || !today) {
      return false;
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return appointmentDate >= tomorrow;
  }, [date, status]);

  const detailItems = useMemo(() => {
    const base = [
      {
        icon: CalendarIcon,
        label: "Fecha",
        value: formattedDate,
      },
      {
        icon: ClockIcon,
        label: "Hora",
        value: formattedTime,
      },
    ];

    if (user) {
      base.push(
        {
          icon: UserIcon,
          label: "Paciente",
          value: `${user.firstName} ${user.lastName}`.trim(),
        },
        {
          icon: MailIcon,
          label: "Email",
          value: user.email,
        }
      );
    }

    return base;
  }, [formattedDate, formattedTime, user]);

  const handleCancel = async () => {
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

  const normalizedStatus = (status || "").toLowerCase();
  const blockedMessage = useMemo(() => {
    if (normalizedStatus === "completed") {
      return "Esta cita ya fue completada";
    }

    if (["canceled", "cancelled"].includes(normalizedStatus)) {
      return "Esta cita fue cancelada";
    }

    return "Las citas solo pueden cancelarse hasta el día anterior";
  }, [normalizedStatus]);

  return (
    <>
      <Card className="appointment-card-container">
        <CardHeader className="appointment-card-header">
          <div>
            <p className="appointment-card-subtitle">Cita #{id}</p>
            <h3 className="appointment-card-title">Gestión de consulta</h3>
          </div>
          <StatusBadge status={status} />
        </CardHeader>

        <CardContent>
          <div className="appointment-card-info">
            {detailItems.map(({ icon, label, value }) => {
              const IconComponent = icon;
              return (
                <div className="appointment-card-row" key={label}>
                  <span className="appointment-card-icon" aria-hidden="true">
                    <IconComponent size={18} />
                  </span>
                  <span className="appointment-card-label">{label}</span>
                  <span className="appointment-card-value">{value}</span>
                </div>
              );
            })}
          </div>

          {notes && (
            <div className="appointment-card-notes">
              <p className="appointment-card-notes-title">Notas del paciente</p>
              <p className="appointment-card-notes-text">{notes}</p>
            </div>
          )}
        </CardContent>

        <CardActions className="appointment-card-actions">
          {canCancel ? (
            <Button
              variant="danger"
              onClick={() => setShowConfirmDialog(true)}
              disabled={isLoading}
            >
              {isLoading ? "Cancelando..." : "Cancelar cita"}
            </Button>
          ) : (
            <p className="appointment-card-info-text">{blockedMessage}</p>
          )}
        </CardActions>
      </Card>

      <ConfirmModal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleCancel}
        title="Confirmar cancelación"
        message={`¿Deseas cancelar la cita del ${formattedDate} a las ${formattedTime}? Esta acción no se puede deshacer.`}
        confirmText="Sí, cancelar cita"
        cancelText="Mantener cita"
        variant="danger"
        isLoading={isLoading}
      />
    </>
  );
};

export default AppointmentCard;
