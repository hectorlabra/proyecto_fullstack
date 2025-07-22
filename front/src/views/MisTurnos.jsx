import React, { useState } from "react";
import { myAppointments } from "../helpers/myAppointments";

const MisTurnos = () => {
  const [appointments, setAppointments] = useState(myAppointments);

  // Verificar el estado (temporal para desarrollo)
  console.log("Turnos cargados:", appointments);

  return (
    <div>
      <h1>Mis Turnos</h1>
      <p>Vista de turnos en desarrollo...</p>
      <p>Total de turnos: {appointments.length}</p>
    </div>
  );
};

export default MisTurnos;
