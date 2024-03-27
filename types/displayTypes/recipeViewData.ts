import { Ingredient } from "../helperTypes/ingredient";
import { MainCategories } from "../helperTypes/mainCategories";

export type RecipeViewData = {
    mainCategory: MainCategories;
    subCategory: string;
    title: string;
    description: string;
    portions: number;
    portionsUnit: string;
    ingredients: Ingredient[];
    instructions: string[];
}