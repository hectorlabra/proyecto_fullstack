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
import React from "react";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro de Usuario</h2>
        <p>Crea tu cuenta para acceder a MediCitas</p>

        <form>
          {/* Formulario será implementado en el siguiente hito */}
          <div className="form-group">
            <label htmlFor="firstName">Nombres</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Ingresa tus nombres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingresa tus apellidos"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Número de teléfono"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" required />
          </div>

          <div className="form-group">
            <label htmlFor="nDni">DNI</label>
            <input
              type="text"
              id="nDni"
              name="nDni"
              placeholder="Número de DNI"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario único"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña segura"
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled>
            Registrarse
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
