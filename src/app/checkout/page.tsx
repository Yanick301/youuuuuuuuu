
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { CheckoutClientPage } from './CheckoutClientPage';
import { TranslatedText } from '@/components/TranslatedText';

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto flex h-screen items-center justify-center text-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="ml-4">
            <TranslatedText
              fr="Chargement de la page de paiement..."
              en="Loading checkout page..."
            >
              Lade Bezahlseite...
            </TranslatedText>
          </p>
        </div>
      }
    >
      <CheckoutClientPage />
    </Suspense>
  );
}
