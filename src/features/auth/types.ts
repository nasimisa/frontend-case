export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}