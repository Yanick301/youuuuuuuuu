
'use client';

import {
  useFirestore,
  useDoc,
  useMemoFirebase,
} from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Ban, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useState } from 'react';
import { TranslatedText } from '@/components/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';

type Order = {
  id: string;
  userId: string;
  shippingInfo: any;
  items: any[];
  totalAmount: number;
  orderDate: any;
  paymentStatus: string;
  receiptImageUrl?: string;
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

export default function OrderValidationPage() {
  const params = useParams();
  const router = useRouter();
  // The user ID is no longer in the path
  const { orderId } = params as { orderId: string };
  const firestore = useFirestore();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const orderRef = useMemoFirebase(() => {
    if (!firestore || !orderId) return null;
    // The collection is now top-level 'orders'
    return doc(firestore, `orders`, orderId);
  }, [firestore, orderId]);

  const { data: order, isLoading, error } = useDoc<Order>(orderRef);
  
  const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;

  const handleUpdateStatus = (status: 'completed' | 'rejected') => {
    if (!orderRef) return;
    setIsProcessing(status);

    updateDoc(orderRef, { paymentStatus: status })
      .then(() => {
        toast({
          title: `Commande ${status === 'completed' ? 'confirmée' : 'rejetée'}`,
        });
        if(status === 'completed') {
            router.push('/checkout/thank-you');
        } else {
             router.push('/products/all');
        }
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: "Impossible de mettre à jour le statut de la commande. Vous n'avez peut-être pas les autorisations nécessaires.",
        })
      })
      .finally(() => setIsProcessing(null));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
        <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <p className='mt-4 text-destructive font-semibold'>Erreur de chargement de la commande.</p>
            <p className='text-sm text-muted-foreground'>La commande est introuvable, le lien est peut-être invalide ou expiré.</p>
        </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-headline text-4xl text-center mb-8">Validation de Commande</h1>
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle>Commande #{order.id.substring(0, 7)}...</CardTitle>
                        <CardDescription>
                            {format(getSafeDate(order), 'PPP p', { locale })} par{' '}
                            {order.shippingInfo.name}
                        </CardDescription>
                    </div>
                     <Badge variant={order.paymentStatus === 'processing' ? 'default' : 'secondary'} className={order.paymentStatus === 'processing' ? "bg-blue-600" : ""}>
                        <TranslatedText fr={order.paymentStatus} en={order.paymentStatus}>{order.paymentStatus}</TranslatedText>
                    </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border p-4 text-sm">
                  <h4 className="mb-2 font-semibold">Récapitulatif</h4>
                  <div className="space-y-1">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity}x <TranslatedText fr={item.name_fr} en={item.name_en}>{item.name}</TranslatedText></span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>€{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {order.receiptImageUrl ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Preuve de Paiement</h4>
                    <a href={order.receiptImageUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border hover:opacity-80 transition-opacity">
                      <img
                        src={order.receiptImageUrl}
                        alt="Preuve de paiement"
                        className="h-auto w-full object-contain max-h-96 bg-muted"
                      />
                    </a>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed border-amber-500 bg-amber-50 p-4 text-center text-sm text-amber-800 flex items-center justify-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <p>Aucune preuve de paiement n'a été téléversée.</p>
                  </div>
                )}
              </CardContent>
             {order.paymentStatus === 'processing' && (
                <CardFooter className="flex items-center justify-center gap-4 border-t pt-6">
                    <Button
                    variant="destructive"
                    onClick={() => handleUpdateStatus('rejected')}
                    disabled={isProcessing === 'rejected' || isProcessing === 'completed'}
                    >
                    {isProcessing === 'rejected' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Ban className="mr-2 h-4 w-4" />
                    )}
                    Rejeter
                    </Button>
                    <Button
                    onClick={() => handleUpdateStatus('completed')}
                    disabled={!order.receiptImageUrl || isProcessing === 'completed' || isProcessing === 'rejected'}
                    className="bg-green-600 hover:bg-green-700"
                    >
                    {isProcessing === 'completed' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Confirmer
                    </Button>
                </CardFooter>
             )}
        </Card>
    </div>
  );
}
