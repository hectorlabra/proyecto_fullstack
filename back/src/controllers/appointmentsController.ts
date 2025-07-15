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
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta confirmando el agendamiento del turno.
 */

/**
 * Cancela un turno
 *
 * @route PUT /appointments/cancel
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 * @returns Envía una respuesta confirmando la cancelación del turno.
 */
import { Request, Response } from "express";
import * as appointmentsService from "../services/appointmentsService";

// GET /appointments => Obtener el listado de todos los turnos
export const getAllAppointments = (_req: Request, res: Response): void => {
  try {
    const appointments = appointmentsService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// GET /appointments/:id => Obtener el detalle de un turno específico
export const getAppointmentById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const appointmentId = parseInt(id);

    if (isNaN(appointmentId)) {
      res.status(400).json({ message: "ID de turno inválido" });
      return;
    }

    const appointment = appointmentsService.getAppointmentById(appointmentId);

    if (!appointment) {
      res.status(404).json({ message: "Turno no encontrado" });
      return;
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /appointments/schedule => Agendar un nuevo turno
export const scheduleAppointment = (req: Request, res: Response) => {
  try {
    // Extraemos los datos que el cliente debe proveer
    const { userId, date, time, notes } = req.body;

    // Validamos que la información esencial esté presente
    if (!userId || !date || !time) {
      return res
        .status(400)
        .json({ message: "userId, date y time son requeridos." });
    }

    // Crear el turno usando el servicio
    const newAppointment = appointmentsService.createAppointment({
      userId,
      date,
      time,
      notes,
    });

    // Responder con el turno creado
    return res.status(201).json({
      message: "Turno agendado exitosamente",
      appointment: newAppointment,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a "cancelled"
export const cancelAppointment = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const appointmentId = parseInt(id);

    if (isNaN(appointmentId)) {
      res.status(400).json({ message: "ID de turno inválido" });
      return;
    }

    const cancelledAppointment =
      appointmentsService.cancelAppointment(appointmentId);

    if (!cancelledAppointment) {
      res.status(404).json({ message: "Turno no encontrado" });
      return;
    }

    res.status(200).json({
      message: "Turno cancelado exitosamente",
      appointment: cancelledAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
