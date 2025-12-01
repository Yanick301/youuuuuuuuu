
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { sendCustomerConfirmationEmail } from '@/app/actions/emailActions';

function CustomerConfirmClientPage() {
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
      const result = await sendCustomerConfirmationEmail({ userEmail: decodedEmail, orderId });
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
            {status === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
            {(status === 'error' || status === 'invalid') && <AlertTriangle className="h-6 w-6 text-destructive" />}
          </div>
          <CardTitle>
            <TranslatedText fr="Confirmation Client" en="Customer Confirmation">Kundenbestätigung</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText fr="Envoi de l'e-mail de confirmation" en="Sending confirmation email">Bestätigungs-E-Mail wird gesendet</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <p><TranslatedText fr="Envoi en cours..." en="Sending...">Senden...</TranslatedText></p>
          )}
          {status === 'success' && (
            <p className="text-green-600">
                <TranslatedText fr={`L'e-mail de confirmation pour la commande ${orderId} a été envoyé à ${userEmail}.`} en={`Confirmation email for order ${orderId} has been sent to ${userEmail}.`}>Die Bestätigungs-E-Mail für die Bestellung {orderId} wurde an {userEmail} gesendet.</TranslatedText>
            </p>
          )}
          {status === 'error' && (
            <p className="text-destructive">
                <TranslatedText fr="Une erreur est survenue lors de l'envoi de l'e-mail." en="An error occurred while sending the email.">Beim Senden der E-Mail ist ein Fehler aufgetreten.</TranslatedText>
            </p>
          )}
           {status === 'invalid' && (
            <p className="text-destructive">
                <TranslatedText fr="Lien de confirmation invalide ou incomplet." en="Invalid or incomplete confirmation link.">Ungültiger oder unvollständiger Bestätigungslink.</TranslatedText>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function CustomerConfirmPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomerConfirmClientPage />
        </Suspense>
    );
}
