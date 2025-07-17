import { IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "../../entities/Appointment.entity";

/**
 * DTO para la actualización del estado de una cita médica.
 * Permite cambiar el estado de la cita (cancelar, completar, etc.).
 */
export class UpdateAppointmentDto {
  @IsEnum(AppointmentStatus, { message: "El estado debe ser válido" })
  @IsOptional()
  status?: AppointmentStatus;
}
