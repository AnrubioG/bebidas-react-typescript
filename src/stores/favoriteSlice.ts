import { StateCreator } from "zustand";
import { Recipe } from "../types";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set({
        favorites: get().favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      });
      createNotificationSlice(set, get, api).showNotification({
        text: "Eliminated from favorites",
        error: false,
      });
    } else {
      set({
        favorites: [...get().favorites, recipe],
      });
      createNotificationSlice(set, get, api).showNotification({
        text: "Added to favorites",
        error: false,
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
