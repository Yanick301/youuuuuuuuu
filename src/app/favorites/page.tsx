
'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { TranslatedText } from '@/components/TranslatedText';
import { Heart } from 'lucide-react';
import { useUser } from '@/firebase';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { user } = useUser();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
            <h1 className="mb-2 font-headline text-3xl">
                <TranslatedText fr="Mes favoris" en="My Favorites">Meine Favoriten</TranslatedText>
            </h1>
            {user?.displayName ? (
                <p className="text-lg text-muted-foreground">
                    <TranslatedText fr={`Bienvenue, ${user.displayName}. Voici vos articles précieusement sélectionnés.`} en={`Welcome, ${user.displayName}. Here are your treasured items.`}>
                        Willkommen, {user.displayName}. Hier sind Ihre wertvollen Artikel.
                    </TranslatedText>
                </p>
            ) : (
                 <p className="text-lg text-muted-foreground">
                    <TranslatedText fr="Voici vos articles précieusement sélectionnés." en="Here are your treasured items.">
                        Hier sind Ihre wertvollen Artikel.
                    </TranslatedText>
                </p>
            )}
        </div>
      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold"><TranslatedText fr="Aucun favori pour le moment" en="No favorites yet">Noch keine Favoriten</TranslatedText></h3>
          <p className="mt-2 text-muted-foreground"><TranslatedText fr="Cliquez sur le cœur d'un produit pour l'enregistrer." en="Click the heart on products to save them.">Klicken Sie auf das Herz bei Produkten, um sie zu speichern.</TranslatedText></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
