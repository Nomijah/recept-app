"use client";
import React, { useEffect, useState } from "react";
import { RecipeViewData } from "../../../types/displayTypes/recipeViewData";
import LargeImage from "@/components/ui/largeImage";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@mantine/core";

type RecipeDisplayProps = {
  recipe: RecipeViewData;
};

const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  const [portions, setPortions] = useState<string | number>(recipe.portions);
  const [multiplier, setMultiplier] = useState(1);
  const originalPortions = recipe.portions;

  useEffect(() => {
    setMultiplier(
      Math.round((parseInt(portions.toString()) / originalPortions) * 100) / 100
    );
  }, [portions, originalPortions]);

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

      <div className="recipe-main sm:justify-center @container">
        <div className="recipe-part max-w-72 col-start-2 lg:text-left">
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
          <div className="flex flex-col @xs:flex-row justify-center items-center mt-4 mb-1">
            <span>Räcker till:&nbsp;</span>
            <div className="flex items-center">
              <NumberInput
                value={portions}
                className="w-16 max-h-8"
                min={1}
                onChange={setPortions}
              />
              <span>&nbsp;st {recipe.portionsUnit}</span>
            </div>
          </div>
        </div>

        <div className="recipe-part col-start-3 col-span-2 lg:text-left">
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
