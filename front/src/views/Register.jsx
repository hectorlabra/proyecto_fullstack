import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Breadcrumbs } from "../components/ui";
import { useToast } from "../components/ui/toast-context";
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
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateField = (name, value) => {
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
    <div className="auth-container">
      <Breadcrumbs />
      <div className="auth-card auth-card--wide">
        <div className="auth-header">
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Completa tus datos para registrarte</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-grid auth-grid--two">
            <Input
              label="Nombre"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              placeholder="Juan"
              required
            />
            <Input
              label="Apellido"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              placeholder="Pérez"
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="tu@email.com"
            required
          />

          <div className="auth-grid auth-grid--two">
            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              placeholder="+54 11 1234-5678"
              required
            />
            <Input
              label="DNI"
              name="nDni"
              type="text"
              value={formData.nDni}
              onChange={handleInputChange}
              error={errors.nDni}
              placeholder="12345678"
              required
            />
          </div>

          <Input
            label="Fecha de Nacimiento"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            error={errors.dateOfBirth}
            required
          />

          <Input
            label="Nombre de Usuario"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            error={errors.username}
            placeholder="usuario123"
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!isFormValid() || isLoading}
            fullWidth
          >
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="auth-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
