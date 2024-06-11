import { ResponseBody } from "@/types/dbTypes/responseBody";
import { RecipeCreateData } from "@/types/requestTypes/recipeCreateData";
import axios, { AxiosResponse, AxiosError } from "axios";

export async function createRecipe(recipeToCreate: RecipeCreateData) {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes/addRecipe`,
      recipeToCreate,
      { withCredentials: true }
    );

    console.log(response.data);
    return response.data as ResponseBody;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.request.response as ResponseBody;
    }
    return { isSuccessful: false, errorMessages: [], statusCode: 400 };
  }
}

function isAxiosError(error: any): error is AxiosError {
  return error && error.name === "AxiosError" && typeof error.code === "string";
}
