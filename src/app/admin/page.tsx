
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { TranslatedText } from '@/components/TranslatedText';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { Loader2, Inbox, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fr, de, enUS } from 'date-fns/locale';

type Order = {
  id: string;
  orderDate: any;
  shippingInfo: { name: string };
  totalAmount: number;
  paymentStatus: 'pending' | 'processing' | 'completed' | 'rejected';
};

const getSafeDate = (order: Order): Date => {
  if (order.orderDate && typeof order.orderDate.toDate === 'function') {
    return order.orderDate.toDate();
  }
  return new Date();
};

export default function AdminPage() {
  const firestore = useFirestore();
  const { language } = useLanguage();
  const locale = language === 'fr' ? fr : language === 'en' ? enUS : de;

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'orders'),
      where('paymentStatus', 'in', ['pending', 'processing']),
      orderBy('orderDate', 'desc')
    );
  }, [firestore]);

  const { data: orders, isLoading } = useCollection<Order>(ordersQuery);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'processing': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl">
          <TranslatedText fr="Administration des Commandes" en="Order Administration">
            Bestellverwaltung
          </TranslatedText>
        </h1>
        <p className="text-muted-foreground">
          <TranslatedText
            fr="Validez les paiements et gérez les commandes en attente."
            en="Validate payments and manage pending orders."
          >
            Zahlungen validieren und ausstehende Bestellungen verwalten.
          </TranslatedText>
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 text-center">
            <Inbox className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold"><TranslatedText fr="Aucune commande en attente" en="No Pending Orders">Keine ausstehenden Bestellungen</TranslatedText></h3>
            <p className="mt-2 text-muted-foreground"><TranslatedText fr="Toutes les commandes ont été traitées. Bon travail !" en="All orders have been processed. Good job!">Alle Bestellungen wurden bearbeitet. Gut gemacht!</TranslatedText></p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{format(getSafeDate(order), 'P', { locale })}</TableCell>
                  <TableCell>{order.shippingInfo.name}</TableCell>
                  <TableCell>€{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.paymentStatus)}>
                        <TranslatedText fr={order.paymentStatus} en={order.paymentStatus}>
                            {order.paymentStatus}
                        </TranslatedText>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
