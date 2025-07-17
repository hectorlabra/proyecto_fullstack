/**
 * Devuelve todos los turnos
 *
 * @route GET /appointments
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta con el listado de turnos.
 */

/**
 * Devuelve un turno por ID
 *
 * @route GET /appointments/:id
 * @param req - Objeto de solicitud de Express, contiene el parámetro `id`.
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta con el detalle del turno solicitado.
 */

/**
 * Agenda un nuevo turno
 *
 * @route POST /appointments/schedule
 * @param req - Objeto de solicitud de Express que contiene el DTO validado.
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta confirmando el agendamiento del turno.
 */

/**
 * Cancela un turno
 *
 * @route PUT /appointments/cancel/:id
 * @param req - Objeto de solicitud de Express que contiene el ID del turno.
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta confirmando la cancelación del turno.
 */
import { Request, Response } from "express";
import * as appointmentsService from "../services/appointmentsService";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";

// GET /appointments => Obtener el listado de todos los turnos
export const getAllAppointments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const appointments = await appointmentsService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /appointments/:id => Obtener el detalle de un turno específico
export const getAppointmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID sea numérico
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
    console.error("Error al obtener turno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// POST /appointments/schedule => Agendar un nuevo turno
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
    console.error("Error al agendar turno:", error);

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

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a "cancelled"
export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID sea numérico
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
    console.error("Error al cancelar turno:", error);

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
