import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
} from "../controllers/usersController";

const usersRouter = Router();

// GET /users => Obtener el listado de todos los usuarios
usersRouter.get("/", getAllUsers);

// GET /users/:id => Obtener el detalle de un usuario específico
usersRouter.get("/:id", getUserById);

// POST /users/register => Registro de un nuevo usuario
usersRouter.post("/register", registerUser);

// POST /users/login => Login del usuario a la aplicación
usersRouter.post("/login", loginUser);

export default usersRouter;
