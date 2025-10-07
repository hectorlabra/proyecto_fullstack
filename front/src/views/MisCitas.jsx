import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import AppointmentCard from "../components/AppointmentCard";
import EmptyAppointments from "../components/EmptyAppointments";
import { Breadcrumbs, AppointmentListSkeleton, Button } from "../components/ui";
import {
  RefreshCwIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "../components/icons";
import "../styles/MisCitas.css";

const MisCitas = () => {
  const navigate = useNavigate();
  const { user, userAppointments, isLoading, error, refreshAppointments } =
    useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    console.log("MisCitas mounted, userAppointments:", userAppointments);
    console.log("User ID:", user.id || user.user?.id);

    refreshAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedAppointments = useMemo(
    () => userAppointments || [],
    [userAppointments]
  );

  const { upcomingCount, completedCount, cancelledCount } = useMemo(() => {
    const now = new Date();
    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;

    normalizedAppointments.forEach((appointment) => {
      const statusValue = appointment.status?.toLowerCase();
      const appointmentDate = new Date(appointment.date);

      if (["canceled", "cancelled"].includes(statusValue)) {
        cancelled += 1;
        return;
      }

      if (statusValue === "completed") {
        completed += 1;
        return;
      }

      if (appointmentDate >= now) {
        upcoming += 1;
      }
    });

    return {
      upcomingCount: upcoming,
      completedCount: completed,
      cancelledCount: cancelled,
    };
  }, [normalizedAppointments]);

  const statusMetrics = useMemo(
    () => [
      {
        icon: CalendarIcon,
        label: "Citas próximas",
        value: upcomingCount,
        tone: "primary",
        description: "Recibe recordatorios automáticos 24 horas antes.",
      },
      {
        icon: CheckCircleIcon,
        label: "Completadas",
        value: completedCount,
        tone: "success",
        description: "Consulta notas post consulta y confirma asistencia.",
      },
      {
        icon: AlertCircleIcon,
        label: "Canceladas",
        value: cancelledCount,
        tone: "danger",
        description: "Reagenda en segundos cuando vuelva a abrirse un cupo.",
      },
    ],
    [upcomingCount, completedCount, cancelledCount]
  );

  return (
    <div className="page-shell page-shell--dashboard mis-citas-container">
      <div className="page-shell__content page-shell__content--padded">
        <Breadcrumbs className="breadcrumbs--inverted" />
        {user ? (
          <>
            <section className="mis-citas-hero">
              <div className="mis-citas-hero__content">
                <span className="mis-citas-hero__badge">Panel de paciente</span>
                <h1 className="mis-citas-hero__title">Mis citas</h1>
                <p className="mis-citas-hero__subtitle">
                  Hola, {user.firstName} {user.lastName}. Gestiona tus turnos,
                  revisa resultados y mantén tu historial clínico siempre
                  actualizado.
                </p>
                <div className="mis-citas-hero__actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshAppointments}
                    leadingIcon={<RefreshCwIcon size={18} />}
                    disabled={isLoading}
                  >
                    {isLoading ? "Actualizando" : "Actualizar"}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/agendar-cita")}
                  >
                    Agendar nueva cita
                  </Button>
                </div>
              </div>
              <div className="mis-citas-hero__stats">
                {statusMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <article
                      className={`mis-citas-stat mis-citas-stat--${metric.tone}`}
                      key={metric.label}
                    >
                      <span className="mis-citas-stat__icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                      <strong className="mis-citas-stat__value">
                        {metric.value}
                      </strong>
                      <span className="mis-citas-stat__label">
                        {metric.label}
                      </span>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mis-citas-summary">
              <div className="mis-citas-summary__panel">
                <div className="mis-citas-summary__list">
                  {statusMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        className={`mis-citas-summary__item mis-citas-summary__item--${metric.tone}`}
                        key={metric.label}
                      >
                        <span
                          className="mis-citas-summary__icon"
                          aria-hidden="true"
                        >
                          <Icon size={18} />
                        </span>
                        <div>
                          <p className="mis-citas-summary__title">
                            {metric.label}
                            <span className="mis-citas-summary__badge">
                              {metric.value}
                            </span>
                          </p>
                          <p className="mis-citas-summary__description">
                            {metric.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mis-citas-summary__cta">
                  <p>
                    Mantén tu agenda sincronizada para optimizar recordatorios y
                    notificaciones con tu equipo médico.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/agendar-cita")}
                  >
                    Crear nueva cita
                  </Button>
                </div>
              </div>
            </section>

            <section className="mis-citas-content">
              {isLoading ? (
                <AppointmentListSkeleton count={3} />
              ) : error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                  <Button onClick={refreshAppointments} variant="primary">
                    Reintentar
                  </Button>
                </div>
              ) : normalizedAppointments.length === 0 ? (
                <EmptyAppointments
                  onScheduleClick={() => navigate("/agendar-cita")}
                />
              ) : (
                <div className="appointments-list">
                  {normalizedAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onAppointmentUpdate={refreshAppointments}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="mis-citas-loading">
            <p>Verificando autenticación...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisCitas;
