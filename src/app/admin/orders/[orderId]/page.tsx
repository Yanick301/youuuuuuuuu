
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Check, X, Undo2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { TranslatedText } from '@/components/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { orderId } = params as { orderId: string };
  const firestore = useFirestore();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const orderRef = useMemoFirebase(() => {
    if (!firestore || !orderId) return null;
    return doc(firestore, `orders`, orderId);
  }, [firestore, orderId]);

  const { data: order, isLoading, error } = useDoc<Order>(orderRef);
  
  const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'processing': return 'default';
      case 'completed': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };
  
  const handleStatusUpdate = async (newStatus: 'completed' | 'rejected') => {
      if (!orderRef) return;
      setIsUpdating(true);
      try {
        await updateDoc(orderRef, { paymentStatus: newStatus });
        toast({
            title: "Statut mis à jour",
            description: `La commande est maintenant ${newStatus}.`
        });
      } catch (error) {
        console.error("Failed to update status", error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible de mettre à jour le statut."
        })
      } finally {
        setIsUpdating(false);
      }
  }


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
            <p className='text-sm text-muted-foreground'>La commande est introuvable ou vous n'avez pas les permissions.</p>
            <Button onClick={() => router.push('/admin')} className="mt-4">
              Retour à l'admin
            </Button>
        </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
        <Button onClick={() => router.push('/admin')} variant="ghost" className="mb-4">
            <Undo2 className="mr-2 h-4 w-4" />
            <TranslatedText fr="Retour aux commandes" en="Back to Orders">Zurück zu den Bestellungen</TranslatedText>
        </Button>
        <h1 className="font-headline text-4xl text-center mb-8"><TranslatedText fr="Détails de la Commande" en="Order Details">Bestelldetails</TranslatedText></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-start'>
                        <div>
                            <CardTitle>Commande #{order.id.substring(0, 7)}</CardTitle>
                            <CardDescription>
                                {format(getSafeDate(order), 'PPP p', { locale })}
                            </CardDescription>
                        </div>
                        <Badge variant={getStatusVariant(order.paymentStatus)}>
                            <TranslatedText fr={order.paymentStatus} en={order.paymentStatus}>{order.paymentStatus}</TranslatedText>
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-sm">
                        <h4 className="mb-2 font-semibold text-muted-foreground">Client</h4>
                        <p>{order.shippingInfo.name}</p>
                        <p>{order.shippingInfo.email}</p>
                    </div>
                    <div className="text-sm">
                        <h4 className="mb-2 font-semibold text-muted-foreground">Adresse de livraison</h4>
                        <p>{order.shippingInfo.address}</p>
                        <p>{order.shippingInfo.zip} {order.shippingInfo.city}</p>
                        <p>{order.shippingInfo.country}</p>
                    </div>
                    <Separator />
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Validation du Paiement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Aucune preuve de paiement fournie.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button onClick={() => handleStatusUpdate('completed')} variant="default" disabled={isUpdating || !order.receiptImageUrl || order.paymentStatus === 'completed'}>
                        {isUpdating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Check className="mr-2 h-4 w-4" />} Approuver
                    </Button>
                    <Button onClick={() => handleStatusUpdate('rejected')} variant="destructive" disabled={isUpdating || order.paymentStatus === 'rejected'}>
                         {isUpdating ? <Loader2 className="h-4 w-4 animate-spin"/> : <X className="mr-2 h-4 w-4" />} Rejeter
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
