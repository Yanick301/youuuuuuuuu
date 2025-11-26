'use client';

import {
  useFirestore,
  useMemoFirebase,
  errorEmitter,
  FirestorePermissionError,
  useUser,
} from '@/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
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
  ShieldAlert,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useState, useEffect, useMemo } from 'react';
import { TranslatedText } from '@/components/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';
import { useAdminMode } from '@/context/AdminModeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type Order = {
  id: string;
  userId: string;
  shippingInfo: any;
  items: any[];
  totalAmount: number;
  orderDate: any;
  paymentStatus: 'processing' | 'completed' | 'rejected' | 'pending';
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

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { isFullyAdmin } = useAdminMode();

  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [processedOrders, setProcessedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;

  const pendingOrdersQuery = useMemoFirebase(() => {
    if (!isFullyAdmin || !firestore) return null;
    return query(
      collection(firestore, 'orders'),
      where('paymentStatus', '==', 'processing'),
      orderBy('orderDate', 'desc')
    );
  }, [firestore, isFullyAdmin]);

  const processedOrdersQuery = useMemoFirebase(() => {
    if (!isFullyAdmin || !firestore) return null;
    return query(
      collection(firestore, 'orders'),
      where('paymentStatus', 'in', ['completed', 'rejected']),
      orderBy('orderDate', 'desc')
    );
  }, [firestore, isFullyAdmin]);


  useEffect(() => {
    if (!isFullyAdmin) {
        setIsLoading(false);
        return;
    }
    
    setIsLoading(true);

    const unsubscribes: (() => void)[] = [];

    if (pendingOrdersQuery) {
        unsubscribes.push(onSnapshot(pendingOrdersQuery,
            (snapshot) => {
                const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
                setPendingOrders(fetched);
                setError(null);
            },
            (err) => {
                console.error("Pending Orders Error:", err);
                const permissionError = new FirestorePermissionError({ path: 'orders', operation: 'list' });
                errorEmitter.emit('permission-error', permissionError);
                setError('Failed to fetch pending orders.');
            }
        ));
    }
    
    if (processedOrdersQuery) {
        unsubscribes.push(onSnapshot(processedOrdersQuery,
            (snapshot) => {
                const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
                setProcessedOrders(fetched);
                setError(null);
            },
            (err) => {
                console.error("Processed Orders Error:", err);
                 const permissionError = new FirestorePermissionError({ path: 'orders', operation: 'list' });
                errorEmitter.emit('permission-error', permissionError);
                setError('Failed to fetch processed orders.');
            }
        ));
    }

    setIsLoading(false);
    
    return () => unsubscribes.forEach(unsub => unsub());

  }, [pendingOrdersQuery, processedOrdersQuery, isFullyAdmin]);

  const handleUpdateStatus = (
    orderId: string,
    status: 'completed' | 'rejected'
  ) => {
    if (!firestore) return;
    setIsProcessing(orderId);

    const orderRef = doc(firestore, `orders`, orderId);

    updateDoc(orderRef, { paymentStatus: status })
      .then(() => {
        toast({
          title: `Commande ${status === 'completed' ? 'confirmée' : 'rejetée'}`,
        });
        // No need to filter locally, onSnapshot will do it
      })
      .catch((e) => {
        const permissionError = new FirestorePermissionError({
            path: orderRef.path,
            operation: 'update',
            requestResourceData: { paymentStatus: status }
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setIsProcessing(null));
  };
  
  if (!isFullyAdmin) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <ShieldAlert className="h-16 w-16 text-amber-500" />
        <h2 className="mt-6 font-headline text-3xl">
          <TranslatedText fr="Mode Admin Verrouillé" en="Admin Mode Locked">Admin-Modus gesperrt</TranslatedText>
        </h2>
        <p className="mt-2 text-muted-foreground">
          <TranslatedText fr="Veuillez activer le mode administrateur pour voir ce contenu." en="Please activate admin mode to view this content.">Bitte aktivieren Sie den Admin-Modus, um diesen Inhalt anzuzeigen.</TranslatedText>
        </p>
      </div>
    );
  }


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground"><TranslatedText fr="Chargement des commandes..." en="Loading orders..." >Laden der Bestellungen...</TranslatedText></p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="mt-4 text-xl font-semibold text-destructive">
          <TranslatedText fr="Erreur de chargement des commandes" en="Error loading orders">Fehler beim Laden der Bestellungen</TranslatedText>
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="font-headline text-4xl"><TranslatedText fr="Tableau de Bord Administrateur" en="Admin Dashboard">Admin-Dashboard</TranslatedText></h1>
                <p className="text-muted-foreground"><TranslatedText fr="Gestion des commandes clients" en="Customer Order Management">Kundenauftragsverwaltung</TranslatedText></p>
            </div>
            <Badge variant="default">{pendingOrders.length} <TranslatedText fr="en attente" en="pending">ausstehend</TranslatedText></Badge>
        </div>
        
        <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending">
                    <TranslatedText fr="Commandes en attente" en="Pending Orders">Ausstehende Bestellungen</TranslatedText> ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="processed">
                    <TranslatedText fr="Commandes traitées" en="Processed Orders">Bearbeitete Bestellungen</TranslatedText> ({processedOrders.length})
                </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6">
                {pendingOrders.length === 0 ? (
                     <Card className="border-2 border-dashed shadow-none">
                      <CardContent className="flex flex-col items-center justify-center p-20 text-center">
                        <FileText className="h-20 w-20 text-muted-foreground" />
                        <h3 className="mt-6 text-2xl font-semibold">
                            <TranslatedText fr="Aucune commande en attente" en="No pending orders">Keine ausstehenden Bestellungen</TranslatedText>
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            <TranslatedText fr="Les nouvelles commandes à valider apparaîtront ici." en="New orders to validate will appear here.">Neue zu validierende Bestellungen werden hier angezeigt.</TranslatedText>
                        </p>
                      </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {pendingOrders.map(order => <OrderCard key={order.id} order={order} locale={locale} isProcessing={isProcessing} handleUpdateStatus={handleUpdateStatus} />)}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="processed" className="mt-6">
                 {processedOrders.length === 0 ? (
                     <Card className="border-2 border-dashed shadow-none">
                      <CardContent className="flex flex-col items-center justify-center p-20 text-center">
                        <FileText className="h-20 w-20 text-muted-foreground" />
                        <h3 className="mt-6 text-2xl font-semibold">
                           <TranslatedText fr="Aucune commande traitée" en="No processed orders">Keine bearbeiteten Bestellungen</TranslatedText>
                        </h3>
                      </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {processedOrders.map(order => <OrderCard key={order.id} order={order} locale={locale} isProcessing={isProcessing} handleUpdateStatus={handleUpdateStatus} />)}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    </div>
  );
}

const OrderCard = ({ order, locale, isProcessing, handleUpdateStatus }: { order: Order; locale: Locale; isProcessing: string | null; handleUpdateStatus: (orderId: string, status: 'completed' | 'rejected') => void; }) => {
    
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'processing': return <Badge variant="default" className="bg-blue-600"><Loader2 className="mr-2 h-4 w-4 animate-spin" /><TranslatedText fr="En traitement" en="Processing">In Bearbeitung</TranslatedText></Badge>;
            case 'completed': return <Badge variant="secondary" className="bg-green-600"><CheckCircle className="mr-2 h-4 w-4" /><TranslatedText fr="Confirmée" en="Confirmed">Bestätigt</TranslatedText></Badge>;
            case 'rejected': return <Badge variant="destructive"><Ban className="mr-2 h-4 w-4" /><TranslatedText fr="Rejetée" en="Rejected">Abgelehnt</TranslatedText></Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };
    
    return (
        <Card key={order.id} className="flex flex-col">
            <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                <CardTitle className="text-lg"><TranslatedText fr="Commande" en="Order">Bestellung</TranslatedText> #{order.id.substring(0, 7)}</CardTitle>
                <CardDescription>
                    {format(getSafeDate(order), 'PPP p', { locale })}
                </CardDescription>
                </div>
                {getStatusBadge(order.paymentStatus)}
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

            {order.receiptImageUrl ? (
                <div className="space-y-2">
                <h4 className="font-semibold text-sm"><TranslatedText fr="Preuve de Paiement" en="Proof of Payment">Zahlungsnachweis</TranslatedText></h4>
                <a
                    href={order.receiptImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg border hover:opacity-80 transition-opacity"
                >
                    <img
                    src={order.receiptImageUrl}
                    alt="Preuve de paiement"
                    className="h-auto w-full object-contain max-h-80 bg-muted"
                    />
                </a>
                </div>
            ) : (
                <div className="rounded-md border border-dashed border-amber-500 bg-amber-50 p-4 text-center text-sm text-amber-800 flex items-center justify-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <p><TranslatedText fr="Aucune preuve de paiement fournie." en="No proof of payment provided.">Kein Zahlungsnachweis bereitgestellt.</TranslatedText></p>
                </div>
            )}
            </CardContent>
            {order.paymentStatus === 'processing' && (
                <CardFooter className="flex items-center justify-end gap-4 border-t pt-6">
                    <Button
                        variant="destructive"
                        onClick={() => handleUpdateStatus(order.id, 'rejected')}
                        disabled={isProcessing === order.id}
                    >
                        {isProcessing === order.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ban className="mr-2 h-4 w-4" />}
                        <TranslatedText fr="Rejeter" en="Reject">Ablehnen</TranslatedText>
                    </Button>
                    <Button
                        onClick={() => handleUpdateStatus(order.id, 'completed')}
                        disabled={!order.receiptImageUrl || isProcessing === order.id}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isProcessing === order.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                        <TranslatedText fr="Confirmer" en="Confirm">Bestätigen</TranslatedText>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};
