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
import { parseLocalDate, normalizeToStartOfDay } from "../helpers/dateUtils";
import "../styles/MisCitas.css";

const MisCitas = () => {
  const navigate = useNavigate();
  const { user, userAppointments, isLoading, error, refreshAppointments } =
    useUser();

  useEffect(() => {
    if (!user) {
      console.log("⚠️ No user found, redirecting to home");
      navigate("/");
      return;
    }

    console.log("📋 MisCitas mounted");
    console.log("👤 Full user object:", user);
    console.log("🆔 User ID:", user.id || user.user?.id);
    console.log("📅 Initial userAppointments:", userAppointments);
    console.log("📊 Appointments count:", userAppointments?.length || 0);

    refreshAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedAppointments = useMemo(() => {
    console.log("🔄 Normalizing appointments:", userAppointments);
    return userAppointments || [];
  }, [userAppointments]);

  const { upcomingCount, completedCount, cancelledCount } = useMemo(() => {
    console.log(
      "📊 Calculating metrics for appointments:",
      normalizedAppointments
    );
    const today = normalizeToStartOfDay(new Date());
    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;

    normalizedAppointments.forEach((appointment) => {
      const statusValue = appointment.status?.toLowerCase();
      const parsedDate = parseLocalDate(appointment.date);
      const appointmentDate = parsedDate
        ? normalizeToStartOfDay(parsedDate)
        : null;

      console.log(
        `  - Appointment ${appointment.id}: status=${statusValue}, date=${appointment.date}`
      );

      if (["canceled", "cancelled"].includes(statusValue)) {
        cancelled += 1;
        return;
      }

      if (statusValue === "completed") {
        completed += 1;
        return;
      }

      if (!appointmentDate || !today) {
        return;
      }

      if (appointmentDate >= today) {
        upcoming += 1;
      }
    });

    console.log(
      `✅ Metrics: upcoming=${upcoming}, completed=${completed}, cancelled=${cancelled}`
    );

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

  const currentUser = user?.user ?? user;
  const patientName = currentUser
    ? `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`.trim()
    : "";

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
                  {`Hola${
                    patientName ? `, ${patientName}` : ""
                  }. Gestiona tus turnos, revisa resultados y mantén tu historial clínico siempre actualizado.`}
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

              <div className="mis-citas-metrics">
                {statusMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <article
                      key={metric.label}
                      className={`mis-citas-metric mis-citas-metric--${metric.tone}`}
                    >
                      <span
                        className="mis-citas-metric__icon"
                        aria-hidden="true"
                      >
                        <Icon size={18} />
                      </span>
                      <div className="mis-citas-metric__info">
                        <span className="mis-citas-metric__label">
                          {metric.label}
                        </span>
                        <strong className="mis-citas-metric__value">
                          {metric.value}
                        </strong>
                      </div>
                    </article>
                  );
                })}
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
