
'use client';

import {
  useFirestore,
  useUser,
  errorEmitter,
  FirestorePermissionError,
  WithId,
} from '@/firebase';
import {
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  CheckCircle,
  Ban,
  AlertTriangle,
  Users,
  Image as ImageIcon,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

type Order = {
  userId: string;
  shippingInfo: any;
  items: any[];
  totalAmount: number;
  orderDate: any;
  paymentStatus: string;
  receiptImageDataUri?: string;
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

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [orders, setOrders] = useState<WithId<Order>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore || !user) return;

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ordersQuery = query(
          collectionGroup(firestore, 'orders'),
          where('paymentStatus', '==', 'processing')
        );
        const querySnapshot = await getDocs(ordersQuery);
        const fetchedOrders: WithId<Order>[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as WithId<Order>);
        });
        setOrders(fetchedOrders.sort((a, b) => getSafeDate(b).getTime() - getSafeDate(a).getTime()));
      } catch (e: any) {
        console.error(e);
        setError("Impossible de charger les commandes. Vérifiez vos permissions de lecture.");
        const permissionError = new FirestorePermissionError({
          path: 'userProfiles/{userId}/orders',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [firestore, user]);

  const handleUpdateStatus = (
    orderId: string,
    userId: string,
    status: 'completed' | 'rejected'
  ) => {
    if (!firestore) return;
    setIsProcessing(orderId);

    const orderRef = doc(firestore, `userProfiles/${userId}/orders`, orderId);

    updateDoc(orderRef, { paymentStatus: status })
      .then(() => {
        toast({
          title: `Commande ${status === 'completed' ? 'confirmée' : 'rejetée'}`,
        });
        setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
      })
      .catch((e) => {
        const permissionError = new FirestorePermissionError({
          path: orderRef.path,
          operation: 'update',
          requestResourceData: { paymentStatus: status },
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: 'Erreur de permission',
          description: "Impossible de mettre à jour le statut de la commande."
        })
      })
      .finally(() => setIsProcessing(null));
  };
  
    const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-4xl">Tableau de Bord Administrateur</h1>
        <Badge variant="secondary" className="text-lg">
            <Users className="mr-2 h-5 w-5" />
            {orders.length} commande(s) en attente
        </Badge>
      </div>

      {error && (
        <Card className="max-w-md mx-auto bg-destructive/10 my-10">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <CardTitle className="mt-4 text-destructive text-center">
              Erreur de chargement
            </CardTitle>
            <CardDescription className="text-destructive/80 text-center">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {orders.length === 0 && !error ? (
         <Card className="border-2 border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center p-24 text-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <h3 className="mt-6 text-2xl font-semibold">
              Tout est à jour !
            </h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Aucune commande n'est actuellement en attente de validation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <Card key={order.id} className="flex flex-col">
              <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle>Commande #{order.id.substring(0, 7)}...</CardTitle>
                        <CardDescription>
                            {format(getSafeDate(order), 'PPP p', { locale })} par{' '}
                            {order.shippingInfo.name}
                        </CardDescription>
                    </div>
                    <Badge variant="default" className="bg-blue-600">En traitement</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="rounded-md border p-4 text-sm">
                  <h4 className="mb-2 font-semibold">Récapitulatif</h4>
                  <div className="space-y-1">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>€{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {order.receiptImageDataUri ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Preuve de Paiement</h4>
                    <Link href={order.receiptImageDataUri} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border hover:opacity-80 transition-opacity">
                      <img
                        src={order.receiptImageDataUri}
                        alt="Preuve de paiement"
                        className="h-auto w-full object-contain max-h-60"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed border-amber-500 bg-amber-50 p-4 text-center text-sm text-amber-800 flex items-center justify-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <p>Aucune preuve de paiement n'a été téléversée.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-center gap-4 border-t pt-6">
                <Button
                  variant="destructive"
                  onClick={() => handleUpdateStatus(order.id, order.userId, 'rejected')}
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
                  onClick={() => handleUpdateStatus(order.id, order.userId, 'completed')}
                  disabled={!order.receiptImageDataUri || isProcessing === order.id}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isProcessing === order.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Confirmer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
