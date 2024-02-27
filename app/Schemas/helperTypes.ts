export type Unit =
  | "ml"
  | "cl"
  | "dl"
  | "l"
  | "g"
  | "kg"
  | "nypa"
  | "krm"
  | "st"
  | "kkp"
  | "msk"
  | "tsk";

// List of all unit types for use in optionbox etc.
export const unitsList: Unit[] = [
  "krm",
  "tsk",
  "msk",
  "dl",
  "g",
  "kg",
  "ml",
  "cl",
  "l",
  "nypa",
  "st",
  "kkp",
];

export type Ingredient = {
  name: string;
  quantity: number;
  unit: Unit;
};

export type MainCategories =
  | "Förrätter"
  | "Varmrätter"
  | "Efterrätter"
  | "Plockmat"
  | "Bakning"
  | "Drinkar"
  | "Övrigt";

export const mainCategoriesList = [
  "Förrätter",
  "Varmrätter",
  "Efterrätter",
  "Plockmat",
  "Bakning",
  "Drinkar",
  "Övrigt"
];
