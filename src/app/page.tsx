
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { categories, getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '@/components/TranslatedText';

const { placeholderImages } = placeholderImagesData;

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4);
  const heroImage = placeholderImages.find((p) => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] w-full text-foreground">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Elegantes Model"
            fill
            className="object-cover"
            priority
            data-ai-hint="fashion model"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 text-center text-white">
          <h1 className="font-headline text-5xl md:text-6xl">
            <TranslatedText fr="La Collection">Die Kollektion</TranslatedText>
          </h1>
          <p className="mt-4 max-w-lg text-base">
            <TranslatedText fr="Découvrez notre nouvelle collection de pièces intemporelles, conçues avec passion et précision.">
              Entdecken Sie unsere neue Kollektion zeitloser Stücke, gefertigt mit Leidenschaft und Präzision.
            </TranslatedText>
          </p>
          <Button variant="outline" asChild className="mt-8 border-white bg-transparent text-white hover:bg-white hover:text-black">
            <Link href="/products/all">
              <TranslatedText fr="Découvrir">Entdecken</TranslatedText>
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-4xl md:text-5xl">
            <TranslatedText fr="Produits Phares">Ausgewählte Produkte</TranslatedText>
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-4xl md:text-5xl">
            <TranslatedText fr="Acheter par catégorie">Nach Kategorie einkaufen</TranslatedText>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {categories.map((category) => {
                const categoryImage = placeholderImages.find(
                  (p) => p.id === category.imageId
                );
                return (
                  <Link
                      key={category.id}
                      href={`/products/${category.slug}`}
                      className="group block overflow-hidden text-center"
                    >
                      <div className="relative aspect-[3/4] w-full bg-gray-100">
                        {categoryImage && (
                          <Image
                            src={categoryImage.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            data-ai-hint={categoryImage.imageHint}
                          />
                        )}
                      </div>
                      <h3 className="mt-4 font-headline text-2xl text-foreground">
                        <TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>
                      </h3>
                    </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
