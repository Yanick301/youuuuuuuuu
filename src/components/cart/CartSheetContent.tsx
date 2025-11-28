'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TranslatedText } from '@/components/TranslatedText';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartSheetContent() {
  // Placeholder for cart logic
  const itemCount = 0;

  if (itemCount === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
        <div
          aria-hidden="true"
          className="relative mb-4 h-24 w-24 text-muted-foreground"
        >
          <ShoppingBag className="h-full w-full" />
        </div>
        <div className="text-xl font-medium">
          <TranslatedText fr="Votre panier est vide" en="Your cart is empty">
            Ihr Warenkorb ist leer
          </TranslatedText>
        </div>
        <p className="text-muted-foreground">
          <TranslatedText fr="Ajoutez des articles pour commencer." en="Add items to get started.">
            Fügen Sie Artikel hinzu, um loszulegen.
          </TranslatedText>
        </p>
        <SheetClose asChild>
          <Link href="/products/all">
            <Button>
              <TranslatedText fr="Continuer les achats" en="Continue Shopping">
                Weiter einkaufen
              </TranslatedText>
            </Button>
          </Link>
        </SheetClose>
      </div>
    );
  }

  // This part will be used when cart items exist
  return (
    <>
      <ScrollArea className="flex-grow">
        {/* Cart items will be mapped here */}
      </ScrollArea>
      <div className="border-t px-6 py-4">
        <div className="flex justify-between text-base font-medium text-foreground">
          <p>
            <TranslatedText fr="Sous-total" en="Subtotal">
              Zwischensumme
            </TranslatedText>
          </p>
          <p>€0.00</p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          <TranslatedText
            fr="Les frais de port et les taxes sont calculés à la caisse."
            en="Shipping and taxes calculated at checkout."
          >
            Versand und Steuern werden an der Kasse berechnet.
          </TranslatedText>
        </p>
        <div className="mt-6">
          <Button className="w-full">
            <TranslatedText fr="Passer à la caisse" en="Checkout">
              Zur Kasse
            </TranslatedText>
          </Button>
        </div>
      </div>
    </>
  );
}

// Helper for closing sheet on navigation
import { DialogClose } from '@radix-ui/react-dialog';

const SheetClose = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => (
  <DialogClose {...props} asChild>
    {children}
  </DialogClose>
);
