import RecipeDisplay from "@/components/Recipes/recipeDisplay";
import { RecipeViewData } from "@/types/displayTypes/recipeViewData";

type PageParams = {
  params: {
    name: string;
  };
};

export default function Page({ params }: PageParams) {
  const testRecipe: RecipeViewData = {
    title: "Pytt i Panna",
    description: "Det här är en väldigt god rätt med många möjligheter till variation.",
    mainCategory: "Varmrätter",
    subCategory: "Husman",
    portions: 4,
    portionsUnit: "Portioner",
    ingredients: [
      { name: "Kokt potatis", quantity: 5, unit: "st"},
      { name: "Lök", quantity: 1, unit: "st"},
      { name: "Körv", quantity: 300, unit: "g"},
      { name: "Smör", quantity: 1, unit: "msk"},
      { name: "Ägg", quantity: 4, unit: "st"}
    ],
    instructions: ["Tärna potatis och körv i kuber, ca 1cm stora. Hacka löken smått och hetta upp en stekpanna med smör.",
  "Stek alltsammans på medelvärme tills löken brynts och körv o potatis fått färg.",
"Servera med stekt ägg och inlagda rödbetor."],

  }
  return (
    <RecipeDisplay recipe={testRecipe} />
  )
}
