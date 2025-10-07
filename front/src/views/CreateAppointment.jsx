import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Breadcrumbs } from "../components/ui";
import { useToast } from "../hooks/useToast";
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
} from "../components/icons";
import McButton from "../components/ui/McButton";
import McInputField from "../components/ui/McInputField";
import "../styles/CreateAppointment.css";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const { user, createAppointment, isLoading } = useUser();
  const toast = useToast();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const highlights = [
    {
      icon: CalendarIcon,
      title: "Disponibilidad inteligente",
      description:
        "Selecciona días hábiles y horarios compatibles con tu agenda en segundos.",
    },
    {
      icon: ClockIcon,
      title: "Recordatorios automáticos",
      description:
        "Recibe alertas antes de cada consulta y sincroniza con tus calendarios.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Información protegida",
      description:
        "Tus detalles clínicos permanecen cifrados y solo accesibles para tu equipo médico.",
    },
  ];

  const currentUser = user?.user ?? user;
  const patientName = currentUser
    ? `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`.trim()
    : "";

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const getMinDate = () => new Date().toISOString().split("T")[0];

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  const isWeekday = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  const isValidTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    return timeInMinutes >= 8 * 60 && timeInMinutes <= 18 * 60;
  };

  const validateField = (name, value) => {
    let error = "";
    if (value === undefined || value === null) value = "";

    switch (name) {
      case "date":
        if (!value.trim()) error = "La fecha es obligatoria";
        else if (!isWeekday(value))
          error = "Solo se pueden agendar citas de lunes a viernes";
        else if (new Date(value) < new Date(getMinDate()))
          error = "No se pueden agendar citas en fechas pasadas";
        break;
      case "time":
        if (!value.trim()) error = "La hora es obligatoria";
        else if (!isValidTime(value))
          error = "Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM";
        break;
      case "notes":
        if (value && value.length > 500)
          error = "Las notas no pueden exceder 500 caracteres";
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const requiredFieldsFilled = formData.date && formData.time;
    const noErrors = Object.values(errors).every(
      (error) => !error || error === ""
    );
    return requiredFieldsFilled && noErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ["date", "time", "notes"].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    const success = await createAppointment(formData);

    if (success) {
      toast.success("¡Cita agendada exitosamente!");
      setFormData({ date: "", time: "", notes: "" });
      setErrors({});
      setTimeout(() => navigate("/mis-citas"), 1500);
    } else {
      toast.error("Error al agendar la cita. Intenta nuevamente.");
    }
  };

  if (!user) return null;

  const appointmentPreview = formData.date && formData.time;

  return (
    <div className="page-shell create-appointment-container">
      <div className="page-shell__content page-shell__content--padded">
        <Breadcrumbs className="breadcrumbs--inverted" />

        <div className="create-appointment-grid">
          {/* Columna izquierda: Información y beneficios */}
          <section className="create-appointment-info">
            <div className="info-header">
              <span className="info-badge">Medi Citas 2025</span>
              <h1 className="info-title">Agenda la atención que necesitas</h1>
              <p className="info-subtitle">
                {patientName ? `Hola, ${patientName}. ` : ""}Coordina tus
                consultas con profesionales verificados en menos de un minuto.
              </p>
            </div>

            <div className="info-highlights">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="highlight-card" key={item.title}>
                    <span className="highlight-icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <div className="highlight-content">
                      <h3 className="highlight-title">{item.title}</h3>
                      <p className="highlight-description">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {appointmentPreview && (
              <div className="appointment-preview">
                <div className="preview-header">
                  <CalendarIcon size={18} />
                  <h4>Vista previa de tu cita</h4>
                </div>
                <div className="preview-content">
                  <div className="preview-item">
                    <span className="preview-label">Fecha</span>
                    <span className="preview-value">
                      {new Date(formData.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-label">Hora</span>
                    <span className="preview-value">{formData.time}</span>
                  </div>
                  {formData.notes && (
                    <div className="preview-item">
                      <span className="preview-label">Notas</span>
                      <span className="preview-value preview-value--notes">
                        {formData.notes.substring(0, 80)}
                        {formData.notes.length > 80 ? "..." : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="info-footer">
              <p>¿Necesitas revisar tus turnos?</p>
              <Link to="/mis-citas" className="info-link">
                Ver mis citas →
              </Link>
            </div>
          </section>

          {/* Columna derecha: Formulario */}
          <section className="create-appointment-form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">Agendar nueva cita</h2>
                <p className="form-subtitle">
                  Selecciona fecha, hora y agrega notas opcionales
                </p>
              </div>

              <form onSubmit={handleSubmit} className="appointment-form">
                <McInputField
                  label="Fecha de la cita"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  error={errors.date}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                  helpText={
                    formData.date && !errors.date
                      ? "✓ Fecha válida seleccionada"
                      : "Disponible de lunes a viernes"
                  }
                  icon={<CalendarIcon size={20} />}
                />

                <McInputField
                  label="Hora de la cita"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  error={errors.time}
                  required
                  helpText={
                    formData.time && !errors.time
                      ? "✓ Horario válido seleccionado"
                      : "Horario de atención: 8:00 AM - 6:00 PM"
                  }
                  icon={<ClockIcon size={20} />}
                />

                <div className="form-field">
                  <label htmlFor="notes" className="form-field-label">
                    Notas adicionales{" "}
                    <span className="optional-badge">Opcional</span>
                  </label>
                  <div className="textarea-wrapper">
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Describe tus síntomas o motivo de la consulta para que el profesional pueda prepararse mejor..."
                      rows={5}
                      maxLength={500}
                      className={`form-textarea ${
                        errors.notes ? "has-error" : ""
                      }`}
                    />
                  </div>
                  <div className="field-meta">
                    <div className="field-helper">
                      {errors.notes ? (
                        <>
                          <AlertCircleIcon size={14} />
                          <span className="field-error">{errors.notes}</span>
                        </>
                      ) : (
                        <span className="field-hint">
                          Ayuda al profesional con información relevante
                        </span>
                      )}
                    </div>
                    <span
                      className={`char-counter ${
                        formData.notes.length > 450
                          ? "char-counter--warning"
                          : ""
                      } ${
                        formData.notes.length === 500 ? "char-counter--max" : ""
                      }`}
                    >
                      {formData.notes.length}/500
                    </span>
                  </div>
                </div>

                <div className="form-actions">
                  <McButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!isFormValid() || isLoading}
                    loading={isLoading}
                    icon={<CalendarIcon size={20} />}
                    fullWidth
                  >
                    {isLoading ? "Agendando cita..." : "Confirmar cita"}
                  </McButton>
                  <McButton
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/mis-citas")}
                    disabled={isLoading}
                    fullWidth
                  >
                    Cancelar
                  </McButton>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
