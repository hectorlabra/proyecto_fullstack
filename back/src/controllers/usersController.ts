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
import * as usersService from "../services/usersService";

// Devuelve todos los usuarios
// GET /users
export const getAllUsers = (_req: Request, res: Response): void => {
  try {
    const users = usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Devuelve un usuario por ID
// GET /users/:id
export const getUserById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "ID de usuario inválido" });
      return;
    }

    const user = usersService.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Registra un nuevo usuario
// POST /users/register
export const registerUser = (req: Request, res: Response) => {
  try {
    // Extraemos los datos del cuerpo (body) de la petición
    const { name, email, birthdate, nDni, username, password } = req.body;

    // Validación básica de campos requeridos
    if (!name || !email || !birthdate || !nDni || !username || !password) {
      return res.status(400).json({
        message:
          "Todos los campos son obligatorios: name, email, birthdate, nDni, username, password",
      });
    }

    // Crear el usuario utilizando el servicio
    const newUser = usersService.createUser({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });

    // Responder con el usuario creado (sin mostrar las credenciales)
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        birthdate: newUser.birthdate,
        nDni: newUser.nDni,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Login de usuario
// POST /users/login
import * as credentialsService from "../services/credentialsService";
export const loginUser = (req: Request, res: Response): void => {
  try {
    const { username, password } = req.body;

    // Validación básica de campos requeridos
    if (!username || !password) {
      res.status(400).json({
        message: "Username y password son requeridos",
      });
      return;
    }

    // Validar credenciales usando el servicio
    const credentialsId = credentialsService.validateCredential(
      username,
      password
    );

    if (!credentialsId) {
      res.status(401).json({
        message: "Credenciales inválidas",
      });
      return;
    }

    // Buscar el usuario asociado a estas credenciales
    // Sugerencia: Implementar getUserByCredentialsId en el servicio para mayor eficiencia.
    // const users = usersService.getAllUsers();
    // const user = users.find((u) => u.credentialsId === credentialsId);
    const user = usersService.getUserByCredentialsId(credentialsId); // <-- Más eficiente

    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
      });
      return;
    }

    // Login exitoso
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
