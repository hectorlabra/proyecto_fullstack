import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { config } from "./config/envs";
import { logger } from "./config/logger";
import { createApp } from "./app";

const startServer = async () => {
  try {
    logger.info("🔄 Inicializando base de datos...");
    await AppDataSource.initialize();
    logger.info("✅ Base de datos inicializada correctamente");

    const app = createApp();
    const server = app.listen(config.PORT, () => {
      logger.info(
        `🚀 Servidor corriendo en http://localhost:${config.PORT} en modo ${config.NODE_ENV}`
      );
    });

    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} recibido, cerrando servidor...`);
      server.close(async () => {
        logger.info("Servidor HTTP cerrado");
        if (AppDataSource.isInitialized) {
          await AppDataSource.destroy();
          logger.info("Conexión a base de datos cerrada");
        }
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.error({ err: error }, "❌ Error al iniciar el servidor");
    process.exit(1);
  }
};

startServer();
