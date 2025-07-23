import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "../components/AppointmentCard";
import "../styles/MisTurnos.css";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener turnos desde la API
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener turnos:", err);
      setError("Error al cargar los turnos");
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar datos al montar el componente
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Verificar el estado (temporal para desarrollo)
  console.log("Turnos cargados:", appointments);

  // Mostrar loading
  if (loading) {
    return (
      <div className="mis-turnos-container">
        <h1 className="mis-turnos-title">Mis Turnos</h1>
        <div className="loading">
          <p>Cargando turnos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="mis-turnos-container">
        <h1 className="mis-turnos-title">Mis Turnos</h1>
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchAppointments}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-turnos-container">
      <h1 className="mis-turnos-title">Mis Turnos</h1>

      {appointments.length === 0 ? (
        <div className="no-appointments">
          <p className="no-appointments-text">No tienes turnos programados</p>
        </div>
      ) : (
        <div>
          <p className="appointments-info">
            Total de turnos: {appointments.length}
          </p>

          <div className="appointments-list">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MisTurnos;
