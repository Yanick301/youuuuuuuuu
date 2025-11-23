
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { TranslatedText } from '@/components/TranslatedText';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const lowerCaseQuery = query.toLowerCase();
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filteredProducts);
      setLoading(false);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      {loading ? (
        <p className="text-center"><TranslatedText>Searching...</TranslatedText></p>
      ) : (
        <>
          <h1 className="mb-8 text-center font-headline text-4xl md:text-5xl">
            {query && results.length > 0 ? (
              <>
                <TranslatedText>Search Results for</TranslatedText>: "{query}"
              </>
            ) : (
                <TranslatedText>No results found for</TranslatedText>
            )}
          </h1>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             !query && (
                <p className="text-center text-muted-foreground">
                    <TranslatedText>Please enter a search term to find products.</TranslatedText>
                </p>
             )
          )}
        </>
      )}
    </div>
  );
}
