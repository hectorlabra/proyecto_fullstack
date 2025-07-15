/**
 * Módulo principal de enrutamiento que agrega y conecta los sub-enrutadores de la aplicación.
 *
 * @module routes/index
 * @remarks
 * Este enrutador sirve como punto de entrada para todas las rutas de la API. Monta el `usersRouter`
 * en la ruta `/users` y el `appointmentsRouter` en la ruta `/appointments`.
 *
 * @see usersRouter
 * @see appointmentsRouter
 */
import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const router = Router();

// Conectar los subenrutadores
router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;
