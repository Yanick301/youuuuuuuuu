'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';

function ConfirmOrderClientPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');

  useEffect(() => {
    if (orderId) {
      try {
        const localOrders = localStorage.getItem('localOrders');
        if (localOrders) {
          let orders = JSON.parse(localOrders);
          const orderIndex = orders.findIndex((o: any) => o.id === orderId);

          if (orderIndex !== -1) {
            orders[orderIndex].paymentStatus = 'completed';
            localStorage.setItem('localOrders', JSON.stringify(orders));
            setStatus('success');
          } else {
            setStatus('not-found');
          }
        } else {
          setStatus('not-found');
        }
      } catch (e) {
        console.error('Error updating order status:', e);
        setStatus('error');
      }
    } else {
      setStatus('error');
    }
  }, [orderId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
            {status === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
          </div>
          <CardTitle>
            <TranslatedText fr="Confirmation de Commande" en="Order Confirmation">Bestellbestätigung</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText fr="Mise à jour du statut de la commande" en="Updating order status">Bestellstatus wird aktualisiert</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <p><TranslatedText fr="Mise à jour en cours..." en="Updating...">Aktualisierung läuft...</TranslatedText></p>
          )}
          {status === 'success' && (
            <p className="text-green-600">
                <TranslatedText fr={`Le statut de la commande ${orderId} a été mis à jour à "Complété".`} en={`Order ${orderId} status has been updated to "Completed".`}>Der Status der Bestellung {orderId} wurde auf "Abgeschlossen" aktualisiert.</TranslatedText>
            </p>
          )}
          {status === 'error' && (
            <p className="text-destructive">
                <TranslatedText fr="Une erreur est survenue lors de la mise à jour." en="An error occurred during the update.">Bei der Aktualisierung ist ein Fehler aufgetreten.</TranslatedText>
            </p>
          )}
          {status === 'not-found' && (
            <p className="text-destructive">
                <TranslatedText fr={`Commande avec l'ID ${orderId} non trouvée.`} en={`Order with ID ${orderId} not found.`}>Bestellung mit der ID {orderId} nicht gefunden.</TranslatedText>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmOrderClientPage />
        </Suspense>
    );
}
