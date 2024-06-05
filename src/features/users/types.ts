import { type Request } from "express";

export interface UserRepositoryMongooseStructure {
  registerUser: (
    name: string,
    username: string,
    password: string,
  ) => Promise<string>;

  loginUser: (
    username: string,
    userPassword: string,
  ) => Promise<UserCredentials>;
}

export interface UserStructure {
  _id?: string;
  name: string;
  username: string;
  password: string;
}

export type UserCredentials = Pick<UserStructure, "_id" | "username" | "name">;
export type UserCredentialsWithoutId = Omit<UserStructure, "name">;

export type UserRequestStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserStructure
>;

export type UserCredentialsRequestStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentialsWithoutId
>;
