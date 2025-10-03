import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Input, Button, Breadcrumbs } from "../components/ui";
import { useToast } from "../components/ui/toast-context";
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

  const validateField = (name, value) => {
    let error = "";
    if (value === undefined || value === null) value = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "El nombre de usuario es obligatorio";
        else if (value.trim().length < 3) error = "Debe tener al menos 3 caracteres";
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
    const allFieldsFilled = Object.values(formData).every((value) => value && value.trim() !== "");
    const noErrors = Object.values(errors).every((error) => !error || error === "");
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
        setTimeout(() => navigate("/mis-turnos"), 1000);
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
    <div className="auth-container">
      <Breadcrumbs />
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Iniciar sesión</h1>
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
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="auth-link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
