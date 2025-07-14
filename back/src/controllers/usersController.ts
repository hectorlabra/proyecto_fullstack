/**
 * Controlador para obtener el listado de todos los usuarios.
 * 
 * @route GET /users
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 */
 
/**
 * Controlador para obtener el detalle de un usuario específico por ID.
 * 
 * @route GET /users/:id
 * @param req - Objeto de solicitud de Express, contiene el parámetro `id`.
 * @param res - Objeto de respuesta de Express.
 */
 
/**
 * Controlador para registrar un nuevo usuario.
 * 
 * @route POST /users/register
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 */
 
/**
 * Controlador para el login de un usuario en la aplicación.
 * 
 * @route POST /users/login
 * @param _req - Objeto de solicitud de Express (no utilizado).
 * @param res - Objeto de respuesta de Express.
 */
import { Request, Response } from "express";

// Devuelve todos los usuarios
// GET /users
export const getAllUsers = (_req: Request, res: Response): void => {
  res.send("Obtener el listado de todos los usuarios");
};

// Devuelve un usuario por ID
// GET /users/:id
export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Obtener el detalle del usuario con ID: ${id}`);
};

// Registra un nuevo usuario
// POST /users/register
export const registerUser = (_req: Request, res: Response): void => {
  res.send("Registro de un nuevo usuario");
};

// Login de usuario
// POST /users/login
export const loginUser = (_req: Request, res: Response): void => {
  res.send("Login del usuario a la aplicación");
};
