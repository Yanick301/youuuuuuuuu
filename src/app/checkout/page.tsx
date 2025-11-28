
'use client';

import { useCart } from '@/context/CartContext';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';

export default function CheckoutPage() {
  const { user, isUserLoading } = useUser();
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Ne rien faire tant que l'état d'authentification n'est pas résolu.
    if (isUserLoading) {
      return;
    }

    // Une fois le chargement terminé, nous pouvons agir en toute sécurité.
    if (!user) {
      // Si aucun utilisateur, rediriger vers la page de connexion.
      router.push('/login?redirect=/checkout/payment-method');
    } else if (totalItems === 0) {
      // Si le panier est vide, renvoyer aux produits.
      router.push('/products/all');
    } else {
      // Si l'utilisateur est connecté et que le panier n'est pas vide,
      // procéder en toute sécurité à la page de paiement.
      router.replace('/checkout/payment-method');
    }
  }, [user, isUserLoading, router, totalItems]);

  // Afficher un écran de chargement pendant que l'état de l'utilisateur est vérifié.
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
