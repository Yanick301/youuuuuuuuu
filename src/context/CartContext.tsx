
'use client';

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, getDocs, writeBatch, query, where, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const fetchCartFromFirestore = useCallback(async (userId: string) => {
    if (!firestore) return [];
    const cartColRef = collection(firestore, 'userProfiles', userId, 'cartItems');
    const snapshot = await getDocs(cartColRef);
    const remoteCart: CartItem[] = [];
    for (const doc of snapshot.docs) {
      const product = allProducts.find(p => p.id === doc.id);
      if (product) {
        remoteCart.push({ product, quantity: doc.data().quantity });
      }
    }
    return remoteCart;
  }, [firestore]);
  

  useEffect(() => {
    const loadCart = async () => {
      setIsCartLoading(true);
      if (isUserLoading) return;

      if (user && firestore) {
        const remoteCart = await fetchCartFromFirestore(user.uid);
        setCart(remoteCart);
      } else {
        // Clear cart on logout
        setCart([]);
      }
      setIsCartLoading(false);
    };

    loadCart();
  }, [user, isUserLoading, firestore, fetchCartFromFirestore]);


  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    if (!user || !firestore) {
        // Handle non-logged-in users if needed, e.g., local storage.
        // For now, we do nothing if not logged in.
        return;
    }
    setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
        const newCart = [...prevCart];
        let newQuantity: number;
        if (existingItemIndex > -1) {
            newQuantity = newCart[existingItemIndex].quantity + quantity;
            newCart[existingItemIndex].quantity = newQuantity;
        } else {
            newQuantity = quantity;
            newCart.push({ product, quantity });
        }

        const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', product.id);
        setDoc(cartItemRef, { quantity: newQuantity }, { merge: true });
        
        return newCart;
    });
  }, [user, firestore]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user || !firestore) return;
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', productId);
    await deleteDoc(cartItemRef);
  }, [user, firestore]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user || !firestore) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.product.id === productId ? { ...item, quantity } : item));
    const cartItemRef = doc(firestore, 'userProfiles', user.uid, 'cartItems', productId);
    await setDoc(cartItemRef, { quantity }, { merge: true });
  }, [removeFromCart, user, firestore]);

  const clearCart = useCallback(async () => {
    if (!user || !firestore) return;
    setCart([]);
    const cartColRef = collection(firestore, 'userProfiles', user.uid, 'cartItems');
    const snapshot = await getDocs(cartColRef);
    if (!snapshot.empty) {
        const batch = writeBatch(firestore);
        snapshot.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
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

    