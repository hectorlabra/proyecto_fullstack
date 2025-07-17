import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDateString,
  Matches,
  IsOptional,
  IsNumber,
} from "class-validator";

/**
 * Enum para los estados de las citas médicas
 */
export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  CANCELED = "canceled",
  COMPLETED = "completed",
}

/**
 * Entidad que representa una cita médica en el sistema.
 * Almacena la información de los turnos agendados por los pacientes.
 */
@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  @IsDateString(
    {},
    { message: "La fecha debe tener formato válido (YYYY-MM-DD)" }
  )
  @IsNotEmpty({ message: "La fecha es obligatoria" })
  date: string;

  @Column({ type: "time" })
  @IsNotEmpty({ message: "La hora es obligatoria" })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "La hora debe tener formato HH:mm válido",
  })
  time: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  @IsEnum(AppointmentStatus, { message: "El estado debe ser válido" })
  status: AppointmentStatus;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @IsString({ message: "Las notas deben ser texto" })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación ManyToOne con User
  @ManyToOne("User", "appointments", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: any;

  @Column({ name: "userId" })
  @IsNumber({}, { message: "El ID del usuario debe ser un número" })
  @IsNotEmpty({ message: "El ID del usuario es obligatorio" })
  userId: number;

  // Getter para verificar si la cita está activa
  get isActive(): boolean {
    return this.status === AppointmentStatus.SCHEDULED;
  }

  // Getter para verificar si la cita está cancelada
  get isCanceled(): boolean {
    return this.status === AppointmentStatus.CANCELED;
  }

  // Getter para verificar si la cita está completada
  get isCompleted(): boolean {
    return this.status === AppointmentStatus.COMPLETED;
  }

  // Método para verificar si la cita puede ser cancelada
  canBeCanceled(): boolean {
    const appointmentDate = new Date(this.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      this.status === AppointmentStatus.SCHEDULED && appointmentDate >= tomorrow
    );
  }
}
