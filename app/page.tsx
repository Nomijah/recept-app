"use client";
import { Anchor, Button } from "@mantine/core";
import styles from "./page.module.css";
import {Recipe} from "./Schemas/dbTypes";
import { createRecipe } from "@/dbFunctions/recipeService";

export default function Home() {

  const recipeTest: Recipe = {
    id: '',
    name: 'Stroganoff',
    description: 'Jäkligt gott',
    ingredients: [{name: 'Körv', quantity: 5, unit: 'st'}, {name: 'Ris', quantity: 4, unit: 'dl'}],
    instructions: ['koka', 'i gryta', 'färdigt'],
    categories: ['Varmrätt', 'Husman'],
    tags: ['korv', 'ris'],
    imageUrl: 'http://testarbara.nu',
    userId: 'Hästen',
    public: true,
    sharedList: [],
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = await createRecipe(recipeTest);
    
  };

  return <main className={styles.main}>
    <h1>hallå</h1>
    <Anchor href="/recipe">Recipe</Anchor>
    <Button size="large" onClick={handleClick}>Add Recipe</Button>
  </main>;
}
