import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Input, Button, Breadcrumbs } from "../components/ui";
import { useToast } from "../hooks/useToast";
import { ShieldCheckIcon, ClockIcon, CalendarIcon } from "../components/icons";
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
    <div className="page-shell page-shell--auth">
      <div className="page-shell__content page-shell__content--padded">
        <Breadcrumbs className="breadcrumbs--inverted" />
        <div className="auth-container">
          <section className="auth-hero">
            <span className="auth-hero__badge">Medi Citas 2025</span>
            <h1 className="auth-hero__title">Tu acceso a la salud digital</h1>
            <p className="auth-hero__subtitle">
              Gestiona tus citas, recordatorios y seguimientos clínicos desde un
              único lugar seguro.
            </p>

            <ul className="auth-hero__highlights">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <li className="auth-highlight-card" key={item.title}>
                    <span className="auth-highlight-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="auth-highlight-title">{item.title}</h3>
                      <p className="auth-highlight-description">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="auth-hero__cta">
              ¿Aún no tienes cuenta?
              <Link to="/register">Crear cuenta gratuita</Link>
            </div>
          </section>

          <div className="auth-panel">
            <div className="auth-card">
              <div className="auth-header">
                <h2 className="auth-title">Iniciar sesión</h2>
                <p className="auth-subtitle">Accede a tu cuenta de MediCitas</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <Input
                  label="Nombre de Usuario"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  placeholder="Ingresa tu usuario"
                  required
                />

                <Input
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  placeholder="Ingresa tu contraseña"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!isFormValid() || isLoading}
                  fullWidth
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>

              <div className="auth-footer">
                <p>
                  ¿No tienes cuenta? {""}
                  <Link to="/register" className="auth-link">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
