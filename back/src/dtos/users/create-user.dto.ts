import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  MinLength,
} from "class-validator";

/**
 * DTO para la creación de un nuevo usuario en el sistema.
 * Incluye validaciones para todos los campos requeridos.
 */
export class CreateUserDto {
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser texto" })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  firstName: string;

  @IsNotEmpty({ message: "El apellido es obligatorio" })
  @IsString({ message: "El apellido debe ser texto" })
  @Length(2, 100, {
    message: "El apellido debe tener entre 2 y 100 caracteres",
  })
  lastName: string;

  @IsEmail({}, { message: "Debe ser un email válido" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  email: string;

  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @IsString({ message: "El teléfono debe ser texto" })
  phone: string;

  @IsDateString(
    {},
    { message: "La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)" }
  )
  @IsNotEmpty({ message: "La fecha de nacimiento es obligatoria" })
  dateOfBirth: string;

  @IsNotEmpty({ message: "El número de DNI es obligatorio" })
  @IsString({ message: "El DNI debe ser texto" })
  nDni: string;

  @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
  @IsString({ message: "El nombre de usuario debe ser texto" })
  @Length(3, 50, {
    message: "El nombre de usuario debe tener entre 3 y 50 caracteres",
  })
  username: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString({ message: "La contraseña debe ser texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string;
}
