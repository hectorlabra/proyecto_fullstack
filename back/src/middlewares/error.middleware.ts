import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
import { logger } from "../config/logger";

export interface ErrorResponse {
  error: string;
  statusCode: number;
  details?: unknown;
  path?: string;
  timestamp: string;
}

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: unknown;

  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleTypeORMError = (err: QueryFailedError): ErrorResponse => {
  const error = err as any;

  if (error.code === "23505") {
    return {
      error: "El registro ya existe en la base de datos",
      statusCode: 409,
      details: error.detail,
      timestamp: new Date().toISOString(),
    };
  }

  if (error.code === "23503") {
    return {
      error: "Violación de clave foránea - el registro relacionado no existe",
      statusCode: 400,
      details: error.detail,
      timestamp: new Date().toISOString(),
    };
  }

  if (error.code === "22P02") {
    return {
      error: "Formato de datos inválido",
      statusCode: 400,
      details: error.message,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    error: "Error en la operación de base de datos",
    statusCode: 500,
    details: process.env.NODE_ENV === "development" ? error.message : undefined,
    timestamp: new Date().toISOString(),
  };
};

const handleValidationError = (err: any): ErrorResponse => {
  const validationErrors = err.errors || [];
  return {
    error: "Errores de validación",
    statusCode: 400,
    details: validationErrors.map((error: any) => ({
      field: error.property,
      constraints: error.constraints,
    })),
    timestamp: new Date().toISOString(),
  };
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errorResponse: ErrorResponse;

  if (err instanceof AppError) {
    logger.warn({
      type: "operational_error",
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
      path: req.path,
      method: req.method,
    });

    errorResponse = {
      error: err.message,
      statusCode: err.statusCode,
      details: err.details,
      path: req.path,
      timestamp: new Date().toISOString(),
    };

    return res.status(err.statusCode).json(errorResponse);
  }

  if (err instanceof QueryFailedError) {
    logger.error({
      type: "database_error",
      message: err.message,
      path: req.path,
      method: req.method,
    });

    errorResponse = handleTypeORMError(err);
    errorResponse.path = req.path;
    return res.status(errorResponse.statusCode).json(errorResponse);
  }

  if (err.name === "ValidationError" || (err as any).errors) {
    logger.warn({
      type: "validation_error",
      message: err.message,
      path: req.path,
      method: req.method,
    });

    errorResponse = handleValidationError(err);
    errorResponse.path = req.path;
    return res.status(errorResponse.statusCode).json(errorResponse);
  }

  logger.error({
    type: "unexpected_error",
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  errorResponse = {
    error: "Error interno del servidor",
    statusCode: 500,
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
    path: req.path,
    timestamp: new Date().toISOString(),
  };

  return res.status(500).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn({
    type: "not_found",
    path: req.path,
    method: req.method,
  });

  const errorResponse: ErrorResponse = {
    error: "Ruta no encontrada",
    statusCode: 404,
    path: req.path,
    timestamp: new Date().toISOString(),
  };

  res.status(404).json(errorResponse);
};
