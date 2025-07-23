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
import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta de MediCitas</p>

        <form>
          {/* Formulario será implementado en el siguiente hito */}
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled>
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
