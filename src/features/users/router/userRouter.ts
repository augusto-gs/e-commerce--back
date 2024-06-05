import { Router } from "express";
import UserController from "../controller/UserController.js";
import UserRepository from "../repository/UsersRepository.js";
import { loginValidation, registerValidation } from "../schema/userSchema.js";

export const userRouter = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

userRouter.post("/register", registerValidation, userController.registerUser);
userRouter.post("/login", loginValidation, userController.loginUser);
