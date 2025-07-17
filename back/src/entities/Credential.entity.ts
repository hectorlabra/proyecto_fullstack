import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

/**
 * Entidad que representa las credenciales de autenticación de un usuario.
 * Almacena la información necesaria para el login y autenticación.
 */
@Entity("credentials")
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
  @IsString({ message: "El nombre de usuario debe ser texto" })
  @Length(3, 50, {
    message: "El nombre de usuario debe tener entre 3 y 50 caracteres",
  })
  username: string;

  @Column({ type: "varchar", length: 255 })
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString({ message: "La contraseña debe ser texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación OneToOne con User
  @OneToOne("User", "credential", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: any;

  @Column({ name: "userId" })
  userId: number;
}
