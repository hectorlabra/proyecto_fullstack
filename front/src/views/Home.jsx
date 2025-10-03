import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Button } from "../components/ui";
import { Card, CardContent } from "../components/ui";
import "../styles/Home.css";

function Home() {
  const { user } = useUser();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Gestiona tus Citas Médicas de Forma Simple
          </h1>
          <p className="hero-subtitle">
            Agenda, consulta y administra tus citas de salud en un solo lugar.
            Atención médica a tu alcance.
          </p>
          <div className="hero-actions">
            {user ? (
              <>
                <Button as={Link} to="/mis-turnos" variant="primary" size="lg">
                  Mis Citas
                </Button>
                <Button
                  as={Link}
                  to="/agendar-cita"
                  variant="secondary"
                  size="lg"
                >
                  Agendar Nueva Cita
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/register" variant="primary" size="lg">
                  Registrarse
                </Button>
                <Button as={Link} to="/login" variant="secondary" size="lg">
                  Iniciar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">¿Por qué MediCitas?</h2>
        <div className="features-grid">
          <Card>
            <CardContent>
              <div className="feature-icon" aria-hidden="true">
                📅
              </div>
              <h3>Agenda Fácil</h3>
              <p>
                Reserva tu cita médica en pocos pasos. Elige fecha, hora y
                especialidad.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="feature-icon" aria-hidden="true">
                🔔
              </div>
              <h3>Recordatorios</h3>
              <p>
                Recibe notificaciones de tus próximas citas para que nunca las
                olvides.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="feature-icon" aria-hidden="true">
                💼
              </div>
              <h3>Historial Completo</h3>
              <p>
                Consulta todas tus citas pasadas y futuras en un solo lugar.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Home;
