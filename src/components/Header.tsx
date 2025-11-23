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
import { Separator } from './ui/separator';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="flex flex-1 items-center justify-start">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü umschalten</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-[300px] flex-col bg-background p-0 sm:w-[350px]"
            >
              <div className="p-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={handleLinkClick}
                >
                  <span className="font-bold font-headline text-2xl">
                    EZCENTIALS
                  </span>
                </Link>
              </div>
              <Separator />
               <div className="p-6">
                <UserButton />
              </div>
              <Separator />
              <nav className="flex-grow p-6">
                <ul className="flex flex-col space-y-5">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/products/${category.slug}`}
                        className="text-lg uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
                        onClick={handleLinkClick}
                      >
                        <TranslatedText fr={category.name_fr}>
                          {category.name}
                        </TranslatedText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:flex lg:items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold font-headline text-2xl tracking-wider">
                EZCENTIALS
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center lg:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl tracking-wider">
              EZCENTIALS
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1 md:space-x-2 shrink-0 flex-nowrap">
          <nav className="hidden lg:flex lg:items-center lg:space-x-6 text-sm font-medium">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="transition-colors hover:text-primary text-foreground/80"
              >
                <TranslatedText fr={category.name_fr}>
                  {category.name}
                </TranslatedText>
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center">
             <UserButton />
             <Separator orientation="vertical" className="h-6 mx-2" />
             <LanguageSwitcher />
          </div>
          <div className="flex items-center lg:hidden">
            <UserButton />
          </div>
          <SearchDialog />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
