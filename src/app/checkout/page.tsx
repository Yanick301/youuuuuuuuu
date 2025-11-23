
'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '@/components/TranslatedText';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreditCard, Lock } from 'lucide-react';

const { placeholderImages } = placeholderImagesData;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/products/all');
    }
  }, [cart, router]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center text-center">
        <p><TranslatedText fr="Votre panier est vide. Vous allez être redirigé...">Ihr Warenkorb ist leer. Sie werden weitergeleitet...</TranslatedText></p>
      </div>
    );
  }

  const shipping = 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handlePlaceOrder = () => {
    // In a real app, this would process payment
    clearCart();
    router.push('/checkout/thank-you');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center font-headline text-4xl md:text-5xl">
        <TranslatedText fr="Paiement">Kasse</TranslatedText>
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Forms */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle><TranslatedText fr="Informations de livraison">Versandinformationen</TranslatedText></CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="email"><TranslatedText fr="Email">Email</TranslatedText></Label>
                <Input id="email" type="email" placeholder="sie@beispiel.com" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address"><TranslatedText fr="Adresse">Adresse</TranslatedText></Label>
                <Input id="address" placeholder="Hauptstraße 123" />
              </div>
              <div>
                <Label htmlFor="city"><TranslatedText fr="Ville">Stadt</TranslatedText></Label>
                <Input id="city" placeholder="Musterstadt" />
              </div>
              <div>
                <Label htmlFor="state"><TranslatedText fr="État / Province">Bundesland / Provinz</TranslatedText></Label>
                <Input id="state" placeholder="BE" />
              </div>
              <div>
                <Label htmlFor="zip"><TranslatedText fr="Code postal">PLZ / Postleitzahl</TranslatedText></Label>
                <Input id="zip" placeholder="12345" />
              </div>
               <div>
                <Label htmlFor="country"><TranslatedText fr="Pays">Land</TranslatedText></Label>
                <Input id="country" placeholder="Deutschland" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle><TranslatedText fr="Détails de paiement">Zahlungsdetails</TranslatedText></CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm">
                <Lock className="h-4 w-4" />
                <TranslatedText fr="Toutes les transactions sont sécurisées et cryptées.">Alle Transaktionen sind sicher und verschlüsselt.</TranslatedText>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid gap-2">
                <Label htmlFor="card-number"><TranslatedText fr="Numéro de carte">Kartennummer</TranslatedText></Label>
                <div className="relative">
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="expiry-date"><TranslatedText fr="Date d'expiration">Ablaufdatum</TranslatedText></Label>
                    <Input id="expiry-date" placeholder="MM / JJ" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="cvc"><TranslatedText fr="CVC">CVC</TranslatedText></Label>
                    <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle><TranslatedText fr="Résumé de la commande">Bestellübersicht</TranslatedText></CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {cart.map((item) => {
                  const productImage = placeholderImages.find(p => p.id === item.product.images[0]);
                  return (
                    <li key={item.product.id} className="flex items-center py-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                        {productImage && (
                          <Image
                            src={productImage.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                         <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">{item.quantity}</span>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium"><TranslatedText fr={item.product.name_fr}>{item.product.name}</TranslatedText></p>
                        <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </li>
                  );
                })}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                  <p className="text-muted-foreground"><TranslatedText fr="Sous-total">Zwischensumme</TranslatedText></p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between">
                  <p className="text-muted-foreground"><TranslatedText fr="Livraison">Versand</TranslatedText></p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between">
                  <p className="text-muted-foreground"><TranslatedText fr="Taxes">Steuern</TranslatedText></p>
                  <p>${taxes.toFixed(2)}</p>
                </div>
              </div>
               <Separator className="my-4" />
               <div className="flex justify-between font-bold text-lg">
                  <p><TranslatedText fr="Total">Gesamt</TranslatedText></p>
                  <p>${total.toFixed(2)}</p>
                </div>
            </CardContent>
          </Card>
          <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
            <TranslatedText fr="Passer la commande">Bestellung aufgeben</TranslatedText>
          </Button>
        </div>
      </div>
    </div>
  );
}
