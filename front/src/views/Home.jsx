import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import McButton from "../components/ui/McButton";
import McBadge from "../components/ui/McBadge";
import heroIllustration from "../assets/hero-ui.webp";
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
    { label: "Tiempo promedio de reserva", value: "45s" },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-visual">
            <div className="hero-device">
              <img
                src={heroIllustration}
                alt="Panel de control de Medi Citas"
                className="hero-device__image"
                loading="lazy"
              />
              <div className="hero-device__glow" />
              <div className="hero-device__badge">
                <McBadge variant="info" size="sm">
                  Experiencia premium
                </McBadge>
              </div>
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
