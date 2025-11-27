
'use client';

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDocs, writeBatch, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { products as allProducts } from '@/lib/data';

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  isCartLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'ezcentials-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Load from localStorage
  const loadLocalCart = useCallback(() => {
    try {
      const localCartJson = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (localCartJson) {
        const localCart: { productId: string; quantity: number }[] = JSON.parse(localCartJson);
        const hydratedCart = localCart.map(({ productId, quantity }) => {
          const product = allProducts.find(p => p.id === productId);
          return product ? { product, quantity } : null;
        }).filter((item): item is CartItem => item !== null);
        return hydratedCart;
      }
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
    }
    return [];
  }, []);

  // Save to localStorage
  const saveLocalCart = useCallback((cartToSave: CartItem[]) => {
    try {
      const simplifiedCart = cartToSave.map(item => ({ productId: item.product.id, quantity: item.quantity }));
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(simplifiedCart));
    } catch (error) {
      console.error("Failed to save cart to local storage:", error);
    }
  }, []);

  // Fetch from Firestore
  const fetchFirestoreCart = useCallback(async (userId: string): Promise<CartItem[]> => {
    if (!firestore) return [];
    try {
      const cartColRef = collection(firestore, 'userProfiles', userId, 'cartItems');
      const snapshot = await getDocs(cartColRef);
      const remoteCart = snapshot.docs.map(doc => {
        const product = allProducts.find(p => p.id === doc.id);
        return product ? { product, quantity: doc.data().quantity } : null;
      }).filter((item): item is CartItem => item !== null);
      return remoteCart;
    } catch (e) {
      const permissionError = new FirestorePermissionError({
        path: `userProfiles/${userId}/cartItems`,
        operation: 'list',
      });
      errorEmitter.emit('permission-error', permissionError);
      return [];
    }
  }, [firestore]);
  
  // Sync local and remote carts
  const syncCarts = useCallback(async (localCart: CartItem[], remoteCart: CartItem[], userId: string) => {
      if (!firestore) return remoteCart;

      const mergedCartMap = new Map<string, CartItem>();
      
      // Add all remote items first
      remoteCart.forEach(item => mergedCartMap.set(item.product.id, item));
      
      // Add/update with local items
      localCart.forEach(localItem => {
        const remoteItem = mergedCartMap.get(localItem.product.id);
        // If local is newer or doesn't exist remotely, use local quantity
        if (!remoteItem || localItem.quantity > remoteItem.quantity) {
             mergedCartMap.set(localItem.product.id, localItem);
        }
      });
      
      const finalCart = Array.from(mergedCartMap.values());
      
      // Batch write the final state to Firestore
      const batch = writeBatch(firestore);
      finalCart.forEach(item => {
        const docRef = doc(firestore, 'userProfiles', userId, 'cartItems', item.product.id);
        batch.set(docRef, { quantity: item.quantity });
      });

      // Remove items from firestore that are not in the final cart
      remoteCart.forEach(remoteItem => {
        if (!mergedCartMap.has(remoteItem.product.id)) {
            const docRef = doc(firestore, 'userProfiles', userId, 'cartItems', remoteItem.product.id);
            batch.delete(docRef);
        }
      });

      await batch.commit().catch(e => {
         const permissionError = new FirestorePermissionError({
            path: `userProfiles/${userId}/cartItems`,
            operation: 'write',
         });
         errorEmitter.emit('permission-error', permissionError);
      });
      
      // Clear local storage after syncing
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
      
      return finalCart;

  }, [firestore]);


  useEffect(() => {
    const initializeCart = async () => {
        setIsCartLoading(true);
        if (isUserLoading) return;

        const localCart = loadLocalCart();

        if (user && firestore) {
            const remoteCart = await fetchFirestoreCart(user.uid);
            if (localCart.length > 0) {
                const syncedCart = await syncCarts(localCart, remoteCart, user.uid);
                setCart(syncedCart);
            } else {
                setCart(remoteCart);
            }
        } else {
            // Not logged in, just use local cart
            setCart(localCart);
        }
        setIsCartLoading(false);
    };
    initializeCart();
  }, [user, isUserLoading, firestore, fetchFirestoreCart, loadLocalCart, syncCarts]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      let newCart: CartItem[];
      
      if (existingItemIndex > -1) {
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
      } else {
        newCart = [...prevCart, { product, quantity }];
      }

      if (user && firestore) {
        const itemToUpdate = newCart.find(item => item.product.id === product.id);
        if(itemToUpdate) {
            const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', product.id);
            setDoc(cartItemRef, { quantity: itemToUpdate.quantity }, { merge: true }).catch(e => {
                const permissionError = new FirestorePermissionError({ path: cartItemRef.path, operation: 'write', requestResourceData: {quantity: itemToUpdate.quantity} });
                errorEmitter.emit('permission-error', permissionError);
            });
        }
      } else {
        saveLocalCart(newCart);
      }
      return newCart;
    });
  }, [user, firestore, saveLocalCart]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.product.id !== productId);
      if (user && firestore) {
        const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', productId);
        deleteDoc(cartItemRef).catch(e => {
            const permissionError = new FirestorePermissionError({ path: cartItemRef.path, operation: 'delete' });
            errorEmitter.emit('permission-error', permissionError);
        });
      } else {
        saveLocalCart(newCart);
      }
      return newCart;
    });
  }, [user, firestore, saveLocalCart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item => item.product.id === productId ? { ...item, quantity } : item);
      if (user && firestore) {
        const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', productId);
        setDoc(cartItemRef, { quantity }, { merge: true }).catch(e => {
            const permissionError = new FirestorePermissionError({ path: cartItemRef.path, operation: 'update', requestResourceData: { quantity } });
            errorEmitter.emit('permission-error', permissionError);
        });
      } else {
        saveLocalCart(newCart);
      }
      return newCart;
    });
  }, [removeFromCart, user, firestore, saveLocalCart]);

  const clearCart = useCallback(async () => {
    setCart([]);
    if (user && firestore) {
      const cartColRef = collection(firestore, 'userProfiles', user.uid, 'cartItems');
      const snapshot = await getDocs(cartColRef).catch(() => null);
      if (snapshot && !snapshot.empty) {
        const batch = writeBatch(firestore);
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit().catch(e => {
            const permissionError = new FirestorePermissionError({ path: `userProfiles/${user.uid}/cartItems`, operation: 'delete' });
            errorEmitter.emit('permission-error', permissionError);
        });
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    }
  }, [user, firestore]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, isCartLoading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
