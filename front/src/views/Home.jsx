import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "../components/ui";
import "../styles/Home.css";

function Home() {
  const { user } = useUser();

  return (
    <div className="home-container">
      {/* Hero Section - Profesional y sobrio */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Plataforma de Salud Digital</div>
          <h1 className="hero-title">
            Tu salud, organizada y accesible
          </h1>
          <p className="hero-subtitle">
            Gestiona tus citas médicas de forma simple y segura. Acceso inmediato a tu historial, recordatorios automáticos y comunicación directa con profesionales de la salud.
          </p>
          <div className="hero-actions">
            {user ? (
              <>
                <Button as={Link} to="/mis-turnos" variant="primary" size="lg">
                  Ver mis citas
                </Button>
                <Button
                  as={Link}
                  to="/agendar-cita"
                  variant="secondary"
                  size="lg"
                >
                  Agendar cita
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/register" variant="primary" size="lg">
                  Crear cuenta
                </Button>
                <Button as={Link} to="/login" variant="ghost" size="lg">
                  Iniciar sesión
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Stats - Credibilidad empresarial */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-value">10K+</div>
            <div className="stat-label">Pacientes activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">Profesionales</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">98%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
        </div>
      </section>

      {/* Features Section - Más sobrias */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Servicios diseñados para tu bienestar</h2>
          <p className="section-description">
            Tecnología al servicio de tu salud, con la seguridad y privacidad que mereces
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Gestión de citas</h3>
            </div>
            <p className="feature-description">
              Agenda, reprograma o cancela tus citas en segundos. Elige horarios disponibles en tiempo real.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="feature-title">Recordatorios inteligentes</h3>
            </div>
            <p className="feature-description">
              Notificaciones oportunas para que nunca pierdas una cita. Configura tus preferencias.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="feature-title">Historial médico</h3>
            </div>
            <p className="feature-description">
              Acceso completo a tus citas pasadas y futuras. Información centralizada y segura.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Profesional */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Listo para comenzar?</h2>
          <p className="cta-description">
            Únete a miles de pacientes que ya gestionan su salud de forma digital
          </p>
          {!user && (
            <Button as={Link} to="/register" variant="primary" size="lg">
              Crear cuenta gratuita
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
