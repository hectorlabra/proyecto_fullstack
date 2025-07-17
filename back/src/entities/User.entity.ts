import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsString,
  Length,
} from "class-validator";

/**
 * Entidad que representa un usuario del sistema.
 * Almacena la información personal de los pacientes del consultorio médico.
 */
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser texto" })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  @IsNotEmpty({ message: "El apellido es obligatorio" })
  @IsString({ message: "El apellido debe ser texto" })
  @Length(2, 100, {
    message: "El apellido debe tener entre 2 y 100 caracteres",
  })
  lastName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  @IsEmail({}, { message: "Debe ser un email válido" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  email: string;

  @Column({ type: "varchar", length: 20 })
  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @IsString({ message: "El teléfono debe ser texto" })
  phone: string;

  @Column({ type: "date" })
  @IsDateString(
    {},
    { message: "La fecha de nacimiento debe tener formato válido" }
  )
  @IsNotEmpty({ message: "La fecha de nacimiento es obligatoria" })
  dateOfBirth: string;

  @Column({ type: "varchar", length: 20, unique: true })
  @IsNotEmpty({ message: "El número de DNI es obligatorio" })
  @IsString({ message: "El DNI debe ser texto" })
  nDni: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToOne("Credential", "user", {
    cascade: true,
    onDelete: "CASCADE",
  })
  credential: any;

  @OneToMany("Appointment", "user")
  appointments: any[];

  // Getter para el nombre completo
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
