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
