import { Request, Response } from "express";
import * as appointmentsService from "../services/appointmentsService";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";
import { logger } from "../config/logger";

export const getAllAppointments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await appointmentsService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    logger.error({ err: error }, "Error al obtener turnos");
    res.status(500).json({ error: "Error al obtener turnos" });
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const appointmentId = parseInt(id);
    if (isNaN(appointmentId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const appointment = await appointmentsService.getAppointmentById(
      appointmentId
    );
    if (!appointment) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    res.status(200).json(appointment);
  } catch (error) {
    logger.error(
      { err: error, appointmentId: req.params.id },
      "Error al obtener turno"
    );
    res.status(500).json({ error: "Error al obtener turno" });
  }
};

export const scheduleAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointmentData: CreateAppointmentDto = req.body;

    const newAppointment = await appointmentsService.createAppointment(
      appointmentData
    );

    res.status(201).json(newAppointment);
  } catch (error: any) {
    logger.error(
      { err: error, userId: req.body.userId },
      "Error al agendar turno"
    );

    if (
      error.message === "El usuario especificado no existe" ||
      error.message === "No se pueden agendar citas en fechas pasadas" ||
      error.message ===
        "Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM" ||
      error.message === "Las citas solo pueden agendarse de lunes a viernes" ||
      error.message ===
        "Ya existe una cita activa para este usuario en la misma fecha y hora"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const appointmentId = parseInt(id);
    if (isNaN(appointmentId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const cancelledAppointment = await appointmentsService.cancelAppointment(
      appointmentId
    );
    if (!cancelledAppointment) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    res.status(200).json({
      message: "Turno cancelado exitosamente",
      appointment: cancelledAppointment,
    });
  } catch (error: any) {
    logger.error(
      { err: error, appointmentId: req.params.id },
      "Error al cancelar turno"
    );

    if (
      error.message === "La cita no existe" ||
      error.message === "Solo se pueden cancelar citas programadas" ||
      error.message ===
        "Las citas solo pueden cancelarse hasta el día anterior a la fecha programada"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};
