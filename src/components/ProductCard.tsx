
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from './TranslatedText';
import { ProductCardActions } from './ProductCardActions';

const { placeholderImages } = placeholderImagesData;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.images[0]);

  return (
    <div className="group flex h-full flex-col">
        <div className="relative block">
            <Link href={`/product/${product.slug}`} className="block">
                <div className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-md">
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
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ProductCardActions product={product} />
            </div>
        </div>
        <div className="pt-4 text-left">
            <h3 className="font-body text-sm uppercase tracking-wider text-foreground">
                <Link href={`/product/${product.slug}`}><TranslatedText fr={product.name_fr}>{product.name}</TranslatedText></Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
    </div>
  );
}
