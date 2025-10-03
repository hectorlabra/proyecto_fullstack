import { useEffect } from "react";
import PropTypes from "prop-types";
import "./McToast.css";

/**
 * McToast - Notificación temporal
 * Usado principalmente a través del hook useToast
 */
export default function McToast({ message, variant = "info", onClose }) {
  useEffect(() => {
    // Auto-close animation trigger
    const timer = setTimeout(() => {
      document
        .querySelector(`[data-toast="${message}"]`)
        ?.classList.add("mc-toast--exit");
    }, 4700);

    return () => clearTimeout(timer);
  }, [message]);

  const icons = {
    success: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    danger: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    warning: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div
      className={`mc-toast mc-toast--${variant}`}
      data-toast={message}
      role="status"
      aria-live="polite"
    >
      <span className="mc-toast__icon" aria-hidden="true">
        {icons[variant]}
      </span>
      <span className="mc-toast__message">{message}</span>
      <button
        type="button"
        className="mc-toast__close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

McToast.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "danger", "warning", "info"]),
  onClose: PropTypes.func.isRequired,
};
