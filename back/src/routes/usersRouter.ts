import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
} from "../controllers/usersController";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { LoginDto } from "../dtos/credentials/login.dto";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getUserById);

usersRouter.post(
  "/register",
  validationMiddleware(CreateUserDto),
  registerUser
);

usersRouter.post("/login", validationMiddleware(LoginDto), loginUser);

export default usersRouter;
