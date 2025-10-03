import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "../components/ui";
import "../styles/Home.css";

function Home() {
  const { user } = useUser();

  return (
    <div className="home-container">
      {/* Hero Section - Moderno y atractivo */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Tu salud en un solo lugar
          </h1>
          <p className="hero-subtitle">
            Agenda citas médicas, accede a tu historial y gestiona tu salud de forma simple y segura. Atención personalizada cuando la necesitas.
          </p>
          <div className="hero-actions">
            {user ? (
              <>
                <Button as={Link} to="/mis-turnos" variant="primary" size="lg">
                  Mis citas
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
                <Button as={Link} to="/register" variant="primary" size="lg">
                  Comenzar ahora
                </Button>
                <Button as={Link} to="/login" variant="ghost" size="lg">
                  Iniciar sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features - Grid moderno */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Plataforma completa</span>
          <h2 className="section-title">Todo lo que necesitas para cuidar tu salud</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box feature-icon-primary">
              <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="feature-title">Agenda inteligente</h3>
            <p className="feature-description">
              Reserva citas con profesionales de la salud en minutos. Elige horarios disponibles en tiempo real y recibe confirmación instantánea.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box feature-icon-accent">
              <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Historial médico</h3>
            <p className="feature-description">
              Acceso completo a tus citas pasadas y futuras. Toda tu información médica organizada y disponible cuando la necesites.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box feature-icon-info">
              <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="feature-title">Recordatorios automáticos</h3>
            <p className="feature-description">
              Notificaciones oportunas por email y SMS para que nunca olvides una cita importante. Configura tus preferencias.
            </p>
          </div>
        </div>
      </section>

      {/* Stats - Confianza */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">15K+</div>
            <div className="stat-label">Pacientes confían en nosotros</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">800+</div>
            <div className="stat-label">Profesionales de la salud</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Citas programadas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Calificación promedio</div>
          </div>
        </div>
      </section>

      {/* CTA - Simple y directo */}
      {!user && (
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Comienza hoy mismo</h2>
            <p className="cta-description">
              Únete a miles de personas que ya gestionan su salud de forma digital
            </p>
            <Button as={Link} to="/register" variant="primary" size="lg">
              Crear cuenta gratuita
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
