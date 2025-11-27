
'use client';

import Link from 'next/link';
import { Plus, Minus, Trash2 } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '../TranslatedText';
import { SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const { placeholderImages } = placeholderImagesData;


function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  }

export function CartSheetContent() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <ShoppingBagIcon className="h-24 w-24 text-muted" />
        <h3 className="mt-4 text-lg font-semibold"><TranslatedText fr="Votre panier est vide" en="Your cart is empty">Ihr Warenkorb ist leer</TranslatedText></h3>
        <p className="mt-2 text-sm text-muted-foreground"><TranslatedText fr="Ajoutez des produits pour commencer." en="Add some products to get started.">Fügen Sie einige Produkte hinzu, um loszulegen.</TranslatedText></p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-border">
          {cart.map((item) => {
            const productImage = placeholderImages.find(p => p.id === item.product.images[0]);
            return (
                <li key={item.id} className="flex py-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    {productImage && (
                        <img
                            src={productImage.imageUrl}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                            data-ai-hint={productImage.imageHint}
                        />
                    )}
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>
                          <Link href={`/product/${item.product.slug}`}><TranslatedText fr={item.product.name_fr} en={item.product.name_en}>{item.product.name}</TranslatedText></Link>
                        </h3>
                        <p className="ml-4">€{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                       <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          {item.size && <Badge variant="outline">Taille: {item.size}</Badge>}
                          {item.color && <Badge variant="outline">Couleur: {item.color}</Badge>}
                       </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex">
                        <Button
                          variant="ghost"
                          type="button"
                          className="font-medium text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
            );
        })}
        </ul>
      </div>

      <div className="border-t border-border px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-foreground">
          <p><TranslatedText fr="Sous-total" en="Subtotal">Zwischensumme</TranslatedText></p>
          <p>€{subtotal.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          <TranslatedText fr="Les frais de port et les taxes sont calculés au moment du paiement." en="Shipping and taxes calculated at checkout.">Versand und Steuern werden an der Kasse berechnet.</TranslatedText>
        </p>
        <div className="mt-6">
            <SheetClose asChild>
                <Button asChild className="w-full">
                    <Link href="/checkout"><TranslatedText fr="Paiement" en="Checkout">Kasse</TranslatedText></Link>          
                </Button>
            </SheetClose>
        </div>
      </div>
    </div>
  );
}