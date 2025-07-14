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

// PUT /appointments/cancel => Cambiar el estatus de un turno a "cancelled"
appointmentsRouter.put("/cancel", cancelAppointment);

export default appointmentsRouter;
