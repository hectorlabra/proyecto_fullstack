import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

/**
 * DTO para el login de usuario en el sistema.
 * Contiene las credenciales necesarias para la autenticación.
 */
export class LoginDto {
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
