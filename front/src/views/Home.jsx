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

const METRIC_REGEX = /^([+-]?)(\d+(?:\.\d+)?)([a-zA-Z%]*)$/;

const parseMetricValue = (raw) => {
  const match = METRIC_REGEX.exec(raw);
  if (!match) {
    return { prefix: "", num: 0, suffix: "" };
  }
  const [, prefix = "", numericValue, suffix = ""] = match;
  const parsedNumber = parseFloat(numericValue);
  return { prefix, num: parsedNumber, suffix };
};

const formatMetricValue = ({ prefix, num, suffix }) => {
  // For counts (doctors/patients) and thousands (k) we always show integers
  if (suffix === "k") {
    return `${prefix}${Math.round(num)}k`;
  }
  if (suffix === "%" || suffix === "s" || suffix === "m") {
    return `${prefix}${Math.round(num)}${suffix}`;
  }
  // default: show integers for counts
  return `${prefix}${Math.round(num)}${suffix}`;
};

const jitterAmplitudeFor = (suffix, base) => {
  // Very subtle amplitudes to simulate slow, elegant real-time drift
  switch (suffix) {
    case "k":
      return Math.max(0.08, base * 0.004); // tiny drift for thousands
    case "s":
      return Math.max(0.4, base * 0.03);
    case "%":
      return Math.max(0.2, base * 0.02);
    default:
      return Math.max(0.4, base * 0.01);
  }
};

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }
  return hours * 60 + minutes;
};

function Home() {
  const { user } = useUser();
  const currentUser = user?.user ?? user;

  // Timings tuned for a snappy Apple Watch-like surge effect.
  // exit + settle should be smaller than interval so the enter animation can finish.
  // interval controls how often content cycles; user requested ~2s responsiveness.
  const SURGE_TIMING = useMemo(
    () => ({
      exit: 320, // slightly longer exit so content unmounts cleanly
      settle: 820, // allow enter animation (~720ms) to finish with a small buffer
      interval: 4200, // cycle every ~4.2s — noticeably slower than before
      initialDelay: 2200, // initial pop after page load (give user time to orient)
    }),
    []
  );

  // Datos dinámicos para las notificaciones (memoizados)
  const appointments = useMemo(
    () => [
      {
        time: "07:20",
        patient: "Inés Carvajal",
        type: "Evaluación",
        meta: "Preoperatorio",
        doctor: "Dr. Martín Vega",
        specialty: "Anestesiología",
        avatar: "MV",
        badge: "Checklist en curso",
        badgeVariant: "warning",
      },
      {
        time: "07:45",
        patient: "Lucía Vidal",
        type: "Control",
        meta: "Embarazo riesgo bajo",
        doctor: "Dra. Camila Ortiz",
        specialty: "Obstetricia",
        avatar: "CO",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "08:15",
        patient: "Paula Contreras",
        type: "Consulta",
        meta: "Dolor cervical",
        doctor: "Dr. Esteban Rivas",
        specialty: "Traumatología",
        avatar: "ER",
        badge: "Sala preparada",
        badgeVariant: "success",
      },
      {
        time: "08:40",
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
        time: "09:05",
        patient: "María Fernández",
        type: "Vacunación",
        meta: "Refuerzo gripe",
        doctor: "Dr. Luis Ortega",
        specialty: "Medicina familiar",
        avatar: "LO",
        badge: "Checklist listo",
        badgeVariant: "success",
      },
      {
        time: "09:30",
        patient: "Ana Torres",
        type: "Control",
        meta: "Tensión arterial",
        doctor: "Dra. Cynthia Aguilar",
        specialty: "Medicina interna",
        avatar: "CA",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "10:00",
        patient: "Diego Farías",
        type: "Seguimiento",
        meta: "Rehabilitación rodilla",
        doctor: "Dr. Javier Luna",
        specialty: "Fisiatría",
        avatar: "JL",
        badge: "En curso",
        badgeVariant: "warning",
      },
      {
        time: "10:25",
        patient: "Carla Domínguez",
        type: "Primera consulta",
        meta: "Dermatitis crónica",
        doctor: "Dra. Sandra Vega",
        specialty: "Dermatología",
        avatar: "SV",
        badge: "Historia cargada",
        badgeVariant: "success",
      },
      {
        time: "10:50",
        patient: "Mateo Sandoval",
        type: "Control",
        meta: "Ajuste medicación",
        doctor: "Dr. Alberto Núñez",
        specialty: "Medicina interna",
        avatar: "AN",
        badge: "Pendiente firma",
        badgeVariant: "warning",
      },
      {
        time: "11:10",
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
        time: "11:35",
        patient: "Rafael Ríos",
        type: "Control",
        meta: "Hipertensión",
        doctor: "Dr. Miguel Soto",
        specialty: "Medicina interna",
        avatar: "MS",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "12:00",
        patient: "Patricia Gómez",
        type: "Control",
        meta: "Colesterol",
        doctor: "Dr. Juan Pérez",
        specialty: "Endocrinología",
        avatar: "JP",
        badge: "En cola",
        badgeVariant: "warning",
      },
      {
        time: "12:25",
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
        time: "12:55",
        patient: "Helena Lozano",
        type: "Consulta",
        meta: "Somnolencia crónica",
        doctor: "Dr. Nicolás Prado",
        specialty: "Medicina del sueño",
        avatar: "NP",
        badge: "Estudio listo",
        badgeVariant: "info",
      },
      {
        time: "13:20",
        patient: "Sofía Morales",
        type: "Control",
        meta: "Diabetes",
        doctor: "Dra. Emilia Soto",
        specialty: "Endocrinología",
        avatar: "ES",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "13:45",
        patient: "Esteban Gutiérrez",
        type: "Rehabilitación",
        meta: "Sesión respiratoria",
        doctor: "Dr. Rodrigo León",
        specialty: "Neumología",
        avatar: "RL",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "14:10",
        patient: "Luis Herrera",
        type: "Terapia",
        meta: "Fisioterapia",
        doctor: "Dra. Valeria Cruz",
        specialty: "Rehabilitación",
        avatar: "VC",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "14:40",
        patient: "Laura Fernández",
        type: "Control mensual",
        meta: "Tratamiento crónico",
        doctor: "Dra. Francisca Beltrán",
        specialty: "Medicina interna",
        avatar: "FB",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "15:05",
        patient: "Andrés Campos",
        type: "Consulta express",
        meta: "Resultados laboratorio",
        doctor: "Dra. Sofía Blanco",
        specialty: "Medicina general",
        avatar: "SB",
        badge: "Laboratorio actualizado",
        badgeVariant: "success",
      },
      {
        time: "15:35",
        patient: "Marcela Ríos",
        type: "Control",
        meta: "Salud mental",
        doctor: "Dra. Paula Ruiz",
        specialty: "Psiquiatría",
        avatar: "PR",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "16:00",
        patient: "Fernando Díaz",
        type: "Urgente",
        meta: "Dolor abdominal",
        doctor: "Dr. Alberto Méndez",
        specialty: "Urgencias",
        avatar: "AM2",
        badge: "Atención inmediata",
        badgeVariant: "danger",
      },
      {
        time: "16:30",
        patient: "Gisella Mora",
        type: "Control",
        meta: "Revisión ginecológica",
        doctor: "Dra. Carolina Ruiz",
        specialty: "Ginecología",
        avatar: "CR2",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "17:00",
        patient: "Ignacio Fuentes",
        type: "Consulta",
        meta: "Laboratorio",
        doctor: "Dr. Tomás León",
        specialty: "Patología",
        avatar: "TL",
        badge: "Muestra tomada",
        badgeVariant: "success",
      },
      {
        time: "17:30",
        patient: "Valentina Ruiz",
        type: "Control",
        meta: "Revisión ortodoncia",
        doctor: "Dra. Daniela Espinoza",
        specialty: "Odontología",
        avatar: "DE",
        badge: "Confirmado",
        badgeVariant: "info",
      },
      {
        time: "18:00",
        patient: "Claudia Paredes",
        type: "Seguimiento",
        meta: "Revisión nutricional",
        doctor: "Lic. Julieta Mora",
        specialty: "Nutrición clínica",
        avatar: "JM",
        badge: "Plan actualizado",
        badgeVariant: "success",
      },
      {
        time: "18:30",
        patient: "Sebastián Oliva",
        type: "Teleconsulta",
        meta: "Ajuste medicación",
        doctor: "Dr. Hugo Báez",
        specialty: "Medicina interna",
        avatar: "HB",
        badge: "En curso",
        badgeVariant: "warning",
      },
      {
        time: "19:05",
        patient: "Teresa Aguilar",
        type: "Control",
        meta: "Terapia del sueño",
        doctor: "Dra. Noelia Prado",
        specialty: "Neurología",
        avatar: "NP2",
        badge: "Confirmado",
        badgeVariant: "info",
      },
    ],
    []
  );

  // Stochastic selection with recency decay, diversity bias, and time drift
  const pickNextAppointment = useCallback(
    (history) => {
      if (!appointments.length) {
        return 0;
      }

      const recentSlice = history.slice(-6);
      const lastIdx = recentSlice[recentSlice.length - 1];
      const lastAppointment =
        typeof lastIdx === "number" ? appointments[lastIdx] : null;

      const recentDoctors = new Set(
        recentSlice.map((idx) => appointments[idx]?.doctor).filter(Boolean)
      );
      const recentPatients = new Set(
        recentSlice.map((idx) => appointments[idx]?.patient).filter(Boolean)
      );

      const recencyPenalties = [0.06, 0.12, 0.18, 0.26, 0.34, 0.42];
      const lastMinutes = lastAppointment
        ? parseTimeToMinutes(lastAppointment.time)
        : null;

      const pool = appointments.map((entry, idx) => {
        let weight = 1;

        // Strongly penalize recent repetitions of the same slot
        recentSlice
          .slice()
          .reverse()
          .forEach((historyIdx, distance) => {
            if (historyIdx === idx) {
              const penalty = recencyPenalties[distance] ?? 0.5;
              weight *= penalty;
            }
          });

        if (lastAppointment) {
          if (entry.doctor === lastAppointment.doctor) {
            weight *= 0.35;
          }
          if (entry.patient === lastAppointment.patient) {
            weight *= 0.25;
          }
        }

        if (recentDoctors.has(entry.doctor)) {
          weight *= 0.7;
        }
        if (recentPatients.has(entry.patient)) {
          weight *= 0.55;
        }

        const minutes = parseTimeToMinutes(entry.time);
        if (lastMinutes != null) {
          const delta = minutes - lastMinutes;
          if (delta >= 0 && delta <= 120) {
            weight *= 1.35;
          } else if (delta >= 0 && delta <= 240) {
            weight *= 1.15;
          } else if (delta < -45) {
            weight *= 0.65;
          }
        } else if (minutes >= 600 && minutes <= 900) {
          weight *= 1.18;
        } else if (minutes < 540) {
          weight *= 0.85;
        }

        // Subtle randomness avoids deterministic loops
        weight *= 0.9 + Math.random() * 0.3;

        return { idx, weight };
      });

      const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
      if (totalWeight <= 0) {
        return Math.floor(Math.random() * appointments.length);
      }

      let roll = Math.random() * totalWeight;
      for (let i = 0; i < pool.length; i++) {
        roll -= pool[i].weight;
        if (roll <= 0) {
          return pool[i].idx;
        }
      }

      return pool[pool.length - 1].idx;
    },
    [appointments]
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
  const initialMetricSnapshots = useMemo(
    () => metricsData.map((metric) => parseMetricValue(metric.values[0])),
    [metricsData]
  );
  const [displayedMetrics, setDisplayedMetrics] = useState(() =>
    initialMetricSnapshots.map((entry) => ({ ...entry }))
  );
  const baseMetricsRef = useRef(
    initialMetricSnapshots.map((entry) => ({ ...entry }))
  );
  const targetMetricsRef = useRef(
    initialMetricSnapshots.map((entry) => ({ ...entry }))
  );
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

    // Use recursive timeout with jitter so content appears organically
    let history = [];
    const historyLimit = Math.min(
      6,
      Math.max(3, Math.floor(appointments.length / 3))
    );
    const jitterRatio = 0.6; // ±30% window keeps cadence believable

    const scheduleNext = () => {
      const jitter = Math.round(
        (Math.random() - 0.5) * jitterRatio * SURGE_TIMING.interval
      );
      const delay = Math.max(1200, SURGE_TIMING.interval + jitter);
      const id = setTimeout(() => {
        setAnimationState("exit");
        registerTimeout(() => {
          const next = pickNextAppointment(history);
          setCurrentAppointment(next);

          const nextHistory = history.concat(next);
          if (nextHistory.length > historyLimit) {
            nextHistory.shift();
          }
          history = nextHistory;

          setCurrentTodayIndex((prev) => {
            const step = Math.random() > 0.55 ? 1 : 0;
            return (prev + step) % todayCounts.length;
          });
          setCurrentWaitIndex((prev) => {
            const step = Math.random() > 0.6 ? 1 : 0;
            return (prev + step) % waitTimes.length;
          });

          playEnterPhase();
          scheduleNext();
        }, SURGE_TIMING.exit);
      }, delay);

      timersRef.current.timeouts.push(id);
    };

    // initial pop
    registerTimeout(() => {
      const first = pickNextAppointment([]);
      setCurrentAppointment(first);
      history = [first];
      playEnterPhase();
      scheduleNext();
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
    pickNextAppointment,
  ]);

  // Actualizar métricas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics((prev) =>
        prev.map((val, idx) => (val + 1) % metricsData[idx].values.length)
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [metricsData]);

  // Smooth target metrics when the base dataset advances
  useEffect(() => {
    const updatedBase = metricsData.map((metric, idx) =>
      parseMetricValue(metric.values[currentMetrics[idx]])
    );
    baseMetricsRef.current = updatedBase.map((entry) => ({ ...entry }));
    targetMetricsRef.current = updatedBase.map((entry) => ({ ...entry }));
  }, [currentMetrics, metricsData]);

  // Introduce gentle jitter around the base to simulate real-time drift
  useEffect(() => {
    const updateTargets = () => {
      const nextTargets = targetMetricsRef.current.map((_, idx) => {
        const base = baseMetricsRef.current[idx];
        const amplitude = jitterAmplitudeFor(base.suffix, base.num);
        const offset = (Math.random() - 0.5) * amplitude;
        return { ...base, num: base.num + offset };
      });
      targetMetricsRef.current = nextTargets;
    };

    updateTargets();
    const intervalId = setInterval(updateTargets, 3500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Continuous animation loop approaching targets slowly
  useEffect(() => {
    let frameId;
    const animate = () => {
      setDisplayedMetrics((prev) =>
        prev.map((current, idx) => {
          const target = targetMetricsRef.current[idx] || current;
          const diff = target.num - current.num;
          if (Math.abs(diff) < 0.005) {
            if (
              Math.abs(target.num - current.num) < 0.0001 &&
              target.prefix === current.prefix &&
              target.suffix === current.suffix
            ) {
              return current;
            }
            return { ...target };
          }
          const nextNum = current.num + diff * 0.03; // smaller step for slower, elegant drift
          return { prefix: target.prefix, suffix: target.suffix, num: nextNum };
        })
      );
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

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
                {metrics.map(({ label }, idx) => (
                  <div className="hero-metric" key={label} role="listitem">
                    <strong className="hero-metric__value">
                      {formatMetricValue(
                        displayedMetrics[idx] ||
                          parseMetricValue(metricsData[idx].values[0])
                      )}
                    </strong>
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
