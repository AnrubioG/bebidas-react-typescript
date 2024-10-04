import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeService";
import { Categories, Drink, Drinks, SerachFilter } from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipes: (serachFilter: SerachFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },

  drinks: {
    drinks: [],
  },

  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },

  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks,
    });
  },

  selectRecipe: async (id) => {
    console.log(id);
  },
});
