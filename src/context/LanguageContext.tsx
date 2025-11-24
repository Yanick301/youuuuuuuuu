'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState('de');

  useEffect(() => {
    // This code now runs only on the client
    const storedLang = localStorage.getItem('ezcentials-lang');
    if (storedLang && ['de', 'fr', 'en'].includes(storedLang)) {
      setLanguageState(storedLang);
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (['de', 'fr', 'en'].includes(browserLang)) {
            setLanguageState(browserLang);
        } else {
            setLanguageState('de'); // Default language
        }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const setLanguage = (lang: string) => {
    if (['de', 'fr', 'en'].includes(lang)) {
        setLanguageState(lang);
        localStorage.setItem('ezcentials-lang', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
