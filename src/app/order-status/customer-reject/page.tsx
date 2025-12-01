
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { sendCustomerRejectionEmail } from '@/app/actions/emailActions';

function CustomerRejectClientPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const encodedUserEmail = searchParams.get('userEmail');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !encodedUserEmail) {
      setStatus('invalid');
      return;
    }

    let decodedEmail = '';
    try {
        decodedEmail = Buffer.from(encodedUserEmail, 'base64').toString('utf-8');
        setUserEmail(decodedEmail);
    } catch (e) {
        console.error("Failed to decode email", e);
        setStatus('invalid');
        return;
    }

    const sendEmail = async () => {
      const result = await sendCustomerRejectionEmail({ userEmail: decodedEmail, orderId });
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    };

    sendEmail();
  }, [orderId, encodedUserEmail]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
            {status === 'success' && <XCircle className="h-6 w-6" />}
            {(status === 'error' || status === 'invalid') && <AlertTriangle className="h-6 w-6" />}
          </div>
          <CardTitle>
            <TranslatedText fr="Rejet Client" en="Customer Rejection">Kundenablehnung</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText fr="Envoi de l'e-mail de rejet" en="Sending rejection email">Ablehnungs-E-Mail wird gesendet</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <p><TranslatedText fr="Envoi en cours..." en="Sending...">Senden...</TranslatedText></p>
          )}
          {status === 'success' && (
            <p className="text-destructive">
                <TranslatedText fr={`L'e-mail de rejet pour la commande ${orderId} a été envoyé à ${userEmail}.`} en={`Rejection email for order ${orderId} has been sent to ${userEmail}.`}>Die Ablehnungs-E-Mail für die Bestellung {orderId} wurde an {userEmail} gesendet.</TranslatedText>
            </p>
          )}
          {status === 'error' && (
            <p className="text-destructive">
                <TranslatedText fr="Une erreur est survenue lors de l'envoi de l'e-mail." en="An error occurred while sending the email.">Beim Senden der E-Mail ist ein Fehler aufgetreten.</TranslatedText>
            </p>
          )}
           {status === 'invalid' && (
            <p className="text-destructive">
                <TranslatedText fr="Lien de rejet invalide ou incomplet." en="Invalid or incomplete rejection link.">Ungültiger oder unvollständiger Ablehnungslink.</TranslatedText>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function CustomerRejectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomerRejectClientPage />
        </Suspense>
    );
}
