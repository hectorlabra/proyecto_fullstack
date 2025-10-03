import { createContext, useContext, useState, useCallback } from "react";
import "../../styles/ui/toast.css";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

/**
 * ToastProvider - Context provider for toast notifications
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      variant: "info",
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, title = "Éxito") => {
      return addToast({ variant: "success", title, message });
    },
    [addToast]
  );

  const error = useCallback(
    (message, title = "Error") => {
      return addToast({ variant: "error", title, message });
    },
    [addToast]
  );

  const warning = useCallback(
    (message, title = "Atención") => {
      return addToast({ variant: "warning", title, message });
    },
    [addToast]
  );

  const info = useCallback(
    (message, title = "Información") => {
      return addToast({ variant: "info", title, message });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * ToastContainer - Renders all active toasts
 */
function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  );
}

/**
 * Toast - Individual toast notification
 */
function Toast({ toast, onClose }) {
  const { variant, title, message } = toast;

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className={`toast toast-${variant}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon" aria-hidden="true">
        {icons[variant]}
      </div>
      <div className="toast-content">
        {title && <p className="toast-title">{title}</p>}
        {message && <p className="toast-message">{message}</p>}
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastProvider;
