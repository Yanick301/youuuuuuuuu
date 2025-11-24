
'use client';

import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { getProductBySlug, getProductsByCategory } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { TranslatedText } from '@/components/TranslatedText';
import { AddToFavoritesButton } from '@/components/favorites/AddToFavoritesButton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const { placeholderImages } = placeholderImagesData;

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const { toast } = useToast();
  const { language } = useLanguage();
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category, 4, product.id);

  const averageRating = product.reviews.length > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length : 0;
  
  const mainImage = placeholderImages.find(p => p.id === product.images[0]);
  const altImages = product.images.slice(1).map(id => placeholderImages.find(p => p.id === id));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating === 0 || newReviewComment.trim() === '') {
      toast({
        variant: 'destructive',
        title: language === 'fr' ? 'Champs requis' : 'Erforderliche Felder',
        description: language === 'fr' ? 'Veuillez fournir une note et un commentaire.' : 'Bitte geben Sie eine Bewertung und einen Kommentar ab.',
      });
      return;
    }
    // In a real app, you would submit this to a backend/database
    console.log({ rating: newReviewRating, comment: newReviewComment });

    toast({
      title: language === 'fr' ? 'Avis soumis' : 'Bewertung abgegeben',
      description: language === 'fr' ? 'Merci pour votre avis !' : 'Vielen Dank für Ihre Bewertung!',
    });

    setNewReviewRating(0);
    setNewReviewComment('');
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
          <h1 className="font-headline text-3xl md:text-4xl"><TranslatedText fr={product.name_fr}>{product.name}</TranslatedText></h1>
          <p className="mt-2 text-2xl text-muted-foreground">${product.price.toFixed(2)}</p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.length} <TranslatedText fr="avis">Bewertungen</TranslatedText>)</span>
          </div>

          <p className="mt-6 text-base leading-relaxed">
            <TranslatedText fr={product.description_fr}>{product.description}</TranslatedText>
          </p>

          <div className="mt-8 flex items-center gap-4">
            <AddToCartButton product={product} />
            <AddToFavoritesButton productId={product.id} />
          </div>

          <Separator className="my-8" />
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details"><TranslatedText fr="Détails">Details</TranslatedText></TabsTrigger>
              <TabsTrigger value="reviews"><TranslatedText fr="Avis">Bewertungen</TranslatedText></TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li><TranslatedText fr="Fabriqué avec des matériaux de haute qualité">Hergestellt aus hochwertigen Materialien</TranslatedText></li>
                <li><TranslatedText fr="Conçu pour le confort et le style">Entworfen für Komfort und Stil</TranslatedText></li>
                <li><TranslatedText fr="Approvisionnement durable">Nachhaltig bezogen</TranslatedText></li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-8">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground"><TranslatedText fr="Pas encore d'avis pour ce produit.">Noch keine Bewertungen für dieses Produkt.</TranslatedText></p>
                )}

                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-4"><TranslatedText fr="Laissez votre avis">Hinterlassen Sie eine Bewertung</TranslatedText></h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2"><TranslatedText fr="Note">Bewertung</TranslatedText></label>
                            <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <button
                                            type="button"
                                            key={ratingValue}
                                            onClick={() => setNewReviewRating(ratingValue)}
                                            onMouseEnter={() => setHoverRating(ratingValue)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={cn(
                                                    'h-6 w-6 cursor-pointer transition-colors',
                                                    ratingValue <= (hoverRating || newReviewRating)
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-muted hover:text-yellow-400'
                                                )}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                         <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-2"><TranslatedText fr="Commentaire">Kommentar</TranslatedText></label>
                            <Textarea
                                id="comment"
                                value={newReviewComment}
                                onChange={(e) => setNewReviewComment(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <Button type="submit">
                            <TranslatedText fr="Soumettre l'avis">Bewertung abschicken</TranslatedText>
                        </Button>
                    </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="mb-12 text-center font-headline text-3xl md:text-4xl">
          <TranslatedText fr="Vous pourriez aussi aimer">Das könnte Ihnen auch gefallen</TranslatedText>
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
