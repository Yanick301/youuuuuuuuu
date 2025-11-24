
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc, query, where } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';

export default function OrdersPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { language } = useLanguage();
  const storage = getStorage();
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const ordersQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, `orders`), where("userId", "==", user.uid));
  }, [firestore, user]);

  const { data: orders, isLoading } = useCollection(ordersQuery);

  const handleUploadClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !selectedOrderId || !user || !firestore) {
      return;
    }

    const file = event.target.files[0];
    setUploadingOrderId(selectedOrderId);

    try {
      const filePath = `receipts/${user.uid}/${selectedOrderId}/${file.name}`;
      const fileRef = storageRef(storage, filePath);
      
      const uploadResult = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      const orderDocRef = doc(firestore, `orders`, selectedOrderId);
      await updateDoc(orderDocRef, {
        receiptImageURL: downloadURL,
        paymentStatus: 'processing',
      });

      toast({
        title: language === 'fr' ? 'Reçu téléversé' : language === 'en' ? 'Receipt Uploaded' : 'Beleg hochgeladen',
        description: language === 'fr' ? 'Votre preuve de paiement a été soumise pour validation.' : language === 'en' ? 'Your proof of payment has been submitted for validation.' : 'Ihr Zahlungsnachweis wurde zur Validierung übermittelt.',
      });

    } catch (error) {
      console.error("Error uploading receipt: ", error);
      toast({
        variant: "destructive",
        title: language === 'fr' ? 'Erreur de téléversement' : language === 'en' ? 'Upload Error' : 'Upload-Fehler',
        description: language === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : language === 'en' ? 'An error occurred. Please try again.' : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      });
    } finally {
      setUploadingOrderId(null);
      setSelectedOrderId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        case 'pending': return 'Aktion erforderlich';
        case 'processing': return 'In Bearbeitung';
        case 'completed': return 'Abgeschlossen';
        default: return status;
    }
  }

  const getStatusTextFR = (status: string) => {
    switch (status) {
        case 'pending': return 'Action requise';
        case 'processing': return 'En traitement';
        case 'completed': return 'Terminé';
        default: return status;
    }
  }

  const getStatusTextEN = (status: string) => {
    switch (status) {
        case 'pending': return 'Action Required';
        case 'processing': return 'Processing';
        case 'completed': return 'Completed';
        default: return status;
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
        case 'pending': return <AlertCircle className="mr-2 h-4 w-4" />;
        case 'processing': return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
        case 'completed': return <CheckCircle className="mr-2 h-4 w-4" />;
        default: return null;
    }
  }

  const getDateLocale = () => {
    switch(language) {
      case 'fr': return fr;
      case 'en': return enUS;
      default: return de;
    }
  }

  if (isLoading) {
    return <div className="text-center p-12"><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" /></div>;
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
        <TranslatedText fr="Historique des commandes" en="Order History">Bestellverlauf</TranslatedText>
      </h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {(orders as any[]).sort((a,b) => (b.orderDate?.toDate() || 0) - (a.orderDate?.toDate() || 0)).map((order: any) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    <TranslatedText 
                      fr={`Commande du ${order.orderDate ? format(order.orderDate.toDate(), 'PPP', { locale: fr }) : ''}`}
                      en={`Order of ${order.orderDate ? format(order.orderDate.toDate(), 'PPP', { locale: enUS }) : ''}`}
                    >
                      Bestellung vom {order.orderDate ? format(order.orderDate.toDate(), 'PPP', { locale: de }) : ''}
                    </TranslatedText>
                  </CardTitle>
                  <CardDescription>
                    <TranslatedText fr="ID de commande" en="Order ID">Bestell-ID</TranslatedText>: {order.id}
                  </CardDescription>
                </div>
                <Badge variant={getStatusVariant(order.paymentStatus)} className="flex items-center">
                  {getStatusIcon(order.paymentStatus)}
                  <TranslatedText fr={getStatusTextFR(order.paymentStatus)} en={getStatusTextEN(order.paymentStatus)}>{getStatusTextDE(order.paymentStatus)}</TranslatedText>
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  <ul className="divide-y">
                    {order.items.map((item: any) => (
                      <li key={item.productId} className="flex justify-between items-center py-3 text-sm">
                        <span className="flex-grow pr-4">
                          {item.quantity} x <TranslatedText fr={item.name_fr} en={item.name_en}>{item.name}</TranslatedText>
                        </span>
                        <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground"><TranslatedText fr="Sous-total" en="Subtotal">Zwischensumme</TranslatedText></p>
                      <p>€{order.subtotal.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground"><TranslatedText fr="Livraison" en="Shipping">Versand</TranslatedText></p>
                      <p>€{order.shipping.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground"><TranslatedText fr="Taxes" en="Taxes">Steuern</TranslatedText></p>
                      <p>€{order.taxes.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t">
                      <p><TranslatedText fr="Total" en="Total">Gesamt</TranslatedText></p>
                      <p>€{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {order.paymentStatus === 'pending' && (
                  <div className="mt-6 border-t pt-6 text-center bg-destructive/10 p-6 rounded-md">
                    <h4 className="font-semibold text-destructive"><TranslatedText fr="Action requise : valider votre paiement" en="Action Required: Validate Your Payment">Aktion erforderlich: Zahlung bestätigen</TranslatedText></h4>
                    <p className="text-sm text-destructive/80 my-2"><TranslatedText fr="Pour finaliser votre commande, veuillez téléverser une preuve de votre virement bancaire." en="To finalize your order, please upload proof of your bank transfer.">Um Ihre Bestellung abzuschließen, laden Sie bitte einen Nachweis Ihrer Banküberweisung hoch.</TranslatedText></p>
                    <Button onClick={() => handleUploadClick(order.id)} disabled={uploadingOrderId === order.id} variant="destructive">
                       {uploadingOrderId === order.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                       )}
                      <TranslatedText fr="Téléverser le reçu" en="Upload Receipt">Beleg hochladen</TranslatedText>
                    </Button>
                  </div>
                )}
                {order.paymentStatus === 'processing' && (
                    <div className="mt-6 flex items-center justify-center text-sm font-semibold p-4 bg-blue-50 text-blue-700 rounded-md">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <p><TranslatedText fr="Paiement en cours de vérification" en="Payment under review">Zahlung wird überprüft</TranslatedText></p>
                    </div>
                )}
                {order.paymentStatus === 'completed' && (
                   <div className="mt-6 flex flex-col items-center justify-center text-sm font-semibold p-4 bg-green-50 text-green-700 rounded-md">
                      <div className="flex items-center">
                         <CheckCircle className="mr-2 h-5 w-5" />
                         <p><TranslatedText fr="Commande validée" en="Order Validated">Bestellung bestätigt</TranslatedText></p>
                      </div>
                      {order.receiptImageURL && (
                        <a href={order.receiptImageURL} target="_blank" rel="noopener noreferrer" className="text-xs mt-2 underline">
                          <TranslatedText fr="Voir le reçu" en="View receipt">Beleg anzeigen</TranslatedText>
                        </a>
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
              <h3 className="mt-4 text-xl font-semibold"><TranslatedText fr="Aucune commande pour le moment" en="No orders yet">Noch keine Bestellungen</TranslatedText></h3>
              <p className="mt-2 text-muted-foreground"><TranslatedText fr="Explorez nos collections et trouvez quelque chose qui vous plaît." en="Explore our collections and find something you like.">Entdecken Sie unsere Kollektionen und finden Sie etwas, das Ihnen gefällt.</TranslatedText></p>
              <Button asChild className="mt-6">
                  <Link href="/products/all"><TranslatedText fr="Continuer les achats" en="Continue Shopping">Weiter einkaufen</TranslatedText></Link>
              </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

    