import { Ingredient } from "../helperTypes/ingredient";
import { MainCategories } from "../helperTypes/mainCategories";

export type DbRecipe = {
  _id: string;
  title: string;
  description: string;
  portions: number;
  portionsUnit: string;
  ingredients: Ingredient[];
  instructions: string[];
  mainCategory: MainCategories;
  subCategory: string;
  tags: string[];
  imageMetaData: {
    fileName: string;
    fileType: string;
    caption: string;
    imageUrl: string;
  }
  userId: string;
  public: boolean;
  sharedList: string[];
};
