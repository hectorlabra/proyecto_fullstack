import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

/**
 * Hook para usar el sistema de toasts
 * Debe estar dentro de un ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    if (import.meta?.env?.DEV) {
      console.warn("useToast: no ToastProvider found. Using no-op fallback.");
    }

    const noop = () => undefined;

    return {
      addToast: noop,
      removeToast: noop,
      success: noop,
      error: noop,
      warning: noop,
      info: noop,
    };
  }
  return context;
}
