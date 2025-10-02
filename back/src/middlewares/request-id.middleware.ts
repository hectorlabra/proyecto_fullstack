import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers["x-request-id"] || randomUUID();

  req.headers["x-request-id"] = requestId as string;

  res.setHeader("X-Request-ID", requestId);

  next();
};
