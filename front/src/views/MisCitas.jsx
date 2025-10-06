import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import AppointmentCard from "../components/AppointmentCard";
import EmptyAppointments from "../components/EmptyAppointments";
import {
  Breadcrumbs,
  AppointmentListSkeleton,
  Button,
  Card,
  CardContent,
} from "../components/ui";
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

  return (
    <div className="mis-citas-container">
      <Breadcrumbs />
      {user ? (
        <>
          <header className="mis-citas-header">
            <div>
              <p className="mis-citas-eyebrow">Panel de paciente</p>
              <h1 className="mis-citas-title">Mis citas</h1>
              <p className="mis-citas-subtitle">
                Hola, {user.firstName} {user.lastName}. Gestiona tus citas
                médicas y mantén un seguimiento claro de tu historial clínico.
              </p>
            </div>
            <div className="mis-citas-actions">
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
          </header>

          <section className="mis-citas-summary">
            <Card variant="flat" className="summary-card">
              <CardContent>
                <div className="summary-item">
                  <span
                    className="summary-icon summary-icon-primary"
                    aria-hidden="true"
                  >
                    <CalendarIcon size={20} />
                  </span>
                  <div>
                    <p className="summary-label">Citas próximas</p>
                    <p className="summary-value">{upcomingCount}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <span
                    className="summary-icon summary-icon-success"
                    aria-hidden="true"
                  >
                    <CheckCircleIcon size={20} />
                  </span>
                  <div>
                    <p className="summary-label">Completadas</p>
                    <p className="summary-value">{completedCount}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <span
                    className="summary-icon summary-icon-danger"
                    aria-hidden="true"
                  >
                    <AlertCircleIcon size={20} />
                  </span>
                  <div>
                    <p className="summary-label">Canceladas</p>
                    <p className="summary-value">{cancelledCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

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
        </>
      ) : (
        <div className="mis-citas-loading">
          <p>Verificando autenticación...</p>
        </div>
      )}
    </div>
  );
};

export default MisCitas;
