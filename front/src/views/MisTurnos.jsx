import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import AppointmentCard from "../components/AppointmentCard";
import EmptyAppointments from "../components/EmptyAppointments";
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

  if (isLoading) {
    return (
      <div className="mis-turnos-container">
        <h1 className="mis-turnos-title">Mis Turnos</h1>
        <div className="user-welcome">
          <p>
            Hola, {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando tus turnos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mis-turnos-container">
        <h1 className="mis-turnos-title">Mis Turnos</h1>
        <div className="user-welcome">
          <p>
            Hola, {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="error">
          <p>{error}</p>
          <button onClick={refreshAppointments} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-turnos-container">
      <h1 className="mis-turnos-title">Mis Turnos</h1>

      <div className="user-welcome">
        <p>
          Hola, {user.firstName} {user.lastName}
        </p>
        <p className="user-email">{user.email}</p>
      </div>

      {userAppointments.length === 0 ? (
        <EmptyAppointments onScheduleClick={() => navigate("/agendar-cita")} />
      ) : (
        <div>
          <div className="appointments-header">
            <p className="appointments-info">
              {userAppointments.length === 1
                ? "Tienes 1 turno programado"
                : `Tienes ${userAppointments.length} turnos programados`}
            </p>
            <button
              className="refresh-btn"
              onClick={refreshAppointments}
              title="Actualizar turnos"
            >
              🔄 Actualizar
            </button>
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
