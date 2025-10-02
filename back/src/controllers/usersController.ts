import { Request, Response } from "express";
import * as usersService from "../services/usersService";
import * as credentialsService from "../services/credentialsService";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { LoginDto } from "../dtos/credentials/login.dto";
import { logger } from "../config/logger";

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error({ err: error }, "Error al obtener usuarios");
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const user = await usersService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error(
      { err: error, userId: req.params.id },
      "Error al obtener usuario"
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    const newUser = await usersService.createUser(userData);
    const userResponse = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      dateOfBirth: newUser.dateOfBirth,
      nDni: newUser.nDni,
      createdAt: newUser.createdAt,
    };

    res.status(201).json(userResponse);
  } catch (error: any) {
    logger.error(
      { err: error, email: req.body.email },
      "Error al registrar usuario"
    );

    if (
      error.message === "El email ya está registrado" ||
      error.message === "El DNI ya está registrado" ||
      error.message === "El nombre de usuario ya existe"
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// Login de usuario
// POST /users/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginDto = req.body;

    // Validar credenciales
    const credential = await credentialsService.validateCredential(loginData);
    if (!credential) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    // Obtener el usuario por credentialId
    const user = await usersService.getUserByCredentialsId(credential.id);
    if (!user) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    // Retornar información del login exitoso sin información sensible
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      nDni: user.nDni,
    };

    res.status(200).json({
      login: true,
      user: userResponse,
    });
  } catch (error) {
    logger.error(
      { err: error, username: req.body.username },
      "Error al realizar login"
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
