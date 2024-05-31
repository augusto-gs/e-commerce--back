import request from "supertest";
import app from "../../app";

describe("Given any method to an /incorrect endpoint ", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and a 'Endpoint not found' message", async () => {
      const statusCode = 404;
      const incorrectPath = "/incorrect";
      const expectedErrorMessage = "Endpoint not found";

      const response = await request(app).get(incorrectPath).expect(statusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
