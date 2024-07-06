import { type Response, type Request } from "express";
import { type GarmentRepositoryMongooseStructure } from "../types";

class GarmentController {
  constructor(public garmentRepository: GarmentRepositoryMongooseStructure) {}

  async getGarments(_req: Request, res: Response): Promise<void> {
    try {
      const garments = await this.garmentRepository.getGarments();

      res.status(200).json(garments);
    } catch (error) {
      res.status(500).json({
        message: `Error getting garments ${error.message}`,
      });
    }
  }
}

export default GarmentController;
