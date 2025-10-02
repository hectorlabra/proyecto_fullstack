// Configuración de URLs de API
// Este archivo centraliza la configuración del backend

// Detectar entorno y usar variable de Vite si existe
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Validar que la URL no esté vacía
if (!API_URL || API_URL.trim() === "") {
  console.error("⚠️ VITE_API_URL no está configurada correctamente");
}

// Log para debugging (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log("🔗 API_URL configurada:", API_URL);
}

export default API_URL;
