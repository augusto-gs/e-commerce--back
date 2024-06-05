import request from "supertest";
import app from "../../../../server/app";
import { userMock } from "../../mocks/userMock";
import User from "../../model/User";

describe("Given a POST method to a /auth/register path", () => {
  const path = "/auth/register";

  describe("When it receives a request with a 'testuser' name, a 'testuser' password and a 'testuser' username", () => {
    test("Then it should respond with a 201 status code and a 'testuser' message", async () => {
      const expectedStatusCode = 201;

      const response = await request(app)
        .post(path)
        .send({ ...userMock, username: "test-user" })
        .expect(expectedStatusCode);

      const responseBody = response.body as { user: string };

      expect(responseBody).toHaveProperty("user", "test-user");
    });

    describe("When it receives a request with an already created username", () => {
      test("Then it should respond with a 'Couldn't create user' message", async () => {
        const expectedErrorMessage = "Couldn't create user";
        const expectedWrongStatus = 409;

        const response = await request(app)
          .post(path)
          .send(userMock)
          .expect(expectedWrongStatus);

        const responseBody = response.body as { error: string };

        expect(responseBody.error).toContain(expectedErrorMessage);

        await User.findByIdAndDelete();
      });
    });
  });

  describe("When it receives a request without a password", () => {
    test("Then it should respond with a 400 and a 'password is required' message", async () => {
      const expectedWrongStatus = 400;
      const credentialsWithoutPassword = {
        username: "testuser",
      };
      const expectedError = { error: "name is required" };

      const response = await request(app)
        .post(path)
        .send(credentialsWithoutPassword)
        .expect(expectedWrongStatus);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
