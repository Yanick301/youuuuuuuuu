
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
    <Card className="group flex h-full flex-col overflow-hidden rounded-lg border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
        <Link href={`/product/${product.slug}`} className="block">
            <CardHeader className="p-0">
                <div className="relative block aspect-[3/4] w-full overflow-hidden">
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
            </CardHeader>
        </Link>
        <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="font-semibold leading-snug flex-grow">
                <Link href={`/product/${product.slug}`}><TranslatedText>{product.name}</TranslatedText></Link>
            </h3>
            <p className="text-sm text-muted-foreground mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
            <AddToCartButton product={product} variant="outline" className="w-full">
                <TranslatedText>In den Warenkorb</TranslatedText>
            </AddToCartButton>
            <AddToFavoritesButton productId={product.id} variant="outline" />
        </CardFooter>
    </Card>
  );
}
