import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config/envs";
import { User } from "./entities/User.entity";
import { Credential } from "./entities/Credential.entity";
import { Appointment } from "./entities/Appointment.entity";

/**
 * Configuración de la conexión a la base de datos PostgreSQL usando TypeORM.
 * Este DataSource se utiliza para inicializar la conexión y gestionar las entidades.
 *
 * IMPORTANTE - synchronize:
 * - DESARROLLO: true - TypeORM sincroniza automáticamente el esquema con las entidades
 * - PRODUCCIÓN: false - NUNCA usar auto-sincronización en producción
 *
 * Para cambios en producción, usar migraciones:
 * - Generar: npm run typeorm migration:generate -- -n NombreMigracion
 * - Ejecutar: npm run typeorm migration:run
 * - Revertir: npm run typeorm migration:revert
 *
 * Las migraciones aseguran cambios controlados y versionados en el esquema de base de datos.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  synchronize: config.NODE_ENV === "development",
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
