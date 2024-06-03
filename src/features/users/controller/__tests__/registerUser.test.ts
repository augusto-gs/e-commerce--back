import { type Response, type Request, type NextFunction } from "express";
import { userMock } from "../../mocks/userMock";
import {
  type UserRequestStructure,
  type UserRepositoryMongooseStructure,
} from "../../types";
import UserController from "../UserController";
import CustomError from "../../../../server/CustomError/CustomError";

describe("Given a registerUser method on a registerUser class", () => {
  const req: Pick<Request, "body"> = {
    body: userMock,
  };

  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a 'test' username and a 'test1234' password", () => {
    const userRepository: Partial<UserRepositoryMongooseStructure> = {
      registerUser: jest.fn().mockReturnValue(userMock.username),
    };

    test("Then it call the status method of response with a 401", async () => {
      const expectedStatuscode = 201;

      const userController = new UserController(
        userRepository as UserRepositoryMongooseStructure,
      );

      await userController.registerUser(
        req as UserRequestStructure,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatuscode);
    });

    test("Then it should call the json method of response with a 'testuser' message", async () => {
      const expectedMessage = userMock.username;

      const userController = new UserController(
        userRepository as UserRepositoryMongooseStructure,
      );

      await userController.registerUser(
        req as UserRequestStructure,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ user: expectedMessage });
    });
  });

  describe("When it receives a request with an already existing username", () => {
    test("Then it should call its next function with a status code 409 and a 'Couldn't create user' message", async () => {
      const expectedError = new CustomError(
        new Error().message,
        409,
        "Couldn't create user",
      );

      const userRepository: Partial<UserRepositoryMongooseStructure> = {
        registerUser: jest.fn().mockRejectedValue("Error"),
      };

      const userController = new UserController(
        userRepository as UserRepositoryMongooseStructure,
      );

      await userController.registerUser(
        req as UserRequestStructure,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
