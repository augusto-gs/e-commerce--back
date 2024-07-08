import request from "supertest";
import Garment from "../model/Garment";
import { garmentMocks } from "../mocks/garmentMocks";
import app from "../../../server/app";
import { type GarmentStructure } from "../types";

describe("Given a GET/garments path", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and a Blue Navy Chinos and White Linen Shirt", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get("/garments")
        .expect(expectedStatusCode);

      await Garment.create(garmentMocks[0]);
      await Garment.create(garmentMocks[1]);

      const responseBody = response.body as { garments: GarmentStructure[] };

      responseBody.garments.forEach((garment, garmentPosition) => {
        expect(garment).toHaveProperty(
          "name",
          garmentMocks[garmentPosition].name,
        );
      });
    });
  });
});
