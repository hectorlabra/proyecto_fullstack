/**
 * Módulo principal de enrutamiento que agrega y conecta los sub-enrutadores de la aplicación.
 *
 * @module routes/index
 * @remarks
 * Este enrutador sirve como punto de entrada para todas las rutas de la API. Monta el `usersRouter`
 * en la ruta `/users` y el `appointmentsRouter` en la ruta `/appointments`.
 * También incluye endpoints de monitoreo: `/health` y `/version`.
 *
 * @see usersRouter
 * @see appointmentsRouter
 */
import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const router = Router();

// ========================================
// Endpoints de Monitoreo
// ========================================

/**
 * GET /health
 * Endpoint de health check para verificar el estado del servicio
 */
router.get("/health", (_req: Request, res: Response) => {
  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  };

  res.status(200).json(healthCheck);
});

/**
 * GET /version
 * Endpoint de información de versión de la API
 */
router.get("/version", (_req: Request, res: Response) => {
  const versionInfo = {
    version: process.env.APP_VERSION || "1.0.0",
    apiName: "API de Gestión de Turnos",
    buildDate: new Date().toISOString().split("T")[0],
    nodeVersion: process.version,
  };

  res.status(200).json(versionInfo);
});

// ========================================
// Sub-enrutadores de Funcionalidad
// ========================================

// Conectar los subenrutadores
router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
