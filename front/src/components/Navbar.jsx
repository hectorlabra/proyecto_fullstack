import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "./ui";
import { CalendarIcon, MenuIcon, CloseIcon } from "./icons";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = user?.user ?? user;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navigationLinks = currentUser
    ? [
        { label: "Inicio", path: "/" },
        { label: "Mis citas", path: "/mis-turnos" },
        { label: "Agendar cita", path: "/agendar-cita" },
      ]
    : [
        { label: "Inicio", path: "/" },
        { label: "Registrarse", path: "/register" },
        { label: "Iniciar sesión", path: "/login" },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Ir a inicio"
          onClick={closeMenu}
        >
          <span className="navbar-brand-icon" aria-hidden="true">
            <CalendarIcon size={22} />
          </span>
          <div>
            <span className="navbar-brand-name">MediCitas</span>
            <span className="navbar-brand-tagline">Gestión médica digital</span>
          </div>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>

        <div
          className={`navbar-menu ${isMenuOpen ? "is-open" : ""}`}
          id="navbar-menu"
        >
          <ul className="navbar-links" role="list">
            {navigationLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={isActive(path) ? "active" : ""}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-cta">
            {currentUser ? (
              <>
                <span className="navbar-user">
                  Hola, {currentUser.firstName}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  closeMenu();
                  navigate("/register");
                }}
              >
                Crear cuenta gratuita
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
