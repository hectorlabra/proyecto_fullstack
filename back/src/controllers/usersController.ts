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
import * as credentialsService from "../services/credentialsService";

// Devuelve todos los usuarios
// GET /users
export const getAllUsers = (_req: Request, res: Response): void => {
  try {
    const users = usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Devuelve un usuario por ID
// GET /users/:id
export const getUserById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    // Validar que el ID sea numérico
    const userId = parseInt(id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const user = usersService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Registra un nuevo usuario
// POST /users/register
export const registerUser = (req: Request, res: Response): void => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;

    // Validar campos requeridos
    if (!name || !email || !birthdate || !nDni || !username || !password) {
      res.status(400).json({
        error:
          "Todos los campos son obligatorios: name, email, birthdate, nDni, username, password",
      });
      return;
    }

    // Validar que los campos no estén vacíos
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      birthdate.trim() === "" ||
      nDni.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      res.status(400).json({
        error: "Los campos no pueden estar vacíos",
      });
      return;
    }

    const newUser = usersService.createUser({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.message === "El email ya está registrado") {
      res.status(400).json({ error: "El email ya está registrado" });
    } else if (error.message === "El DNI ya está registrado") {
      res.status(400).json({ error: "El DNI ya está registrado" });
    } else if (error.message === "El nombre de usuario ya existe") {
      res.status(400).json({ error: "El nombre de usuario ya existe" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// Login de usuario
// POST /users/login
export const loginUser = (req: Request, res: Response): void => {
  try {
    const { username, password } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      res.status(400).json({
        error: "Username y password son requeridos",
      });
      return;
    }

    // Validar credenciales
    const credentialId = credentialsService.validateCredential(
      username,
      password
    );
    if (!credentialId) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    // Obtener el usuario por credentialId
    const user = usersService.getUserByCredentialsId(credentialId);
    if (!user) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    res.status(200).json({
      login: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
