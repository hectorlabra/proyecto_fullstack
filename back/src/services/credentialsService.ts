import { AppDataSource } from "../data-source";
import { Credential } from "../entities/Credential.entity";
import { LoginDto } from "../dtos/credentials/login.dto";
import { compare } from "bcrypt";
import { Repository } from "typeorm";

/**
 * Servicio para manejar operaciones relacionadas con credenciales.
 * Utiliza TypeORM para interactuar con la base de datos.
 */

/**
 * Valida las credenciales de un usuario
 * @param loginData - DTO con username y password
 * @returns Promise<Credential | null> - Credencial válida o null si no son válidas
 */
export const validateCredential = async (
  loginData: LoginDto
): Promise<Credential | null> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);

  // Buscar las credenciales por username
  const credential = await credentialRepository.findOne({
    where: { username: loginData.username },
    relations: ["user"],
  });

  if (!credential) {
    return null;
  }

  // Verificar la contraseña usando bcrypt
  const isPasswordValid = await compare(
    loginData.password,
    credential.passwordHash
  );

  return isPasswordValid ? credential : null;
};

/**
 * Obtiene todas las credenciales (para propósitos de debugging)
 * @returns Promise<Credential[]> - Array de todas las credenciales
 */
export const getAllCredentials = async (): Promise<Credential[]> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);
  return await credentialRepository.find({
    relations: ["user"],
  });
};

/**
 * Busca una credencial por nombre de usuario
 * @param username - Nombre de usuario a buscar
 * @returns Promise<Credential | null> - Credencial encontrada o null si no existe
 */
export const getCredentialByUsername = async (
  username: string
): Promise<Credential | null> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);
  return await credentialRepository.findOne({
    where: { username },
    relations: ["user"],
  });
};

/**
 * Busca una credencial por ID
 * @param id - ID de la credencial a buscar
 * @returns Promise<Credential | null> - Credencial encontrada o null si no existe
 */
export const getCredentialById = async (
  id: number
): Promise<Credential | null> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);
  return await credentialRepository.findOne({
    where: { id },
    relations: ["user"],
  });
};
