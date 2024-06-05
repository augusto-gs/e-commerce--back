import User from "../model/User.js";
import bcrypt from "bcrypt";
import {
  type UserStructure,
  type UserRepositoryMongooseStructure,
  type UserCredentials,
} from "../types";

class UserRepository implements UserRepositoryMongooseStructure {
  async registerUser(
    name: string,
    username: string,
    password: string,
  ): Promise<string> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create<UserStructure>({
      name,
      username,
      password: hashedPassword,
    });

    return newUser.username;
  }

  async loginUser(
    username: string,
    userPassword: string,
  ): Promise<UserCredentials> {
    try {
      const user = await User.findOne({ username });

      if (!(await bcrypt.compare(userPassword, user!.password))) {
        throw new Error("Incorrect credentials");
      }

      const { password, ...userWithoutPassword } = user!.toJSON();

      return userWithoutPassword;
    } catch (error) {
      throw new Error("Error verifying user" + (error as Error).message);
    }
  }
}

export default UserRepository;
