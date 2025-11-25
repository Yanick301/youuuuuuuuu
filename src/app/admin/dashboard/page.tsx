
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useState, useMemo } from 'react';
import {
  collectionGroup,
  query,
  orderBy,
  doc,
  writeBatch,
  updateDoc,
} from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { TranslatedText } from '@/components/TranslatedText';

export default function AdminDashboardPage() {
  const { user, isAdmin, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { language } = useLanguage();

  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const ordersQuery = useMemoFirebase(() => {
    if (!isAdmin || !firestore) return null;
    return query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc'));
  }, [isAdmin, firestore]);

  const { data: orders, isLoading } = useCollection(ordersQuery);

  const getDateLocale = () => {
    switch (language) {
      case 'fr': return fr;
      case 'en': return enUS;
      default: return de;
    }
  };

  const getSafeDate = (order: any): Date => {
    if (order?.orderDate?.toDate) {
      return order.orderDate.toDate();
    }
    return new Date();
  };

  const handleValidatePayment = async (orderId: string, userId: string) => {
    if (!firestore) return;
    setUpdatingOrderId(orderId);
    try {
      const userOrderRef = doc(firestore, `userProfiles/${userId}/orders`, orderId);
      await updateDoc(userOrderRef, { paymentStatus: 'completed' });
      
      toast({
        title: 'Paiement Validé',
        description: `La commande ${orderId} a été marquée comme terminée. Le client sera notifié.`,
      });
    } catch (error) {
      console.error('Error validating payment:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de valider le paiement.',
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const { pendingOrders, processingOrders, completedOrders } = useMemo(() => {
    if (!orders) {
      return {
        pendingOrders: [],
        processingOrders: [],
        completedOrders: [],
      };
    }
    const pending: any[] = [];
    const processing: any[] = [];
    const completed: any[] = [];
    (orders as any[]).forEach((order) => {
      switch (order.paymentStatus) {
        case 'pending':
          pending.push(order);
          break;
        case 'processing':
          processing.push(order);
          break;
        case 'completed':
          completed.push(order);
          break;
        default:
          break;
      }
    });
    return {
      pendingOrders: pending,
      processingOrders: processing,
      completedOrders: completed,
    };
  }, [orders]);

  if (isUserLoading || isLoading) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center p-12 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const renderOrderList = (orderList: any[], title: React.ReactNode, type: 'pending' | 'processing' | 'completed') => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="text-center p-4"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : orderList.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune commande ici.</p>
          ) : (
            <div className="space-y-4">
              {orderList.map((order) => (
                <Card key={order.id} className="p-4">
                   <div className="flex justify-between items-start">
                     <div>
                        <p className="font-semibold">
                          {format(getSafeDate(order), 'PPP', { locale: getDateLocale() })}
                        </p>
                        <CardDescription>
                          ID: {order.id}
                        </CardDescription>
                        <p className="text-sm font-medium">
                          Client: {order.shippingInfo?.name} ({order.shippingInfo?.email})
                        </p>
                     </div>
                     <p className="font-bold text-lg">€{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 border-t pt-4">
                     <p className="text-sm font-medium mb-2">Produits commandés:</p>
                      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {order.items.map((item: any) => (
                          <li key={item.productId}>
                            {item.quantity} x <TranslatedText fr={item.name_fr} en={item.name_en}>{item.name}</TranslatedText>
                          </li>
                        ))}
                      </ul>
                  </div>

                  {order.paymentStatus === 'processing' && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                            onClick={() => handleValidatePayment(order.id, order.userId)}
                            disabled={updatingOrderId === order.id}
                            size="sm"
                        >
                            {updatingOrderId === order.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <CheckCircle className="mr-2 h-4 w-4" />
                            )}
                            Valider la Commande
                        </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };


  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 font-headline text-4xl"><TranslatedText fr="Tableau de Bord Administrateur" en="Admin Dashboard">Tableau de Bord Administrateur</TranslatedText></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                 {renderOrderList(pendingOrders, <div className="flex items-center gap-2"><AlertCircle className="text-destructive h-5 w-5"/> <TranslatedText fr="Commandes en attente de paiement" en="Pending Payment">Commandes en attente de paiement</TranslatedText></div>, 'pending')}
            </div>
            <div className="lg:col-span-1 space-y-8">
                {renderOrderList(processingOrders, <div className="flex items-center gap-2"><Clock className="text-blue-500 h-5 w-5"/> <TranslatedText fr="Commandes en attente de validation" en="Pending Validation">Commandes en attente de validation</TranslatedText></div>, 'processing')}
            </div>
            <div className="lg:col-span-1 space-y-8">
                {renderOrderList(completedOrders, <div className="flex items-center gap-2"><CheckCircle className="text-green-500 h-5 w-5"/> <TranslatedText fr="Commandes terminées" en="Completed Orders">Commandes terminées</TranslatedText></div>, 'completed')}
            </div>
        </div>
    </div>
  );
}
