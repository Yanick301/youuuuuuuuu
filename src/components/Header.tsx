
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from '@/components/cart/CartButton';
import { UserButton } from './auth/UserButton';
import { LanguageSelector } from './LanguageSelector';
import { TranslatedText } from './TranslatedText';
import { SearchDialog } from './search/SearchDialog';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        {/* Mobile Nav Trigger and Logo */}
        <div className="flex flex-1 items-center justify-start md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü umschalten</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mb-6 flex items-center space-x-2">
                <span className="font-bold font-headline text-2xl">
                  EZCENTIALS
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/${category.slug}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
           <div className="ml-4">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold font-headline text-xl">
                EZCENTIALS
                </span>
            </Link>
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex flex-1 items-center justify-start">
             <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold font-headline text-2xl">
                EZCENTIALS
                </span>
            </Link>
        </div>


        {/* Desktop Navigation (Centered) */}
        <div className="mr-4 hidden flex-1 items-center justify-center md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="transition-colors hover:text-primary text-foreground/60"
              >
                <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SearchDialog />
          <LanguageSelector />
          <UserButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
