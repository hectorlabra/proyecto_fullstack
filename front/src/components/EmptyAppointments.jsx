import { Card, CardContent, CardFooter } from "./ui";
import McButton from "./ui/McButton";
import {
  CalendarIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  PhoneIcon,
  MessageCircleIcon,
} from "./icons";
import "../styles/EmptyAppointments.css";

const EmptyAppointments = ({ onScheduleClick }) => {
  const assistanceItems = [
    {
      icon: PhoneIcon,
      label: "Línea directa",
      value: "(11) 5555-0020",
    },
    {
      icon: MessageCircleIcon,
      label: "Soporte",
      value: "ayuda@medicitas.com",
    },
  ];

  const featureItems = [
    {
      icon: ShieldCheckIcon,
      title: "Profesionales verificados",
      description:
        "Más de 800 especialistas certificados en múltiples especialidades.",
    },
    {
      icon: ClockIcon,
      title: "Horarios flexibles",
      description:
        "Agenda turnos en la franja de 8:00 a 18:00 según tu disponibilidad.",
    },
    {
      icon: CalendarIcon,
      title: "Confirmación inmediata",
      description:
        "Recibe recordatorios automáticos y seguimiento en tiempo real.",
    },
  ];

  return (
    <div className="empty-appointments-wrapper">
      <Card className="empty-appointments-card">
        <CardContent>
          <div className="empty-appointments-hero">
            <span className="empty-appointments-badge">
              Bienvenido a MediCitas
            </span>
            <h2 className="empty-appointments-title">
              Agenda tu primera cita médica
            </h2>
            <p className="empty-appointments-description">
              Todavía no tienes citas programadas. Reserva tu primer turno y
              recibe recordatorios, seguimiento y asistencia personalizada en un
              único lugar.
            </p>
            <McButton
              variant="primary"
              size="lg"
              icon={<PlusCircleIcon size={20} />}
              onClick={onScheduleClick}
            >
              Agendar primera cita
            </McButton>
          </div>

          <div className="empty-appointments-grid">
            {featureItems.map(({ icon, title, description }) => {
              const IconComponent = icon;
              return (
                <div className="empty-feature-card" key={title}>
                  <span className="empty-feature-icon" aria-hidden="true">
                    <IconComponent size={20} />
                  </span>
                  <div>
                    <h3 className="empty-feature-title">{title}</h3>
                    <p className="empty-feature-description">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="empty-appointments-footer">
          <div className="empty-assistance">
            <p className="empty-assistance-title">¿Necesitas ayuda?</p>
            <p className="empty-assistance-subtitle">
              Nuestro equipo de soporte puede guiarte en cada paso del proceso
              de agendamiento.
            </p>
            <div className="empty-assistance-list">
              {assistanceItems.map(({ icon, label, value }) => {
                const IconComponent = icon;
                return (
                  <div className="empty-assistance-item" key={label}>
                    <span className="empty-assistance-icon" aria-hidden="true">
                      <IconComponent size={18} />
                    </span>
                    <div>
                      <p className="empty-assistance-label">{label}</p>
                      <p className="empty-assistance-value">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmptyAppointments;
