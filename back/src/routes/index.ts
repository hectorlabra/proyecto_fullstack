import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  };
  res.status(200).json(healthCheck);
});

router.get("/version", (_req: Request, res: Response) => {
  const versionInfo = {
    version: process.env.APP_VERSION || "1.0.0",
    apiName: "API de Gestión de Turnos",
    buildDate: new Date().toISOString().split("T")[0],
    nodeVersion: process.version,
  };
  res.status(200).json(versionInfo);
});

router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
