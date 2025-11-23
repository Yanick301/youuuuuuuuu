
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';

import { getProductBySlug, getProductsByCategory } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { TranslatedText } from '@/components/TranslatedText';
import { AddToFavoritesButton } from '@/components/favorites/AddToFavoritesButton';

const { placeholderImages } = placeholderImagesData;

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Produkt nicht gefunden',
    }
  }

  return {
    title: `${product.name} | EZCENTIALS`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category, 4, product.id);

  const averageRating = product.reviews.length > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length : 0;
  
  const mainImage = placeholderImages.find(p => p.id === product.images[0]);
  const altImages = product.images.slice(1).map(id => placeholderImages.find(p => p.id === id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
            {mainImage && (
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                    <Image
                        src={mainImage.imageUrl}
                        alt={product.name}
                        width={600}
                        height={800}
                        className="h-full w-full object-cover"
                        data-ai-hint={mainImage.imageHint}
                    />
                </div>
            )}
            <div className="grid grid-cols-3 gap-4">
                {altImages.map(img => img && (
                    <div key={img.id} className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                        <Image
                            src={img.imageUrl}
                            alt={`${product.name} alternative Ansicht`}
                            width={200}
                            height={267}
                            className="h-full w-full object-cover"
                            data-ai-hint={img.imageHint}
                        />
                    </div>
                ))}
            </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-headline text-4xl">{product.name}</h1>
          <p className="mt-2 text-2xl text-muted-foreground">${product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-primary fill-primary' : 'text-muted'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.length} <TranslatedText>Bewertungen</TranslatedText>)</span>
          </div>

          <p className="mt-6 text-base leading-relaxed">
            <TranslatedText>{product.description}</TranslatedText>
          </p>

          <div className="mt-8 flex items-center gap-4">
            <AddToCartButton product={product} />
            <AddToFavoritesButton productId={product.id} />
          </div>

          <Separator className="my-8" />
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details"><TranslatedText>Details</TranslatedText></TabsTrigger>
              <TabsTrigger value="reviews"><TranslatedText>Bewertungen</TranslatedText></TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li><TranslatedText>Hergestellt aus hochwertigen Materialien</TranslatedText></li>
                <li><TranslatedText>Entworfen für Komfort und Stil</TranslatedText></li>
                <li><TranslatedText>Nachhaltig bezogen</TranslatedText></li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-6">
                {product.reviews.length > 0 ? product.reviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                )) : (
                  <p><TranslatedText>Noch keine Bewertungen.</TranslatedText></p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="mb-12 text-center font-headline text-3xl md:text-4xl">
          <TranslatedText>Das könnte Ihnen auch gefallen</TranslatedText>
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
