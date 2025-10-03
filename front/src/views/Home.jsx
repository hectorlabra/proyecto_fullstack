import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import McButton from "../components/ui/McButton";
import {
  CalendarIcon,
  ShieldCheckIcon,
  ClockIcon,
  AlertCircleIcon,
  ArrowRightIcon,
} from "../components/icons";
import "../styles/Home.css";

function Home() {
  const { user } = useUser();
  const currentUser = user?.user ?? user;

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Seguro",
      description:
        "Datos protegidos y cifrados bajo estándares médicos internacionales.",
    },
    {
      icon: ClockIcon,
      title: "Eficiente",
      description: "Reserva tus citas en segundos, con confirmación inmediata.",
    },
    {
      icon: AlertCircleIcon,
      title: "Recordatorios",
      description:
        "Notificaciones claras para no olvidar ninguna consulta importante.",
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-illustration">
              <svg
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="50"
                  y="60"
                  width="300"
                  height="180"
                  rx="12"
                  fill="var(--color-surface)"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="110"
                  r="20"
                  fill="var(--color-primary-soft)"
                />
                <rect
                  x="135"
                  y="95"
                  width="180"
                  height="12"
                  rx="6"
                  fill="var(--color-surface-alt)"
                />
                <rect
                  x="135"
                  y="115"
                  width="120"
                  height="8"
                  rx="4"
                  fill="var(--color-surface-neutral)"
                />
                <rect
                  x="65"
                  y="160"
                  width="270"
                  height="60"
                  rx="8"
                  fill="var(--color-accent-soft)"
                />
                <circle cx="90" cy="190" r="12" fill="var(--color-accent)" />
                <rect
                  x="115"
                  y="180"
                  width="200"
                  height="8"
                  rx="4"
                  fill="var(--color-accent)"
                />
                <rect
                  x="115"
                  y="195"
                  width="140"
                  height="6"
                  rx="3"
                  fill="var(--color-accent-hover)"
                />
              </svg>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Gestiona tus citas médicas con calma</h1>
            <p className="hero-subtitle">
              Reserva, organiza y sigue tus consultas médicas desde un solo
              lugar. Experiencia simple, humana y confiable.
            </p>
            <div className="hero-actions">
              {currentUser ? (
                <>
                  <Link to="/agendar-cita">
                    <McButton
                      variant="primary"
                      size="lg"
                      icon={<CalendarIcon size={20} />}
                    >
                      Crear Cita
                    </McButton>
                  </Link>
                  <Link to="/mis-turnos">
                    <McButton variant="outline" size="lg">
                      Ver Mis Citas
                    </McButton>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <McButton
                      variant="primary"
                      size="lg"
                      icon={<ArrowRightIcon size={20} />}
                    >
                      Crear Cuenta
                    </McButton>
                  </Link>
                  <Link to="/login">
                    <McButton variant="ghost" size="lg">
                      Ingresar
                    </McButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-header">
          <h2 className="section-title">¿Por qué Medi Citas?</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map(({ icon, title, description }) => {
            const IconComponent = icon;
            return (
              <article className="benefit-card" key={title}>
                <span className="benefit-icon" aria-hidden="true">
                  <IconComponent size={24} />
                </span>
                <h3 className="benefit-title">{title}</h3>
                <p className="benefit-description">{description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {!currentUser && (
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Comienza hoy</h2>
            <p className="cta-subtitle">
              Crea tu cuenta gratuita y organiza tu salud en minutos.
            </p>
            <div className="cta-actions">
              <Link to="/register">
                <McButton variant="primary" size="lg">
                  Crear mi cuenta
                </McButton>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
