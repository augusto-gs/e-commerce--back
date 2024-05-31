import PingController from "../controller/PingController.js";
import { Router } from "express";

export const pingRouter = Router();

const pingController = new PingController();

pingRouter.get("/", pingController.getPong);
