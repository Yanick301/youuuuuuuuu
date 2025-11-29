
'use client';

import { notFound, useParams } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '@/components/TranslatedText';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getProductBySlug, getProductsByCategory, products as allProducts } from '@/lib/data';
import type { Review, Product } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';

const { placeholderImages } = placeholderImagesData;


export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<ReturnType<typeof getProductsByCategory>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const { toast } = useToast();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  const reviews: Review[] = []; // Static empty reviews
  const reviewsLoading = false;

  useEffect(() => {
    setIsLoading(true);
    const foundProduct = getProductBySlug(allProducts, slug);
    
    if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        const related = getProductsByCategory(allProducts, foundProduct.category, 4, foundProduct.id);
        setRelatedProducts(related);
    }
    
    setIsLoading(false);
  }, [slug]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 4.5; // Return a static rating
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  }, [reviews]);
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 text-center">Chargement du produit...</div>;
  }
  
  if (!isLoading && !product) {
    notFound();
  }

  if (!product) {
    return null; // Should be handled by notFound, but for type safety
  }
  
  const mainImage = placeholderImages.find(p => p.id === product.images[0]);
  const altImages = product.images.slice(1).map(id => placeholderImages.find(p => p.id === id));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });
    toast({
      title: 'Ajouté au panier !',
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
            {mainImage && (
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                    <img
                        src={mainImage.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        data-ai-hint={mainImage.imageHint}
                    />
                </div>
            )}
            <div className="grid grid-cols-3 gap-4">
                {altImages.map(img => img && (
                    <div key={img.id} className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                        <img
                            src={img.imageUrl}
                            alt={`${product.name} alternative Ansicht`}
                            className="h-full w-full object-cover"
                            data-ai-hint={img.imageHint}
                        />
                    </div>
                ))}
            </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-headline text-3xl md:text-4xl"><TranslatedText fr={product.name_fr} en={product.name_en}>{product.name}</TranslatedText></h1>
          <p className="mt-2 text-2xl text-muted-foreground">€{product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({(reviews?.length || 15) + 5} <TranslatedText fr="avis" en="reviews">Bewertungen</TranslatedText>)</span>
          </div>

          <p className="mt-6 text-base leading-relaxed">
            <TranslatedText fr={product.description_fr} en={product.description_en}>{product.description}</TranslatedText>
          </p>

          <div className="mt-8 space-y-6">
            {product.sizes && product.sizes.length > 0 && (
                <div>
                    <Label className="text-sm font-medium"><TranslatedText fr="Taille" en="Size">Größe</TranslatedText></Label>
                    <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="mt-2 flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                            <RadioGroupItem key={size} value={size} id={`size-${size}`} className="sr-only" />
                        ))}
                        {product.sizes.map(size => (
                            <Label 
                                key={size} 
                                htmlFor={`size-${size}`}
                                className={cn(
                                    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm transition-colors',
                                    selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                                )}
                            >{size}</Label>
                        ))}
                    </RadioGroup>
                </div>
            )}
             {product.colors && product.colors.length > 0 && (
                <div>
                    <Label className="text-sm font-medium"><TranslatedText fr="Couleur" en="Color">Farbe</TranslatedText></Label>
                    <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="mt-2 flex flex-wrap gap-2">
                         {product.colors.map(color => (
                            <RadioGroupItem key={color} value={color} id={`color-${color}`} className="sr-only" />
                        ))}
                        {product.colors.map(color => (
                            <Label 
                                key={color} 
                                htmlFor={`color-${color}`}
                                className={cn(
                                    'flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 text-sm transition-colors',
                                    selectedColor === color ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-accent'
                                )}
                            >{color}</Label>
                        ))}
                    </RadioGroup>
                </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <TranslatedText fr="Ajouter au panier" en="Add to Cart">In den Warenkorb</TranslatedText>
            </Button>
          </div>

          <Separator className="my-8" />
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details"><TranslatedText fr="Détails" en="Details">Details</TranslatedText></TabsTrigger>
              <TabsTrigger value="reviews"><TranslatedText fr="Avis" en="Reviews">Bewertungen</TranslatedText></TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li><TranslatedText fr="Fabriqué avec des matériaux de haute qualité" en="Made with high-quality materials">Hergestellt aus hochwertigen Materialien</TranslatedText></li>
                <li><TranslatedText fr="Conçu pour le confort et le style" en="Designed for comfort and style">Entworfen für Komfort und Stil</TranslatedText></li>
                <li><TranslatedText fr="Approvisionnement durable" en="Sustainably sourced">Nachhaltig bezogen</TranslatedText></li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-sm text-muted-foreground"><TranslatedText fr="Fonctionnalité d'avis non disponible." en="Review functionality not available.">Bewertungsfunktion nicht verfügbar.</TranslatedText></p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="mb-12 text-center font-headline text-3xl md:text-4xl">
          <TranslatedText fr="Vous pourriez aussi aimer" en="You Might Also Like">Das könnte Ihnen auch gefallen</TranslatedText>
        </h2>
        {relatedProducts && relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
        ): (
            <div className="text-center">Chargement...</div>
        )}
      </div>
    </div>
  );
}
