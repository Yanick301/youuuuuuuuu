
'use client';

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDocs, writeBatch, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { products as allProducts } from '@/lib/data';

type AddToCartOptions = {
  size?: string;
  color?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: AddToCartOptions) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  isCartLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'ezcentials-cart';

const generateCartItemId = (productId: string, options?: AddToCartOptions) => {
  let id = productId;
  if (options?.size) id += `-${options.size}`;
  if (options?.color) id += `-${options.color}`;
  return id;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const loadLocalCart = useCallback((): CartItem[] => {
    try {
      const localCartJson = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (localCartJson) {
        const localCart: Omit<CartItem, 'product'>[] = JSON.parse(localCartJson);
        const hydratedCart = localCart.map(item => {
          if (!item || !item.id) {
            return null;
          }
          const productId = item.id.split('-')[0];
          const product = allProducts.find(p => p.id === productId);
          return product ? { ...item, product } : null;
        }).filter((item): item is CartItem => item !== null);
        return hydratedCart;
      }
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
    }
    return [];
  }, []);

  const saveLocalCart = useCallback((cartToSave: CartItem[]) => {
    try {
      const simplifiedCart = cartToSave.map(({ product, ...item }) => item);
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(simplifiedCart));
    } catch (error) {
      console.error("Failed to save cart to local storage:", error);
    }
  }, []);
  
  const fetchFirestoreCart = useCallback(async (userId: string): Promise<CartItem[]> => {
    if (!firestore) return [];
    try {
      const cartColRef = collection(firestore, 'userProfiles', userId, 'cartItems');
      const snapshot = await getDocs(cartColRef);
      const remoteCart = snapshot.docs.map(doc => {
        const data = doc.data();
        const product = allProducts.find(p => p.id === data.productId);
        return product ? {
          id: doc.id,
          product,
          quantity: data.quantity,
          size: data.size,
          color: data.color,
        } : null;
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

  const syncCarts = useCallback(async (localCart: CartItem[], remoteCart: CartItem[], userId: string) => {
    if (!firestore) return remoteCart;
    
    const mergedCartMap = new Map<string, CartItem>();
    
    // Start with remote items
    remoteCart.forEach(item => mergedCartMap.set(item.id, { ...item }));
    
    // Merge local items
    localCart.forEach(localItem => {
      const existingItem = mergedCartMap.get(localItem.id);
      if (existingItem) {
        // If item exists in both, sum quantities.
        existingItem.quantity += localItem.quantity;
      } else {
        // If item only exists locally, add it.
        mergedCartMap.set(localItem.id, localItem);
      }
    });

    const finalCart = Array.from(mergedCartMap.values());

    try {
      const batch = writeBatch(firestore);
      const cartColRef = collection(firestore, 'userProfiles', userId, 'cartItems');
      
      // Update or set items in the batch
      finalCart.forEach(item => {
        const docRef = doc(cartColRef, item.id);
        batch.set(docRef, { 
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null,
        });
      });

      await batch.commit();
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY); // Clear local cart after successful sync
      return finalCart;
    } catch (e) {
       const permissionError = new FirestorePermissionError({
          path: `userProfiles/${userId}/cartItems`,
          operation: 'write',
       });
       errorEmitter.emit('permission-error', permissionError);
       // In case of error, return the remote cart to avoid data loss
       return remoteCart;
    }
  }, [firestore]);


  useEffect(() => {
    const initializeCart = async () => {
      if (isUserLoading) return; // Wait until auth state is resolved

      setIsCartLoading(true);
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
        setCart(localCart);
      }
      setIsCartLoading(false);
    };
    initializeCart();
  }, [user, isUserLoading, firestore, fetchFirestoreCart, loadLocalCart, syncCarts]);

  const addToCart = useCallback((product: Product, quantity: number = 1, options?: AddToCartOptions) => {
    const cartItemId = generateCartItemId(product.id, options);
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === cartItemId);
      let newCart: CartItem[];
      
      if (existingItemIndex > -1) {
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
      } else {
        newCart = [...prevCart, { id: cartItemId, product, quantity, size: options?.size, color: options?.color }];
      }

      if (user && firestore) {
        const itemToUpdate = newCart.find(item => item.id === cartItemId);
        if(itemToUpdate) {
            const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', cartItemId);
            setDoc(cartItemRef, { 
              productId: itemToUpdate.product.id,
              quantity: itemToUpdate.quantity,
              size: itemToUpdate.size || null,
              color: itemToUpdate.color || null,
            }, { merge: true }).catch(e => {
                const permissionError = new FirestorePermissionError({ path: cartItemRef.path, operation: 'write' });
                errorEmitter.emit('permission-error', permissionError);
            });
        }
      } else {
        saveLocalCart(newCart);
      }
      return newCart;
    });
  }, [user, firestore, saveLocalCart]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== cartItemId);
      if (user && firestore) {
        const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', cartItemId);
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

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item => item.id === cartItemId ? { ...item, quantity } : item);
      if (user && firestore) {
        const itemToUpdate = newCart.find(item => item.id === cartItemId);
        if (itemToUpdate) {
          const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', cartItemId);
          setDoc(cartItemRef, { quantity }, { merge: true }).catch(e => {
              const permissionError = new FirestorePermissionError({ path: cartItemRef.path, operation: 'update', requestResourceData: { quantity } });
              errorEmitter.emit('permission-error', permissionError);
          });
        }
      } else {
        saveLocalCart(newCart);
      }
      return newCart;
    });
  }, [removeFromCart, user, firestore, saveLocalCart]);

  const clearCart = useCallback(async () => {
    setCart([]);
    if (user && firestore) {
      try {
        const cartColRef = collection(firestore, 'userProfiles', user.uid, 'cartItems');
        const snapshot = await getDocs(cartColRef);
        if (!snapshot.empty) {
          const batch = writeBatch(firestore);
          snapshot.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
        }
      } catch (e) {
          const permissionError = new FirestorePermissionError({ path: `userProfiles/${user.uid}/cartItems`, operation: 'delete' });
          errorEmitter.emit('permission-error', permissionError);
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
