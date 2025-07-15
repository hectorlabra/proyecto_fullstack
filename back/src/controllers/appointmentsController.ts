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
export const scheduleAppointment = (req: Request, res: Response) => {
  // 1. Extraemos solo los datos que el cliente debe proveer.
  const { userId, date, time, notes } = req.body;

  // 2. Validamos que la información esencial esté presente.
  if (!userId || !date || !time) {
    return res
      .status(400)
      .json({ message: "userId, date y time son requeridos." });
  }

  // 3. (Futuro) Aquí guardarías en la base de datos.

  // 4. Simulamos la respuesta del servidor con el objeto "completo".
  const newAppointment: any = {
    id: Math.floor(Math.random() * 1000), // ID simulado
    userId,
    date,
    time,
    status: "scheduled", // Estado por defecto asignado por el servidor
    notes,
  };

  // Respondemos con el recurso completo recién creado.
  return res.status(201).json(newAppointment);
};

// PUT /appointments/cancel => Cambiar el estatus de un turno a "cancelled"
export const cancelAppointment = (req: Request, res: Response): void => {
  const { id } = req.params;
  // Lógica futura para encontrar y cancelar el turno con ese ID
  res.status(200).send(`El turno con ID ${id} ha sido cancelado.`);
};
