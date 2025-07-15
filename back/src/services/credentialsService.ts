import { Credential } from "../interfaces/User";

// Array de credenciales de prueba (mock data)
let credentials: Credential[] = [
  { id: 1, username: "john_doe", password: "password123" },
  { id: 2, username: "jane_smith", password: "securepass456" },
  { id: 3, username: "mike_johnson", password: "mypassword789" },
  { id: 4, username: "sarah_wilson", password: "strongpass321" },
  { id: 5, username: "david_brown", password: "davidpass654" },
];

let nextCredentialId = 6;

/**
 * Crea un nuevo par de credenciales
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns ID del par de credenciales creado
 */
export const createCredential = (
  username: string,
  password: string
): number => {
  const newCredential: Credential = {
    id: nextCredentialId++,
    username,
    password,
  };

  credentials.push(newCredential);
  return newCredential.id;
};

/**
 * Valida las credenciales de un usuario
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns ID de las credenciales si son válidas, null si no
 */
export const validateCredential = (
  username: string,
  password: string
): number | null => {
  const credential = credentials.find(
    (cred) => cred.username === username && cred.password === password
  );

  return credential ? credential.id : null;
};

/**
 * Obtiene todas las credenciales (para propósitos de debugging)
 * @returns Array de todas las credenciales
 */
export const getAllCredentials = (): Credential[] => {
  return credentials;
};

/**
 * Busca una credencial por nombre de usuario
 * @param username - Nombre de usuario a buscar
 * @returns Credencial encontrada o undefined si no existe
 */
export const getCredentialByUsername = (
  username: string
): Credential | undefined => {
  return credentials.find((cred) => cred.username === username);
};
