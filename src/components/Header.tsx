'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from '@/components/cart/CartButton';
import { UserButton } from './auth/UserButton';
import { TranslatedText } from './TranslatedText';
import { SearchDialog } from './search/SearchDialog';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        {/* Mobile Nav & Left items */}
        <div className="flex flex-1 items-center justify-start">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü umschalten</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[300px] flex-col sm:w-[400px]">
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
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
                    onClick={handleLinkClick}
                  >
                    <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <div className="hidden lg:flex lg:items-center lg:gap-4">
             <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold font-headline text-2xl tracking-wider lg:block">
                EZCENTIALS
                </span>
            </Link>
          </div>
        </div>

        {/* Desktop Logo (Centered) - Mobile Logo (Left) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
           <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl tracking-wider">
              EZCENTIALS
            </span>
          </Link>
        </div>
        <div className="hidden items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold font-headline text-2xl tracking-wider lg:block">
              EZCENTIALS
            </span>
          </Link>
        </div>


        {/* Right items */}
        <div className="flex flex-1 items-center justify-end space-x-1 md:space-x-2 shrink-0 flex-nowrap">
          <nav className="hidden lg:flex lg:items-center lg:space-x-6 text-sm font-medium">
             {categories.map((category) => (
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
