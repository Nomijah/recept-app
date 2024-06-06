import { MainCategories } from "../helperTypes/mainCategories";

export type RecipeCreateData = {
  title: string;
  description: string;
  portions: number;
  portionsUnit: string;
  ingredients: { name: string; quantity: number | null; unit: string | "" }[];
  instructions: string[];
  mainCategory: MainCategories | null;
  tags: string[];
  image:
    | {
        fileName: string;
        base64: string;
        fileType: string;
        size: number;
        caption: string;
      }
    | undefined;
  public: boolean;
};
