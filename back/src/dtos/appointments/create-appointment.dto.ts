import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  Matches,
  IsOptional,
} from "class-validator";

/**
 * DTO para la creación de una nueva cita médica.
 * Incluye validaciones para fecha, hora y usuario.
 */
export class CreateAppointmentDto {
  @IsNumber({}, { message: "El ID del usuario debe ser un número" })
  @IsNotEmpty({ message: "El ID del usuario es obligatorio" })
  userId: number;

  @IsDateString(
    {},
    { message: "La fecha debe tener formato válido (YYYY-MM-DD)" }
  )
  @IsNotEmpty({ message: "La fecha es obligatoria" })
  date: string;

  @IsNotEmpty({ message: "La hora es obligatoria" })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "La hora debe tener formato HH:mm válido",
  })
  time: string;

  @IsOptional()
  @IsString({ message: "Las notas deben ser texto" })
  notes?: string;
}
