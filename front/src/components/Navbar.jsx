import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

const MOBILE_BREAKPOINT = 768;

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );
  const [portalTarget, setPortalTarget] = useState(null);

  const currentUser = user?.user ?? user;

  const userInitials = useMemo(() => {
    if (!currentUser) return "MC";
    const first = currentUser.firstName?.trim()?.charAt(0) ?? "";
    const last = currentUser.lastName?.trim()?.charAt(0) ?? "";
    const initials = `${first}${last}`.toUpperCase();
    if (initials) return initials;
    const fallback = currentUser.firstName?.trim()?.charAt(0)?.toUpperCase();
    return fallback || "MC";
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsMobileView(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isMobileView) {
      setIsMenuOpen(false);
    }
  }, [isMobileView]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    // Robust scroll lock for mobile menu: store scroll position, fix body and
    // restore on cleanup. We use a class so CSS can control any additional
    // behaviors and to avoid conflicts with other code that manipulates
    // document.body.style.overflow directly.
    if (!isMobileView || !isMenuOpen) return undefined;

    const scrollY = window.scrollY;
    // save previous inline styles to restore later
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevOverflow = document.body.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("mc-nav-open");

    return () => {
      document.documentElement.classList.remove("mc-nav-open");
      document.body.style.position = prevPosition || "";
      document.body.style.top = prevTop || "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = prevOverflow || "";
      // restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen, isMobileView]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const renderMenuContent = () => (
    <div
      className={`navbar-menu ${isMenuOpen ? "is-open" : ""}`}
      id="navbar-menu"
      data-state={isMenuOpen ? "open" : "closed"}
      aria-hidden={isMobileView ? !isMenuOpen : false}
      role={isMobileView ? "dialog" : undefined}
      aria-modal={isMobileView ? true : undefined}
      aria-label={isMobileView ? "Menú de navegación" : undefined}
    >
      {isMobileView ? (
        <>
          <div className="navbar-menu__header">
            <Link to="/" className="navbar-menu__brand" onClick={closeMenu}>
              <span className="navbar-menu__brand-icon" aria-hidden="true">
                <CalendarIcon size={20} />
              </span>
              <span className="navbar-menu__brand-name">Medi Citas</span>
            </Link>
            <button
              type="button"
              className="navbar-menu__close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {currentUser ? (
            <div className="navbar-menu__profile">
              <span className="navbar-menu__avatar" aria-hidden="true">
                {userInitials}
              </span>
              <div className="navbar-menu__profile-info">
                <p className="navbar-menu__profile-name">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                {currentUser.email && (
                  <p className="navbar-menu__profile-email">
                    {currentUser.email}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="navbar-menu__welcome">
              <h2>Bienvenido a Medi Citas</h2>
              <p>Gestiona tus turnos y recordatorios desde cualquier lugar.</p>
            </div>
          )}

          {/* Make the main menu body scrollable so the CTA can stay sticky at the bottom */}
          <div className="navbar-menu__body">
            <p className="navbar-menu__section-label">Navegación</p>

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

            <p className="navbar-menu__section-label navbar-menu__section-label--cta">
              {currentUser ? "Tu cuenta" : "Acceso rápido"}
            </p>

            <div className="navbar-cta">
              {currentUser ? (
                <McButton
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  fullWidth
                >
                  Cerrar sesión
                </McButton>
              ) : (
                <>
                  <McButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      closeMenu();
                      navigate("/login");
                    }}
                    fullWidth
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
                    fullWidth
                  >
                    Crear Cuenta
                  </McButton>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${
        isMenuOpen && isMobileView ? "navbar--menu-open" : ""
      }`}
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
          type="button"
          className="navbar-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>

        {!isMobileView && renderMenuContent()}
      </div>
      {isMobileView &&
        portalTarget &&
        createPortal(
          <>
            <div
              className={`navbar-overlay ${isMenuOpen ? "is-visible" : ""}`}
              role="presentation"
              aria-hidden={!isMenuOpen}
              onClick={closeMenu}
            />
            {renderMenuContent()}
          </>,
          portalTarget
        )}
    </nav>
  );
}

export default Navbar;
