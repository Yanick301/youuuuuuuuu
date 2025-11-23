
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from './TranslatedText';

const { placeholderImages } = placeholderImagesData;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = placeholderImages.find(p => p.id === product.images[0]);

  return (
    <div className="group flex h-full flex-col">
        <Link href={`/product/${product.slug}`} className="block">
            <div className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-100">
                {productImage && (
                <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={productImage.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                )}
            </div>
        </Link>
        <div className="pt-4 text-center">
            <h3 className="font-body text-sm uppercase tracking-wider text-foreground">
                <Link href={`/product/${product.slug}`}><TranslatedText fr={product.name_fr}>{product.name}</TranslatedText></Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
    </div>
  );
}
