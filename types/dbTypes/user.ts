export type DbUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    sharedRecipeIds: string[];
    favorites: string[];
    friends: string[];
  };
  