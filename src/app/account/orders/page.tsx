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
  Upload,
  CheckCircle,
  Loader2,
  AlertCircle,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  updateDoc,
  query,
  orderBy,
  collectionGroup,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';

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
  const { user, isAdmin } = useUser();
  const firestore = useFirestore();
  const { language } = useLanguage();
  const storage = getStorage();
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const ordersQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    if (isAdmin) {
      return query(collectionGroup(firestore, `orders`), orderBy('orderDate', 'desc'));
    } else {
      return query(
        collection(firestore, `users/${user.uid}/orders`),
        orderBy('orderDate', 'desc')
      );
    }
  }, [firestore, user, isAdmin]);

  const { data: orders, isLoading } = useCollection(ordersQuery);

  const handleUploadClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !event.target.files ||
      event.target.files.length === 0 ||
      !selectedOrderId ||
      !user ||
      !firestore
    ) {
      return;
    }

    const file = event.target.files[0];
    setUploadingOrderId(selectedOrderId);

    try {
      const orderToUpdate = orders?.find(o => o.id === selectedOrderId);
      if (!orderToUpdate) throw new Error("Order not found");
      
      const filePath = `receipts/${orderToUpdate.userId}/${selectedOrderId}/${file.name}`;
      const fileRef = storageRef(storage, filePath);

      const uploadResult = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      const orderDocRef = doc(firestore, `users/${orderToUpdate.userId}/orders`, selectedOrderId);
      await updateDoc(orderDocRef, {
        receiptImageURL: downloadURL,
        paymentStatus: 'processing',
      });

      toast({
        title:
          language === 'fr'
            ? 'Paiement en cours de validation'
            : language === 'en'
            ? 'Payment Under Review'
            : 'Zahlung wird überprüft',
        description:
          language === 'fr'
            ? 'Votre preuve de paiement a été soumise.'
            : language === 'en'
            ? 'Your proof of payment has been submitted.'
            : 'Ihr Zahlungsnachweis wurde übermittelt.',
      });
    } catch (error) {
      console.error('Error uploading receipt: ', error);
      toast({
        variant: 'destructive',
        title:
          language === 'fr'
            ? 'Erreur de téléversement'
            : language === 'en'
            ? 'Upload Error'
            : 'Upload-Fehler',
        description:
          language === 'fr'
            ? 'Une erreur est survenue. Veuillez réessayer.'
            : language === 'en'
            ? 'An error occurred. Please try again.'
            : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      });
    } finally {
      setUploadingOrderId(null);
      setSelectedOrderId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleValidateOrder = async (orderId: string) => {
    if (!firestore || !orders) return;
    try {
      const orderToValidate = orders.find(o => o.id === orderId);
      if (!orderToValidate) throw new Error("Order not found");

      const orderRef = doc(firestore, `users/${orderToValidate.userId}/orders`, orderId);
      await updateDoc(orderRef, { paymentStatus: 'completed' });
      toast({
        title:
          language === 'fr'
            ? 'Commande validée'
            : language === 'en'
            ? 'Order Validated'
            : 'Bestellung validiert',
        description: `${
          language === 'fr'
            ? 'Le paiement pour la commande'
            : language === 'en'
            ? 'Payment for order'
            : 'Zahlung für Bestellung'
        } ${orderId} ${
          language === 'fr'
            ? 'a été validé.'
            : language === 'en'
            ? 'has been validated.'
            : 'wurde validiert.'
        }`,
      });
    } catch (error) {
      console.error('Error validating order:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description:
          language === 'fr'
            ? 'Impossible de valider la commande.'
            : language === 'en'
            ? 'Could not validate the order.'
            : 'Bestellung konnte nicht validiert werden.',
      });
    }
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/png, image/jpeg, image/gif, application/pdf"
      />
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText
          fr={isAdmin ? 'Gérer les commandes' : 'Historique des commandes'}
          en={isAdmin ? 'Manage Orders' : 'Order History'}
        >
          {isAdmin ? 'Bestellungen verwalten' : 'Bestellverlauf'}
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
                    {isAdmin && (
                      <span className="mt-1 block text-xs">
                        Client: {order.userEmail || 'N/A'}
                      </span>
                    )}
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

                {/* USER ACTIONS */}
                {!isAdmin && order.paymentStatus === 'pending' && (
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
                        fr="Pour finaliser votre commande, veuillez téléverser une preuve de votre virement bancaire."
                        en="To finalize your order, please upload proof of your bank transfer."
                      >
                        Um Ihre Bestellung abzuschließen, laden Sie bitte einen
                        Nachweis Ihrer Banküberweisung hoch.
                      </TranslatedText>
                    </p>
                    <Button
                      onClick={() => handleUploadClick(order.id)}
                      disabled={uploadingOrderId === order.id}
                      variant="destructive"
                    >
                      {uploadingOrderId === order.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      <TranslatedText
                        fr="Téléverser le reçu"
                        en="Upload Receipt"
                      >
                        Beleg hochladen
                      </TranslatedText>
                    </Button>
                  </div>
                )}
                {!isAdmin && order.paymentStatus === 'processing' && (
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
                {!isAdmin && order.paymentStatus === 'completed' && (
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
                    {order.receiptImageURL && (
                      <a
                        href={order.receiptImageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs underline"
                      >
                        <TranslatedText fr="Voir le reçu" en="View receipt">
                          Beleg anzeigen
                        </TranslatedText>
                      </a>
                    )}
                  </div>
                )}

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <div>
                      {order.receiptImageURL ? (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={order.receiptImageURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileCheck className="mr-2 h-4 w-4" />
                            <TranslatedText fr="Voir le reçu" en="View Receipt">
                              Beleg anzeigen
                            </TranslatedText>
                          </a>
                        </Button>
                      ) : (
                        <div className="flex items-center text-sm text-amber-600">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          <TranslatedText
                            fr="Preuve de paiement en attente"
                            en="Proof of payment pending"
                          >
                            Zahlungsnachweis ausstehend
                          </TranslatedText>
                        </div>
                      )}
                    </div>
                    {order.paymentStatus === 'processing' && (
                      <Button onClick={() => handleValidateOrder(order.id)}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        <TranslatedText
                          fr="Valider le Paiement"
                          en="Validate Payment"
                        >
                          Zahlung validieren
                        </TranslatedText>
                      </Button>
                    )}
                    {order.paymentStatus === 'pending' && (
                      <p className="text-sm font-semibold text-destructive">
                        <TranslatedText
                          fr="En attente du paiement par le client"
                          en="Waiting for customer payment"
                        >
                          Warten auf Kundenzahlung
                        </TranslatedText>
                      </p>
                    )}
                    {order.paymentStatus === 'completed' && (
                      <p className="text-sm font-semibold text-green-600">
                        <TranslatedText
                          fr="Commande terminée"
                          en="Order Completed"
                        >
                          Bestellung abgeschlossen
                        </TranslatedText>
                      </p>
                    )}
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
              <TranslatedText fr="Aucune commande pour le moment" en="No orders yet">
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
                <TranslatedText fr="Continuer les achats" en="Continue Shopping">
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
