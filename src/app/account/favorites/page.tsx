'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { TranslatedText } from '@/components/TranslatedText';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText>Meine Favoriten</TranslatedText>
      </h1>
      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold"><TranslatedText>Noch keine Favoriten</TranslatedText></h3>
          <p className="mt-2 text-muted-foreground"><TranslatedText>Klicken Sie auf das Herz bei Produkten, um sie zu speichern.</TranslatedText></p>
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
