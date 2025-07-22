import React, { useState } from "react";
import { myAppointments } from "../helpers/myAppointments";
import AppointmentCard from "../components/AppointmentCard";
import "../styles/MisTurnos.css";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState(myAppointments);

  // Verificar el estado (temporal para desarrollo)
  console.log("Turnos cargados:", appointments);

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
