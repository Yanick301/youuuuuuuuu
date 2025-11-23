
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from './TranslatedText';
import { AddToFavoritesButton } from './favorites/AddToFavoritesButton';
import { AddToCartButton } from './cart/AddToCartButton';
import { Star } from 'lucide-react';

const { placeholderImages } = placeholderImagesData;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.images[0]);
  const averageRating = product.reviews.length > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length : 0;


  return (
    <div className="group flex h-full flex-col">
        <Link href={`/product/${product.slug}`} className="block">
            <div className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-lg">
                {productImage && (
                <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={productImage.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                )}
            </div>
        </Link>
        <div className="pt-4 text-left flex-grow flex flex-col">
            <div className="flex justify-between items-start">
                <h3 className="font-headline text-xl text-foreground flex-grow pr-2">
                    <Link href={`/product/${product.slug}`}><TranslatedText fr={product.name_fr}>{product.name}</TranslatedText></Link>
                </h3>
                <AddToFavoritesButton productId={product.id} variant="ghost" size="icon" className="h-9 w-9 rounded-full flex-shrink-0" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground flex-grow">
              <TranslatedText fr={product.description_fr.substring(0, 50) + '...'}>{product.description.substring(0,50) + '...'}</TranslatedText>
            </p>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviews.length})</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-medium text-foreground">${product.price.toFixed(2)}</p>
              <AddToCartButton product={product} variant="ghost" size="icon" />
            </div>
        </div>
    </div>
  );
}
