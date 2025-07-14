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
