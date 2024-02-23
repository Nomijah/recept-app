import {Unit} from './helperTypes';

export type recipeFormValues = {
    title: string;
    description: string;
    portions: number;
    portionsUnit: string;
    ingredients: {name: string, quantity: number |null, unit: Unit | ""}[];
    instructions: string[];
    categories: string[];
    tags: string[];
    imageUrl: string;
    public: boolean;
}