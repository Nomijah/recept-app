import { MainCategories } from "../helperTypes/mainCategories";
import { Unit } from "../helperTypes/unit";

export type recipeFormValues = {
  title: string;
  description: string;
  portions: number | null;
  portionsUnit: string;
  ingredients: { name: string; quantity: number | null; unit: Unit | "" }[];
  instructions: string[];
  mainCategory: MainCategories | null;
  tags: string[];
  image: File | null;
  caption: string;
  public: boolean;
};
