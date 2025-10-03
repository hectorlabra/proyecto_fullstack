import { AppDataSource } from "../data-source";
import { Credential } from "../entities/Credential.entity";
import { LoginDto } from "../dtos/credentials/login.dto";
import { compare } from "bcrypt";
import { Repository } from "typeorm";

export const validateCredential = async (
  loginData: LoginDto
): Promise<Credential | null> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);

  const credential = await credentialRepository.findOne({
    where: { username: loginData.username },
    relations: ["user"],
  });

  if (!credential) {
    return null;
  }

  const isPasswordValid = await compare(
    loginData.password,
    credential.passwordHash
  );

  return isPasswordValid ? credential : null;
};

export const getAllCredentials = async (): Promise<Credential[]> => {
  const credentialRepository: Repository<Credential> =
    AppDataSource.getRepository(Credential);
  return await credentialRepository.find({
    relations: ["user"],
  });
};

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
