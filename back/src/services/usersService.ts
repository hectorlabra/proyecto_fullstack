import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { logger } from "../config/logger";

export const getAllUsers = async (): Promise<User[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.find({
    relations: ["appointments"],
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { id },
    relations: ["appointments", "credential"],
  });
};

export const getUserByCredentialsId = async (
  credentialId: number
): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { credential: { id: credentialId } },
    relations: ["credential", "appointments"],
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { email },
    relations: ["credential"],
  });
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);

  if (userData.password !== userData.confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const existingUserByEmail = await getUserByEmail(userData.email);
  if (existingUserByEmail) {
    throw new Error("El email ya está registrado");
  }

  const existingUserByDni = await userRepository.findOne({
    where: { nDni: userData.nDni },
  });
  if (existingUserByDni) {
    throw new Error("El DNI ya está registrado");
  }

  const existingCredential = await credentialRepository.findOne({
    where: { username: userData.username },
  });
  if (existingCredential) {
    throw new Error("El nombre de usuario ya existe");
  }

  return await AppDataSource.transaction(async (manager) => {
    const { confirmPassword, ...safeUserData } = userData;

    const newUser = manager.create(User, {
      firstName: safeUserData.firstName,
      lastName: safeUserData.lastName,
      email: safeUserData.email,
      phone: safeUserData.phone,
      dateOfBirth: safeUserData.dateOfBirth,
      nDni: safeUserData.nDni,
    });

    const savedUser = await manager.save(User, newUser);

    const saltRounds = 10;
    const hashedPassword = await hash(safeUserData.password, saltRounds);

    const newCredential = manager.create(Credential, {
      username: safeUserData.username,
      passwordHash: hashedPassword,
      userId: savedUser.id,
    });

    await manager.save(Credential, newCredential);
    logger.info(
      { userId: savedUser.id, username: userData.username },
      "Usuario creado exitosamente"
    );

    return manager.findOneOrFail(User, {
      where: { id: savedUser.id },
      relations: ["credential"],
    });
  });
};
