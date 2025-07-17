import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { CreateUserDto } from "../dtos/users/create-user.dto";
import { hash } from "bcrypt";
import { Repository } from "typeorm";

/**
 * Servicio para manejar operaciones relacionadas con usuarios.
 * Utiliza TypeORM para interactuar con la base de datos.
 */

/**
 * Obtiene todos los usuarios con sus relaciones
 * @returns Promise<User[]> - Array de todos los usuarios
 */
export const getAllUsers = async (): Promise<User[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.find({
    relations: ["appointments"],
  });
};

/**
 * Obtiene un usuario por su ID
 * @param id - ID del usuario a buscar
 * @returns Promise<User | null> - Usuario encontrado o null si no existe
 */
export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { id },
    relations: ["appointments", "credential"],
  });
};

/**
 * Obtiene un usuario por el ID de sus credenciales
 * @param credentialId - ID de las credenciales del usuario
 * @returns Promise<User | null> - Usuario encontrado o null si no existe
 */
export const getUserByCredentialsId = async (
  credentialId: number
): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { credential: { id: credentialId } },
    relations: ["credential", "appointments"],
  });
};

/**
 * Obtiene un usuario por su email
 * @param email - Email del usuario a buscar
 * @returns Promise<User | null> - Usuario encontrado o null si no existe
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: { email },
    relations: ["credential"],
  });
};

/**
 * Crea un nuevo usuario con sus credenciales
 * @param userData - DTO con los datos del usuario
 * @returns Promise<User> - Usuario creado
 * @throws Error si el email, DNI o username ya existen
 */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);

  // Verificar que el email no exista ya
  const existingUserByEmail = await getUserByEmail(userData.email);
  if (existingUserByEmail) {
    throw new Error("El email ya está registrado");
  }

  // Verificar que el DNI no exista ya
  const existingUserByDni = await userRepository.findOne({
    where: { nDni: userData.nDni },
  });
  if (existingUserByDni) {
    throw new Error("El DNI ya está registrado");
  }

  // Verificar que el username no exista ya
  const existingCredential = await credentialRepository.findOne({
    where: { username: userData.username },
  });
  if (existingCredential) {
    throw new Error("El nombre de usuario ya existe");
  }

  // Iniciar transacción
  return await AppDataSource.transaction(async (manager) => {
    // 1. Crear el usuario
    const newUser = manager.create(User, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      nDni: userData.nDni,
    });

    const savedUser = await manager.save(User, newUser);

    // 2. Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await hash(userData.password, saltRounds);

    // 3. Crear las credenciales
    const newCredential = manager.create(Credential, {
      username: userData.username,
      passwordHash: hashedPassword,
      userId: savedUser.id,
    });

    await manager.save(Credential, newCredential);
    console.log(`User ${savedUser.id} created successfully.`);

    return manager.findOneOrFail(User, {
      where: { id: savedUser.id },
      relations: ["credential"],
    });
  });
};
