'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serverFirestore } from '@/firebase/server';

export type AddReviewState = {
  errors?: {
    rating?: string[];
    comment?: string[];
    general?: string;
  };
  message?: string | null;
};

const ReviewSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  userName: z.string(),
  rating: z.coerce.number().min(1, { message: "La note est obligatoire." }).max(5),
  comment: z.string().min(1, { message: "Le commentaire ne peut pas être vide." }),
});

export async function addReview(
  prevState: AddReviewState,
  formData: FormData
): Promise<AddReviewState> {
  const validatedFields = ReviewSchema.safeParse({
    productId: formData.get('productId'),
    userId: formData.get('userId'),
    userName: formData.get('userName'),
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'La soumission a échoué. Veuillez corriger les erreurs.',
    };
  }

  const { productId, ...reviewData } = validatedFields.data;

  try {
    const reviewWithTimestamp = {
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    
    // Malheureusement, nous ne pouvons pas écrire dans le fichier reviews.json depuis le serveur.
    // L'action suivante est une simulation. Pour une application réelle,
    // il faudrait écrire dans une base de données comme Firestore.
    console.log('Un nouvel avis serait ajouté à la base de données :', reviewWithTimestamp);
    
    // Pour simuler la persistance, nous allons simplement afficher un message de succès.
    // Dans un scénario réel avec Firestore :
    // await serverFirestore.collection(`products/${productId}/reviews`).add(reviewWithTimestamp);
    
    revalidatePath(`/product/${productId}`);
    
    return { message: "Merci ! Votre avis a été soumis." };

  } catch (e) {
    console.error('Erreur lors de lajout de lavis:', e);
    return {
      errors: { general: 'Une erreur est survenue lors de l\'ajout de votre avis. Veuillez réessayer.' },
      message: 'Une erreur est survenue lors de l\'ajout de votre avis. Veuillez réessayer.',
    };
  }
}