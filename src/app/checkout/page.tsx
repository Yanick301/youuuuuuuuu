
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { user, isUserLoading } = useUser();
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Wait until the authentication state is resolved
    if (isUserLoading) {
      return;
    }

    // Once loading is complete, we can safely perform redirects
    if (!user) {
      // If no user, redirect to login and tell it where to come back to
      router.push('/login?redirect=/checkout');
    } else if (totalItems === 0) {
      // If the cart is empty, no point in checking out
      router.push('/products/all');
    } else {
      // If the user is logged in and the cart is not empty, proceed to payment
      router.replace('/checkout/payment-method');
    }
  }, [user, isUserLoading, router, totalItems]);

  // Render a loading state while we wait for the auth check to complete.
  // This prevents the premature redirect that was causing issues.
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h1 className="mt-4 text-2xl font-bold">
        <TranslatedText
          fr="Préparation de votre commande..."
          en="Preparing your order..."
        >
          Ihre Bestellung wird vorbereitet...
        </TranslatedText>
      </h1>
      <p className="flex items-center text-muted-foreground">
        <Lock className="mr-2 h-4 w-4" />
        <TranslatedText
          fr="Vous êtes sur une connexion sécurisée."
          en="You are on a secure connection."
        >
          Sie befinden sich auf einer sicheren Verbindung.
        </TranslatedText>
      </p>
    </div>
  );
}
