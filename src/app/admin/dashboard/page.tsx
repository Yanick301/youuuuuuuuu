
'use client';

import {
  useFirestore,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import {
  collectionGroup,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
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
  FileText,
  User,
  Euro,
  ImageIcon,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useState, useEffect } from 'react';
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
  const { toast } = useToast();
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;

  useEffect(() => {
    if (!firestore) return;

    setIsLoading(true);
    const ordersQuery = query(
      collectionGroup(firestore, 'orders'),
      where('paymentStatus', '==', 'processing')
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Order)
        );
        setOrders(fetchedOrders);
        setIsLoading(false);
      },
      (err) => {
        // This error is generic. A more specific one will be thrown by the global listener.
        console.error("Dashboard onSnapshot error:", err);
        setError('Failed to fetch orders. You may not have the required permissions.');
        setIsLoading(false);
        
        // Create and emit a detailed permission error for the development overlay
        const permissionError = new FirestorePermissionError({
            path: 'orders', // This is a collection group query on 'orders'
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  const handleUpdateStatus = (
    userId: string,
    orderId: string,
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
        setOrders(prev => prev.filter(o => o.id !== orderId));
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'Erreur',
          description: "Impossible de mettre à jour le statut de la commande.",
        });
        const permissionError = new FirestorePermissionError({
            path: orderRef.path,
            operation: 'update',
            requestResourceData: { paymentStatus: status }
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setIsProcessing(null));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement des commandes en attente...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="mt-4 text-xl font-semibold text-destructive">
          Erreur de chargement des commandes
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="font-headline text-4xl">Tableau de Bord Administrateur</h1>
            <p className="text-muted-foreground">Commandes en attente de validation</p>
        </div>
        <Badge variant={orders.length > 0 ? 'default' : 'secondary'}>{orders.length} en attente</Badge>
      </div>

      {orders.length === 0 ? (
         <Card className="border-2 border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center p-20 text-center">
            <FileText className="h-20 w-20 text-muted-foreground" />
            <h3 className="mt-6 text-2xl font-semibold">
                Aucune commande en attente
            </h3>
            <p className="mt-2 text-muted-foreground">
                Lorsqu'un client téléversera une preuve de paiement, sa commande apparaîtra ici.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Commande #{order.id.substring(0, 7)}</CardTitle>
                    <CardDescription>
                      {format(getSafeDate(order), 'PPP p', { locale })}
                    </CardDescription>
                  </div>
                   <Badge variant="default" className="bg-blue-600">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        En traitement
                    </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">

                <div className="text-sm space-y-4 rounded-md border p-4">
                    <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{order.shippingInfo.name} ({order.shippingInfo.email})</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Euro className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{order.totalAmount.toFixed(2)}€</span>
                    </div>
                </div>

                {order.receiptImageDataUri ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Preuve de Paiement</h4>
                    <a
                      href={order.receiptImageDataUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-lg border hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={order.receiptImageDataUri}
                        alt="Preuve de paiement"
                        className="h-auto w-full object-contain max-h-80 bg-muted"
                      />
                    </a>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed border-amber-500 bg-amber-50 p-4 text-center text-sm text-amber-800 flex items-center justify-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <p>Aucune preuve de paiement fournie.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-4 border-t pt-6">
                <Button
                  variant="destructive"
                  onClick={() => handleUpdateStatus(order.userId, order.id, 'rejected')}
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
                  onClick={() => handleUpdateStatus(order.userId, order.id, 'completed')}
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
