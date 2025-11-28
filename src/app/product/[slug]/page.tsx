
'use client';

import { notFound, useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

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
import { getProductBySlug, getProductsByCategory, products as allProducts } from '@/lib/data';
import type { Review, Product } from '@/lib/types';
import { useUser, useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const { placeholderImages } = placeholderImagesData;

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<ReturnType<typeof getProductsByCategory>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const { toast } = useToast();
  const { language } = useLanguage();
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { user } = useUser();
  const { firestore } = useFirebase();

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

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore || !product) return null;
    return query(collection(firestore, 'products', product.id, 'reviews'), orderBy('createdAt', 'desc'));
  }, [firestore, product]);

  const { data: reviews, isLoading: reviewsLoading } = useCollection<Review>(reviewsQuery);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentification requise',
            description: 'Vous devez être connecté pour laisser un avis.',
        });
        router.push('/login');
        return;
    }
    if (newReviewRating === 0 || newReviewComment.trim() === '') {
      toast({
        variant: 'destructive',
        title: language === 'fr' ? 'Champs requis' : language === 'en' ? 'Required Fields' : 'Erforderliche Felder',
        description: language === 'fr' ? 'Veuillez fournir une note et un commentaire.' : language === 'en' ? 'Please provide a rating and a comment.' : 'Bitte geben Sie eine Bewertung und einen Kommentar ab.',
      });
      return;
    }
    
    setIsSubmittingReview(true);

    const reviewData = {
        productId: product.id,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        createdAt: serverTimestamp(),
    };

    try {
        if (!firestore) throw new Error('Firestore not available');
        const reviewsColRef = collection(firestore, 'products', product.id, 'reviews');
        await addDoc(reviewsColRef, reviewData);
        
        toast({
          title: language === 'fr' ? 'Avis soumis' : language === 'en' ? 'Review Submitted' : 'Bewertung abgegeben',
          description: language === 'fr' ? 'Merci pour votre avis !' : language === 'en' ? 'Thank you for your review!' : 'Vielen Dank für Ihre Bewertung!',
        });

        setNewReviewRating(0);
        setNewReviewComment('');
    } catch (error) {
        console.error("Error submitting review:", error);
        toast({
            variant: 'destructive',
            title: 'Erreur',
            description: "Impossible de soumettre l'avis. Veuillez réessayer.",
        });
    } finally {
        setIsSubmittingReview(false);
    }
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
            <span className="text-sm text-muted-foreground">({reviews?.length || 0} <TranslatedText fr="avis" en="reviews">Bewertungen</TranslatedText>)</span>
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
            <AddToCartButton 
              product={product} 
              options={{ size: selectedSize, color: selectedColor }}
              disabled={ (product.sizes && product.sizes.length > 0 && !selectedSize) || (product.colors && product.colors.length > 0 && !selectedColor) }
            >
              <TranslatedText fr="Ajouter au panier" en="Add to Cart">In den Warenkorb</TranslatedText>
            </AddToCartButton>
            <AddToFavoritesButton productId={product.id} />
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
              <div className="space-y-8">
                {reviewsLoading && <p>Chargement des avis...</p>}
                {!reviewsLoading && reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{review.userName}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : !reviewsLoading && (
                  <p className="text-sm text-muted-foreground"><TranslatedText fr="Pas encore d'avis pour ce produit." en="No reviews for this product yet.">Noch keine Bewertungen für dieses Produkt.</TranslatedText></p>
                )}

                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-4"><TranslatedText fr="Laissez votre avis" en="Leave a review">Hinterlassen Sie eine Bewertung</TranslatedText></h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2"><TranslatedText fr="Note" en="Rating">Bewertung</TranslatedText></label>
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
                            <label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-2"><TranslatedText fr="Commentaire" en="Comment">Kommentar</TranslatedText></label>
                            <Textarea
                                id="comment"
                                value={newReviewComment}
                                onChange={(e) => setNewReviewComment(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmittingReview}>
                            {isSubmittingReview ? "Envoi en cours..." : <TranslatedText fr="Soumettre l'avis" en="Submit Review">Bewertung abschicken</TranslatedText>}
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
