'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // This code now runs only on the client
    try {
      const storedFavorites = localStorage.getItem('atelier-luxe-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const updateLocalStorage = (updatedFavorites: string[]) => {
    try {
      localStorage.setItem('atelier-luxe-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  };

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prevFavorites) => {
      const isCurrentlyFavorite = prevFavorites.includes(productId);
      let updatedFavorites;
      if (isCurrentlyFavorite) {
        updatedFavorites = prevFavorites.filter((id) => id !== productId);
      } else {
        updatedFavorites = [...prevFavorites, productId];
      }
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
