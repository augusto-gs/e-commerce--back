import { type Response, type Request, type NextFunction } from "express";
import { userMock } from "../../mocks/userMock";
import type UserRepository from "../../repository/UsersRepository";
import {
  type UserCredentialsRequestStructure,
  type UserRepositoryMongooseStructure,
} from "../../types";
import UserController from "../UserController";
import jwt from "jsonwebtoken";
import CustomError from "../../../../server/CustomError/CustomError";

describe("Given a loginUser method on a UserController class", () => {
  const { name, _id, ...requestBody } = userMock;

  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const req: Pick<Request, "body"> = {
    body: requestBody,
  };

  const next = jest.fn();

  describe("When it receives a request with a 'testuser' username and a 'testuser' password", () => {
    test("Then it should call the status method of response with a 200 status code", async () => {
      const statusCode = 200;

      const userRepository: Partial<UserRepositoryMongooseStructure> = {
        loginUser: jest.fn().mockReturnValue(userMock.username),
      };

      const userController = new UserController(
        userRepository as UserRepository,
      );

      await userController.loginUser(
        req as UserCredentialsRequestStructure,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the json method of response with a token 'AHRTPIUHQR3PTIUY53PNTY'", async () => {
      const token = "AHRTPIUHQR3PTIUY53PNTY";
      jwt.sign = jest.fn().mockReturnValue(token);

      const userRepository: Partial<UserRepositoryMongooseStructure> = {
        loginUser: jest.fn().mockReturnValue(userMock.username),
      };

      const userController = new UserController(
        userRepository as UserRepository,
      );

      await userController.loginUser(
        req as UserCredentialsRequestStructure,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with incorrect credentials", () => {
    test("Then it should respond with status code of 401 and a 'Incorrect credentials' messasge", async () => {
      const expectedError = new CustomError(new Error().message, 409);

      const userRepository: Partial<UserRepositoryMongooseStructure> = {
        loginUser: jest.fn().mockRejectedValue("Error"),
      };

      const userController = new UserController(
        userRepository as UserRepository,
      );

      await userController.loginUser(
        req as UserCredentialsRequestStructure,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
