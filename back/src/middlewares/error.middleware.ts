import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.warn({
      type: "operational_error",
      statusCode: err.statusCode,
      message: err.message,
      path: req.path,
      method: req.method,
    });

    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  logger.error({
    type: "unexpected_error",
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  return res.status(500).json({
    error: "Error interno del servidor",
    statusCode: 500,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn({
    type: "not_found",
    path: req.path,
    method: req.method,
  });

  res.status(404).json({
    error: "Ruta no encontrada",
    statusCode: 404,
    path: req.path,
  });
};
