import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { login, clearError } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const validateField = (name, value) => {
    let error = "";

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
    if (!formData || !errors) {
      return false;
    }

    const allFieldsFilled = Object.values(formData).every(
      (value) => value && value.trim() !== ""
    );

    const noErrors = Object.values(errors).every(
      (error) => !error || error === ""
    );

    return allFieldsFilled && noErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitMessage({ type: "", text: "" });
    clearError();

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

    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "¡Inicio de sesión exitoso! Redirigiendo...",
        });

        setFormData({
          username: "",
          password: "",
        });
        setErrors({});

        setTimeout(() => {
          navigate("/mis-turnos");
        }, 1500);
      } else {
        setSubmitMessage({
          type: "error",
          text:
            result.error ||
            "Credenciales incorrectas. Verifica tu usuario y contraseña.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.message ||
          "Error de conexión. Verifica tu conexión a internet.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar Sesión</h1>
        <p>Accede a tu cuenta de MediCitas</p>

        {submitMessage.text && (
          <div
            className={`${
              submitMessage.type === "success"
                ? "success-message"
                : "error-message-general"
            }`}
            role="alert"
            aria-live="polite"
          >
            {submitMessage.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-label="Formulario de inicio de sesión"
        >
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
              aria-required="true"
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "username-error" : undefined}
              required
            />
            {errors.username && (
              <span className="error-message" id="username-error" role="alert">
                {errors.username}
              </span>
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
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              required
            />
            {errors.password && (
              <span className="error-message" id="password-error" role="alert">
                {errors.password}
              </span>
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
