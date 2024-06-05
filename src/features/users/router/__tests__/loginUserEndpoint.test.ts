import request from "supertest";
import app from "../../../../server/app";
import { credentialsMock } from "../../mocks/userMock";

describe("Given a POST method to a /auth/login endpoint", () => {
  const path = "/auth/login";

  describe("When it receives request with a 'testuser' username and a 'testuser' password", () => {
    test("Then it should respond with a token", async () => {
      const correctStatusCode = 200;

      const response = await request(app)
        .post(path)
        .send(credentialsMock)
        .expect(correctStatusCode);

      const responseBody = response.body as { token: string };

      expect(responseBody).not.toBeUndefined();
    });
  });

  describe("When it receives a request with incorrect credentials", () => {
    test("Then it should respond with a 401 status code and a 'Incorrect credentials' message", async () => {
      const incorrectStatusCode = 401;
      const errorMessage = "Error verifying user Incorrect credentials";

      const response = await request(app)
        .post(path)
        .send({ ...credentialsMock, password: "incorrect" })
        .expect(incorrectStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", errorMessage);
    });
  });
});
