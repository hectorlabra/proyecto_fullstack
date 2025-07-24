/**
 * CreateAppointment Component
 *
 * Formulario para crear una nueva cita médica.
 * Incluye validaciones de fecha, hora y notas.
 * Requiere que el usuario esté autenticado.
 *
 * @component
 * @returns {JSX.Element} Formulario de creación de citas
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateAppointment.css";

const CreateAppointment = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  // Estado de errores de validación
  const [errors, setErrors] = useState({});

  // Estado para el manejo del proceso de envío
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Función para generar fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Función para generar fecha máxima (3 meses después)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  // Función para validar día de la semana (lunes a viernes)
  const isWeekday = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day >= 1 && day <= 5; // 1 = lunes, 5 = viernes
  };

  // Función para validar horario de atención (8:00 AM - 6:00 PM)
  const isValidTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const startTime = 8 * 60; // 8:00 AM
    const endTime = 18 * 60; // 6:00 PM
    return timeInMinutes >= startTime && timeInMinutes <= endTime;
  };

  // Función para validar un campo específico
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
        // Las notas son opcionales, solo validar longitud si hay contenido
        if (value && value.length > 500) {
          error = "Las notas no pueden exceder 500 caracteres";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handler para cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado del formulario
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar el campo y actualizar errores
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    // Verificar que los campos obligatorios estén llenos
    const requiredFieldsFilled =
      formData.date.trim() !== "" && formData.time.trim() !== "";

    // Verificar que no haya errores en campos obligatorios
    const noErrors = !errors.date && !errors.time && !errors.notes;

    return requiredFieldsFilled && noErrors;
  };

  // Función para crear cita en la API
  const createAppointmentAPI = async (appointmentData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/appointments/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la cita");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Handler para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setSubmitMessage({ type: "", text: "" });

    // Validar todos los campos antes del envío
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // Si hay errores, no proceder
    if (Object.keys(newErrors).length > 0) {
      setSubmitMessage({
        type: "error",
        text: "Por favor, corrige los errores en el formulario",
      });
      return;
    }

    // Obtener información del usuario
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      navigate("/login");
      return;
    }

    // Preparar datos para enviar
    const appointmentData = {
      userId: user.user.id,
      date: formData.date,
      time: formData.time,
      notes: formData.notes.trim() || undefined,
    };

    // Iniciar proceso de carga
    setIsLoading(true);

    try {
      // Hacer la petición a la API
      const result = await createAppointmentAPI(appointmentData);

      if (result.success) {
        // Cita creada exitosamente
        setSubmitMessage({
          type: "success",
          text: "¡Cita agendada exitosamente! Redirigiendo a tus turnos...",
        });

        // Limpiar el formulario
        setFormData({
          date: "",
          time: "",
          notes: "",
        });
        setErrors({});

        // Redirigir después de un breve delay
        setTimeout(() => {
          navigate("/mis-turnos");
        }, 2000);
      } else {
        // Error al crear la cita
        setSubmitMessage({
          type: "error",
          text: result.error || "Error al agendar la cita. Intenta nuevamente.",
        });
      }
    } catch (error) {
      // Error inesperado
      setSubmitMessage({
        type: "error",
        text:
          error.message ||
          "Error de conexión. Verifica tu conexión a internet.",
      });
    } finally {
      // Finalizar proceso de carga
      setIsLoading(false);
    }
  };

  return (
    <div className="create-appointment-container">
      <div className="create-appointment-form">
        <h2>Agendar Nueva Cita</h2>
        <p>Programa tu cita médica</p>

        {/* Mensajes de feedback */}
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
              step="900" // Intervalos de 15 minutos
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
