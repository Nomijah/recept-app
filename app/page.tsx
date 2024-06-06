// "use client";
import { RecipeViewData } from "@/types/displayTypes/recipeViewData";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  const recipeTest: RecipeViewData = {
    title: "Stroganoff",
    description: "Jäkligt gott",
    portions: 4,
    portionsUnit: "portioner",
    ingredients: [
      { name: "Körv", quantity: 5, unit: "st" },
      { name: "Ris", quantity: 4, unit: "dl" },
    ],
    instructions: ["koka", "i gryta", "färdigt"],
    mainCategory: "Varmrätter",
    tags: ["korv", "ris"],
    imageUrl: "http://testarbara.nu",
  };

  // const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const result = await createRecipe(recipeTest);

  // };

  return (
    <main>
      <h1>hallå</h1>
      <a href="/recipe">Recipe</a>
      <a href="/recipe/add-recipe">
        <Button>Add Recipe</Button>
      </a>
    </main>
  );
}
