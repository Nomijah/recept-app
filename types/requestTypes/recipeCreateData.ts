import { MainCategories } from "../helperTypes/mainCategories";

export type RecipeCreateData = {
  title: string;
  description: string;
  portions: number;
  portionsUnit: string;
  ingredients: {name: string, quantity: number |null, unit: string | ""}[];
  instructions: string[];
  mainCategory: MainCategories | null;
  subCategory: string;
  tags: string[];
  image: {
    fileName: string;
    fileType: string;
    size: number;
    base64: string;
    caption: string;
  } | undefined;
  public: boolean;
};
