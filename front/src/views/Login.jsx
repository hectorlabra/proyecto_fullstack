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
import "../styles/Login.css";

function Login() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Estado de errores de validación
  const [errors, setErrors] = useState({});

  // Función para validar un campo específico
  const validateField = (name, value) => {
    let error = "";

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
    // Verificar que todos los campos estén llenos
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    // Verificar que no haya errores
    const noErrors = Object.values(errors).every((error) => error === "");

    return allFieldsFilled && noErrors;
  };

  // Handler para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes del envío
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // Si no hay errores, proceder con el envío
    if (Object.keys(newErrors).length === 0) {
      console.log("Datos del formulario:", formData);
      // Aquí se implementará la petición a la API en el próximo hito
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta de MediCitas</p>

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

          <button type="submit" className="login-btn" disabled={!isFormValid()}>
            Iniciar Sesión
          </button>
        </form>

        <div className="form-footer">
          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
