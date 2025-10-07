import { useMemo, useState } from "react";
import { useUser } from "../hooks/useUser";
import McCard from "./ui/McCard";
import McBadge from "./ui/McBadge";
import McButton from "./ui/McButton";
import McModal from "./ui/McModal";
import { useToast } from "../hooks/useToast";
import { CalendarIcon, ClockIcon, UserIcon, MailIcon } from "./icons";
import { parseLocalDate, normalizeToStartOfDay } from "../helpers/dateUtils";
import "../styles/ui/appointment-card.css";

const AppointmentCard = ({ appointment, onAppointmentUpdate }) => {
  const { id, date, time, status, notes, user } = appointment;
  const { cancelAppointment: cancelAppointmentContext, isLoading } = useUser();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const normalizedStatus = (status || "").toLowerCase();

  const statusCopy = useMemo(() => {
    const statusMap = {
      scheduled: { label: "Programada", variant: "info" },
      confirmed: { label: "Confirmada", variant: "info" },
      pending: { label: "Pendiente", variant: "default" },
      completed: { label: "Completada", variant: "success" },
      canceled: { label: "Cancelada", variant: "danger" },
      cancelled: { label: "Cancelada", variant: "danger" },
      rescheduled: { label: "Reprogramada", variant: "warning" },
    };

    return (
      statusMap[normalizedStatus] || {
        label: status ? status : "Sin estado",
        variant: "default",
      }
    );
  }, [normalizedStatus, status]);

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
        showSuccessToast("La cita se canceló correctamente.");
        if (onAppointmentUpdate) {
          onAppointmentUpdate();
        }
        setShowConfirmDialog(false);
      } else {
        showErrorToast(result.error || "No pudimos cancelar la cita.");
      }
    } catch (error) {
      console.error("Error al cancelar cita:", error);
      showErrorToast(error.message || "No pudimos completar la cancelación.");
    }
  };

  const blockedMessage = useMemo(() => {
    if (normalizedStatus === "completed") {
      return "Esta cita ya fue completada";
    }

    if (["canceled", "cancelled"].includes(normalizedStatus)) {
      return "Esta cita fue cancelada";
    }

    return "Las citas solo pueden cancelarse hasta el día anterior";
  }, [normalizedStatus]);

  const footnoteMessage = canCancel
    ? "Puedes cancelar tu cita hasta el día anterior."
    : blockedMessage;

  const confirmModalFooter = (
    <>
      <McButton
        variant="outline"
        onClick={() => setShowConfirmDialog(false)}
        disabled={isLoading}
      >
        Mantener cita
      </McButton>
      <McButton variant="danger" onClick={handleCancel} loading={isLoading}>
        Confirmar cancelación
      </McButton>
    </>
  );

  return (
    <>
      <McCard
        className={`appointment-card appointment-card--${
          normalizedStatus || "default"
        }`}
        header={
          <div className="appointment-card__header">
            <div className="appointment-card__heading">
              <span className="appointment-card__eyebrow">Cita #{id}</span>
              <h3 className="appointment-card__title">Gestión de consulta</h3>
            </div>
            <McBadge
              variant={statusCopy.variant}
              size="sm"
              className="appointment-card__status"
            >
              {statusCopy.label}
            </McBadge>
          </div>
        }
        footer={
          <div className="appointment-card__footer">
            <div className="appointment-card__footnote">
              <span
                className="appointment-card__footnote-indicator"
                aria-hidden="true"
              />
              <p>{footnoteMessage}</p>
            </div>
            {canCancel && (
              <McButton
                variant="danger"
                onClick={() => setShowConfirmDialog(true)}
                loading={isLoading}
                className="appointment-card__action"
              >
                Cancelar cita
              </McButton>
            )}
          </div>
        }
      >
        <div className="appointment-card__details">
          {detailItems.map(({ icon, label, value }) => {
            const IconComponent = icon;
            return (
              <div className="appointment-card__detail" key={label}>
                <span
                  className="appointment-card__detail-icon"
                  aria-hidden="true"
                >
                  <IconComponent size={20} />
                </span>
                <span className="appointment-card__detail-label">{label}</span>
                <span className="appointment-card__detail-value">{value}</span>
              </div>
            );
          })}
        </div>

        <div
          className={`appointment-card__notes ${
            notes ? "" : "appointment-card__notes--empty"
          }`}
        >
          <span className="appointment-card__notes-label">
            Notas del paciente
          </span>
          <p className="appointment-card__notes-text">
            {notes || "Sin notas registradas para esta cita."}
          </p>
        </div>
      </McCard>

      <McModal
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title="Confirmar cancelación"
        size="sm"
        closeOnOverlayClick={!isLoading}
        footer={confirmModalFooter}
      >
        <p className="appointment-card__confirm-text">
          {`¿Deseas cancelar la cita del ${formattedDate} a las ${formattedTime}? Esta acción no se puede deshacer.`}
        </p>
      </McModal>
    </>
  );
};

export default AppointmentCard;
