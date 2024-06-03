import { Router } from "express";
import UserController from "../controller/UserController.js";
import UserRepository from "../repository/UsersRepository.js";

export const userRouter = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

userRouter.post("/register", userController.registerUser);
