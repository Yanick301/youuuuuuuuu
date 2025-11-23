
'use client';

import { AddToCartButton } from './cart/AddToCartButton';
import { AddToFavoritesButton } from './favorites/AddToFavoritesButton';
import { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export function ProductCardActions({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full border bg-background/80 p-1.5 backdrop-blur-sm">
      <AddToCartButton product={product} variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" />
      <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted">
        <Link href={`/product/${product.slug}`}>
            <Eye className="h-5 w-5 text-muted-foreground" />
        </Link>
      </Button>
      <AddToFavoritesButton productId={product.id} variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" />
    </div>
  );
}
