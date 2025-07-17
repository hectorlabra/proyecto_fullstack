/**
 * Punto de entrada principal para la aplicación Express.
 *
 * - Importa "reflect-metadata" para TypeORM decorators.
 * - Configura e inicializa la conexión a la base de datos con TypeORM.
 * - Inicializa la aplicación Express y configura los middlewares para parsear JSON y datos codificados en URL.
 * - Importa y utiliza el enrutador principal desde `routes/index`.
 * - Inicia el servidor en el puerto especificado en la configuración y muestra un mensaje en consola cuando el servidor está en funcionamiento.
 *
 * @module index
 */
import "reflect-metadata";
import express from "express";
import { config } from "./config/envs";
import router from "./routes/index";
import { AppDataSource } from "./data-source";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/test", (_, res) => {
  res.json({
    message: "Express server is working",
    timestamp: new Date().toISOString(),
    pid: process.pid,
  });
});

// Routes
app.use("/", router);

const PORT = config.PORT;

// Función para inicializar la aplicación
async function initializeApp() {
  try {
    // Inicializar la conexión a la base de datos
    console.log("🔄 Conectando a la base de datos...");
    await AppDataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida");

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
      console.log(
        `📊 Base de datos: ${config.DB_DATABASE} en ${config.DB_HOST}:${config.DB_PORT}`
      );
      console.log(`🌍 Entorno: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Error al inicializar la aplicación:", error);
    process.exit(1);
  }
}

// Inicializar la aplicación
initializeApp();
