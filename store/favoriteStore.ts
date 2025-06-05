import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: number) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "favorite-posts",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);