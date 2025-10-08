import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../components/ui";
import { useToast } from "../hooks/useToast";
import {
  ClipboardCheckIcon,
  HeartPulseIcon,
  ShieldCheckIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
} from "../components/icons";
import McButton from "../components/ui/McButton";
import McInputField from "../components/ui/McInputField";
import API_URL from "../config/api";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const highlights = [
    {
      icon: ClipboardCheckIcon,
      title: "Historial centralizado",
      description:
        "Registra tus datos personales y contactos clínicos para agilizar futuras atenciones.",
    },
    {
      icon: HeartPulseIcon,
      title: "Seguimiento inteligente",
      description:
        "Configura recordatorios proactivos, notas y alertas de adherencia en cada cita.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Privacidad garantizada",
      description:
        "Cumplimos con normativas de protección de datos y cifrado médico de grado profesional.",
    },
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  const validateDNI = (dni) => /^\d{7,8}$/.test(dni);
  const validatePhone = (phone) => /^\+?[\d\s\-()]{8,15}$/.test(phone);

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

  const validateField = (name, value, values = formData) => {
    let error = "";
    if (value === undefined || value === null) value = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = "Este campo es obligatorio";
        else if (value.trim().length < 2)
          error = "Debe tener al menos 2 caracteres";
        break;
      case "email":
        if (!value.trim()) error = "El email es obligatorio";
        else if (!validateEmail(value)) error = "Formato de email inválido";
        break;
      case "phone":
        if (!value.trim()) error = "El teléfono es obligatorio";
        else if (!validatePhone(value)) error = "Formato de teléfono inválido";
        break;
      case "dateOfBirth":
        if (!value) error = "La fecha de nacimiento es obligatoria";
        else if (!validateDateOfBirth(value))
          error = "Debe ser mayor de 18 años";
        break;
      case "nDni":
        if (!value.trim()) error = "El DNI es obligatorio";
        else if (!validateDNI(value)) error = "DNI debe tener 7-8 dígitos";
        break;
      case "username":
        if (!value.trim()) error = "El nombre de usuario es obligatorio";
        else if (value.trim().length < 3)
          error = "Debe tener al menos 3 caracteres";
        else if (!/^[a-zA-Z0-9_]+$/.test(value))
          error = "Solo letras, números y guión bajo";
        break;
      case "password":
        if (!value) error = "La contraseña es obligatoria";
        else if (!validatePassword(value))
          error = "Mín. 6 caracteres, 1 mayúscula, 1 minúscula y 1 número";
        break;
      case "confirmPassword":
        if (!value) error = "La confirmación es obligatoria";
        else if (value !== values.password)
          error = "Las contraseñas no coinciden";
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...formData, [name]: value };
    setFormData(nextValues);

    setErrors((prev) => {
      const updatedErrors = {
        ...prev,
        [name]: validateField(name, value, nextValues),
      };

      if (name === "password" || name === "confirmPassword") {
        updatedErrors.confirmPassword = validateField(
          "confirmPassword",
          nextValues.confirmPassword,
          nextValues
        );
      }

      return updatedErrors;
    });
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value && value.toString().trim() !== ""
    );
    const noErrors = Object.values(errors).every(
      (error) => !error || error === ""
    );
    return allFieldsFilled && noErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Registro exitoso! Redirigiendo al login...");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          nDni: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.error || "Error en el registro");
      }
    } catch {
      toast.error("Error de conexión. Verifica tu internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell auth-container-page">
      <div className="page-shell__content page-shell__content--padded">
        <Breadcrumbs className="breadcrumbs--inverted" />

        <div className="auth-grid-layout">
          {/* Columna izquierda: Información */}
          <section className="auth-info-section">
            <div className="auth-info-header">
              <span className="auth-info-badge">Medi Citas 2025</span>
              <h1 className="auth-info-title">
                Crea tu perfil clínico digital
              </h1>
              <p className="auth-info-subtitle">
                Centraliza tus datos, agiliza la admisión y accede a un tablero
                de salud personalizado desde el primer día.
              </p>
            </div>

            <div className="auth-info-highlights">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="auth-highlight-item" key={item.title}>
                    <span
                      className="auth-highlight-icon-wrapper"
                      aria-hidden="true"
                    >
                      <Icon size={22} />
                    </span>
                    <div className="auth-highlight-content">
                      <h3 className="auth-highlight-heading">{item.title}</h3>
                      <p className="auth-highlight-text">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="auth-info-footer">
              <p>¿Ya tienes una cuenta?</p>
              <Link to="/login" className="auth-info-link">
                Inicia sesión →
              </Link>
            </div>
          </section>

          {/* Columna derecha: Formulario */}
          <section className="auth-form-section">
            <div className="auth-form-card auth-form-card--wide">
              <div className="auth-form-header">
                <h2 className="auth-form-title">Crear cuenta</h2>
                <p className="auth-form-subtitle">
                  Completa tus datos para registrarte
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form-content">
                <div className="auth-form-grid">
                  <McInputField
                    label="Nombre"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    placeholder="Juan"
                    required
                    icon={<UserIcon size={20} />}
                  />
                  <McInputField
                    label="Apellido"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    placeholder="Pérez"
                    required
                    icon={<UserIcon size={20} />}
                  />
                </div>

                <McInputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="tu@email.com"
                  required
                  icon={<MailIcon size={20} />}
                />

                <div className="auth-form-grid">
                  <McInputField
                    label="Teléfono"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+54 11 1234-5678"
                    required
                    icon={<PhoneIcon size={20} />}
                  />
                  <McInputField
                    label="DNI"
                    name="nDni"
                    type="text"
                    value={formData.nDni}
                    onChange={handleInputChange}
                    error={errors.nDni}
                    placeholder="12345678"
                    required
                    icon={<ClipboardCheckIcon size={20} />}
                  />
                </div>

                <McInputField
                  label="Fecha de Nacimiento"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={errors.dateOfBirth}
                  required
                  icon={<CalendarIcon size={20} />}
                />

                <McInputField
                  label="Nombre de Usuario"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  placeholder="usuario123"
                  required
                  icon={<UserIcon size={20} />}
                />

                <McInputField
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="••••••••"
                  required
                  icon={<ShieldCheckIcon size={20} />}
                />

                <McInputField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  placeholder="Repite tu contraseña"
                  required
                  icon={<ShieldCheckIcon size={20} />}
                />

                <div className="auth-form-actions">
                  <McButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!isFormValid() || isLoading}
                    loading={isLoading}
                    icon={<ClipboardCheckIcon size={20} />}
                    fullWidth
                  >
                    {isLoading ? "Registrando..." : "Crear cuenta"}
                  </McButton>
                </div>
              </form>

              <div className="auth-form-footer">
                <p>
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="auth-form-link">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;
