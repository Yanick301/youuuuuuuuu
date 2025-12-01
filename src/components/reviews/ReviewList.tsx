'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import type { Review } from '@/lib/types';
import { Loader2, Star, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { TranslatedText } from '../TranslatedText';
import { cn } from '@/lib/utils';

export function ReviewList({ productId }: { productId: string }) {
  const { firestore } = useFirebase();
  const { language } = useLanguage();

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, `products/${productId}/reviews`), orderBy('createdAt', 'desc'));
  }, [firestore, productId]);

  const { data: reviews, isLoading, error } = useCollection<Review>(reviewsQuery);

  const getLocale = () => {
    switch(language) {
      case 'fr': return fr;
      case 'en': return enUS;
      default: return de;
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive"><TranslatedText fr="Impossible de charger les avis." en="Could not load reviews.">Bewertungen konnten nicht geladen werden.</TranslatedText></p>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground" />
        <h4 className="mt-4 text-lg font-semibold"><TranslatedText fr="Aucun avis pour l'instant" en="No reviews yet">Noch keine Bewertungen</TranslatedText></h4>
        <p className="mt-1 text-muted-foreground"><TranslatedText fr="Soyez le premier à donner votre avis sur ce produit !" en="Be the first to review this product!">Seien Sie der Erste, der dieses Produkt bewertet!</TranslatedText></p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{review.userName}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      review.rating > i ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'
                    )}
                  />
                ))}
              </div>
            </div>
            {review.createdAt && (
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(review.createdAt.toDate(), { addSuffix: true, locale: getLocale() })}
              </p>
            )}
            <p className="mt-2 text-muted-foreground">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
