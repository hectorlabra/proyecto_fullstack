/**
 * Custom hook para usar el contexto de usuario
 *
 * Este hook debe ser usado dentro de un UserProvider para acceder al estado global
 * de usuario y sus funciones relacionadas.
 */
import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
