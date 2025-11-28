
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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
  const [didInitialSync, setDidInitialSync] = useState(false);

  // Effect to load initial favorites from localStorage for anonymous users.
  useEffect(() => {
    if (!user && !isUserLoading) {
        try {
            const localData = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
            if (localData) {
                setFavorites(JSON.parse(localData));
            }
        } catch (error) {
            console.error("Failed to load favorites from local storage:", error);
        }
    }
  }, [user, isUserLoading]);

  // Real-time listener for authenticated users.
  const favoritesDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
  }, [user, firestore]);

  useEffect(() => {
    if (!favoritesDocRef || !user) {
        return;
    }

    const unsubscribe = onSnapshot(favoritesDocRef, 
      (docSnap) => {
        const remoteFavorites = docSnap.exists() ? docSnap.data().productIds || [] : [];
        
        // One-time sync on login
        if (!didInitialSync) {
            const localFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) || '[]');
            const mergedFavorites = Array.from(new Set([...localFavorites, ...remoteFavorites]));

            if (mergedFavorites.length > localFavorites.length || mergedFavorites.length > remoteFavorites.length) {
                setDoc(favoritesDocRef, { productIds: mergedFavorites }, { merge: true })
                .catch(e => console.error("Error merging favorites to Firestore:", e));
            }
            
            setFavorites(mergedFavorites);
            localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);
            setDidInitialSync(true);

        } else {
             setFavorites(remoteFavorites);
        }
      }, 
      (error) => {
        console.error("Error listening to favorites changes:", error);
        const permissionError = new FirestorePermissionError({ path: favoritesDocRef.path, operation: 'get' });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [favoritesDocRef, user, didInitialSync]);

  // Effect to clear local favorites on logout
  useEffect(() => {
      if (!user && !isUserLoading) {
          setDidInitialSync(false); // Reset sync flag on logout
          setFavorites([]); // Clear state
      }
  }, [user, isUserLoading]);


  const toggleFavorite = useCallback((productId: string) => {
    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];
    
    setFavorites(updatedFavorites);

    if (user && firestore) {
        const favDocRef = doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
        setDoc(favDocRef, { productIds: updatedFavorites })
        .catch(error => {
            console.error("Failed to update favorites in Firestore:", error);
            const permissionError = new FirestorePermissionError({
              path: favDocRef.path,
              operation: 'write',
              requestResourceData: { productIds: updatedFavorites },
            });
            errorEmitter.emit('permission-error', permissionError);
            // Optionally revert local state on error
            setFavorites(favorites);
        });
    } else {
        localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  }, [favorites, user, firestore]);

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
