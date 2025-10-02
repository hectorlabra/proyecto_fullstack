import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1730480000000 implements MigrationInterface {
  name = "InitialSchema1730480000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear tabla users
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "firstName" character varying(100) NOT NULL,
                "lastName" character varying(100) NOT NULL,
                "email" character varying(255) NOT NULL,
                "phone" character varying(20) NOT NULL,
                "dateOfBirth" date NOT NULL,
                "nDni" character varying(20) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_6dccbed1c436c96b8c4b8d4b8b3" UNIQUE ("nDni"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

    // Crear tabla credentials
    await queryRunner.query(`
            CREATE TABLE "credentials" (
                "id" SERIAL NOT NULL,
                "username" character varying(50) NOT NULL,
                "passwordHash" character varying(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer NOT NULL,
                CONSTRAINT "UQ_7c2c4a4c8c8c8c8c8c8c8c8c8c8" UNIQUE ("username"),
                CONSTRAINT "PK_1e38c5e4c8c8c8c8c8c8c8c8c8c8" PRIMARY KEY ("id")
            )
        `);

    // Crear tabla appointments
    await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL NOT NULL,
                "date" date NOT NULL,
                "time" TIME NOT NULL,
                "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'scheduled',
                "notes" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer NOT NULL,
                CONSTRAINT "PK_4a437a9a27e948726b8bb7e472aa" PRIMARY KEY ("id")
            )
        `);

    // Crear enum para appointment status
    await queryRunner.query(`
            CREATE TYPE "public"."appointments_status_enum" AS ENUM('scheduled', 'canceled', 'completed')
        `);

    // Crear índices
    await queryRunner.query(`
            CREATE INDEX "IDX_4a437a9a27e948726b8bb7e472aa_userId" ON "appointments" ("userId")
        `);

    // Crear foreign keys
    await queryRunner.query(`
            ALTER TABLE "credentials"
            ADD CONSTRAINT "FK_1e38c5e4c8c8c8c8c8c8c8c8c8c8_userId"
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

    await queryRunner.query(`
            ALTER TABLE "appointments"
            ADD CONSTRAINT "FK_4a437a9a27e948726b8bb7e472aa_userId"
            FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar foreign keys
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_4a437a9a27e948726b8bb7e472aa_userId"`
    );
    await queryRunner.query(
      `ALTER TABLE "credentials" DROP CONSTRAINT "FK_1e38c5e4c8c8c8c8c8c8c8c8c8c8_userId"`
    );

    // Eliminar índices
    await queryRunner.query(
      `DROP INDEX "IDX_4a437a9a27e948726b8bb7e472aa_userId"`
    );

    // Eliminar tablas
    await queryRunner.query(`DROP TABLE "appointments"`);
    await queryRunner.query(`DROP TABLE "credentials"`);
    await queryRunner.query(`DROP TABLE "users"`);

    // Eliminar enum
    await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
  }
}
