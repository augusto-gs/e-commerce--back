import { type Response, type Request, type NextFunction } from "express";
import endpointNotFound from "../endpointNotFound";
import type CustomError from "../../CustomError/CustomError";

describe("Given a endpointNotFound controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with a 404 status and a 'Endpoint not found' message", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const errorMessage: Partial<CustomError> = {
        message: "Endpoint not found",
        statusCode: 404,
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(errorMessage));
    });
  });
});
