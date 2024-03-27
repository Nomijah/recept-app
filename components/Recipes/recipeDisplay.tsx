import React from "react";
import { RecipeViewData } from "../../types/displayTypes/recipeViewData";
import { Title } from "@mantine/core";

type RecipeDisplayProps = {
  recipe: RecipeViewData;
};

const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  return (
    <>
      <Title>{recipe.title}</Title>
    </>
  );
};

export default RecipeDisplay;
