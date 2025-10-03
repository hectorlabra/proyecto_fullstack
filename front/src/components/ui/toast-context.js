import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

/**
 * Hook to access toast functionality
 * Must be used within ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
