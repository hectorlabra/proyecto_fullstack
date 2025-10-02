import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  // DATABASE_URL tiene prioridad si existe (formato Render)
  DATABASE_URL: z.string().optional(),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(5432),
  DB_USERNAME: z.string().default("postgres"),
  DB_PASSWORD: z.string().default(""),
  DB_DATABASE: z.string().default("medical_appointments"),
  DB_SSL: z
    .string()
    .default("false")
    .transform((val) => val === "true"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  ALLOWED_ORIGINS: z
    .string()
    .min(1, "ALLOWED_ORIGINS es requerido")
    .default("http://localhost:5173"),
  ENABLE_RATE_LIMIT: z
    .string()
    .default("true")
    .transform((val) => val !== "false"),
  APP_VERSION: z.string().default("1.0.0"),
});

const parseEnv = () => {
  try {
    return envSchema.parse({
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_SSL: process.env.DB_SSL,
      NODE_ENV: process.env.NODE_ENV,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
      ENABLE_RATE_LIMIT: process.env.ENABLE_RATE_LIMIT,
      APP_VERSION: process.env.APP_VERSION,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Error de validación de variables de entorno:");
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const config = parseEnv();
