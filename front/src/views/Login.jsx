import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Breadcrumbs } from "../components/ui";
import { useToast } from "../hooks/useToast";
import {
  ShieldCheckIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
} from "../components/icons";
import McButton from "../components/ui/McButton";
import McInputField from "../components/ui/McInputField";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const highlights = [
    {
      icon: ShieldCheckIcon,
      title: "Autenticación segura",
      description:
        "Verificación reforzada, sesiones protegidas y cifrado de extremo a extremo para tu tranquilidad.",
    },
    {
      icon: ClockIcon,
      title: "Ingreso en segundos",
      description:
        "Recordamos tus preferencias y dispositivos de confianza para que todo sea ágil.",
    },
    {
      icon: CalendarIcon,
      title: "Agenda sincronizada",
      description:
        "Al iniciar sesión verás tus próximas citas y recordatorios integrados en un mismo panel.",
    },
  ];

  const validateField = (name, value) => {
    let error = "";
    if (value === undefined || value === null) value = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "El nombre de usuario es obligatorio";
        else if (value.trim().length < 3)
          error = "Debe tener al menos 3 caracteres";
        break;
      case "password":
        if (!value) error = "La contraseña es obligatoria";
        else if (value.length < 6) error = "Debe tener al menos 6 caracteres";
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
      const result = await login(formData);

      if (result.success) {
        toast.success("¡Inicio de sesión exitoso!");
        setFormData({ username: "", password: "" });
        setErrors({});
        setTimeout(() => navigate("/mis-citas"), 1000);
      } else {
        toast.error(result.error || "Credenciales incorrectas");
      }
    } catch (error) {
      toast.error(error.message || "Error de conexión");
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
              <h1 className="auth-info-title">Tu acceso a la salud digital</h1>
              <p className="auth-info-subtitle">
                Gestiona tus citas, recordatorios y seguimientos clínicos desde
                un único lugar seguro.
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
              <p>¿Aún no tienes cuenta?</p>
              <Link to="/register" className="auth-info-link">
                Crear cuenta gratuita →
              </Link>
            </div>
          </section>

          {/* Columna derecha: Formulario */}
          <section className="auth-form-section">
            <div className="auth-form-card">
              <div className="auth-form-header">
                <h2 className="auth-form-title">Iniciar sesión</h2>
                <p className="auth-form-subtitle">
                  Accede a tu cuenta de MediCitas
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form-content">
                <McInputField
                  label="Nombre de Usuario"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  placeholder="Ingresa tu usuario"
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
                  placeholder="Ingresa tu contraseña"
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
                    icon={<UserIcon size={20} />}
                    fullWidth
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </McButton>
                </div>
              </form>

              <div className="auth-form-footer">
                <p>
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="auth-form-link">
                    Regístrate aquí
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

export default Login;
