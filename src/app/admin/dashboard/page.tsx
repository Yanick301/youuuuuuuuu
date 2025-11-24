
'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Loader2, ShieldCheck, FileCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TranslatedText } from '@/components/TranslatedText';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboardPage() {
  const { user, isAdmin, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { language } = useLanguage();

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'orders'), orderBy('orderDate', 'desc'));
  }, [firestore, isAdmin]);

  const { data: orders, isLoading: isLoadingOrders } = useCollection(ordersQuery);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        toast({
          variant: 'destructive',
          title: 'Accès non autorisé',
          description: "Vous n'avez pas les permissions pour voir cette page.",
        });
        router.push('/account');
      }
    }
  }, [user, isAdmin, isUserLoading, router, toast]);

  const handleValidateOrder = async (orderId: string) => {
    if (!firestore) return;
    try {
      const orderRef = doc(firestore, 'orders', orderId);
      await updateDoc(orderRef, { paymentStatus: 'completed' });
      toast({
        title: 'Commande validée',
        description: `Le paiement pour la commande ${orderId} a été validé.`,
      });
    } catch (error) {
      console.error('Error validating order:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de valider la commande.',
      });
    }
  };
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'processing': return 'default';
      case 'completed': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    const texts: { [key: string]: { [key: string]: string } } = {
        de: { pending: 'Aktion erforderlich', processing: 'In Bearbeitung', completed: 'Zahlung bestätigt' },
        fr: { pending: 'Action requise', processing: 'En traitement', completed: 'Paiement validé' },
        en: { pending: 'Action Required', processing: 'Processing', completed: 'Payment validated' },
    };
    return texts[language][status] || status;
  }

  if (isUserLoading || !isAdmin || isLoadingOrders) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8 font-headline text-4xl">Tableau de bord Administrateur</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {orders && orders.length > 0 ? (
          orders.map((order: any) => (
            <Card key={order.id} className="shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>Commande #{order.id.substring(0, 7)}...</CardTitle>
                  <CardDescription>
                    {format(order.orderDate.toDate(), 'PPPpp', { locale: language === 'fr' ? fr : language === 'en' ? enUS : de })}
                  </CardDescription>
                   <p className="text-sm text-muted-foreground mt-1">Client: {order.userEmail}</p>
                </div>
                <Badge variant={getStatusVariant(order.paymentStatus)}>{getStatusText(order.paymentStatus)}</Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold">Articles</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {order.items.map((item: any) => (
                      <li key={item.productId}>{item.quantity} x {item.name}</li>
                    ))}
                  </ul>
                </div>
                 <div className="mb-4">
                    <h4 className="font-semibold">Montant Total</h4>
                    <p className="text-lg font-bold">€{order.totalAmount.toFixed(2)}</p>
                 </div>
                <div className="flex items-center justify-between mt-6 border-t pt-4">
                  <div>
                    {order.receiptImageURL ? (
                       <Button variant="outline" size="sm" asChild>
                         <a href={order.receiptImageURL} target="_blank" rel="noopener noreferrer">
                           <FileCheck className="mr-2 h-4 w-4" />
                           Voir le reçu
                         </a>
                       </Button>
                    ) : (
                        <div className="flex items-center text-sm text-amber-600">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Preuve de paiement en attente
                        </div>
                    )}
                  </div>
                  {order.paymentStatus === 'processing' && (
                    <Button onClick={() => handleValidateOrder(order.id)}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Valider le Paiement
                    </Button>
                  )}
                   {order.paymentStatus === 'pending' && (
                    <p className="text-sm font-semibold text-destructive">En attente du paiement par le client</p>
                  )}
                   {order.paymentStatus === 'completed' && (
                    <p className="text-sm font-semibold text-green-600">Commande terminée et validée</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Aucune commande à afficher.</p>
        )}
      </div>
    </div>
  );
}
