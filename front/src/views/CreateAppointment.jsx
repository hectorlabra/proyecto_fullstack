import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/CreateAppointment.css";

const CreateAppointment = () => {
  const navigate = useNavigate();
  const { user, createAppointment, isLoading } = useUser();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

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
    const startTime = 8 * 60;
    const endTime = 18 * 60;
    return timeInMinutes >= startTime && timeInMinutes <= endTime;
  };

  const validateField = (name, value) => {
    let error = "";

    if (value === undefined || value === null) {
      value = "";
    }

    switch (name) {
      case "date":
        if (!value.trim()) {
          error = "La fecha es obligatoria";
        } else if (!isWeekday(value)) {
          error = "Solo se pueden agendar citas de lunes a viernes";
        } else if (new Date(value) < new Date(getMinDate())) {
          error = "No se pueden agendar citas en fechas pasadas";
        }
        break;

      case "time":
        if (!value.trim()) {
          error = "La hora es obligatoria";
        } else if (!isValidTime(value)) {
          error = "Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM";
        }
        break;

      case "notes":
        if (value && value.length > 500) {
          error = "Las notas no pueden exceder 500 caracteres";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    const requiredFieldsFilled =
      formData.date.trim() !== "" && formData.time.trim() !== "";

    const noErrors = !errors.date && !errors.time && !errors.notes;

    return requiredFieldsFilled && noErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitMessage({ type: "", text: "" });

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitMessage({
        type: "error",
        text: "Por favor, corrige los errores en el formulario",
      });
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const appointmentData = {
      userId: parseInt(user.user?.id || user.id, 10),
      date: formData.date,
      time: formData.time,
      notes: formData.notes.trim() || undefined,
    };
    try {
      const result = await createAppointment(appointmentData);

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "¡Cita agendada exitosamente! Redirigiendo a tus turnos...",
        });

        setFormData({
          date: "",
          time: "",
          notes: "",
        });
        setErrors({});

        setTimeout(() => {
          navigate("/mis-turnos");
        }, 2000);
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "Error al agendar la cita. Intenta nuevamente.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.message ||
          "Error de conexión. Verifica tu conexión a internet.",
      });
    }
  };

  return (
    <div className="create-appointment-container">
      <div className="create-appointment-form">
        <h2>Agendar Nueva Cita</h2>
        <p>Programa tu cita médica</p>

        {submitMessage.text && (
          <div
            className={`${
              submitMessage.type === "success"
                ? "success-message"
                : "error-message-general"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Fecha de la Cita *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={getMinDate()}
              max={getMaxDate()}
              className={errors.date ? "error" : ""}
              required
            />
            {errors.date && (
              <span className="error-message">{errors.date}</span>
            )}
            <small className="field-hint">
              Solo se pueden agendar citas de lunes a viernes
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="time">Hora de la Cita *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              min="08:00"
              max="18:00"
              step="900"
              className={errors.time ? "error" : ""}
              required
            />
            {errors.time && (
              <span className="error-message">{errors.time}</span>
            )}
            <small className="field-hint">
              Horario de atención: 8:00 AM - 6:00 PM
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notas (Opcional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Describe brevemente el motivo de tu consulta o información adicional..."
              className={errors.notes ? "error" : ""}
              rows="4"
              maxLength="500"
            />
            {errors.notes && (
              <span className="error-message">{errors.notes}</span>
            )}
            <small className="field-hint">
              {(formData.notes || "").length}/500 caracteres
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/mis-turnos")}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`submit-btn ${isLoading ? "loading" : ""}`}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Agendando...
                </>
              ) : (
                "Agendar Cita"
              )}
            </button>
          </div>
        </form>

        <div className="form-info">
          <h4>Información importante:</h4>
          <ul>
            <li>Las citas solo pueden agendarse de lunes a viernes</li>
            <li>Horario de atención: 8:00 AM a 6:00 PM</li>
            <li>Las citas pueden cancelarse hasta el día anterior</li>
            <li>Recibirás una confirmación por email</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
