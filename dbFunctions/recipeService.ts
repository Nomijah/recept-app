import { Recipe } from '@/app/Schemas/dbTypes';
import cosmosClient from './cosmosClient';

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
