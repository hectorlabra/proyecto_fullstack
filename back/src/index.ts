import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/envs";
import router from "./routes/index";
import { AppDataSource } from "./data-source";

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

app.use(cors(corsOptions));
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

const PORT = config.PORT;

async function initializeApp() {
  try {
    console.log("🔄 Conectando a la base de datos...");
    await AppDataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida");

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

initializeApp();
