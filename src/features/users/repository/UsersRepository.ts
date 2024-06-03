import User from "../model/User.js";
import bcrypt from "bcrypt";
import {
  type UserStructure,
  type UserRepositoryMongooseStructure,
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

    if (!newUser) {
      throw new Error("Username already exists");
    }

    return newUser.username;
  }
}

export default UserRepository;
