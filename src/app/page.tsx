
'use client';
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
import { CollectionHighlight } from '@/components/CollectionHighlight';
import { categories } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { useMemo } from 'react';
import { collection, query } from 'firebase/firestore';

export default function HomePage() {
  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products, isLoading } = useCollection(productsQuery);
  
  const featuredProducts = useMemo(() => {
    if (!products) return [];
    return getFeaturedProducts(products, 4);
  }, [products]);


  return (
    <div className="flex flex-col">
      <section className="relative flex h-[70vh] w-full flex-col items-center justify-center bg-header-background bg-cover bg-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, hsl(30 80% 85% / 0.2), transparent 40%), linear-gradient(to top, rgb(0 0 0 / 0.6), rgb(0 0 0 / 0.2))'
          }} 
        />
        <div className="container px-4 z-10">
          <p className="text-sm uppercase tracking-widest text-white animate-fade-in-up">
             <TranslatedText fr="BIENVENUE CHEZ EZCENTIALS">WILLKOMMEN BEI EZCENTIALS</TranslatedText>
          </p>
          <h1 className="mt-4 font-headline text-6xl md:text-9xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <TranslatedText fr="L'Excellence du Luxe">Die Exzellenz des Luxus</TranslatedText>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/90 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             <TranslatedText fr="Découvrez notre sélection exclusive de vêtements et accessoires haut de gamme.">Entdecken Sie unsere exklusive Auswahl an hochwertiger Kleidung und Accessoires.</TranslatedText>
          </p>
          <Button size="lg" asChild className="mt-8 bg-white text-black hover:bg-white/90 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
                }}
                className="w-full"
            >
                <CarouselContent>
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="basis-4/5 md:basis-1/2 lg:basis-1/3">
                             <CategoryCard 
                                pretitle={<TranslatedText fr="CATÉGORIE">KATEGORIE</TranslatedText>}
                                title={<TranslatedText fr={category.name_fr}>{category.name}</TranslatedText>}
                                description={<TranslatedText fr={`Explorez notre collection ${category.name_fr}.`}>Entdecken Sie unsere {category.name}-Kollektion.</TranslatedText>}
                                linkText={<TranslatedText fr="EXPLORER">ENTDECKEN</TranslatedText>}
                                href={`/products/${category.slug}`}
                                imageId={category.imageId}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </section>

      <section className="w-full bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-5xl text-foreground">
              <TranslatedText fr="Produits Tendances">Trendprodukte</TranslatedText>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              <TranslatedText fr="Découvrez la sélection du moment. Des pièces désirables qui allient style contemporain et qualité intemporelle.">
                Entdecken Sie die aktuelle Auswahl. Begehrte Stücke, die zeitgenössischen Stil und zeitlose Qualität vereinen.
              </TranslatedText>
            </p>
          </div>
          {isLoading ? (
            <div className="text-center mt-12">Chargement des produits...</div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/products/all"><TranslatedText fr="Voir tous les produits">Alle Produkte anzeigen</TranslatedText></Link>
            </Button>
          </div>
        </div>
      </section>

      <CollectionHighlight 
        supertitle={<TranslatedText fr="COLLECTION HIVER">WINTER KOLLEKTION</TranslatedText>}
        title={<TranslatedText fr="Élégance Hivernale">Winterliche Eleganz</TranslatedText>}
        description={<TranslatedText fr="Nos collections d'hiver allient confort, chaleur et style intemporel. Chaque pièce est sélectionnée pour sa qualité exceptionnelle et ses finitions impeccables.">Unsere Winterkollektionen vereinen Komfort, Wärme und zeitlosen Stil. Jedes Stück wird aufgrund seiner außergewöhnlichen Qualität und tadellosen Verarbeitung ausgewählt.</TranslatedText>}
        stats={[
          { value: '40+', label: <TranslatedText fr="PRODUITS">PRODUKTE</TranslatedText> },
          { value: '4.9/5', label: <TranslatedText fr="ÉVALUATION">BEWERTUNG</TranslatedText> },
          { value: '100%', label: 'PREMIUM' },
        ]}
        imageIds={[
          'manteau-long-laine-hugo-boss',
          'doudoune-matelassee-moncler',
          'parka-arctic-canada-goose',
          'pull-col-roule-laine-merinos-paul-smith',
        ]}
        primaryActionLink="/products/winter-clothing"
        primaryActionText={<TranslatedText fr="Voir la Collection">Kollektion ansehen</TranslatedText>}
        secondaryActionLink="/products/all"
        secondaryActionText={<TranslatedText fr="Explorer">Erkunden</TranslatedText>}
      />

    </div>
  );
}
