import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import McButton from "../components/ui/McButton";
import McBadge from "../components/ui/McBadge";
import {
  CalendarIcon,
  ShieldCheckIcon,
  ClockIcon,
  AlertCircleIcon,
  ArrowRightIcon,
} from "../components/icons";
import "../styles/Home.css";
import "../styles/benefit-fix.css";

function Home() {
  const { user } = useUser();
  const currentUser = user?.user ?? user;

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Seguro",
      description:
        "Capa de seguridad multicapa con doble factor y encriptación de extremo a extremo.",
    },
    {
      icon: ClockIcon,
      title: "Eficiente",
      description:
        "Agenda inteligente que sincroniza equipos, salas y disponibilidad en tiempo real.",
    },
    {
      icon: AlertCircleIcon,
      title: "Recordatorios",
      description:
        "Recordatorios humanizados por correo, SMS y WhatsApp con seguimiento automático.",
    },
  ];

  const metrics = [
    { label: "Médicos activos", value: "+120" },
    { label: "Pacientes felices", value: "35k" },
    { label: "Tiempo de reserva", value: "45s" },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-device">
              <div className="hero-device__card hero-device__card--primary">
                <header className="hero-dashboard__header">
                  <div className="hero-avatar">LM</div>
                  <div className="hero-dashboard__info">
                    <p className="hero-dashboard__name">Dra. Laura Méndez</p>
                    <span className="hero-dashboard__role">
                      Cardiología integral
                    </span>
                  </div>
                  <McBadge variant="info" size="sm">
                    Turno confirmado
                  </McBadge>
                </header>
                <div className="hero-dashboard__schedule">
                  <div className="hero-appointment">
                    <span className="hero-appointment__time">09:30</span>
                    <p className="hero-appointment__patient">Juan Pérez</p>
                    <span className="hero-appointment__type">
                      Control anual
                    </span>
                  </div>
                  <div className="hero-analytics" role="list">
                    <div className="hero-analytics__chip" role="listitem">
                      <CalendarIcon size={16} />
                      <span>2 citas hoy</span>
                    </div>
                    <div
                      className="hero-analytics__chip hero-analytics__chip--accent"
                      role="listitem"
                    >
                      <ClockIcon size={16} />
                      <span>Tiempo espera 05m</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-device__card hero-device__card--floating">
                <h3>Panel clínico en tiempo real</h3>
                <p>
                  Monitorea agendas, cancelaciones y adherencia desde un solo
                  panel.
                </p>
                <div className="hero-floating__cta">
                  Explorar panel
                  <ArrowRightIcon size={16} />
                </div>
              </div>

              <div className="hero-device__glow" />
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-eyebrow">Medi Citas 2025</div>
            <h1 className="hero-title">Gestiona tus citas médicas con calma</h1>
            <p className="hero-subtitle">
              Reserva, organiza y sigue tus consultas médicas desde un solo
              lugar. Diseñado para clínicas modernas con experiencia premium.
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
                  <Link to="/mis-citas">
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
            <div className="hero-metrics" role="list">
              {metrics.map(({ label, value }) => (
                <div className="hero-metric" key={label} role="listitem">
                  <strong className="hero-metric__value">{value}</strong>
                  <span className="hero-metric__label">{label}</span>
                </div>
              ))}
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
