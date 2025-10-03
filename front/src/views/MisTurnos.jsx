import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import AppointmentCard from "../components/AppointmentCard";
import EmptyAppointments from "../components/EmptyAppointments";
import { Breadcrumbs, AppointmentListSkeleton, Button } from "../components/ui";
import "../styles/MisTurnos.css";

const MisTurnos = () => {
  const navigate = useNavigate();
  const { user, userAppointments, isLoading, error, refreshAppointments } =
    useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    console.log("MisTurnos mounted, userAppointments:", userAppointments);
    console.log("User ID:", user.id || user.user?.id);

    refreshAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <div className="mis-turnos-container">
        <div className="loading">
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-turnos-container">
      <Breadcrumbs />
      
      <div className="page-header">
        <h1 className="page-title">Mis Citas</h1>
        <p className="page-subtitle">
          Hola, {user.firstName} {user.lastName}
        </p>
      </div>

      {isLoading ? (
        <AppointmentListSkeleton count={3} />
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <Button onClick={refreshAppointments} variant="primary">
            Reintentar
          </Button>
        </div>
      ) : userAppointments.length === 0 ? (
        <EmptyAppointments onScheduleClick={() => navigate("/agendar-cita")} />
      ) : (
        <div>
          <div className="appointments-header">
            <p className="appointments-info">
              {userAppointments.length === 1
                ? "Tienes 1 cita programada"
                : `Tienes ${userAppointments.length} citas programadas`}
            </p>
            <Button
              onClick={refreshAppointments}
              variant="ghost"
              size="sm"
              leadingIcon="🔄"
            >
              Actualizar
            </Button>
          </div>

          <div className="appointments-list">
            {userAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onAppointmentUpdate={refreshAppointments}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MisTurnos;
