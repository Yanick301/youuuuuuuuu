
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from './TranslatedText';
import { AddToFavoritesButton } from './favorites/AddToFavoritesButton';
import { AddToCartButton } from './cart/AddToCartButton';
import { Button } from './ui/button';

const { placeholderImages } = placeholderImagesData;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.images[0]);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg">
        <Link href={`/product/${product.slug}`} className="block">
            <div className="relative block aspect-[3/4] w-full overflow-hidden rounded-md">
                {productImage && (
                <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={productImage.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                )}
            </div>
        </Link>
        <div className="p-4 text-center">
            <h3 className="font-headline text-lg leading-snug">
                <Link href={`/product/${product.slug}`}><TranslatedText fr={product.name_fr}>{product.name}</TranslatedText></Link>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
        </div>
    </div>
  );
}
