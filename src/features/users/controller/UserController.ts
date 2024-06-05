import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import {
  type UserRequestStructure,
  type UserRepositoryMongooseStructure,
  type UserCredentialsRequestStructure,
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

  loginUser = async (
    req: UserCredentialsRequestStructure,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { password, username } = req.body;

      const { _id, name } = await this.userRepository.loginUser(
        username,
        password,
      );

      const userData: JwtPayload = { sub: _id, name };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, {
        expiresIn: "30d",
      });

      res.status(200).json({ token });
    } catch (error) {
      const customError = new CustomError((error as Error).message, 401);

      next(customError);
    }
  };
}

export default UserController;
