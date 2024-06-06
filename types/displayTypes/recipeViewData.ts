import { Ingredient } from "../helperTypes/ingredient";
import { MainCategories } from "../helperTypes/mainCategories";

export type RecipeViewData = {
  mainCategory: MainCategories;
  title: string;
  description: string;
  portions: number;
  portionsUnit: string;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  tags: string[];
};
