'use client';

import {
  useFirestore,
  useMemoFirebase,
  useCollection,
  useUser,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import { collectionGroup, query, where, doc, updateDoc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Ban, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const getSafeDate = (order: any): Date => {
  if (!order || !order.orderDate) {
    return new Date();
  }
  if (order.orderDate && typeof order.orderDate.toDate === 'function') {
    return order.orderDate.toDate();
  }
  return new Date(order.orderDate);
};

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { language } = useLanguage();
  const { toast } = useToast();
  const { user, isAdmin, isUserLoading, isProfileLoading } = useUser();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const ordersQuery = useMemoFirebase(() => {
    if (!isAdmin || !firestore) return null;
    return query(
      collectionGroup(firestore, 'orders'),
      where('paymentStatus', '==', 'processing')
    );
  }, [firestore, isAdmin]);

  const {
    data: processingOrders,
    isLoading: areOrdersLoading,
    error,
  } = useCollection(ordersQuery);
  
  const handleUpdateStatus = (order: any, status: 'completed' | 'rejected') => {
    if (!order || !firestore || !user || !isAdmin) {
      toast({ variant: 'destructive', title: 'Action non autorisée' });
      return;
    }
    setIsProcessing(order.id);
    const orderRef = doc(
      firestore,
      `userProfiles/${order.userId}/orders`,
      order.id
    );

    updateDoc(orderRef, { paymentStatus: status })
      .then(() => {
        toast({
          title: 'Statut mis à jour',
          description: `La commande a été marquée comme ${status}.`,
        });
        // The real-time listener of useCollection will automatically update the UI
      })
      .catch((e) => {
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: orderRef.path,
            operation: 'update',
            requestResourceData: { paymentStatus: status },
          })
        );
      })
      .finally(() => setIsProcessing(null));
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <CardTitle className="mt-4">Accès non autorisé</CardTitle>
            <CardDescription>
              Vous devez être administrateur pour accéder à cette page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (areOrdersLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin" />
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center font-headline text-3xl">
        Commandes à Valider
      </h1>
      {processingOrders && processingOrders.length > 0 ? (
        <div className="space-y-6">
            {processingOrders.map((order: any) => (
                <Card key={order.id}>
                    <CardHeader>
                        <CardTitle>Commande #{order.id}</CardTitle>
                        <CardDescription>
                        Passée le{' '}
                        {format(getSafeDate(order), 'PPP', {
                            locale:
                            language === 'fr'
                                ? fr
                                : language === 'en'
                                ? enUS
                                : de,
                        })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Client</h3>
                                <p>
                                {order.shippingInfo.name} ({order.shippingInfo.email})
                                </p>
                            </div>
                            <div className="rounded-md border p-4">
                                <ul className="divide-y">
                                {order.items.map((item: any) => (
                                    <li
                                    key={item.productId}
                                    className="flex items-center justify-between py-3 text-sm"
                                    >
                                    <span className="flex-grow pr-4">
                                        {item.quantity} x {item.name}
                                    </span>
                                    <span className="font-medium">
                                        €{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    </li>
                                ))}
                                </ul>
                                <div className="mt-4 border-t pt-4 text-lg font-semibold">
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p>€{order.totalAmount.toFixed(2)}</p>
                                </div>
                                </div>
                            </div>

                             <div className="flex items-center justify-center gap-4 pt-4">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleUpdateStatus(order, 'rejected')}
                                    disabled={isProcessing === order.id}
                                >
                                    {isProcessing === order.id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                    <Ban className="mr-2 h-4 w-4" />
                                    )}
                                    Rejeter
                                </Button>
                                <Button
                                    variant="default"
                                    onClick={() => handleUpdateStatus(order, 'completed')}
                                    disabled={isProcessing === order.id}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isProcessing === order.id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    )}
                                    Confirmer la Commande
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">
              Aucune commande en attente de validation
            </h3>
            <p className="text-muted-foreground">
              Toutes les commandes ont été traitées.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
