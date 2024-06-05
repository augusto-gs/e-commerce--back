import { type UserCredentialsWithoutId, type UserStructure } from "../types";

export const userMock: UserStructure = {
  name: "Test Name",
  username: "testuser",
  password: "testuser",
};

export const credentialsMock: UserCredentialsWithoutId = {
  username: userMock.username,
  password: userMock.password,
};
