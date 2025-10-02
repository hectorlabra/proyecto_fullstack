import "reflect-metadata";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { config } from "./config/envs";
import { logger } from "./config/logger";
import router from "./routes/index";
import { AppDataSource } from "./data-source";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app = express();

const allowedOrigins = config.ALLOWED_ORIGINS.split(",").map((origin) =>
  origin.trim()
);
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(pinoHttp({ logger }));
app.use(cors(corsOptions));

if (config.ENABLE_RATE_LIMIT) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
  logger.info("⏱️  Rate limiting habilitado: 100 requests/15min");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (_, res) => {
  res.json({
    message: "Express server is working",
    timestamp: new Date().toISOString(),
    pid: process.pid,
  });
});

app.use("/", router);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.PORT;

async function initializeApp() {
  try {
    logger.info("🔄 Conectando a la base de datos...");
    await AppDataSource.initialize();
    logger.info("✅ Conexión a la base de datos establecida");

    app.listen(PORT, () => {
      logger.info({
        msg: "🚀 Servidor ejecutándose",
        port: PORT,
        database: config.DB_DATABASE,
        host: config.DB_HOST,
        dbPort: config.DB_PORT,
        environment: config.NODE_ENV,
      });
    });
  } catch (error) {
    logger.error({ err: error, msg: "❌ Error al inicializar la aplicación" });
    process.exit(1);
  }
}

initializeApp();
