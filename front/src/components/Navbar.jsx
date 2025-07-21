import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MediCitas</h2>
      </div>
      <ul className="nav-links">
        <li>Inicio</li>
        <li>Turnos</li>
        <li>Usuarios</li>
      </ul>
    </nav>
  );
}

export default Navbar;
