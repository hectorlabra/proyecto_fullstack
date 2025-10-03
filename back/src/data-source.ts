import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config/envs";
import { User } from "./entities/User.entity";
import { Credential } from "./entities/Credential.entity";
import { Appointment } from "./entities/Appointment.entity";

/**
 * Configuración de la conexión a la base de datos PostgreSQL usando TypeORM.
 * IMPORTANTE: synchronize debe ser false en producción; usar migraciones para cambios.
 * DATABASE_URL se usa si existe; de lo contrario, variables individuales.
 */

const migrationsPath =
  config.NODE_ENV === "development"
    ? ["src/migrations/*.ts"]
    : ["dist/migrations/*.js"];

const dataSourceConfig = config.DATABASE_URL
  ? {
      type: "postgres" as const,
      url: config.DATABASE_URL,
      synchronize: false,
      logging: config.NODE_ENV === "development",
      entities: [User, Credential, Appointment],
      migrations: migrationsPath,
      subscribers: [],
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      type: "postgres" as const,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_DATABASE,
      synchronize: false,
      logging: config.NODE_ENV === "development",
      entities: [User, Credential, Appointment],
      migrations: migrationsPath,
      subscribers: [],
      ssl: config.DB_SSL
        ? {
            rejectUnauthorized: false,
          }
        : false,
    };

export const AppDataSource = new DataSource(dataSourceConfig);
