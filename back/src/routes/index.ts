import { Router } from "express";
import usersRouter from "./usersRouter.js";
import appointmentsRouter from "./appointmentsRouter.js";

const router = Router();

// Conectar los subenrutadores
router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
