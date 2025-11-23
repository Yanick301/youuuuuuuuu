'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CartSheetContent } from './CartSheetContent';
import { TranslatedText } from '../TranslatedText';

export function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount}
            </span>
          )}
          <span className="sr-only"><TranslatedText fr="Ouvrir le panier">Warenkorb öffnen</TranslatedText></span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle><TranslatedText fr="Panier">Warenkorb</TranslatedText></SheetTitle>
        </SheetHeader>
        <CartSheetContent />
      </SheetContent>
    </Sheet>
  );
}
