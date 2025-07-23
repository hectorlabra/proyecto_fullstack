import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MediCitas</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/mis-turnos">Mis Turnos</Link>
        </li>
        <li>Usuarios</li>
      </ul>
    </nav>
  );
}

export default Navbar;
