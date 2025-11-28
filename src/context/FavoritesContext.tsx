
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import { useFirebase } from '@/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
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
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);
  const { auth, firestore } = useFirebase();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load local favorites from localStorage
  const loadLocalFavorites = (): string[] => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to load favorites from local storage:", error);
      return [];
    }
  };

  // Save local favorites to localStorage
  const saveLocalFavorites = (items: string[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save favorites to local storage:", error);
    }
  };

  // The main effect that listens to auth state changes
  useEffect(() => {
    if (!auth || !firestore) return;

    // Subscribe to auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setIsFavoritesLoading(true);
      setCurrentUser(user);

      if (user) {
        // User is logged in
        const localFavorites = loadLocalFavorites();
        const favDocRef = doc(firestore, 'userProfiles', user.uid, 'favorites', 'default');
        
        try {
          const remoteDoc = await getDoc(favDocRef);
          const remoteFavorites = remoteDoc.exists() ? remoteDoc.data().productIds || [] : [];
          
          // Merge local and remote favorites, giving precedence to the combination
          const mergedFavorites = Array.from(new Set([...localFavorites, ...remoteFavorites]));
          
          setFavorites(mergedFavorites);

          // If there were local favorites, sync them to Firestore
          if (localFavorites.length > 0) {
            await setDoc(favDocRef, { productIds: mergedFavorites }, { merge: true });
            localStorage.removeItem(LOCAL_STORAGE_FAVORITES_KEY);
          }

        } catch (error) {
          console.error("Error fetching/merging favorites from Firestore:", error);
          // Fallback to local if remote fetch fails
          setFavorites(localFavorites);
        }

      } else {
        // User is logged out
        setFavorites(loadLocalFavorites());
      }
      setIsFavoritesLoading(false);
    });

    return () => unsubscribeAuth(); // Cleanup subscription on unmount
  }, [auth, firestore]);


  // Effect to listen for REAL-TIME updates from Firestore once a user is logged in
  useEffect(() => {
    if (!currentUser || !firestore) return;

    const favDocRef = doc(firestore, 'userProfiles', currentUser.uid, 'favorites', 'default');
    
    const unsubscribeSnapshot = onSnapshot(favDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorites(docSnap.data().productIds || []);
      } else {
        setFavorites([]); // Document doesn't exist, so no favorites
      }
    }, (error) => {
        console.error("Error listening to favorites changes:", error);
    });

    return () => unsubscribeSnapshot(); // Cleanup snapshot listener
  }, [currentUser, firestore]);


  const toggleFavorite = useCallback((productId: string) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);

    if (currentUser && firestore) {
      // Authenticated: update Firestore
      const favDocRef = doc(firestore, 'userProfiles', currentUser.uid, 'favorites', 'default');
      setDoc(favDocRef, { productIds: updatedFavorites }).catch(error => {
        console.error("Failed to update favorites in Firestore:", error);
      });
    } else {
      // Unauthenticated: update localStorage
      saveLocalFavorites(updatedFavorites);
    }
  }, [favorites, currentUser, firestore]);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
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
