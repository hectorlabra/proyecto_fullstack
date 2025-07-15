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
export const registerUser = (req: Request, res: Response) => {
  // 1. Extraemos los datos del cuerpo (body) de la petición
  const { firstName, lastName, email, username, password } = req.body;

  // 2. Hacemos una validación muy básica
  if (!firstName || !email || !username || !password) {
    // La clave es el 'return' aquí para detener la ejecución.
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  // 3. Imprimimos en la consola del servidor para que veas que los datos llegaron
  console.log("Datos recibidos para el registro:", req.body);
  // 4. Respondemos con un código 201 (Created) y un objeto JSON con los datos.
  //    (En un caso real, aquí devolverías el usuario creado desde la BD sin la contraseña)
  return res.status(201).json({
    id: 1, // Simulado
    message: "Usuario registrado exitosamente",
    user: { firstName, lastName, email, username },
  });
};

// Login de usuario
// POST /users/login
export const loginUser = (_req: Request, res: Response): void => {
  res.send("Login del usuario a la aplicación");
};
