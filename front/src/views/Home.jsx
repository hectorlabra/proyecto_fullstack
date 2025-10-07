import { Link } from "react-router-dom";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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

function Home() {
  const { user } = useUser();
  const currentUser = user?.user ?? user;

  const SURGE_TIMING = useMemo(
    () => ({
      exit: 280,
      settle: 680,
      interval: 5400,
      initialDelay: 3600,
    }),
    []
  );

  // Datos dinámicos para las notificaciones (memoizados)
  const appointments = useMemo(
    () => [
      {
        time: "09:30",
        patient: "Juan Pérez",
        type: "Consulta rutinaria",
        meta: "Control anual",
        doctor: "Dra. Laura Méndez",
        specialty: "Cardiología integral",
        avatar: "LM",
        badge: "Turno confirmado",
        badgeVariant: "info",
      },
      {
        time: "11:00",
        patient: "María González",
        type: "Primera consulta",
        meta: "Evaluación cardíaca",
        doctor: "Dr. Carlos Ruiz",
        specialty: "Cardiología deportiva",
        avatar: "CR",
        badge: "Sala preparada",
        badgeVariant: "success",
      },
      {
        time: "14:30",
        patient: "Roberto Silva",
        type: "Seguimiento",
        meta: "Post operatorio",
        doctor: "Dra. Ana Martínez",
        specialty: "Cirugía cardiovascular",
        avatar: "AM",
        badge: "En curso",
        badgeVariant: "warning",
      },
      {
        time: "16:00",
        patient: "Laura Fernández",
        type: "Control mensual",
        meta: "Tratamiento crónico",
        doctor: "Dr. Miguel Soto",
        specialty: "Medicina interna",
        avatar: "MS",
        badge: "Confirmado",
        badgeVariant: "info",
      },
    ],
    []
  );

  const metricsData = useMemo(
    () => [
      { values: ["+120", "+125", "+130", "+135"], label: "Médicos activos" },
      { values: ["35k", "36k", "37k", "38k"], label: "Pacientes felices" },
      { values: ["45s", "42s", "38s", "35s"], label: "Tiempo de reserva" },
    ],
    []
  );

  const todayCounts = useMemo(() => [2, 3, 4, 5, 6, 7], []);
  const waitTimes = useMemo(
    () => ["05m", "08m", "03m", "12m", "07m", "04m"],
    []
  );

  // Estados para las animaciones tipo Apple Watch
  const [currentAppointment, setCurrentAppointment] = useState(0);
  const [currentMetrics, setCurrentMetrics] = useState([0, 0, 0]);
  const [animationState, setAnimationState] = useState("enter"); // idle, exit, enter
  const [currentTodayIndex, setCurrentTodayIndex] = useState(0);
  const [currentWaitIndex, setCurrentWaitIndex] = useState(0);

  const timersRef = useRef({ timeouts: [], intervalId: null });
  const cycleRef = useRef(null);

  const clearTimers = useCallback(() => {
    timersRef.current.timeouts.forEach((id) => clearTimeout(id));
    timersRef.current.timeouts = [];

    if (timersRef.current.intervalId) {
      clearInterval(timersRef.current.intervalId);
      timersRef.current.intervalId = null;
    }
  }, []);

  const registerTimeout = useCallback((callback, delay) => {
    const id = setTimeout(() => {
      callback();
      timersRef.current.timeouts = timersRef.current.timeouts.filter(
        (storedId) => storedId !== id
      );
    }, delay);

    timersRef.current.timeouts.push(id);
    return id;
  }, []);

  useEffect(() => {
    const playEnterPhase = () => {
      setAnimationState("enter");
      registerTimeout(() => setAnimationState("idle"), SURGE_TIMING.settle);
    };

    const cycle = ({ immediate = false } = {}) => {
      setAnimationState("exit");
      registerTimeout(
        () => {
          setCurrentAppointment((prev) => (prev + 1) % appointments.length);
          setCurrentTodayIndex((prev) => (prev + 1) % todayCounts.length);
          setCurrentWaitIndex((prev) => (prev + 1) % waitTimes.length);
          playEnterPhase();
        },
        immediate ? 0 : SURGE_TIMING.exit
      );
    };

    cycleRef.current = cycle;
    playEnterPhase();

    const scheduleLoop = () => {
      timersRef.current.intervalId = setInterval(() => {
        if (cycleRef.current) {
          cycleRef.current();
        }
      }, SURGE_TIMING.interval);
    };

    registerTimeout(() => {
      cycle();
      scheduleLoop();
    }, SURGE_TIMING.initialDelay);

    return () => {
      clearTimers();
    };
  }, [
    appointments.length,
    todayCounts.length,
    waitTimes.length,
    SURGE_TIMING,
    clearTimers,
    registerTimeout,
  ]);

  // Actualizar métricas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics((prev) =>
        prev.map((val, idx) => (val + 1) % metricsData[idx].values.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [metricsData]);

  const appointment = appointments[currentAppointment];
  const todayCount = todayCounts[currentTodayIndex];
  const waitTime = waitTimes[currentWaitIndex];

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

  const metrics = metricsData.map((metric, idx) => ({
    label: metric.label,
    value: metric.values[currentMetrics[idx]],
  }));

  return (
    <div className="home-container page-shell">
      <div className="page-shell__content">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">Medi Citas 2025</div>
              <h1 className="hero-title">
                Gestiona tus citas médicas con calma
              </h1>
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
              <div
                className="hero-metrics hero-metrics--horizontal"
                role="list"
              >
                {metrics.map(({ label, value }) => (
                  <div className="hero-metric" key={label} role="listitem">
                    <strong className="hero-metric__value">{value}</strong>
                    <span className="hero-metric__label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-device">
                <div className="hero-device__card hero-device__card--primary">
                  <header className="hero-dashboard__header">
                    <div
                      className={`hero-avatar hero-content-${animationState}`}
                      key={`avatar-${currentAppointment}`}
                    >
                      {appointment.avatar}
                    </div>
                    <div className="hero-dashboard__info">
                      <p
                        className={`hero-dashboard__name hero-content-${animationState}`}
                        key={`name-${currentAppointment}`}
                      >
                        {appointment.doctor}
                      </p>
                      <span
                        className={`hero-dashboard__role hero-content-${animationState}`}
                        key={`role-${currentAppointment}`}
                      >
                        {appointment.specialty}
                      </span>
                    </div>
                    <div
                      className={`hero-badge-wrapper hero-content-${animationState}`}
                      key={`badge-wrapper-${currentAppointment}`}
                    >
                      <McBadge variant={appointment.badgeVariant} size="sm">
                        {appointment.badge}
                      </McBadge>
                    </div>
                  </header>
                  <div className="hero-dashboard__schedule">
                    <div
                      className={`hero-appointment hero-content-${animationState}`}
                      key={`appointment-${currentAppointment}`}
                    >
                      <span className="hero-appointment__time">
                        {appointment.time}
                      </span>
                      <div className="hero-appointment__info">
                        <p className="hero-appointment__patient">
                          {appointment.patient}
                        </p>
                        <span className="hero-appointment__meta">
                          {appointment.type}
                        </span>
                        <span className="hero-appointment__type">
                          {appointment.meta}
                        </span>
                      </div>
                    </div>
                    <div className="hero-analytics" role="list">
                      <div
                        className={`hero-analytics__chip hero-content-${animationState}`}
                        role="listitem"
                        key={`calendar-${todayCount}`}
                      >
                        <CalendarIcon size={16} />
                        <span>{todayCount} citas hoy</span>
                      </div>
                      <div
                        className={`hero-analytics__chip hero-analytics__chip--accent hero-content-${animationState}`}
                        role="listitem"
                        key={`clock-${waitTime}`}
                      >
                        <ClockIcon size={16} />
                        <span>Tiempo espera {waitTime}</span>
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
    </div>
  );
}

export default Home;
