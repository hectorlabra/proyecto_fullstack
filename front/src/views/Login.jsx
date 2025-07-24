/**
 * Login component for user authentication.
 * Provides a form interface for users to log into their accounts.
 *
 * @component
 * @returns {JSX.Element} The rendered login form.
 *
 * @example
 * // Renders the login form with username and password fields
 * <Login />
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login, clearError } = useUser();

  // Estado del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Estado de errores de validación
  const [errors, setErrors] = useState({});

  // Estado para el manejo del proceso de envío (mantenemos para compatibilidad con UI)
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Función para validar un campo específico
  const validateField = (name, value) => {
    let error = "";

    // Verificar que value esté definido
    if (value === undefined || value === null) {
      value = "";
    }

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "El nombre de usuario es obligatorio";
        } else if (value.trim().length < 3) {
          error = "Debe tener al menos 3 caracteres";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (value.length < 6) {
          error = "Debe tener al menos 6 caracteres";
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
    // Verificar que formData y errors estén definidos
    if (!formData || !errors) {
      return false;
    }

    // Verificar que todos los campos estén llenos
    const allFieldsFilled = Object.values(formData).every(
      (value) => value && value.trim() !== ""
    );

    // Verificar que no haya errores
    const noErrors = Object.values(errors).every(
      (error) => !error || error === ""
    );

    return allFieldsFilled && noErrors;
  };

  // Handler para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes previos
    setSubmitMessage({ type: "", text: "" });
    clearError();

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

    // Iniciar proceso de carga
    setIsLoading(true);

    try {
      // Usar la función de login del contexto
      const result = await login(formData);

      if (result.success) {
        // Login exitoso
        setSubmitMessage({
          type: "success",
          text: "¡Inicio de sesión exitoso! Redirigiendo...",
        });

        // Limpiar el formulario
        setFormData({
          username: "",
          password: "",
        });
        setErrors({});

        // Redirigir después de un breve delay
        setTimeout(() => {
          navigate("/mis-turnos");
        }, 1500);
      } else {
        // Error en el login
        setSubmitMessage({
          type: "error",
          text:
            result.error ||
            "Credenciales incorrectas. Verifica tu usuario y contraseña.",
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
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta de MediCitas</p>

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
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre de usuario"
              className={errors.username ? "error" : ""}
              required
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingresa tu contraseña"
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={`login-btn ${isLoading ? "loading" : ""}`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="form-link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
