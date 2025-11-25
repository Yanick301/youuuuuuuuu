
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ShoppingBag,
  Mail,
  CheckCircle,
  Loader2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import {
  collection,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const ADMIN_EMAIL = 'ezcentials@gmail.com';

const getSafeDate = (order: any): Date => {
  if (!order || !order.orderDate) {
    return new Date();
  }
  if (order.orderDate && typeof order.orderDate.toDate === 'function') {
    return order.orderDate.toDate();
  }
  if (order.orderDate instanceof Date) {
    return order.orderDate;
  }
  try {
    const parsedDate = new Date(order.orderDate);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  } catch (e) {
    // Ignore and fallback
  }
  return new Date();
};

export default function OrdersPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  const ordersQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;

    return query(
      collection(firestore, `userProfiles/${user.uid}/orders`),
      orderBy('orderDate', 'desc')
    );
  }, [firestore, user]);

  const { data: orders, isLoading } = useCollection(ordersQuery);

  const handleValidatePaymentClick = (order: any) => {
    if (processingOrderId || !user || !firestore) return;
    
    setProcessingOrderId(order.id);

    const userOrderRef = doc(firestore, `userProfiles/${user.uid}/orders`, order.id);
    
    updateDoc(userOrderRef, {
      paymentStatus: 'processing',
    }).then(() => {
        const subject = encodeURIComponent(`Preuve de Paiement - Commande ${order.id}`);
        const body = encodeURIComponent(`Bonjour,\n\nVeuillez trouver ci-joint la preuve de paiement pour ma commande N° ${order.id}.\n\nCordialement,\n${user.displayName || ''}`);
        window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
        
        toast({
          title:
            language === 'fr'
              ? 'Paiement en cours de validation'
              : language === 'en'
              ? 'Payment Under Review'
              : 'Zahlung wird überprüft',
          description:
            language === 'fr'
              ? "Veuillez joindre votre preuve de paiement à l'e-mail qui s'est ouvert."
              : language === 'en'
              ? 'Please attach your proof of payment to the email that just opened.'
              : 'Bitte hängen Sie Ihren Zahlungsnachweis an die soeben geöffnete E-Mail an.',
        });
    }).catch(async (firestoreError) => {
      const permissionError = new FirestorePermissionError({
        path: userOrderRef.path,
        operation: 'update',
        requestResourceData: { paymentStatus: 'processing' },
      });
      errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setProcessingOrderId(null);
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'destructive';
      case 'processing':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusTextDE = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Aktion erforderlich';
      case 'processing':
        return 'In Bearbeitung';
      case 'completed':
        return 'Abgeschlossen';
      default:
        return status;
    }
  };

  const getStatusTextFR = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Action requise';
      case 'processing':
        return 'En traitement';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };

  const getStatusTextEN = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Action Required';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="mr-2 h-4 w-4" />;
      case 'processing':
        return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  const getDateLocale = () => {
    switch (language) {
      case 'fr':
        return fr;
      case 'en':
        return enUS;
      default:
        return de;
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText fr="Historique des commandes" en="Order History">
          Bestellverlauf
        </TranslatedText>
      </h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {[...(orders as any[])].map((order: any) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    <TranslatedText
                      fr={`Commande du ${format(getSafeDate(order), 'PPP', {
                        locale: fr,
                      })}`}
                      en={`Order of ${format(getSafeDate(order), 'PPP', {
                        locale: enUS,
                      })}`}
                    >
                      Bestellung vom{' '}
                      {format(getSafeDate(order), 'PPP', { locale: de })}
                    </TranslatedText>
                  </CardTitle>
                  <CardDescription>
                    <TranslatedText fr="ID de commande" en="Order ID">
                      Bestell-ID
                    </TranslatedText>
                    : {order.id}
                  </CardDescription>
                </div>
                <Badge
                  variant={getStatusVariant(order.paymentStatus)}
                  className="flex items-center"
                >
                  {getStatusIcon(order.paymentStatus)}
                  <TranslatedText
                    fr={getStatusTextFR(order.paymentStatus)}
                    en={getStatusTextEN(order.paymentStatus)}
                  >
                    {getStatusTextDE(order.paymentStatus)}
                  </TranslatedText>
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border p-4">
                  <ul className="divide-y">
                    {order.items.map((item: any) => (
                      <li
                        key={item.productId}
                        className="flex items-center justify-between py-3 text-sm"
                      >
                        <span className="flex-grow pr-4">
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
                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">
                        <TranslatedText fr="Sous-total" en="Subtotal">
                          Zwischensumme
                        </TranslatedText>
                      </p>
                      <p>€{order.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">
                        <TranslatedText fr="Livraison" en="Shipping">
                          Versand
                        </TranslatedText>
                      </p>
                      <p>€{order.shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">
                        <TranslatedText fr="Taxes" en="Taxes">
                          Steuern
                        </TranslatedText>
                      </p>
                      <p>€{order.taxes.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-2 text-base font-semibold">
                      <p>
                        <TranslatedText fr="Total" en="Total">
                          Gesamt
                        </TranslatedText>
                      </p>
                      <p>€{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {order.paymentStatus === 'pending' && (
                  <div className="mt-6 rounded-md bg-destructive/10 p-6 pt-6 text-center">
                    <h4 className="font-semibold text-destructive">
                      <TranslatedText
                        fr="Action requise : valider votre paiement"
                        en="Action Required: Validate Your Payment"
                      >
                        Aktion erforderlich: Zahlung bestätigen
                      </TranslatedText>
                    </h4>
                    <p className="my-2 text-sm text-destructive/80">
                      <TranslatedText
                        fr="Pour finaliser votre commande, veuillez envoyer une preuve de votre virement bancaire par e-mail."
                        en="To finalize your order, please email proof of your bank transfer."
                      >
                        Um Ihre Bestellung abzuschließen, senden Sie bitte einen
                        Nachweis Ihrer Banküberweisung per E-Mail.
                      </TranslatedText>
                    </p>
                    <Button
                      onClick={() => handleValidatePaymentClick(order)}
                      disabled={processingOrderId === order.id}
                      variant="destructive"
                    >
                      {processingOrderId === order.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Mail className="mr-2 h-4 w-4" />
                      )}
                      <TranslatedText
                        fr="Envoyer la preuve par e-mail"
                        en="Email Proof of Payment"
                      >
                        Nachweis per E-Mail senden
                      </TranslatedText>
                    </Button>
                  </div>
                )}
                {order.paymentStatus === 'processing' && (
                  <div className="mt-6 flex items-center justify-center rounded-md bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <p>
                      <TranslatedText
                        fr="Paiement en cours de vérification"
                        en="Payment under review"
                      >
                        Zahlung wird überprüft
                      </TranslatedText>
                    </p>
                  </div>
                )}
                {order.paymentStatus === 'completed' && (
                  <div className="mt-6 flex flex-col items-center justify-center rounded-md bg-green-50 p-4 text-sm font-semibold text-green-700">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <p>
                        <TranslatedText
                          fr="Paiement validé"
                          en="Payment validated"
                        >
                          Zahlung bestätigt
                        </TranslatedText>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">
              <TranslatedText
                fr="Aucune commande pour le moment"
                en="No orders yet"
              >
                Noch keine Bestellungen
              </TranslatedText>
            </h3>
            <p className="mt-2 text-muted-foreground">
              <TranslatedText
                fr="Explorez nos collections et trouvez quelque chose qui vous plaît."
                en="Explore our collections and find something you like."
              >
                Entdecken Sie unsere Kollektionen und finden Sie etwas, das
                Ihnen gefällt.
              </TranslatedText>
            </p>
            <Button asChild className="mt-6">
              <Link href="/products/all">
                <TranslatedText
                  fr="Continuer les achats"
                  en="Continue Shopping"
                >
                  Weiter einkaufen
                </TranslatedText>
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
