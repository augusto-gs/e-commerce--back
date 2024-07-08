import { type Response, type Request, type NextFunction } from "express";
import type GarmentMongooseRepository from "../repository/GarmentMongooseRepository";

class GarmentController {
  constructor(public garmentRepository: GarmentMongooseRepository) {}

  getGarments = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const garments = await this.garmentRepository.getGarments();

      res.status(200).json({ garments });
    } catch (error) {
      next(error);
    }
  };
}

export default GarmentController;
