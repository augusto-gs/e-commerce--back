import { type Request, type Response } from "express";
import PingController from "./PingController";

describe("Given a PingController", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const pingController = new PingController();

  describe("When it receives a response", () => {
    test("Then it should call its status method with a 200", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a message '🏓'", () => {
      const expectedMessage = "🏓";

      pingController.getPong(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
