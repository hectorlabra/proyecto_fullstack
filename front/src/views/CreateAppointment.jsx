import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Input, Button, Breadcrumbs } from "../components/ui";
import { useToast } from "../components/ui/toast-context";
import "../styles/Auth.css";

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

  return (
    <div className="auth-container">
      <Breadcrumbs />
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Agendar nueva cita</h1>
          <p className="auth-subtitle">Selecciona fecha, hora y agrega notas</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Fecha"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            error={errors.date}
            min={getMinDate()}
            max={getMaxDate()}
            required
            helpText="Disponible de lunes a viernes"
          />

          <Input
            label="Hora"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleInputChange}
            error={errors.time}
            required
            helpText="Horario de atención: 8:00 AM - 6:00 PM"
          />

          <div className="auth-field">
            <label htmlFor="notes" className="auth-field-label">
              Notas (Opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Describe tus síntomas o motivo de la consulta..."
              rows={4}
              maxLength={500}
              className={`auth-textarea ${errors.notes ? "has-error" : ""}`}
            />
            <div className="auth-field-meta">
              {errors.notes ? (
                <span className="auth-field-error">{errors.notes}</span>
              ) : (
                <span className="auth-field-helper">
                  Puedes agregar detalles para el profesional.
                </span>
              )}
              <span className="auth-field-counter">
                {formData.notes.length}/500 caracteres
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!isFormValid() || isLoading}
            fullWidth
          >
            {isLoading ? "Agendando..." : "Confirmar cita"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
