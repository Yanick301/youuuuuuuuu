
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send } from 'lucide-react';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import type { Review } from '@/lib/types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';


const reviewSchema = z.object({
  rating: z.number().min(1, 'La note est requise').max(5),
  comment: z.string().min(10, 'Le commentaire doit faire au moins 10 caractères.'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// Cette fonction est une Server Action
async function submitReview(productId: string, userId: string, userName: string, data: ReviewFormValues) {
  'use server';
  try {
    const { getFirebaseAdmin } = await import('@/firebase/admin');
    const { firestore } = getFirebaseAdmin();
    
    const newReviewRef = await addDoc(collection(firestore, 'products', productId, 'reviews'), {
      productId,
      userId,
      userName,
      rating: data.rating,
      comment: data.comment,
      createdAt: serverTimestamp(),
    });

    return { success: true, id: newReviewRef.id };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis:", error);
    return { success: false, error: "Une erreur est survenue lors de l'ajout de votre avis." };
  }
}

export default function AddReviewForm({ productId, onReviewAdded }: { productId: string; onReviewAdded: (review: Review) => void }) {
  const { user } = useUser();
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Vous devez être connecté',
        description: "Connectez-vous pour laisser un avis.",
      });
      return;
    }

    const result = await submitReview(productId, user.uid, user.displayName || 'Utilisateur Anonyme', data);

    if (result.success) {
      const newReview: Review = {
        id: result.id!,
        productId: productId,
        userId: user.uid,
        userName: user.displayName || 'Utilisateur Anonyme',
        rating: data.rating,
        comment: data.comment,
        createdAt: new Date(), // Simule la date pour l'affichage instantané
      };
      onReviewAdded(newReview);
      toast({
        title: "Avis ajouté !",
        description: "Merci pour votre contribution.",
      });
      reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: result.error || 'Une erreur est survenue.',
      });
    }
  };

  return (
    <div className="mt-10">
      <h4 className="font-headline text-xl mb-4">
        <TranslatedText fr="Laisser un avis" en="Leave a Review">Eine Bewertung abgeben</TranslatedText>
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label><TranslatedText fr="Votre note" en="Your Rating">Ihre Bewertung</TranslatedText></Label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-6 w-6 cursor-pointer transition-colors',
                      field.value >= star ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'
                    )}
                    onClick={() => field.onChange(star)}
                  />
                ))}
              </div>
            )}
          />
          {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>}
        </div>

        <div>
          <Label htmlFor="comment"><TranslatedText fr="Votre commentaire" en="Your Comment">Ihr Kommentar</TranslatedText></Label>
          <Textarea
            id="comment"
            {...register('comment')}
            className="mt-2"
            rows={4}
            disabled={!user || isSubmitting}
          />
          {errors.comment && <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>}
        </div>

        <Button type="submit" disabled={!user || isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Envoi...' : <TranslatedText fr="Envoyer l'avis" en="Submit Review">Bewertung abschicken</TranslatedText>}
        </Button>
        {!user && <p className="text-sm text-muted-foreground mt-2"><TranslatedText fr="Vous devez être connecté pour laisser un avis." en="You must be logged in to leave a review.">Sie müssen angemeldet sein, um eine Bewertung abzugeben.</TranslatedText></p>}
      </form>
    </div>
  );
}
