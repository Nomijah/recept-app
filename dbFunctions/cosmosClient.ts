import { CosmosClient } from "@azure/cosmos";

const url = require('url');

type clientOptions = {
    endpoint: string;
    key: string;
    userAgentSuffix: string;
}

const cosmosClient = () => {

    const options: clientOptions = {
        endpoint: process.env.NEXT_PUBLIC_AZURE_DB_ENDPOINT || '',
        key: process.env.NEXT_PUBLIC_AZURE_DB_KEY || '',
        userAgentSuffix: 'RecipeApp',
    }
    return new CosmosClient(options)
}

export default cosmosClient;