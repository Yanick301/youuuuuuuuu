
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StagedOrder {
  shippingInfo: any;
  items: any[];
  subtotal: number;
  shipping: number;
  taxes: number;
  totalAmount: number;
}

export default function ThankYouPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [stagedOrder, setStagedOrder] = useState<StagedOrder | null>(null);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const orderData = sessionStorage.getItem('stagedOrder');
    if (orderData) {
      setStagedOrder(JSON.parse(orderData));
      // Do not clear the item here, as the user might refresh the page.
      // It will be cleared upon navigating away.
    } else {
        // If there's no staged order, maybe they landed here by mistake.
        // Let's send them to their orders page.
        router.push('/account/orders');
    }

    // Add a cleanup effect for when the user navigates away from this page
    return () => {
        sessionStorage.removeItem('stagedOrder');
    };
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || !stagedOrder) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <Loader2 className="h-20 w-20 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <h1 className="mt-6 font-headline text-4xl md:text-5xl">
          <TranslatedText
            fr="Commande enregistrée !"
            en="Order Saved!"
          >
            Bestellung gespeichert!
          </TranslatedText>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          <TranslatedText
            fr="Votre commande a été créée. Veuillez maintenant vous rendre dans votre espace client pour téléverser votre preuve de paiement afin de la finaliser."
            en="Your order has been created. Please now go to your account area to upload your proof of payment to finalize it."
          >
            Ihre Bestellung wurde erstellt. Bitte gehen Sie nun in Ihren
            Kundenbereich, um Ihren Zahlungsnachweis hochzuladen und die
            Bestellung abzuschließen.
          </TranslatedText>
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>
            <TranslatedText fr="Résumé de la commande" en="Order Summary">
              Bestellübersicht
            </TranslatedText>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold"><TranslatedText fr="Informations de livraison" en="Shipping Information">Versandinformationen</TranslatedText></h4>
              <div className="text-sm text-muted-foreground">
                <p>{stagedOrder.shippingInfo.name}</p>
                <p>{stagedOrder.shippingInfo.email}</p>
                <p>{stagedOrder.shippingInfo.address}</p>
                <p>
                  {stagedOrder.shippingInfo.city},{' '}
                  {stagedOrder.shippingInfo.zip}
                </p>
                <p>{stagedOrder.shippingInfo.country}</p>
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold"><TranslatedText fr="Produits" en="Products">Produkte</TranslatedText></h4>
              <ul className="divide-y divide-border">
                {stagedOrder.items.map((item: any) => (
                  <li
                    key={item.productId}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span>
                      {item.quantity} x{' '}
                      <TranslatedText fr={item.name_fr} en={item.name_en}>
                        {item.name}
                      </TranslatedText>
                    </span>
                    <span className="font-medium">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p className="text-muted-foreground">
                <TranslatedText fr="Sous-total" en="Subtotal">
                  Zwischensumme
                </TranslatedText>
              </p>
              <p>€{stagedOrder.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">
                <TranslatedText fr="Livraison" en="Shipping">
                  Versand
                </TranslatedText>
              </p>
              <p>€{stagedOrder.shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">
                <TranslatedText fr="Taxes" en="Taxes">
                  Steuern
                </TranslatedText>
              </p>
              <p>€{stagedOrder.taxes.toFixed(2)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <p>
              <TranslatedText fr="Total" en="Total">
                Gesamt
              </TranslatedText>
            </p>
            <p>€{stagedOrder.totalAmount.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/account/orders">
            <TranslatedText fr="Valider mon paiement" en="Validate my payment">
              Zahlung bestätigen
            </TranslatedText>
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/products/all">
            <TranslatedText fr="Continuer les achats" en="Continue Shopping">
              Weiter einkaufen
            </TranslatedText>
          </Link>
        </Button>
      </div>
    </div>
  );
}
