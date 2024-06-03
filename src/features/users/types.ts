export interface UserRepositoryMongooseStructure {
  registerUser: (
    name: string,
    username: string,
    password: string,
  ) => Promise<string>;
}

export interface UserStructure {
  name: string;
  username: string;
  password: string;
}
