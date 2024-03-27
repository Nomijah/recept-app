"use client";
import { Anchor, Button } from "@mantine/core";
import styles from "./page.module.css";
import { DbRecipe } from "../types/dbTypes/dbRecipe";
import { createRecipe } from "@/dbFunctions/recipeService";
import { RecipeViewData } from "@/types/displayTypes/recipeViewData";

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
    subCategory: "Husman",
    tags: ["korv", "ris"],
    imageUrl: "http://testarbara.nu",
  };

  // const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const result = await createRecipe(recipeTest);

  // };

  return (
    <main className={styles.main}>
      <h1>hallå</h1>
      <Anchor href="/recipe">Recipe</Anchor>
      <Anchor href="/recipe/add-recipe">
        <Button size="large">Add Recipe</Button>
      </Anchor>
    </main>
  );
}
