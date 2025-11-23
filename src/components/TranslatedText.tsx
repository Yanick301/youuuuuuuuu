'use client';

import { useLanguage } from '@/context/LanguageContext';
import type { ReactNode } from 'react';

type TranslatedTextProps = {
  fr: ReactNode;
  children: ReactNode; // German is the default
};

export function TranslatedText({ children, fr }: TranslatedTextProps) {
  const { language } = useLanguage();

  if (language === 'fr') {
    return <>{fr}</>;
  }
  
  return <>{children}</>;
}
