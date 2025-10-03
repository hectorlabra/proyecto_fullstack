import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "../components/ui";
import {
  CalendarIcon,
  ShieldCheckIcon,
  ClipboardCheckIcon,
  LayersIcon,
  HeartPulseIcon,
  GlobeIcon,
  StarIcon,
  ArrowRightIcon,
} from "../components/icons";
import "../styles/Home.css";

function Home() {
  const { user } = useUser();
  const currentUser = user?.user ?? user;

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Profesionales validados",
      description:
        "Seleccionamos especialistas certificados y verificados para ofrecerte atención médica segura y confiable.",
    },
    {
      icon: ClipboardCheckIcon,
      title: "Historial clínico centralizado",
      description:
        "Tu agenda y tus antecedentes clínicos quedan registrados para que puedas dar seguimiento a cada consulta.",
    },
    {
      icon: LayersIcon,
      title: "Integración completa",
      description:
        "Sincroniza recordatorios, notas de consulta y documentación médica en una sola plataforma digital.",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Elige tu especialidad",
      description:
        "Explora nuestro catálogo de profesionales y selecciona al especialista que mejor se adapte a tus necesidades clínicas.",
    },
    {
      step: "02",
      title: "Agenda en segundos",
      description:
        "Selecciona fecha y horario disponible, confirma tus datos y recibe una confirmación inmediata de tu turno.",
    },
    {
      step: "03",
      title: "Recibe seguimiento",
      description:
        "Obtén recordatorios automáticos, notas post-consulta y recomendaciones personalizadas para dar continuidad a tu tratamiento.",
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">Plataforma líder en telemedicina</span>
            <h1 className="hero-title">
              Gestiona tu salud con una experiencia premium
            </h1>
            <p className="hero-subtitle">
              Agenda turnos, accede a tu historial clínico y mantente conectado
              con tus profesionales de confianza, todo desde un solo lugar y con
              la seguridad que tu salud merece.
            </p>
            <div className="hero-actions">
              {currentUser ? (
                <>
                  <Button
                    as={Link}
                    to="/mis-turnos"
                    variant="primary"
                    size="lg"
                    leadingIcon={<CalendarIcon size={20} />}
                  >
                    Ver mis citas
                  </Button>
                  <Button
                    as={Link}
                    to="/agendar-cita"
                    variant="secondary"
                    size="lg"
                  >
                    Agendar nueva cita
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/register"
                    variant="primary"
                    size="lg"
                    leadingIcon={<ArrowRightIcon size={20} />}
                  >
                    Crear cuenta gratuita
                  </Button>
                  <Button as={Link} to="/login" variant="ghost" size="lg">
                    Ya tengo una cuenta
                  </Button>
                </>
              )}
            </div>
            <div className="hero-trust">
              <span className="hero-trust-label">
                <StarIcon size={18} aria-hidden="true" />
                4.9/5 según 2.500 reseñas verificadas
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <h3>Resumen semanal</h3>
                <span>Octubre 2025</span>
              </div>
              <ul className="hero-card-list">
                <li>
                  <div>
                    <p>Próximas citas</p>
                    <span>12 turnos agendados</span>
                  </div>
                  <span className="hero-card-value">+18%</span>
                </li>
                <li>
                  <div>
                    <p>Pacientes satisfechos</p>
                    <span>Encuestas post-consulta</span>
                  </div>
                  <span className="hero-card-value">97%</span>
                </li>
                <li>
                  <div>
                    <p>Tiempo de espera</p>
                    <span>Promedio en sala virtual</span>
                  </div>
                  <span className="hero-card-value">3.5 min</span>
                </li>
              </ul>
              <div className="hero-card-footer">
                <HeartPulseIcon size={18} aria-hidden="true" />
                Monitoreo en tiempo real para tu equipo clínico
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-value">+15K</p>
            <p className="stat-label">Pacientes activos</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">820</p>
            <p className="stat-label">Profesionales de la salud</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">98%</p>
            <p className="stat-label">Satisfacción promedio</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">24/7</p>
            <p className="stat-label">Disponibilidad asistencial</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Experiencia asistencial</span>
          <h2 className="section-title">
            Una plataforma diseñada para equipos médicos modernos
          </h2>
          <p className="section-description">
            MediCitas centraliza todo el ciclo de atención médica para que
            pacientes y profesionales colaboren con la misma información y sin
            fricciones.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ icon, title, description }) => {
            const IconComponent = icon;
            return (
              <article className="feature-card" key={title}>
                <span className="feature-icon" aria-hidden="true">
                  <IconComponent size={22} />
                </span>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-description">{description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="workflow-section">
        <div className="workflow-header">
          <span className="section-badge">Proceso asistido</span>
          <h2 className="section-title">
            De la reserva al seguimiento continuo
          </h2>
          <p className="section-description">
            Optimiza cada interacción entre pacientes y profesionales con flujos
            asistidos, notificaciones automáticas y evaluación post-consulta.
          </p>
        </div>

        <div className="workflow-grid">
          {workflow.map(({ step, title, description }) => (
            <div className="workflow-card" key={step}>
              <span className="workflow-step">{step}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <div>
            <h2>Empieza a digitalizar la experiencia de tus pacientes</h2>
            <p>
              Integra MediCitas en tu práctica profesional y ofrece una
              experiencia médica consistente y humana en cada punto de contacto.
            </p>
          </div>
          {currentUser ? (
            <Button as={Link} to="/agendar-cita" variant="primary" size="lg">
              Programar una nueva cita
            </Button>
          ) : (
            <div className="cta-actions">
              <Button as={Link} to="/register" variant="primary" size="lg">
                Crear cuenta profesional
              </Button>
              <Button as={Link} to="/login" variant="ghost" size="lg">
                Ingresar a la plataforma
              </Button>
            </div>
          )}
        </div>
        <div className="cta-support">
          <GlobeIcon size={20} aria-hidden="true" />
          Soporte humano disponible en 5 países y 3 idiomas.
        </div>
      </section>
    </div>
  );
}

export default Home;
