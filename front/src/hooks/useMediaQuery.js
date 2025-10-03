import { useState, useEffect } from "react";

/**
 * useMediaQuery - Hook para detectar breakpoints
 * @param {string} query - Media query CSS (ej: '(min-width: 768px)')
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Legacy support
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * useBreakpoint - Hook para detectar breakpoints específicos de Medi Citas
 */
export function useBreakpoint() {
  const isSm = useMediaQuery("(min-width: 480px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");

  return {
    isMobile: !isSm,
    isSm,
    isMd,
    isLg,
    isXl,
    isTablet: isSm && !isLg,
    isDesktop: isLg,
  };
}
