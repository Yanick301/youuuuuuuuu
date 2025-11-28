
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

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
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Effect to load initial favorites from localStorage
  useEffect(() => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (localData) {
        setFavorites(JSON.parse(localData));
      }
    } catch (error) {
      console.error("Failed to load favorites from local storage:", error);
    }
  }, []);

  // Sync logic to merge local and remote favorites when user logs in
  useEffect(() => {
    if (isUserLoading || !firestore) return;

    const handleUserLogin = async () => {
      if (user) {
        const localFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) || '[]');
        const favDocRef = doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
        
        try {
          const remoteDoc = await getDoc(favDocRef);
          const remoteFavorites = remoteDoc.exists() ? remoteDoc.data().productIds || [] : [];
          
          // Merge local and remote, creating a unique set
          const mergedFavorites = Array.from(new Set([...localFavorites, ...remoteFavorites]));

          // Sync the merged list back to Firestore
          if (mergedFavorites.length > 0) {
            await setDoc(favDocRef, { productIds: mergedFavorites }, { merge: true });
          }
          
          // Set local state and clear localStorage
          setFavorites(mergedFavorites);
          localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);

        } catch (error) {
          console.error("Error syncing favorites on login:", error);
        }
      }
    };

    handleUserLogin();
  }, [user, isUserLoading, firestore]);

  // Real-time listener for authenticated users
  const favoritesDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
  }, [user, firestore]);

  useEffect(() => {
    if (!favoritesDocRef) {
      // If user logs out, we keep the last state (which might be local-only)
      return;
    }

    const unsubscribe = onSnapshot(favoritesDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorites(docSnap.data().productIds || []);
      } else {
        setFavorites([]);
      }
    }, (error) => {
      console.error("Error listening to favorites changes:", error);
    });

    return () => unsubscribe();
  }, [favoritesDocRef]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];

      if (user && firestore) {
        // Authenticated: update Firestore
        const favDocRef = doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
        setDoc(favDocRef, { productIds: updatedFavorites }).catch(error => {
          console.error("Failed to update favorites in Firestore:", error);
          // Optional: revert local state on error
        });
      } else {
        // Unauthenticated: update localStorage
        localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
      
      return updatedFavorites;
    });
  }, [user, firestore]);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isFavoritesLoading: isUserLoading }}>
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
