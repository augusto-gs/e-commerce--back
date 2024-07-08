import { model, Schema } from "mongoose";
import { type GarmentStructure } from "../types";

const garmentSchema = new Schema<GarmentStructure>({
  colors: { type: [String], required: true },
  gender: { type: String, required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  newArrivals: { type: Boolean, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  style: { type: String, required: true },
  topSelling: { type: Boolean, required: true },
});

const Movie = model("Garment", garmentSchema, "garments");

export default Movie;
