'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { TranslatedText } from '@/components/TranslatedText';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

function SearchPageClient() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  useEffect(() => {
    if (queryParam && products) {
      const lowerCaseQuery = queryParam.toLowerCase();
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.name_fr.toLowerCase().includes(lowerCaseQuery) ||
          product.description_fr.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredProducts);
    } else {
      setResults([]);
    }
  }, [queryParam, products]);

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading ? (
        <p className="text-center"><TranslatedText fr="Recherche...">Suche...</TranslatedText></p>
      ) : (
        <>
          <h1 className="mb-8 text-center font-headline text-3xl md:text-5xl break-words">
            {queryParam && results.length > 0 ? (
              <>
                <TranslatedText fr="Résultats de recherche pour">Suchergebnisse für</TranslatedText>: "{queryParam}"
              </>
            ) : (
                <TranslatedText fr={`Aucun résultat trouvé pour "${queryParam}"`}>Keine Ergebnisse gefunden für "{queryParam}"</TranslatedText>
            )}
          </h1>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             !queryParam && (
                <p className="text-center text-muted-foreground">
                    <TranslatedText fr="Veuillez entrer un terme de recherche pour trouver des produits.">Bitte geben Sie einen Suchbegriff ein, um Produkte zu finden.</TranslatedText>
                </p>
             )
          )}
        </>
      )}
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div className="text-center p-12"><TranslatedText fr="Chargement...">Laden...</TranslatedText></div>}>
            <SearchPageClient />
        </Suspense>
    )
}
