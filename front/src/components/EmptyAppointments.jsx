/**
 * EmptyAppointments Component
 *
 * Componente que se muestra cuando el usuario no tiene turnos programados.
 * Incluye una llamada a la acción para agendar la primera cita.
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {Function} props.onScheduleClick - Función que se ejecuta al hacer click en "Agendar Cita"
 * @returns {JSX.Element} Componente de estado vacío
 */
import React from "react";
import "../styles/EmptyAppointments.css";

const EmptyAppointments = ({ onScheduleClick }) => {
  return (
    <div className="empty-appointments-container">
      <div className="empty-appointments-content">
        <div className="empty-appointments-icon">
          <span className="calendar-icon">📅</span>
          <span className="plus-icon">➕</span>
        </div>

        <h3 className="empty-appointments-title">
          No tienes turnos programados
        </h3>

        <p className="empty-appointments-description">
          Aún no has agendado ninguna cita médica. Programa tu primera consulta
          para comenzar a cuidar tu salud.
        </p>

        <div className="empty-appointments-features">
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <span className="feature-text">Horarios flexibles</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👨‍⚕️</span>
            <span className="feature-text">Profesionales calificados</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Ubicación conveniente</span>
          </div>
        </div>

        <button
          className="schedule-first-appointment-btn"
          onClick={onScheduleClick}
        >
          <span className="btn-icon">📅</span>
          Agendar Primera Cita
        </button>

        <div className="empty-appointments-help">
          <p className="help-text">
            <strong>¿Necesitas ayuda?</strong> Nuestro equipo está disponible
            para asistirte en el proceso de agendamiento.
          </p>
          <div className="help-contacts">
            <span className="help-contact">📞 (555) 123-4567</span>
            <span className="help-contact">✉️ ayuda@medicitas.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyAppointments;
