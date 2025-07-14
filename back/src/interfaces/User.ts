/**
 * Representa un usuario en el sistema.
 *
 * @property {number} id - Identificador único del usuario.
 * @property {string} name - Nombre completo del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} birthdate - Fecha de nacimiento del usuario (formato string).
 * @property {string} nDni - Número de documento nacional de identidad del usuario.
 * @property {number} credentialsId - Identificador de las credenciales asociadas al usuario.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  nDni: string;
  credentialsId: number;
}

export interface Credential {
  id: number;
  username: string;
  password: string;
}
