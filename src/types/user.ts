// src/types/user.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  age: number;
  address?: string;
  phoneNumber?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  address?: string;
  phoneNumber?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: string;
  age?: number;
  address?: string;
  phoneNumber?: string;
}