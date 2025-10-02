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
 *
 * DATABASE_URL vs variables individuales:
 * - Si DATABASE_URL existe, se usa (formato: postgresql://user:pass@host:port/db)
 * - Si no, se usan DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE
 * - Render proporciona DATABASE_URL automáticamente (recomendado)
 */

// Si DATABASE_URL existe, úsala; si no, construye la configuración con variables individuales
const dataSourceConfig = config.DATABASE_URL
  ? {
      type: "postgres" as const,
      url: config.DATABASE_URL,
      // TEMPORAL: synchronize en true para primer deploy y crear tablas
      // TODO: Cambiar a false después del primer deploy exitoso y usar migraciones
      synchronize: true,
      logging: config.NODE_ENV === "development",
      entities: [User, Credential, Appointment],
      migrations: ["src/migrations/*.ts"],
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
      // TEMPORAL: synchronize en true para primer deploy y crear tablas
      // TODO: Cambiar a false después del primer deploy exitoso y usar migraciones
      synchronize: true,
      logging: config.NODE_ENV === "development",
      entities: [User, Credential, Appointment],
      migrations: ["src/migrations/*.ts"],
      subscribers: [],
      ssl: config.DB_SSL
        ? {
            rejectUnauthorized: false,
          }
        : false,
    };

export const AppDataSource = new DataSource(dataSourceConfig);
