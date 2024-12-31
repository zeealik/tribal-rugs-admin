// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: string;
}