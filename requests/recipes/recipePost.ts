import { RecipeCreateData } from "@/types/requestTypes/recipeCreateData";
import axios, { AxiosResponse } from "axios";

export async function createRecipe(recipeToCreate: RecipeCreateData) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes/addRecipe`,
      recipeToCreate,
      { withCredentials: true }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
