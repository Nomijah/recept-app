import { Recipe } from '@/app/Schemas/dbTypes';
import cosmosClient from './cosmosClient';
import { SqlQuerySpec } from '@azure/cosmos';

const databaseId = process.env.NEXT_PUBLIC_AZURE_DB_ID || '';
const containerId = process.env.NEXT_PUBLIC_AZURE_DB_RECIPE_CONTAINER_ID || '';

const client = cosmosClient();

/**
 * Create recipe item if it does not exist
 */
export async function createRecipe(recipe: Recipe) {
    const { item } = await client
      .database(databaseId)
      .container(containerId)
      .items.upsert(recipe)
    console.log(`Created recipe with id:\n${item.id}\n`)
  }

  /**
 * Delete the item by ID.
 */
export async function deleteRecipe(recipe: Recipe) {
  await client
    .database(databaseId)
    .container(containerId)
    .item(recipe.id)
    .delete<Recipe>()
  console.log(`Deleted item:\n${recipe.id}\n`)
}

export async function getAllUserRecipes(userId: string) {
  const query = {
    query: `SELECT * FROM r WHERE r.userId = @userId 
    ORDER BY results.title`,
    parameters: [
      {
        name: '@userId',
        value: userId
      }
    ]
  }

  return await getRecipes(query);
}

export async function getAllPublicRecipes() {
  const query = 
    `SELECT * FROM r WHERE r.public = true
    ORDER BY results.title`;

  return await getRecipes(query);
}

async function getRecipes(query: string | SqlQuerySpec) {
  const { resources } = await client
  .database(databaseId)
  .container(containerId)
  .items.query(query)
  .fetchAll()

  if (resources.length === 0) {
    return [];
  }
  
  return resources;
}