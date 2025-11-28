
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isFavoritesLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_FAVORITES_KEY = 'ezcentials-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const loadLocalFavorites = useCallback((): string[] => {
    try {
      const localFavoritesJson = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return localFavoritesJson ? JSON.parse(localFavoritesJson) : [];
    } catch (error) {
      console.error("Failed to load favorites from local storage:", error);
      return [];
    }
  }, []);

  const saveLocalFavorites = useCallback((favoritesToSave: string[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favoritesToSave));
    } catch (error) {
      console.error("Failed to save favorites to local storage:", error);
    }
  }, []);
  
  const fetchFirestoreFavorites = useCallback(async (userId: string): Promise<string[]> => {
    if (!firestore) return [];
    try {
      const favDocRef = doc(firestore, 'userProfiles', userId, 'favorites', 'default');
      const docSnap = await getDoc(favDocRef);
      if (docSnap.exists()) {
        return docSnap.data().productIds || [];
      }
      return [];
    } catch (e) {
      const permissionError = new FirestorePermissionError({
        path: `userProfiles/${userId}/favorites/default`,
        operation: 'get',
      });
      errorEmitter.emit('permission-error', permissionError);
      return [];
    }
  }, [firestore]);

  const syncFavorites = useCallback(async (localFavorites: string[], remoteFavorites: string[], userId: string) => {
    if (!firestore) return remoteFavorites;
    
    const mergedFavorites = Array.from(new Set([...localFavorites, ...remoteFavorites]));

    try {
      const favDocRef = doc(firestore, 'userProfiles', userId, 'favorites', 'default');
      await setDoc(favDocRef, { productIds: mergedFavorites });
      
      localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY); // Clear local after sync
      return mergedFavorites;
    } catch (e) {
       const permissionError = new FirestorePermissionError({
          path: `userProfiles/${userId}/favorites/default`,
          operation: 'write',
          requestResourceData: { productIds: mergedFavorites }
       });
       errorEmitter.emit('permission-error', permissionError);
       return remoteFavorites;
    }
  }, [firestore]);


  useEffect(() => {
    const initializeFavorites = async () => {
      if (isUserLoading) return;
      
      setIsFavoritesLoading(true);
      const localFavorites = loadLocalFavorites();

      if (user && firestore) {
        const remoteFavorites = await fetchFirestoreFavorites(user.uid);
        if (localFavorites.length > 0) {
          const syncedFavorites = await syncFavorites(localFavorites, remoteFavorites, user.uid);
          setFavorites(syncedFavorites);
        } else {
          setFavorites(remoteFavorites);
        }
      } else {
        setFavorites(localFavorites);
      }
      setIsFavoritesLoading(false);
    };
    initializeFavorites();
  }, [user, isUserLoading, firestore, loadLocalFavorites, fetchFirestoreFavorites, syncFavorites]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.includes(productId);
      const updatedFavorites = isCurrentlyFavorite
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];

      if (user && firestore) {
        const favDocRef = doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
        setDoc(favDocRef, { productIds: updatedFavorites }).catch(e => {
            const permissionError = new FirestorePermissionError({
                path: favDocRef.path,
                operation: 'write',
                requestResourceData: { productIds: updatedFavorites }
            });
            errorEmitter.emit('permission-error', permissionError);
        });
      } else {
        saveLocalFavorites(updatedFavorites);
      }
      return updatedFavorites;
    });
  }, [user, firestore, saveLocalFavorites]);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isFavoritesLoading }}>
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
