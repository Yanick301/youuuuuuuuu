
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from '@/components/cart/CartButton';
import { UserButton } from './auth/UserButton';
import { TranslatedText } from './TranslatedText';
import { SearchDialog } from './search/SearchDialog';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        {/* Mobile Nav & Left items */}
        <div className="flex flex-1 items-center justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü umschalten</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[300px] flex-col sm:w-[400px]">
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold font-headline text-2xl">
                    EZCENTIALS
                  </span>
                </Link>
                <div className="lg:hidden">
                  <UserButton />
                </div>
              </div>
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
          
          <div className="hidden lg:flex lg:items-center lg:gap-4">
             <nav className="flex items-center space-x-6 text-sm font-medium">
                {categories.slice(0, 2).map((category) => (
                <Link
                    key={category.id}
                    href={`/products/${category.slug}`}
                    className="transition-colors hover:text-primary text-foreground/80"
                >
                    <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
                </Link>
                ))}
            </nav>
          </div>
        </div>

        {/* Desktop Logo (Centered) - Mobile Logo (Left) */}
        <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold font-headline text-2xl tracking-wider lg:block">
              EZCENTIALS
            </span>
             <span className="font-bold font-headline text-2xl tracking-wider lg:hidden">
              EZCENTIALS
            </span>
          </Link>
        </div>


        {/* Right items */}
        <div className="flex flex-1 items-center justify-end space-x-1 md:space-x-2 flex-nowrap shrink-0">
          <nav className="hidden lg:flex lg:items-center lg:space-x-6 text-sm font-medium">
             {categories.slice(2).map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
              </Link>
            ))}
          </nav>
          <SearchDialog />
          <div className="hidden lg:flex">
            <UserButton />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
