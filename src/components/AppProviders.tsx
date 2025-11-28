'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import type { ReactNode } from 'react';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartProvider } from '@/context/CartContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <CartProvider>{children}</CartProvider>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
