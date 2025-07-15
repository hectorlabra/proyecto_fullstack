import { User } from "../interfaces/User";
import {
  createCredential,
  getCredentialByUsername,
} from "./credentialsService";

// Array de usuarios de prueba (mock data)
let users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    birthdate: "1990-05-15",
    nDni: "12345678",
    credentialsId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    birthdate: "1985-08-22",
    nDni: "87654321",
    credentialsId: 2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    birthdate: "1992-12-03",
    nDni: "11223344",
    credentialsId: 3,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    birthdate: "1988-03-18",
    nDni: "44332211",
    credentialsId: 4,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    birthdate: "1995-09-07",
    nDni: "55667788",
    credentialsId: 5,
  },
];

let nextUserId = 6;

/**
 * Obtiene todos los usuarios
 * @returns Array de todos los usuarios
 */
export const getAllUsers = (): User[] => {
  return users;
};

/**
 * Obtiene un usuario por su ID
 * @param id - ID del usuario a buscar
 * @returns Usuario encontrado o undefined si no existe
 */
export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

/**
 * Obtiene un usuario por el ID de sus credenciales
 * @param credentialId - ID de las credenciales del usuario
 * @returns Usuario encontrado o undefined si no existe
 */
export const getUserByCredentialsId = (
  credentialId: number
): User | undefined => {
  return users.find((user) => user.credentialsId === credentialId);
};

/**
 * Crea un nuevo usuario
 * @param userData - Datos del usuario (name, email, birthdate, nDni, username, password)
 * @returns Usuario creado
 */
export const createUser = (userData: {
  name: string;
  email: string;
  birthdate: string;
  nDni: string;
  username: string;
  password: string;
}): User => {
  // 1. Verificar que el email no exista ya
  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  // 2. Verificar que el DNI no exista ya
  const existingDni = users.find((user) => user.nDni === userData.nDni);
  if (existingDni) {
    throw new Error("El DNI ya está registrado");
  }

  // 3. Verificar que el username no exista ya en las credenciales
  const existingCredential = getCredentialByUsername(userData.username);
  if (existingCredential) {
    throw new Error("El nombre de usuario ya existe");
  }

  // 4. Crear las credenciales primero
  const credentialsId = createCredential(userData.username, userData.password);

  // 5. Crear el usuario
  const newUser: User = {
    id: nextUserId++,
    name: userData.name,
    email: userData.email,
    birthdate: userData.birthdate,
    nDni: userData.nDni,
    credentialsId,
  };

  users.push(newUser);
  return newUser;
};
