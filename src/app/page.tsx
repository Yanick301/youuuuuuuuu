

'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getWinterSaleProducts, products } from '@/lib/data';
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
import { Award, Leaf, Truck } from 'lucide-react';

export default function HomePage() {
  // We want 9 products in total on the homepage sale section
  const saleProducts = getWinterSaleProducts(products, 9);

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
             <TranslatedText fr="BIENVENUE CHEZ EZCENTIALS" en="WELCOME TO EZCENTIALS">WILLKOMMEN BEI EZCENTIALS</TranslatedText>
          </p>
          <h1 className="mt-4 font-headline text-6xl md:text-9xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <TranslatedText fr="L'Excellence du Luxe" en="The Excellence of Luxury">Die Exzellenz des Luxus</TranslatedText>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/90 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             <TranslatedText fr="Découvrez notre sélection exclusive de vêtements et accessoires haut de gamme." en="Discover our exclusive selection of high-end clothing and accessories.">Entdecken Sie unsere exklusive Auswahl an hochwertiger Kleidung und Accessoires.</TranslatedText>
          </p>
          <Button size="lg" asChild className="mt-8 bg-white text-black hover:bg-white/90 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/products/all">
              <TranslatedText fr="Explorer la collection" en="Explore the Collection">Die Kollektion entdecken</TranslatedText>
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-headline text-3xl md:text-5xl text-foreground">
                <TranslatedText fr="Menu Maison" en="Home Menu">Menu Maison</TranslatedText>
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
                                pretitle={<TranslatedText fr="CATÉGORIE" en="CATEGORY">KATEGORIE</TranslatedText>}
                                title={<TranslatedText fr={category.name_fr} en={category.name_en}>{category.name}</TranslatedText>}
                                description={<TranslatedText fr={`Explorez notre collection ${category.name_fr}.`} en={`Explore our ${category.name_en} collection.`}>Entdecken Sie unsere {category.name}-Kollektion.</TranslatedText>}
                                linkText={<TranslatedText fr="EXPLORER" en="DISCOVER">ENTDECKEN</TranslatedText>}
                                href={`/products/${category.slug}`}
                                imageId={category.imageId}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </section>

      <section className="relative h-[50vh] bg-cover bg-center text-white" style={{backgroundImage: "url('/images/products/hiver.jpg')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
            <p className="text-sm uppercase tracking-widest animate-fade-in-up"><TranslatedText fr="Jusqu'à -40%" en="Up to -40%">Bis zu -40%</TranslatedText></p>
            <h2 className="mt-4 font-headline text-5xl md:text-7xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <TranslatedText fr="Soldes d'Hiver" en="Winter Sale">Winter-Schlussverkauf</TranslatedText>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/90 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                 <TranslatedText fr="Embrassez l'élégance de la saison avec des pièces d'exception à des prix irrésistibles." en="Embrace the elegance of the season with exceptional pieces at irresistible prices.">Umfassen Sie die Eleganz der Saison mit außergewöhnlichen Stücken zu unwiderstehlichen Preisen.</TranslatedText>
            </p>
            <Button size="lg" asChild className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link href="/products/winter-clothing"><TranslatedText fr="Découvrir les Offres" en="Discover the Offers">Angebote entdecken</TranslatedText></Link>
            </Button>
        </div>
      </section>


      <section className="w-full bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-5xl text-foreground">
              <TranslatedText fr="Notre Sélection en Promotion" en="Our Sale Selection">Unsere Auswahl im Angebot</TranslatedText>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              <TranslatedText fr="Profitez de nos offres exclusives sur une sélection d'articles. L'élégance intemporelle à prix réduit." en="Take advantage of our exclusive offers on a selection of items. Timeless elegance at a reduced price.">
                Profitieren Sie von unseren exklusiven Angeboten für eine Auswahl an Artikeln. Zeitlose Eleganz zum reduzierten Preis.
              </TranslatedText>
            </p>
          </div>
          {saleProducts.length === 0 ? (
            <div className="text-center mt-12">Chargement des produits...</div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/products/winter-clothing"><TranslatedText fr="Voir toutes les promotions" en="View All Promotions">Alle Angebote anzeigen</TranslatedText></Link>
            </Button>
          </div>
        </div>
      </section>

      <CollectionHighlight 
        supertitle={<TranslatedText fr="COLLECTION HIVER" en="WINTER COLLECTION">WINTER KOLLEKTION</TranslatedText>}
        title={<TranslatedText fr="Élégance Hivernale" en="Winter Elegance">Winterliche Eleganz</TranslatedText>}
        description={<TranslatedText fr="Nos collections d'hiver allient confort, chaleur et style intemporel. Chaque pièce est sélectionnée pour sa qualité exceptionnelle et ses finitions impeccables." en="Our winter collections combine comfort, warmth, and timeless style. Each piece is selected for its exceptional quality and flawless finishes.">Unsere Winterkollektionen vereinen Komfort, Wärme und zeitlosen Stil. Jedes Stück wird aufgrund seiner außergewöhnlichen Qualität und tadellosen Verarbeitung ausgewählt.</TranslatedText>}
        stats={[
          { value: '40+', label: <TranslatedText fr="PRODUITS" en="PRODUCTS">PRODUKTE</TranslatedText> },
          { value: '4.9/5', label: <TranslatedText fr="ÉVALUATION" en="RATING">BEWERTUNG</TranslatedText> },
          { value: '100%', label: 'PREMIUM' },
        ]}
        imageIds={[
          'manteau-long-laine-hugo-boss',
          'doudoune-matelassee-moncler',
          'pull-col-roule-laine-merinos-paul-smith',
           'robe-pull-en-cachemire-max-mara'
        ]}
        primaryActionLink="/products/winter-clothing"
        primaryActionText={<TranslatedText fr="Voir la Collection" en="View the Collection">Kollektion ansehen</TranslatedText>}
        secondaryActionLink="/products/all"
        secondaryActionText={<TranslatedText fr="Explorer" en="Explore">Erkunden</TranslatedText>}
      />

       <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-5xl text-foreground">
                <TranslatedText fr="L'Expérience EZCENTIALS" en="The EZCENTIALS Experience">Das EZCENTIALS Erlebnis</TranslatedText>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                <TranslatedText fr="Plus qu'une marque, une promesse de qualité, de durabilité et d'élégance." en="More than a brand, a promise of quality, sustainability, and elegance.">Mehr als eine Marke, ein Versprechen von Qualität, Nachhaltigkeit und Eleganz.</TranslatedText>
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold"><TranslatedText fr="Savoir-Faire d'Exception" en="Exceptional Craftsmanship">Außergewöhnliche Handwerkskunst</TranslatedText></h3>
              <p className="mt-2 text-muted-foreground"><TranslatedText fr="Des pièces conçues par les meilleurs artisans." en="Pieces designed by the best artisans.">Stücke, die von den besten Handwerkern entworfen wurden.</TranslatedText></p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold"><TranslatedText fr="Matériaux Durables" en="Sustainable Materials">Nachhaltige Materialien</TranslatedText></h3>
              <p className="mt-2 text-muted-foreground"><TranslatedText fr="Des tissus nobles et respectueux de l'environnement." en="Noble and environmentally friendly fabrics.">Edle und umweltfreundliche Stoffe.</TranslatedText></p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold"><TranslatedText fr="Service Client Dédié" en="Dedicated Customer Service">Engagierter Kundenservice</TranslatedText></h3>
              <p className="mt-2 text-muted-foreground"><TranslatedText fr="Une équipe à votre écoute pour une expérience parfaite." en="A team at your service for a perfect experience.">Ein Team, das Ihnen für ein perfektes Erlebnis zur Verfügung steht.</TranslatedText></p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
