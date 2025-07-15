/**
 * Punto de entrada principal para la aplicación Express.
 *
 * - Importa y configura las variables de entorno desde el módulo `config/envs`.
 * - Inicializa la aplicación Express y configura los middlewares para parsear JSON y datos codificados en URL.
 * - Importa y utiliza el enrutador principal desde `routes/index`.
 * - Inicia el servidor en el puerto especificado en la configuración y muestra un mensaje en consola cuando el servidor está en funcionamiento.
 *
 * @module index
 */
import express from "express";
import { config } from "./config/envs";
import router from "./routes/index";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
