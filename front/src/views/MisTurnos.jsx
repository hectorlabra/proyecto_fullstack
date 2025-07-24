/**
 * MisTurnos Component
 *
 * Displays the user's appointments. Fetches data from an API, handles loading and error states,
 * and renders appointments using `AppointmentCard`. Requires user authentication.
 *
 * @returns {JSX.Element}
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppointmentCard from "../components/AppointmentCard";
import EmptyAppointments from "../components/EmptyAppointments";
import "../styles/MisTurnos.css";

const MisTurnos = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Función para obtener turnos del usuario específico desde la API
  const fetchUserAppointments = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      // Obtener todos los turnos y filtrar por userId
      const response = await axios.get("http://localhost:3000/appointments");

      // Filtrar turnos del usuario específico
      const userAppointments = response.data.filter(
        (appointment) => appointment.userId === userId
      );

      setAppointments(userAppointments);

      // Guardar turnos en localStorage para persistencia
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.appointments = userAppointments;
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      console.error("Error al obtener turnos del usuario:", err);
      let errorMessage = "Error al cargar tus turnos";

      if (err.response) {
        // Error del servidor con respuesta
        errorMessage =
          err.response.data?.error ||
          `Error del servidor (${err.response.status})`;
      } else if (err.request) {
        // Error de red
        errorMessage = "Error de conexión. Verifica tu conexión a internet.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para verificar autenticación y cargar datos al montar el componente
  useEffect(() => {
    // Verificar si hay usuario logueado
    const userData = JSON.parse(localStorage.getItem("user") || "null");

    if (!userData) {
      // No hay usuario logueado, redirigir a Home
      navigate("/");
      return;
    }

    // Usuario logueado, guardar información y cargar turnos
    setUser(userData.user);
    fetchUserAppointments(userData.user.id);
  }, [navigate]);

  // Función para recargar turnos (útil para después de cancelar)
  const handleRefreshAppointments = () => {
    if (user) {
      fetchUserAppointments(user.id);
    }
  };

  // Si no hay usuario, mostrar loading mientras redirige
  if (!user) {
    return (
      <div className="mis-turnos-container">
        <div className="loading">
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading
  if (loading) {
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

  // Mostrar error
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
          <button onClick={handleRefreshAppointments} className="retry-btn">
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

      {appointments.length === 0 ? (
        <EmptyAppointments onScheduleClick={() => navigate("/agendar-cita")} />
      ) : (
        <div>
          <div className="appointments-header">
            <p className="appointments-info">
              {appointments.length === 1
                ? "Tienes 1 turno programado"
                : `Tienes ${appointments.length} turnos programados`}
            </p>
            <button
              className="refresh-btn"
              onClick={handleRefreshAppointments}
              title="Actualizar turnos"
            >
              🔄 Actualizar
            </button>
          </div>

          <div className="appointments-list">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onAppointmentUpdate={handleRefreshAppointments}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MisTurnos;
