
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { categories, getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '@/components/TranslatedText';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const { placeholderImages } = placeholderImagesData;

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4);
  const heroImage = placeholderImages.find((p) => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Elegant fashion model"
            fill
            className="object-cover"
            priority
            data-ai-hint="fashion model"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
            <TranslatedText>EZCENTIALS</TranslatedText>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            <TranslatedText>
              Discover our new collection of timeless pieces, crafted with
              passion and precision.
            </TranslatedText>
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/products/all">
              <TranslatedText>Shop Now</TranslatedText>
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-3xl md:text-4xl">
            <TranslatedText>Shop by Category</TranslatedText>
          </h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {categories.map((category) => {
                const categoryImage = placeholderImages.find(
                  (p) => p.id === category.imageId
                );
                return (
                  <CarouselItem
                    key={category.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <Link
                      href={`/products/${category.slug}`}
                      className="group relative block h-full overflow-hidden rounded-md"
                    >
                      {categoryImage && (
                        <Image
                          src={categoryImage.imageUrl}
                          alt={category.name}
                          width={400}
                          height={500}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={categoryImage.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="font-headline text-2xl text-white">
                          <TranslatedText>{category.name}</TranslatedText>
                        </h3>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section className="w-full bg-card py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-3xl md:text-4xl">
            <TranslatedText>Featured Products</TranslatedText>
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
