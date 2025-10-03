import { Router } from "express";
import {
  getAllAppointments,
  getAppointmentById,
  scheduleAppointment,
  cancelAppointment,
} from "../controllers/appointmentsController";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";

const appointmentsRouter = Router();

appointmentsRouter.get("/", getAllAppointments);

appointmentsRouter.get("/:id", getAppointmentById);

appointmentsRouter.post(
  "/schedule",
  validationMiddleware(CreateAppointmentDto),
  scheduleAppointment
);

appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
