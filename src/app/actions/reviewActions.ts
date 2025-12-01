
'use server';

import { firestore } from '@/firebase/server';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

const AddReviewSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  userName: z.string(),
  rating: z.number().min(1, "Veuillez sélectionner une note.").max(5),
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères.").max(500),
});

export type AddReviewState = {
  errors?: {
    comment?: string[];
    rating?: string[];
    general?: string;
  };
  message?: string | null;
}

export async function addReview(prevState: AddReviewState, formData: FormData): Promise<AddReviewState> {
  const validatedFields = AddReviewSchema.safeParse({
    productId: formData.get('productId'),
    userId: formData.get('userId'),
    userName: formData.get('userName'),
    rating: Number(formData.get('rating')),
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
    const reviewsCollection = firestore.collection(`products/${productId}/reviews`);
    await reviewsCollection.add({
      ...reviewData,
      createdAt: FieldValue.serverTimestamp(),
    });

    revalidatePath(`/product/${productId}`);

    return { message: 'Avis soumis avec succès !', errors: {} };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    return {
      errors: {
        general: 'Une erreur est survenue lors de la soumission de votre avis. Veuillez réessayer.'
      },
      message: "Une erreur s'est produite.",
    };
  }
}
