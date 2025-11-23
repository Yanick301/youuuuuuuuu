import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from '@/components/cart/CartButton';
import { UserButton } from './auth/UserButton';
import { LanguageSelector } from './LanguageSelector';
import { TranslatedText } from './TranslatedText';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">EZCENTIALS</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <TranslatedText>{category.name}</TranslatedText>
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mb-6 flex items-center space-x-2">
               <span className="font-bold font-headline text-lg">EZCENTIALS</span>
            </Link>
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                   <TranslatedText>{category.name}</TranslatedText>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <LanguageSelector />
          <UserButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
