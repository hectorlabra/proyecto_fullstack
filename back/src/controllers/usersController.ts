import { Request, Response } from "express";

// GET /users => Obtener el listado de todos los usuarios
export const getAllUsers = (_req: Request, res: Response): void => {
  res.send("Obtener el listado de todos los usuarios");
};

// GET /users/:id => Obtener el detalle de un usuario específico
export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Obtener el detalle del usuario con ID: ${id}`);
};

// POST /users/register => Registro de un nuevo usuario
export const registerUser = (_req: Request, res: Response): void => {
  res.send("Registro de un nuevo usuario");
};

// POST /users/login => Login del usuario a la aplicación
export const loginUser = (_req: Request, res: Response): void => {
  res.send("Login del usuario a la aplicación");
};
