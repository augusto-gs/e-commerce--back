import { type Request } from "express";

export interface UserRepositoryMongooseStructure {
  registerUser: (
    name: string,
    username: string,
    password: string,
  ) => Promise<string>;
}

export interface UserStructure {
  name: string;
  username: string;
  password: string;
}

export type UserRequestStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserStructure
>;
