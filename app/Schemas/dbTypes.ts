import { Ingredient, MainCategories } from "./helperTypes";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  portions: number;
  portionsUnit: string;
  ingredients: Ingredient[];
  instructions: string[];
  mainCategory: MainCategories;
  subCaregory: string;
  tags: string[];
  imageUrl: string;
  userId: string;
  public: boolean;
  sharedList: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  recipes: Recipe[];
  favorites: Recipe[];
};
