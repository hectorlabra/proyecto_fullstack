/**
 * User Context - Manejo del estado global de usuario y turnos
 *
 * Este contexto maneja toda la información relacionada con:
 * - Usuario autenticado
 * - Turnos del usuario
 * - Funciones de autenticación (login, logout)
 * - Funciones de gestión de turnos (crear, cancelar, obtener)
 */
import React, { createContext, useReducer, useEffect } from "react";

// Tipos de acciones para el reducer
const ACTION_TYPES = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  SET_USER_APPOINTMENTS: "SET_USER_APPOINTMENTS",
  ADD_APPOINTMENT: "ADD_APPOINTMENT",
  UPDATE_APPOINTMENT: "UPDATE_APPOINTMENT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Estado inicial del contexto
const initialState = {
  user: null,
  userAppointments: [],
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Reducer para manejar los cambios de estado
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        userAppointments: action.payload.appointments || [],
        isAuthenticated: true,
        error: null,
      };

    case ACTION_TYPES.LOGOUT_USER:
      return {
        ...initialState,
      };

    case ACTION_TYPES.SET_USER_APPOINTMENTS:
      return {
        ...state,
        userAppointments: action.payload,
        error: null,
      };

    case ACTION_TYPES.ADD_APPOINTMENT:
      return {
        ...state,
        userAppointments: [...state.userAppointments, action.payload],
        error: null,
      };

    case ACTION_TYPES.UPDATE_APPOINTMENT:
      return {
        ...state,
        userAppointments: state.userAppointments.map((appointment) =>
          appointment.id === action.payload.id ? action.payload : appointment
        ),
        error: null,
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Crear el contexto
const UserContext = createContext();

// Provider del contexto
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Función para hacer login
  const login = async (credentials) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar en localStorage para persistencia
      const userData = {
        user: data.user,
        token: data.token,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Actualizar estado del contexto
      dispatch({
        type: ACTION_TYPES.LOGIN_USER,
        payload: { user: data.user, appointments: [] },
      });

      // Cargar turnos del usuario
      await fetchUserAppointments(data.user.id);

      return { success: true, data };
    } catch (error) {
      const errorMessage = error.message || "Error al iniciar sesión";
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: ACTION_TYPES.LOGOUT_USER });
  };

  // Función para obtener turnos del usuario
  const fetchUserAppointments = async (userId) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

      const response = await fetch("http://localhost:3000/appointments");

      if (!response.ok) {
        throw new Error("Error al obtener turnos");
      }

      const allAppointments = await response.json();
      const userAppointments = allAppointments.filter(
        (appointment) => appointment.userId === userId
      );

      dispatch({
        type: ACTION_TYPES.SET_USER_APPOINTMENTS,
        payload: userAppointments,
      });

      // Actualizar localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.appointments = userAppointments;
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return { success: true, appointments: userAppointments };
    } catch (error) {
      const errorMessage = error.message || "Error al cargar turnos";
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Función para crear una nueva cita
  const createAppointment = async (appointmentData) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

      const response = await fetch(
        "http://localhost:3000/appointments/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.error || "Error al crear la cita";

        if (response.status === 400) {
          errorMessage =
            data.error || "Datos inválidos. Verifica la información ingresada.";
        } else if (response.status === 409) {
          errorMessage =
            "Ya existe una cita en ese horario. Selecciona otra fecha u hora.";
        } else if (response.status >= 500) {
          errorMessage =
            "Error interno del servidor. Intenta nuevamente en unos minutos.";
        }

        throw new Error(errorMessage);
      }

      // Añadir la nueva cita al estado
      dispatch({
        type: ACTION_TYPES.ADD_APPOINTMENT,
        payload: data,
      });

      // Actualizar localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.appointments = [...(userData.appointments || []), data];
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return { success: true, data };
    } catch (error) {
      const errorMessage = error.message || "Error al crear la cita";
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Función para cancelar una cita
  const cancelAppointment = async (appointmentId) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

      const response = await fetch(
        `http://localhost:3000/appointments/cancel/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al cancelar la cita");
      }

      // Actualizar la cita en el estado
      dispatch({
        type: ACTION_TYPES.UPDATE_APPOINTMENT,
        payload: data.appointment,
      });

      // Actualizar localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.appointments) {
        userData.appointments = userData.appointments.map((appointment) =>
          appointment.id === appointmentId ? data.appointment : appointment
        );
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return { success: true, data: data.appointment };
    } catch (error) {
      const errorMessage = error.message || "Error al cancelar la cita";
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  // Función para refrescar turnos
  const refreshAppointments = async () => {
    if (state.user) {
      return await fetchUserAppointments(state.user.id);
    }
  };

  // Verificar autenticación al iniciar la aplicación
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUserData = JSON.parse(userData);

          // Verificar que los datos sean válidos
          if (parsedUserData.user && parsedUserData.user.id) {
            dispatch({
              type: ACTION_TYPES.LOGIN_USER,
              payload: {
                user: parsedUserData,
                appointments: parsedUserData.appointments || [],
              },
            });

            // Recargar turnos desde el servidor para mantener sincronización
            fetchUserAppointments(parsedUserData.user.id);
          }
        }
      } catch (error) {
        console.error("Error al inicializar autenticación:", error);
        localStorage.removeItem("user");
      }
    };

    initializeAuth();
  }, []);

  // Valor del contexto
  const contextValue = {
    // Estado
    user: state.user,
    userAppointments: state.userAppointments,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,

    // Funciones
    login,
    logout,
    createAppointment,
    cancelAppointment,
    fetchUserAppointments,
    refreshAppointments,
    clearError,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
