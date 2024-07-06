import Garment from "../model/Garment.js";
import {
  type GarmentStructure,
  type GarmentRepositoryMongooseStructure,
} from "../types.js";

class GarmentMongooseRepository implements GarmentRepositoryMongooseStructure {
  async getGarments(): Promise<GarmentStructure[]> {
    try {
      const garments = await Garment.find().limit(10).sort({ _id: 1 });

      return garments;
    } catch (error) {
      throw new Error("Error getting garments " + (error as Error).message);
    }
  }
}

export default GarmentMongooseRepository;
