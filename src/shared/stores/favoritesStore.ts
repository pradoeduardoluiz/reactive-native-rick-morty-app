/**
 * Favorites Store
 * Manages favorite character IDs with Zustand + AsyncStorage persistence
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'rick-morty:favorites';

interface FavoritesState {
  /** Array of favorited character IDs */
  favorites: number[];

  /** Add a character ID to favorites */
  addFavorite: (id: number) => void;

  /** Remove a character ID from favorites */
  removeFavorite: (id: number) => void;

  /** Toggle a character ID in favorites */
  toggleFavorite: (id: number) => void;

  /** Returns true if the character ID is in favorites */
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id: number) => {
        if (!get().isFavorite(id)) {
          set(state => ({ favorites: [...state.favorites, id] }));
        }
      },

      removeFavorite: (id: number) => {
        set(state => ({ favorites: state.favorites.filter(favId => favId !== id) }));
      },

      toggleFavorite: (id: number) => {
        if (get().isFavorite(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      isFavorite: (id: number) => get().favorites.includes(id),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
