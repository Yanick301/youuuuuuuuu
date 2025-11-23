
'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';
import { TranslatedText } from './TranslatedText';

export function CategoryMarquee() {
  const marqueeCategories = [...categories, ...categories]; // Duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden border-y py-4">
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap">
        {marqueeCategories.map((category, index) => (
          <Link
            key={`${category.id}-${index}`}
            href={`/products/${category.slug}`}
            className="group mx-6 flex-shrink-0"
          >
            <h3 className="font-headline text-2xl text-foreground/70 transition-colors group-hover:text-foreground">
              <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
            </h3>
          </Link>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
