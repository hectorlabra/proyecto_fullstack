/**
 * Register component for user registration.
 * Provides a form interface for users to create new accounts.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form.
 *
 * @example
 * // Renders the registration form with all required fields
 * <Register />
 */
import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
  // Estado del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nDni: "",
    username: "",
    password: "",
  });

  // Estado de errores de validación
  const [errors, setErrors] = useState({});

  // Estado para el manejo del proceso de envío
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para validar contraseña
  const validatePassword = (password) => {
    // Al menos 6 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  // Función para validar DNI (solo números, 7-8 dígitos)
  const validateDNI = (dni) => {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(dni);
  };

  // Función para validar teléfono
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s\-()]{8,15}$/;
    return phoneRegex.test(phone);
  };

  // Función para validar fecha de nacimiento (mayor de 18 años)
  const validateDateOfBirth = (date) => {
    if (!date) return false;
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  // Función para validar un campo específico
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = "Este campo es obligatorio";
        } else if (value.trim().length < 2) {
          error = "Debe tener al menos 2 caracteres";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "El email es obligatorio";
        } else if (!validateEmail(value)) {
          error = "Formato de email inválido";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!validatePhone(value)) {
          error = "Formato de teléfono inválido";
        }
        break;

      case "dateOfBirth":
        if (!value) {
          error = "La fecha de nacimiento es obligatoria";
        } else if (!validateDateOfBirth(value)) {
          error = "Debe ser mayor de 18 años";
        }
        break;

      case "nDni":
        if (!value.trim()) {
          error = "El DNI es obligatorio";
        } else if (!validateDNI(value)) {
          error = "DNI debe tener 7-8 dígitos";
        }
        break;

      case "username":
        if (!value.trim()) {
          error = "El nombre de usuario es obligatorio";
        } else if (value.trim().length < 3) {
          error = "Debe tener al menos 3 caracteres";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Solo letras, números y guión bajo";
        }
        break;

      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (!validatePassword(value)) {
          error = "Mín. 6 caracteres, 1 mayúscula, 1 minúscula y 1 número";
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

  // Función para registrar usuario en la API
  const registerUserAPI = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
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

    // Iniciar proceso de carga
    setIsLoading(true);

    try {
      // Hacer la petición a la API
      const result = await registerUserAPI(formData);

      if (result.success) {
        // Registro exitoso
        setSubmitMessage({
          type: "success",
          text: "¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.",
        });

        // Limpiar el formulario
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          nDni: "",
          username: "",
          password: "",
        });
        setErrors({});
      } else {
        // Error en el registro
        setSubmitMessage({
          type: "error",
          text:
            result.error || "Error al registrar usuario. Inténtalo de nuevo.",
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
    <div className="register-container">
      <div className="register-form">
        <h2>Registro de Usuario</h2>
        <p>Crea tu cuenta para acceder a MediCitas</p>

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
            <label htmlFor="firstName">Nombres</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Ingresa tus nombres"
              className={errors.firstName ? "error" : ""}
              required
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Ingresa tus apellidos"
              className={errors.lastName ? "error" : ""}
              required
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="correo@ejemplo.com"
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Número de teléfono"
              className={errors.phone ? "error" : ""}
              required
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={errors.dateOfBirth ? "error" : ""}
              required
            />
            {errors.dateOfBirth && (
              <span className="error-message">{errors.dateOfBirth}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nDni">DNI</label>
            <input
              type="text"
              id="nDni"
              name="nDni"
              value={formData.nDni}
              onChange={handleInputChange}
              placeholder="Número de DNI"
              className={errors.nDni ? "error" : ""}
              required
            />
            {errors.nDni && (
              <span className="error-message">{errors.nDni}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nombre de usuario único"
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
              placeholder="Contraseña segura"
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={`register-btn ${isLoading ? "loading" : ""}`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
