import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DATABASE: process.env.DB_DATABASE || "medical_appointments",
  DB_SSL: process.env.DB_SSL === "true",
  NODE_ENV: process.env.NODE_ENV || "development",
};
