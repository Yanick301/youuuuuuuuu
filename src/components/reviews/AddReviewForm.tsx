'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Star, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { addReview, type AddReviewState } from '@/app/actions/reviewActions';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TranslatedText } from '@/components/TranslatedText';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <TranslatedText fr="Envoi en cours..." en="Submitting...">Senden...</TranslatedText>
        </>
      ) : (
        <TranslatedText fr="Soumettre l'avis" en="Submit Review">Bewertung abschicken</TranslatedText>
      )}
    </Button>
  );
}

export function AddReviewForm({ productId }: { productId: string }) {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: AddReviewState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addReview, initialState);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: state.message,
        });
      } else {
        toast({
          title: "Succès",
          description: state.message,
        });
        formRef.current?.reset();
        setRating(0);
      }
    }
  }, [state, toast]);


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating === 0) {
      setRatingError("Veuillez sélectionner une note.");
      return;
    }
    setRatingError(null);
    const formData = new FormData(event.currentTarget);
    formData.set('rating', rating.toString());
    dispatch(formData);
  };

  if (isUserLoading) {
    return <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  if (!user) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="p-6 text-center">
            <p className='text-muted-foreground'>
                <TranslatedText fr="Vous devez être connecté pour laisser un avis." en="You must be logged in to leave a review.">Sie müssen angemeldet sein, um eine Bewertung abzugeben.</TranslatedText>
            </p>
            <Button asChild className="mt-4">
                <Link href={`/login?redirect=/product/${productId}`}>
                    <TranslatedText fr="Se connecter" en="Log In">Anmelden</TranslatedText>
                </Link>
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
        <h3 className="text-lg font-semibold mb-4">
            <TranslatedText fr="Donnez votre avis" en="Write a review">Schreiben Sie eine Bewertung</TranslatedText>
        </h3>
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="userId" value={user.uid} />
            <input type="hidden" name="userName" value={user.displayName || 'Anonyme'} />
            <input type="hidden" name="rating" value={rating} />

            <div>
                <div className="mb-2 flex items-center gap-2">
                    <label className="font-medium">
                        <TranslatedText fr="Votre note :" en="Your rating:">Ihre Bewertung:</TranslatedText>
                    </label>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <Star
                                    key={starValue}
                                    className={cn(
                                    'h-6 w-6 cursor-pointer',
                                    starValue <= (hoverRating || rating)
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-muted-foreground/30'
                                    )}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            );
                        })}
                    </div>
                </div>
                 {ratingError && <p className="text-sm font-medium text-destructive">{ratingError}</p>}
                 {state.errors?.rating && <p className="text-sm font-medium text-destructive">{state.errors.rating}</p>}
            </div>

            <div>
                 <Textarea
                    name="comment"
                    placeholder={
                        'Décrivez votre expérience avec ce produit...'
                    }
                    rows={4}
                    className="w-full"
                    required
                />
                 {state.errors?.comment && <p className="text-sm font-medium text-destructive">{state.errors.comment}</p>}
            </div>

            {state.errors?.general && (
                <p className="text-sm font-medium text-destructive">{state.errors.general}</p>
            )}

            <SubmitButton />
        </form>
    </div>
  );
}
