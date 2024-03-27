import { recipeFormValues } from "../types/formTypes/formValues";
import { RecipeCreateData } from "../types/requestTypes/recipeCreateData";
import { convertFileToBase64 } from "./fileHelper";

export async function convertFormValues(
  values: recipeFormValues
): Promise<RecipeCreateData> {
  const recipeCreateData: RecipeCreateData = {
    title: values.title,
    description: values.description,
    portions: values.portions,
    portionsUnit: values.portionsUnit,
    ingredients: values.ingredients,
    instructions: values.instructions,
    mainCategory: values.mainCategory,
    subCategory: values.subCategory && "",
    tags: values.tags,
    image: values.image
      ? {
          fileName: values.image.name,
          base64: await convertFileToBase64(values.image),
          fileType: values.image.type,
          size: values.image.size,
          caption: values.caption && "",
        }
      : undefined,
    public: values.public,
  };
  return recipeCreateData;
}
