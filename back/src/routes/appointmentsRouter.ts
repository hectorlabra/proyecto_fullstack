/**
 * Router de Express para gestionar las rutas relacionadas con los turnos (appointments).
 *
 * Rutas disponibles:
 * - GET /appointments: Obtiene el listado de todos los turnos.
 * - GET /appointments/:id: Obtiene el detalle de un turno específico por su ID.
 * - POST /appointments/schedule: Agenda un nuevo turno.
 * - PUT /appointments/cancel: Cambia el estatus de un turno a "cancelled".
 *
 * @module appointmentsRouter
 */
import { Router } from "express";
import {
  getAllAppointments,
  getAppointmentById,
  scheduleAppointment,
  cancelAppointment,
} from "../controllers/appointmentsController";

const appointmentsRouter = Router();

// GET /appointments => Obtener el listado de todos los turnos
appointmentsRouter.get("/", getAllAppointments);

// GET /appointments/:id => Obtener el detalle de un turno específico
appointmentsRouter.get("/:id", getAppointmentById);

// POST /appointments/schedule => Agendar un nuevo turno
appointmentsRouter.post("/schedule", scheduleAppointment);

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a "cancelled"
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
