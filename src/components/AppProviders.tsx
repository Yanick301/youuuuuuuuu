'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import type { ReactNode } from 'react';
import { FavoritesProvider } from '@/context/FavoritesContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </LanguageProvider>
  );
}
