// Configuración de URLs de API
// Este archivo centraliza la configuración del backend

// Detectar entorno y usar variable de Vite si existe
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default API_URL;

// Ejemplo de uso en componentes:
// import API_URL from './config/api';
// axios.get(`${API_URL}/appointments`);
