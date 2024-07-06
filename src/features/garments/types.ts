export interface GarmentStructure extends GarmentStructureWithoutId {
  _id: string;
}

export interface GarmentStructureWithoutId {
  name: string;
  size: "medium" | "large" | "small" | "x-large";
  colors: string[];
  stock: number;
  newArrivals: boolean;
  topSelling: boolean;
  price: number;
  gender: "woman" | "men";
  style: "gym" | "casual" | "formal" | "party";
  imageUrl: string;
}
