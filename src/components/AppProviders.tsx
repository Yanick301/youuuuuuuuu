'use client';

import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AdminModeProvider } from '@/context/AdminModeContext';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <AdminModeProvider>{children}</AdminModeProvider>
        </FavoritesProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
