import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config/envs";
import { User } from "./entities/User.entity";
import { Credential } from "./entities/Credential.entity";
import { Appointment } from "./entities/Appointment.entity";

/**
 * Configuración de la conexión a la base de datos PostgreSQL usando TypeORM.
 * Este DataSource se utiliza para inicializar la conexión y gestionar las entidades.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  synchronize: config.NODE_ENV === "development", // Solo en desarrollo
  logging: config.NODE_ENV === "development",
  entities: [User, Credential, Appointment],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  ssl: config.DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});
