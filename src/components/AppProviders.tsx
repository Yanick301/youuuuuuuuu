
'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import type { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import { FirebaseClientProvider } from '@/firebase';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <LanguageProvider>
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </FirebaseClientProvider>
  );
}
