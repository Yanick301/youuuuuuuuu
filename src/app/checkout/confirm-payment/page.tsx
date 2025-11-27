
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  useFirestore,
  useUser,
  useDoc,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TranslatedText } from '@/components/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';

type Order = {
  id: string;
  items: any[];
  totalAmount: number;
  orderDate: any;
  paymentStatus: string;
};

const getSafeDate = (order: any): Date => {
    if (!order || !order.orderDate) {
      return new Date();
    }
    if (order.orderDate && typeof order.orderDate.toDate === 'function') {
      return order.orderDate.toDate();
    }
    return new Date(order.orderDate);
};

// Helper to convert file to Base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});


function ConfirmPaymentPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const orderRef = useMemoFirebase(() => {
    if (!firestore || !orderId) return null;
    return doc(firestore, `orders`, orderId);
  }, [firestore, orderId]);

  const { data: order, isLoading: isOrderLoading, error } = useDoc<Order>(orderRef);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !firestore || !orderId || !user) {
      return;
    }
    const file = event.target.files[0];
    
    // 1MB limit for Firestore document
    if (file.size > 1 * 1024 * 1024) { 
        toast({
            variant: "destructive",
            title: language === 'fr' ? "Fichier trop volumineux" : language === 'en' ? "File too large" : "Datei zu groß",
            description: language === 'fr' ? "La taille de l'image doit être inférieure à 1 Mo." : language === 'en' ? "Image size must be less than 1MB." : "Die Bildgröße muss weniger als 1 MB betragen.",
        });
        return;
    }

    setIsUploading(true);

    try {
        if (!orderRef) return;
        
        // 1. Convert file to Base64 Data URI
        const base64Image = await toBase64(file);

        // 2. Update Firestore document with the Base64 string
        await updateDoc(orderRef, {
            receiptImageUrl: base64Image,
            paymentStatus: 'processing',
        });
        
        router.push('/checkout/thank-you');

    } catch (e: any) {
        // This will catch both file reading and firestore errors
        const permissionError = new FirestorePermissionError({
            path: orderRef!.path,
            operation: 'write',
        });
        errorEmitter.emit('permission-error', permissionError);

        toast({
            variant: "destructive",
            title: language === 'fr' ? "Échec du téléversement" : language === 'en' ? "Upload Failed" : "Upload fehlgeschlagen",
            description: language === 'fr' ? "Impossible de téléverser le reçu. Veuillez réessayer." : language === 'en' ? "Could not upload receipt. Please try again." : "Beleg konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.",
        });
    } finally {
        setIsUploading(false);
    }
  };

  if (isUserLoading || isOrderLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /></div>;
  }
  
  if (!orderId || error) {
      return <div className="container mx-auto flex h-screen flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-2xl font-semibold">Erreur</h2>
        <p className="mt-2 text-muted-foreground">Impossible de charger les détails de la commande. Le lien est peut-être invalide.</p>
        <Button onClick={() => router.push('/')} className="mt-6">Retour à l'accueil</Button>
      </div>;
  }
  
  if (!order) {
      return <div className="container mx-auto flex h-screen flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">Commande non trouvée</h2>
        <p className="mt-2 text-muted-foreground">Nous n'avons pas pu trouver les détails de cette commande.</p>
      </div>;
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
        />
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle className="h-6 w-6" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline"><TranslatedText fr="Finaliser votre commande" en="Finalize Your Order">Bestellung abschließen</TranslatedText></CardTitle>
          <CardDescription>
            <TranslatedText
              fr="Votre commande a été créée. Pour la finaliser, veuillez téléverser votre preuve de paiement."
              en="Your order has been created. To finalize it, please upload your proof of payment."
            >
              Ihre Bestellung wurde erstellt. Um sie abzuschließen, laden Sie bitte Ihren Zahlungsnachweis hoch.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="rounded-lg border p-4 mb-6">
                <h3 className="font-semibold mb-2"><TranslatedText fr="Résumé de la commande" en="Order Summary">Bestellübersicht</TranslatedText></h3>
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <p><TranslatedText fr="ID de commande" en="Order ID">Bestell-ID</TranslatedText></p>
                    <p className="font-mono">{order.id}</p>
                 </div>
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <p><TranslatedText fr="Date" en="Date">Datum</TranslatedText></p>
                    <p>{format(getSafeDate(order), 'PPP', { locale: language === 'fr' ? fr : language === 'en' ? enUS : de })}</p>
                 </div>
                 <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t">
                    <p><TranslatedText fr="Total" en="Total">Gesamt</TranslatedText></p>
                    <p>€{order.totalAmount.toFixed(2)}</p>
                 </div>
            </div>

            <Button
                onClick={handleUploadClick}
                disabled={isUploading}
                size="lg"
                className="w-full"
            >
                {isUploading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                <Upload className="mr-2 h-5 w-5" />
                )}
                <TranslatedText
                fr="Téléverser le reçu"
                en="Upload Receipt"
                >
                Beleg hochladen
                </TranslatedText>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmPaymentPage() {
    return (
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
        <ConfirmPaymentPageClient />
      </Suspense>
    );
}
