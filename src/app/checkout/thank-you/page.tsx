import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <CheckCircle2 className="h-20 w-20 text-green-500" />
      <h1 className="mt-6 font-headline text-4xl md:text-5xl">
        <TranslatedText fr="Merci pour votre commande !">Vielen Dank für Ihre Bestellung!</TranslatedText>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        <TranslatedText fr="Votre commande a été passée avec succès. Un e-mail de confirmation avec les détails de la commande vous a été envoyé. Nous vous informerons lorsque vos articles auront été expédiés.">
          Ihre Bestellung wurde erfolgreich aufgegeben. Eine Bestätigungs-E-Mail mit den Bestelldetails wurde an Sie gesendet. Wir benachrichtigen Sie, sobald Ihre Artikel versendet wurden.
        </TranslatedText>
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/products/all"><TranslatedText fr="Continuer les achats">Weiter einkaufen</TranslatedText></Link>
      </Button>
    </div>
  );
}
