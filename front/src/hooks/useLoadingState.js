import { useState, useCallback } from "react";

/**
 * useLoadingState - Hook para manejar estados de carga
 * @param {boolean} initialState - Estado inicial
 * @returns {object} { isLoading, startLoading, stopLoading, withLoading }
 */
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Wrapper para funciones async que maneja loading automáticamente
   * @param {Function} asyncFn - Función asíncrona
   * @returns {Promise}
   */
  const withLoading = useCallback(
    async (asyncFn) => {
      try {
        startLoading();
        const result = await asyncFn();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
