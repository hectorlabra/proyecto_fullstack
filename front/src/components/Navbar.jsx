import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="logo">
        <h2>MediCitas</h2>
      </div>
      <ul className="nav-links" role="list">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/mis-turnos">Mis Turnos</Link>
            </li>
            <li>
              <Link to="/agendar-cita">Agendar Cita</Link>
            </li>
            <li>
              <span className="user-greeting">Hola, {user.user.firstName}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
                aria-label="Cerrar sesión de usuario"
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Registro</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
