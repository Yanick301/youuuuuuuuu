
import Link from 'next/link';
import type { Product } from '@/lib/types';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from './TranslatedText';
import { AddToFavoritesButton } from './favorites/AddToFavoritesButton';
import { AddToCartButton } from './cart/AddToCartButton';
import { Star } from 'lucide-react';
import { ProductCardActions } from './ProductCardActions';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

const { placeholderImages } = placeholderImagesData;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.images[0]);
  const averageRating = product.reviews && product.reviews.length > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length : 0;


  return (
    <div className="group flex h-full flex-col">
        <div className="relative block">
            <Link href={`/product/${product.slug}`} className="block">
                <div className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-lg">
                    {productImage && (
                    <img
                        src={productImage.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={productImage.imageHint}
                    />
                    )}
                     {product.oldPrice && (
                        <Badge variant="destructive" className="absolute top-3 left-3">PROMO</Badge>
                    )}
                </div>
            </Link>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ProductCardActions product={product} />
            </div>
        </div>
        <div className="pt-4 text-left flex-grow flex flex-col">
            <div className="flex justify-between items-start">
                <h3 className="font-headline text-xl text-foreground flex-grow pr-2">
                    <Link href={`/product/${product.slug}`}><TranslatedText fr={product.name_fr} en={product.name_en}>{product.name}</TranslatedText></Link>
                </h3>
                <AddToFavoritesButton productId={product.id} variant="ghost" size="icon" className="h-9 w-9 rounded-full flex-shrink-0" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground flex-grow">
              <TranslatedText fr={product.description_fr.substring(0, 50) + '...'} en={product.description_en.substring(0, 50) + '...'}>{product.description.substring(0,50) + '...'}</TranslatedText>
            </p>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('h-4 w-4', i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted')} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviews?.length || 0})</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                  <p className="text-lg font-medium text-foreground">€{product.price.toFixed(2)}</p>
                  {product.oldPrice && (
                      <p className="text-sm text-muted-foreground line-through">€{product.oldPrice.toFixed(2)}</p>
                  )}
              </div>
              <AddToCartButton product={product} variant="ghost" size="icon" />
            </div>
        </div>
    </div>
  );
}

    
