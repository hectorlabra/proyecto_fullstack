import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import McButton from "./ui/McButton";
import {
  CalendarIcon,
  MenuIcon,
  CloseIcon,
  HomeIcon,
  UserIcon,
  PlusIcon,
} from "./icons";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentUser = user?.user ?? user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navigationLinks = currentUser
    ? [
        { label: "Inicio", path: "/", icon: <HomeIcon size={18} /> },
        {
          label: "Mis Citas",
          path: "/mis-turnos",
          icon: <CalendarIcon size={18} />,
        },
        {
          label: "Nueva Cita",
          path: "/agendar-cita",
          icon: <PlusIcon size={18} />,
          emphasis: true,
        },
      ]
    : [{ label: "Inicio", path: "/", icon: <HomeIcon size={18} /> }];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="Medi Citas - Ir a inicio"
          onClick={closeMenu}
        >
          <span className="navbar-brand-icon" aria-hidden="true">
            <CalendarIcon size={24} />
          </span>
          <span className="navbar-brand-name">Medi Citas</span>
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
            {navigationLinks.map(({ label, path, icon, emphasis }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`navbar-link ${
                    isActive(path) ? "navbar-link--active" : ""
                  } ${emphasis ? "navbar-link--emphasis" : ""}`}
                  onClick={closeMenu}
                >
                  {icon && (
                    <span className="navbar-link-icon" aria-hidden="true">
                      {icon}
                    </span>
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-cta">
            {currentUser ? (
              <>
                <div className="navbar-user">
                  <UserIcon size={16} />
                  <span>{currentUser.firstName}</span>
                </div>
                <McButton variant="ghost" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </McButton>
              </>
            ) : (
              <>
                <McButton
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    closeMenu();
                    navigate("/login");
                  }}
                >
                  Ingresar
                </McButton>
                <McButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    closeMenu();
                    navigate("/register");
                  }}
                >
                  Crear Cuenta
                </McButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
