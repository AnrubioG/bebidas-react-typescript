import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadStorage: () => void;
};

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set({
        favorites: get().favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      });
    } else {
      set({
        favorites: [...get().favorites, recipe],
      });
    }

    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },

  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  loadStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
