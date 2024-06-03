import { type NextFunction, type Response } from "express";
import {
  type UserRequestStructure,
  type UserRepositoryMongooseStructure,
} from "../types";
import CustomError from "../../../server/CustomError/CustomError.js";

class UserController {
  constructor(public userRepository: UserRepositoryMongooseStructure) {}
  registerUser = async (
    req: UserRequestStructure,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { password, username, name } = req.body;
      const statusCode = 201;

      const newUser = await this.userRepository.registerUser(
        name,
        username,
        password,
      );

      res.status(statusCode).json({ user: newUser });
    } catch (error) {
      const statusCode = 409;

      const authError = new CustomError(
        (error as Error).message,
        statusCode,
        "Couldn't create user",
      );

      next(authError);
    }
  };
}

export default UserController;
