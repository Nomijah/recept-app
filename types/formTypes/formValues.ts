import { MainCategories } from "../helperTypes/mainCategories";
import { Unit } from "../helperTypes/unit";

export type recipeFormValues = {
    title: string;
    description: string;
    portions: number;
    portionsUnit: string;
    ingredients: {name: string, quantity: number |null, unit: Unit | ""}[];
    instructions: string[];
    mainCategory: MainCategories | null;
    subCategory: string;
    tags: string[];
    image: File | null;
    caption: string;
    public: boolean;
}