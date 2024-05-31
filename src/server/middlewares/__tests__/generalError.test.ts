import { json, type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError";
import generalError from "../generalError";

describe("Given a general error controller", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();

  describe("When it receives a response and a custom error with a status code and an error message", () => {
    const expectedError: Partial<CustomError> = {
      statusCode: 404,
      message: "Endpoint not found",
    };

    test("Then it should call the status method of the response with a 404", async () => {
      const expectedStatusCode = 404;
      await generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method of the response with a 'General Error'", async () => {
      const expectedErrorMessage = { error: "Endpoint not found" };
      await generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When it receives a custom error without a status code", () => {
    test("Then it should call the status method of the response with a 500", async () => {
      const statusCode = 500;
      const expectedError: Partial<CustomError> = {
        message: "Error without a status code",
      };

      await generalError(
        expectedError as CustomError,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
