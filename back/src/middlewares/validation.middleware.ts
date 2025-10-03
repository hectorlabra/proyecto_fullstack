import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

export function validationMiddleware<T>(dtoClass: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dto = plainToInstance(dtoClass, req.body);

      const errors: ValidationError[] = await validate(dto as object);

      if (errors.length > 0) {
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
