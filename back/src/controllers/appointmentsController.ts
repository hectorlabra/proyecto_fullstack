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

// GET /appointments => Obtener el listado de todos los turnos
export const getAllAppointments = (_req: Request, res: Response): void => {
  res.send("Obtener el listado de todos los turnos de todos los usuarios");
};

// GET /appointments/:id => Obtener el detalle de un turno específico
export const getAppointmentById = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Obtener el detalle del turno con ID: ${id}`);
};

// POST /appointments/schedule => Agendar un nuevo turno
export const scheduleAppointment = (_req: Request, res: Response): void => {
  res.send("Agendar un nuevo turno");
};

// PUT /appointments/cancel => Cambiar el estatus de un turno a "cancelled"
export const cancelAppointment = (_req: Request, res: Response): void => {
  res.send('Cambiar el estatus de un turno a "cancelled"');
};
