
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, ExternalLink, PartyPopper } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import type { CartItem } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LocalOrder {
    id: string;
    userId: string;
    shippingInfo: any;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    taxes: number;
    totalAmount: number;
    orderDate: string;
    paymentStatus: 'pending' | 'processing' | 'completed' | 'rejected';
    receiptImageUrl: string | null;
}

// !! IMPORTANT !! Remplacez cette URL par le lien de votre formulaire tiers (Tally, Google Forms, etc.)
const THIRD_PARTY_FORM_URL = "https://tally.so/r/w2P1NE";

function ConfirmPaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/account/orders');
      return;
    }
    
    try {
        const localOrders: LocalOrder[] = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const foundOrder = localOrders.find(o => o.id === orderId);

        if (foundOrder) {
            setOrder(foundOrder);
             if (foundOrder.paymentStatus !== 'pending') {
                toast({
                    title: language === 'fr' ? 'Paiement déjà soumis' : language === 'en' ? 'Payment Already Submitted' : 'Zahlung bereits übermittelt',
                    description: language === 'fr' ? 'Vous allez être redirigé vers vos commandes.' : language === 'en' ? 'You will be redirected to your orders.' : 'Sie werden zu Ihren Bestellungen weitergeleitet.',
                });
                router.push('/account/orders');
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Commande non trouvée',
                description: 'Cette commande n\'existe pas localement.',
            });
            router.push('/account/orders');
        }
    } catch (error) {
        console.error("Failed to load order from local storage:", error);
        toast({
            variant: 'destructive',
            title: 'Erreur',
            description: 'Impossible de charger les commandes locales.',
        });
        router.push('/account/orders');
    } finally {
        setIsOrderLoading(false);
    }
    
  }, [orderId, router, toast, language]);

  const handleConfirmSent = () => {
    if (!orderId) return;

     const localOrders: LocalOrder[] = JSON.parse(localStorage.getItem('localOrders') || '[]');
     const orderIndex = localOrders.findIndex(o => o.id === orderId);

     if (orderIndex > -1) {
         localOrders[orderIndex].paymentStatus = 'processing';
         localStorage.setItem('localOrders', JSON.stringify(localOrders));

         toast({
             title: language === 'fr' ? 'Confirmation reçue !' : language === 'en' ? 'Confirmation Received!' : 'Bestätigung erhalten!',
             description: language === 'fr' ? 'Votre commande est en cours de validation.' : language === 'en' ? 'Your order is now being validated.' : 'Ihre Bestellung wird jetzt validiert.',
         });

         router.push('/account/orders');
     }
  };
  
  if (isUserLoading || isOrderLoading) {
      return (
          <div className="container mx-auto flex h-[80vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  if (!order || order.paymentStatus !== 'pending') {
      return null;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <TranslatedText
              fr="Finaliser le Paiement"
              en="Finalize Payment"
            >
              Zahlung abschließen
            </TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText
              fr={`Pour la commande #${orderId}, veuillez téléverser votre preuve de virement via notre formulaire sécurisé.`}
              en={`For order #${orderId}, please upload your proof of transfer via our secure form.`}
            >
              Für Bestellung #${orderId}, laden Sie bitte Ihren Überweisungsnachweis über unser sicheres Formular hoch.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="default" className="border-blue-200 bg-blue-50 text-blue-900">
             <ExternalLink className="h-4 w-4 !text-blue-900" />
            <AlertTitle className="font-semibold">
                <TranslatedText fr="Étape 1 : Ouvrir le formulaire de paiement" en="Step 1: Open Payment Form">Schritt 1: Zahlungsformular öffnen</TranslatedText>
            </AlertTitle>
            <AlertDescription>
                <TranslatedText
                    fr={`Cliquez sur le bouton ci-dessous pour ouvrir notre formulaire de téléversement sécurisé. Vous y indiquerez l'ID de votre commande (${orderId}) et joindrez votre reçu.`}
                    en={`Click the button below to open our secure upload form. You will enter your order ID (${orderId}) and attach your receipt.`}
                >
                    Klicken Sie auf die Schaltfläche unten, um unser sicheres Upload-Formular zu öffnen. Dort geben Sie Ihre Bestell-ID (${orderId}) ein und hängen Ihren Beleg an.
                </TranslatedText>
            </AlertDescription>
          </Alert>
          
          <a href={`${THIRD_PARTY_FORM_URL}?orderId=${orderId}`} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full" size="lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                <TranslatedText fr="Ouvrir le formulaire sécurisé" en="Open Secure Form">Sicheres Formular öffnen</TranslatedText>
            </Button>
          </a>

          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  <TranslatedText fr="PUIS" en="THEN">DANN</TranslatedText>
                </span>
              </div>
          </div>
           
           <Alert variant="default" className="border-green-200 bg-green-50 text-green-900">
             <PartyPopper className="h-4 w-4 !text-green-900" />
            <AlertTitle className="font-semibold">
                <TranslatedText fr="Étape 2 : Confirmer l'envoi" en="Step 2: Confirm Submission">Schritt 2: Einsendung bestätigen</TranslatedText>
            </AlertTitle>
            <AlertDescription>
                <TranslatedText
                    fr="Une fois votre reçu téléversé via le formulaire, cliquez sur le bouton ci-dessous pour finaliser votre commande."
                    en="Once you have uploaded your receipt via the form, click the button below to finalize your order."
                >
                    Sobald Sie Ihren Beleg über das Formular hochgeladen haben, klicken Sie auf die Schaltfläche unten, um Ihre Bestellung abzuschließen.
                </TranslatedText>
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full" size="lg" onClick={handleConfirmSent}>
            <TranslatedText fr="J'ai téléversé le reçu, finaliser ma commande" en="I've Uploaded the Receipt, Finalize Order">Ich habe den Beleg hochgeladen, Bestellung abschließen</TranslatedText>
          </Button>
          
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">
                <TranslatedText
                    fr="En cliquant sur 'finaliser', votre commande passera en cours de traitement. Nous vérifierons votre paiement manuellement."
                    en="By clicking 'finalize', your order will be set to 'processing'. We will verify your payment manually."
                >
                    Indem Sie auf 'abschließen' klicken, wird Ihre Bestellung auf 'in Bearbeitung' gesetzt. Wir werden Ihre Zahlung manuell überprüfen.
                </TranslatedText>
            </p>
         </CardFooter>
      </Card>
    </div>
  );
}

export default function ConfirmPaymentPage() {
    return (
        <Suspense fallback={<div className="container mx-auto flex h-[80vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ConfirmPaymentClient />
        </Suspense>
    )
}
 