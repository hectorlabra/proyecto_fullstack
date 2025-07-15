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
import * as usersService from "../services/usersService";

// GET /appointments => Obtener el listado de todos los turnos
export const getAllAppointments = (_req: Request, res: Response): void => {
  try {
    const appointments = appointmentsService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /appointments/:id => Obtener el detalle de un turno específico
export const getAppointmentById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    // Validar que el ID sea numérico
    const appointmentId = parseInt(id);
    if (isNaN(appointmentId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const appointment = appointmentsService.getAppointmentById(appointmentId);
    if (!appointment) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// POST /appointments/schedule => Agendar un nuevo turno
export const scheduleAppointment = (req: Request, res: Response): void => {
  try {
    const { userId, date, time, notes } = req.body;

    // Validar campos requeridos
    if (!userId || !date || !time) {
      res.status(400).json({
        error: "userId, date y time son requeridos",
      });
      return;
    }

    // Validar que userId sea numérico
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      res.status(400).json({ error: "userId debe ser un número válido" });
      return;
    }

    // Verificar que el usuario existe
    const user = usersService.getUserById(userIdNum);
    if (!user) {
      res.status(400).json({ error: "El usuario especificado no existe" });
      return;
    }

    const newAppointment = appointmentsService.createAppointment({
      userId: userIdNum,
      date,
      time,
      notes,
    });

    res.status(201).json(newAppointment);
  } catch (error: any) {
    if (error.message === "El formato de fecha debe ser YYYY-MM-DD") {
      res
        .status(400)
        .json({ error: "El formato de fecha debe ser YYYY-MM-DD" });
    } else if (error.message === "El formato de hora debe ser HH:mm") {
      res.status(400).json({ error: "El formato de hora debe ser HH:mm" });
    } else if (
      error.message ===
      "Ya existe un turno activo para este usuario en la misma fecha y hora"
    ) {
      res
        .status(400)
        .json({
          error:
            "Ya existe un turno activo para este usuario en la misma fecha y hora",
        });
    } else if (error.message === "NO PUEDE HABER UN TURNO SIN ID DE USUARIO") {
      res
        .status(400)
        .json({ error: "NO PUEDE HABER UN TURNO SIN ID DE USUARIO" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// PUT /appointments/cancel/:id => Cambiar el estatus de un turno a "cancelled"
export const cancelAppointment = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    // Validar que el ID sea numérico
    const appointmentId = parseInt(id);
    if (isNaN(appointmentId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const cancelledAppointment =
      appointmentsService.cancelAppointment(appointmentId);
    if (!cancelledAppointment) {
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    res.status(200).json({
      message: "Turno cancelado exitosamente",
      appointment: cancelledAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
