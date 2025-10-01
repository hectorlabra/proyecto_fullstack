import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import * as YAML from "yamljs";
import * as path from "path";
import * as fs from "fs";

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

const openApiPath = path.join(
  __dirname,
  "../../citas_fullstack/specs/001-profesionalizacion-proyecto/contracts/openapi.yaml"
);

if (fs.existsSync(openApiPath)) {
  const openApiSpec = YAML.load(openApiPath);

  const swaggerOptions = {
    definition: openApiSpec,
    apis: [],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  router.use("/docs", swaggerUi.serve);
  router.get(
    "/docs",
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        url: "/docs/json",
      },
    })
  );

  router.get("/docs/json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
