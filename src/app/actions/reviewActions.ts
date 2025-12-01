
'use server';

import { getFirebaseAdmin } from "@/firebase/admin";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ReviewFormValues {
    rating: number;
    comment: string;
}

export async function submitReview(productId: string, userId: string, userName: string, data: ReviewFormValues) {
  try {
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
