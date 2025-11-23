
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { TranslatedText } from '@/components/TranslatedText';
import { CategoryCard } from '@/components/CategoryCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4);

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[70vh] w-full flex-col items-center justify-center bg-background text-center text-foreground overflow-hidden">
        <div className="container px-4 z-10">
          <p className="text-sm uppercase tracking-widest text-primary">
             <TranslatedText fr="BIENVENUE CHEZ EZCENTIALS">WILLKOMMEN BEI EZCENTIALS</TranslatedText>
          </p>
          <h1 className="mt-4 font-headline text-6xl md:text-9xl">
            <TranslatedText fr="L'Excellence du Luxe">Die Exzellenz des Luxus</TranslatedText>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
             <TranslatedText fr="Découvrez notre sélection exclusive de vêtements et accessoires haut de gamme.">Entdecken Sie unsere exklusive Auswahl an hochwertiger Kleidung und Accessoires.</TranslatedText>
          </p>
          <Button size="lg" asChild className="mt-8">
            <Link href="/products/all">
              <TranslatedText fr="Explorer la collection">Die Kollektion entdecken</TranslatedText>
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-headline text-3xl md:text-5xl text-foreground">
                <TranslatedText fr="Menu Maison">Menu Maison</TranslatedText>
            </h2>
             <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard 
                        pretitle={<TranslatedText fr="PRÉCISION SARTORIALE">SARTORIALE PRÄZISION</TranslatedText>}
                        title={<TranslatedText fr="Atelier Tailoring">Atelier Schneiderei</TranslatedText>}
                        description={<TranslatedText fr="Costumes architecturés et précision sartoriale.">Strukturierte Anzüge und satoriale Präzision.</TranslatedText>}
                        linkText={<TranslatedText fr="EXPLORER HOMMES">HERREN ENTDECKEN</TranslatedText>}
                        href="/products/mens-clothing"
                        imageId="mens-category"
                    />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard 
                        pretitle={<TranslatedText fr="MAISON LUMIÈRE">MAISON LUMIÈRE</TranslatedText>}
                        title={<TranslatedText fr="Couture & Soirée">Couture & Abendmode</TranslatedText>}
                        description={<TranslatedText fr="Robes fluides, soies lumineuses et couture contemporaine.">Fließende Kleider, leuchtende Seide und zeitgenössische Couture.</TranslatedText>}
                        linkText={<TranslatedText fr="EXPLORER FEMMES">DAMEN ENTDECKEN</TranslatedText>}
                        href="/products/womens-clothing"
                        imageId="womens-category"
                    />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard 
                        pretitle={<TranslatedText fr="GALERIE SÉLECTION">GALERIE AUSWAHL</TranslatedText>}
                        title={<TranslatedText fr="Salon Accessoires">Accessoires Salon</TranslatedText>}
                        description={<TranslatedText fr="Bags iconiques, parfums signature et bijoux modernes.">Ikonische Taschen, Signature-Düfte und moderner Schmuck.</TranslatedText>}
                        linkText={<TranslatedText fr="EXPLORER ACCESSOIRES">ACCESSOIRES ENTDECKEN</TranslatedText>}
                        href="/products/accessories"
                        imageId="accessories-category"
                    />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard
                        pretitle={<TranslatedText fr="ART DE LA MARCHE">KUNST DES GEHENS</TranslatedText>}
                        title={<TranslatedText fr="Studio Chaussures">Schuhstudio</TranslatedText>}
                        description={<TranslatedText fr="Souliers d'exception, entre savoir-faire et design audacieux.">Außergewöhnliche Schuhe, zwischen Handwerkskunst und kühnem Design.</TranslatedText>}
                        linkText={<TranslatedText fr="EXPLORER CHAUSSURES">SCHUHE ENTDECKEN</TranslatedText>}
                        href="/products/shoes"
                        imageId="shoes-category"
                    />
                </CarouselItem>
                <CarouselItem className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard
                        pretitle={<TranslatedText fr="REFUGE D'HIVER">WINTER-REFUGIUM</TranslatedText>}
                        title={<TranslatedText fr="Collection Neige">Schneekollektion</TranslatedText>}
                        description={<TranslatedText fr="Pièces chaudes et luxueuses pour affronter le froid avec style.">Warme und luxuriöse Stücke, um der Kälte mit Stil zu trotzen.</TranslatedText>}
                        linkText={<TranslatedText fr="EXPLORER HIVER">WINTER ENTDECKEN</TranslatedText>}
                        href="/products/winter-clothing"
                        imageId="winter-category"
                    />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-3xl md:text-5xl text-foreground">
            <TranslatedText fr="Produits Phares">Ausgewählte Produkte</TranslatedText>
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
