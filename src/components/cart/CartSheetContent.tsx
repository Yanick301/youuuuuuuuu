
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2 } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '../TranslatedText';

const { placeholderImages } = placeholderImagesData;

export function CartSheetContent() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <ShoppingBagIcon className="h-24 w-24 text-muted" />
        <h3 className="mt-4 text-lg font-semibold"><TranslatedText>Ihr Warenkorb ist leer</TranslatedText></h3>
        <p className="mt-2 text-sm text-muted-foreground"><TranslatedText>Fügen Sie einige Produkte hinzu, um loszulegen.</TranslatedText></p>
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
                <li key={item.product.id} className="flex py-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    {productImage && (
                        <Image
                            src={productImage.imageUrl}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                            data-ai-hint={productImage.imageHint}
                        />
                    )}
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>
                          <Link href={`/product/${item.product.slug}`}><TranslatedText>{item.product.name}</TranslatedText></Link>
                        </h3>
                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex">
                        <Button
                          variant="ghost"
                          type="button"
                          className="font-medium text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
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
          <p><TranslatedText>Zwischensumme</TranslatedText></p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          <TranslatedText>Versand und Steuern werden an der Kasse berechnet.</TranslatedText>
        </p>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/checkout"><TranslatedText>Kasse</TranslatedText></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


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
