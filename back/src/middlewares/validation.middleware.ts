import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

/**
 * Middleware para validar DTOs usando class-validator.
 * @param dtoClass - Clase DTO a usar para la validación
 * @returns Middleware function
 */
export function validationMiddleware<T>(dtoClass: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Convertir el body de la request a la instancia del DTO
      const dto = plainToInstance(dtoClass, req.body);

      // Validar el DTO
      const errors: ValidationError[] = await validate(dto as object);

      if (errors.length > 0) {
        // Extraer los mensajes de error
        const errorMessages = errors.map((error) => {
          return `${error.property}: ${Object.values(
            error.constraints || {}
          ).join(", ")}`;
        });

        res.status(400).json({
          error: "Datos de entrada inválidos",
          details: errorMessages,
        });
        return;
      }

      // Si no hay errores, asignar el DTO validado al body
      req.body = dto;
      next();
    } catch (error) {
      res.status(500).json({
        error: "Error interno del servidor durante la validación",
        details: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };
}
