
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThankYouPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
       <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
        <Loader2 className="h-20 w-20 animate-spin text-primary" />
       </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <CheckCircle2 className="h-20 w-20 text-green-500" />
      <h1 className="mt-6 font-headline text-4xl md:text-5xl">
        <TranslatedText fr="Merci pour votre commande !" en="Thank you for your order!">Vielen Dank für Ihre Bestellung!</TranslatedText>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        <TranslatedText 
          fr="Votre commande a été passée avec succès. Veuillez maintenant vous rendre dans votre espace client pour téléverser votre preuve de paiement et finaliser la commande." 
          en="Your order has been successfully placed. Please now go to your account area to upload your proof of payment and finalize the order."
        >
          Ihre Bestellung wurde erfolgreich aufgegeben. Bitte gehen Sie nun in Ihren Kundenbereich, um Ihren Zahlungsnachweis hochzuladen und die Bestellung abzuschließen.
        </TranslatedText>
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg">
          <Link href="/account/orders"><TranslatedText fr="Valider mon paiement" en="Validate my payment">Zahlung bestätigen</TranslatedText></Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/products/all"><TranslatedText fr="Continuer les achats" en="Continue Shopping">Weiter einkaufen</TranslatedText></Link>
        </Button>
      </div>
    </div>
  );
}
