import GarmentController from "./GarmentsController";
import { garmentMocks } from "../mocks/garmentMocks";
import { type NextFunction, type Request, type Response } from "express";

describe("Given a Garments controller", () => {
  const res: Pick<Response, "status" | "json"> = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };

  const req = {};

  const next = jest.fn();

  describe("When it receives a response", () => {
    const garmentRepository = {
      getGarments: jest.fn().mockResolvedValue(garmentMocks),
    };

    test("Then it should call its status method with a 200 status code", async () => {
      const garmentController = new GarmentController(garmentRepository);

      await garmentController.getGarments(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call its json method with the garments", async () => {
      const garmentController = new GarmentController(garmentRepository);

      await garmentController.getGarments(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ garments: garmentMocks });
    });
  });

  describe("When it receives an error", () => {
    test("Then it should call the next function with the error", async () => {
      const expectedError = new Error("Error");

      const garmentRepository = {
        getGarments: jest.fn().mockRejectedValue(expectedError),
      };

      const garmentController = new GarmentController(garmentRepository);

      await garmentController.getGarments(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
