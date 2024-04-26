"use client";
import React, { useEffect, useState } from "react";
import { RecipeViewData } from "../../../types/displayTypes/recipeViewData";
import LargeImage from "@/components/ui/largeImage";
import { Input } from "@/components/ui/input";

type RecipeDisplayProps = {
  recipe: RecipeViewData;
};

const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  const [portions, setPortions] = useState(recipe.portions);
  const [multiplier, setMultiplier] = useState(1);
  const originalPortions = recipe.portions;

  useEffect(() => {
    setMultiplier(Math.round((portions / originalPortions) * 100) / 100);
  }, [portions, originalPortions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPortions(event.target.valueAsNumber);
  };

  function formatNumber(num: number) {
    const decimalCount =
      (Math.round(num * 100) / 100).toString().split(".")[1]?.length || 0;
    if (decimalCount === 0) {
      return num;
    }
    return (Math.round(num * 100) / 100).toFixed(decimalCount === 1 ? 1 : 2);
  }

  return (
    <div className="div-main">
      <h1 className="recipe-title font-serif">{recipe.title}</h1>
      {recipe.imageUrl && <LargeImage url={recipe.imageUrl} />}
      <div className="mt-2">
        <i>{recipe.description}</i>
      </div>

      <div className="recipe-main sm:justify-center">
        <div className="recipe-part max-w-72 col-start-1 xl:col-start-2 lg:text-left">
          <ul>
            <h3>Ingredienser</h3>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <div className="flex text-left">
                  <div className="min-w-24">
                    {formatNumber(ingredient.quantity * multiplier)}{" "}
                    {ingredient.unit}
                  </div>
                  {ingredient.name}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-3">
            <span>Räcker till:&nbsp;</span>
            <Input
              type="number"
              defaultValue={originalPortions}
              className="w-12 max-h-8 p-1"
              onChange={handleChange}
              min='1'
              max='1000'
            />
            <span>&nbsp;st {recipe.portionsUnit}</span>
          </div>
        </div>

        <div className="recipe-part lg:col-start-2 lg:col-span-2 xl:col-start-3 lg:text-left">
          <ol>
            <h3>Instruktioner</h3>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>
                <div className="flex text-left">
                  <div className="min-w-6 font-semibold">{index + 1}.</div>
                  {instruction}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
