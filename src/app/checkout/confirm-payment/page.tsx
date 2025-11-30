
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
import { useUser, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, Mail, Banknote } from 'lucide-react';
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

const PAYMENT_EMAIL = "payments@ezcentials.com";

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

  const emailSubject = `Preuve de paiement pour la commande ${orderId}`;
  const emailBody = `Bonjour,
Veuillez trouver ci-joint la preuve de paiement pour ma commande numéro ${orderId}.
Montant : €${order.totalAmount.toFixed(2)}
Merci,
${user?.displayName || ''}
`;
  const mailtoLink = `mailto:${PAYMENT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;


  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Banknote />
            <TranslatedText
              fr="Finaliser le Paiement"
              en="Finalize Payment"
            >
              Zahlung abschließen
            </TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText
              fr={`Pour la commande #${orderId}, veuillez nous envoyer votre preuve de virement par email.`}
              en={`For order #${orderId}, please email us your proof of transfer.`}
            >
              Für Bestellung #${orderId}, senden Sie uns bitte Ihren Überweisungsnachweis per E-Mail.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="default" className="mb-8 border-blue-200 bg-blue-50 text-blue-900">
             <Mail className="h-4 w-4 !text-blue-900" />
            <AlertTitle className="font-semibold">
                <TranslatedText fr="Action Requise : Envoyer votre reçu" en="Action Required: Send Your Receipt">Aktion erforderlich: Beleg senden</TranslatedText>
            </AlertTitle>
            <AlertDescription>
                <TranslatedText
                    fr={`Pour terminer, envoyez-nous la preuve de paiement à l'adresse e-mail suivante :`}
                    en={`To finish, please send the proof of payment to the following email address:`}
                >
                    Zum Abschluss senden Sie uns bitte den Zahlungsnachweis an folgende E-Mail-Adresse:
                </TranslatedText>
                <br />
                <a href={mailtoLink} className="font-bold underline">{PAYMENT_EMAIL}</a>.
                 <p className="mt-2 text-xs">
                    <TranslatedText fr="N'oubliez pas d'inclure votre reçu en pièce jointe." en="Don't forget to attach your receipt.">Vergessen Sie nicht, Ihren Beleg anzuhängen.</TranslatedText>
                </p>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
              <a href={mailtoLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full" size="lg">
                    <Mail className="mr-2 h-4 w-4" />
                    <TranslatedText fr="Ouvrir mon client de messagerie" en="Open My Email Client">Meinen E-Mail-Client öffnen</TranslatedText>
                </Button>
              </a>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  <TranslatedText fr="PUIS" en="THEN">DANN</TranslatedText>
                </span>
              </div>
            </div>

             <Button variant="outline" className="w-full" size="lg" onClick={handleConfirmSent}>
                <TranslatedText fr="J'ai envoyé l'e-mail" en="I've Sent The Email">Ich habe die E-Mail gesendet</TranslatedText>
             </Button>
          </div>
          
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">
                <TranslatedText
                    fr="En cliquant sur 'J'ai envoyé l'e-mail', votre commande passera en cours de traitement. Nous vérifierons votre paiement manuellement."
                    en="By clicking 'I've Sent The Email', your order will be set to 'processing'. We will verify your payment manually."
                >
                    Indem Sie auf 'Ich habe die E-Mail gesendet' klicken, wird Ihre Bestellung auf 'in Bearbeitung' gesetzt. Wir werden Ihre Zahlung manuell überprüfen.
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
