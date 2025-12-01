
'use server';

import { firestore as serverFirestore } from '@/firebase/server';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

const AddReviewSchema = z.object({
  productId: z.string().min(1),
  userId: z.string().min(1),
  userName: z.string().default('Anonyme'),
  rating: z.coerce.number().min(1, "Veuillez sélectionner une note.").max(5),
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
  const validatedFields = AddReviewSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'La soumission a échoué. Veuillez corriger les erreurs et réessayer.',
    };
  }

  const { productId, ...reviewData } = validatedFields.data;

  try {
    const reviewPayload = {
      ...reviewData,
      createdAt: FieldValue.serverTimestamp(),
    };
    
    await serverFirestore.collection(`products/${productId}/reviews`).add(reviewPayload);

    revalidatePath(`/product/${productId}`);

    return { message: 'Avis soumis avec succès !' };
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    return {
      errors: {
        general: "Une erreur est survenue lors de l'ajout de votre avis. Veuillez réessayer."
      },
      message: "La soumission de l'avis a échoué.",
    };
  }
}
