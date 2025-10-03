import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

/**
 * Hook para usar el sistema de toasts
 * Debe estar dentro de un ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
