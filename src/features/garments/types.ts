export interface GarmentStructure extends GarmentStructureWithoutId {
  _id: string;
}

type GarmentStyle = "gym" | "casual" | "formal" | "party";
type GarmentGender = "woman" | "men";
type GarmentSize = "medium" | "large" | "small" | "x-large";
export interface GarmentStructureWithoutId {
  name: string;
  size: GarmentSize;
  colors: string[];
  stock: number;
  newArrivals: boolean;
  topSelling: boolean;
  price: number;
  gender: GarmentGender;
  style: GarmentStyle;
  imageUrl: string;
}

export interface GarmentRepositoryMongooseStructure {
  getGarments: () => Promise<GarmentStructure[]>;
}
