import { Router } from "express";
import GarmentController from "../controller/GarmentsController.js";
import GarmentRepositoryMongoose from "../repository/GarmentMongooseRepository.js";

export const garmentRouter = Router();

const garmentRepository = new GarmentRepositoryMongoose();
const garmentController = new GarmentController(garmentRepository);

garmentRouter.get("/", garmentController.getGarments);
