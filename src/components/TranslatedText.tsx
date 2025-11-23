'use client';

import type { ReactNode } from 'react';

type TranslatedTextProps = {
  fr: string;
  children: ReactNode; // German is the default
};

export function TranslatedText({ children, fr }: TranslatedTextProps) {
  // Always return German text as per user request to make the site German-only for now.
  return <>{children}</>;
}
