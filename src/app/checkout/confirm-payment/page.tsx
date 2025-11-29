
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TranslatedText } from '@/components/TranslatedText';
import { useUser, useStorage } from '@/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, Upload, Banknote } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import type { CartItem } from '@/lib/types';

interface LocalOrder {
    id: string;
    userId: string;
    shippingInfo: any;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    taxes: number;
    totalAmount: number;
    orderDate: string;
    paymentStatus: 'pending' | 'processing' | 'completed' | 'rejected';
    receiptImageUrl: string | null;
}


const uploadSchema = z.object({
  receipt: z
    .custom<FileList>()
    .transform((file) => file[0])
    .refine((file) => file, 'Le reçu est requis.')
    .refine(
      (file) => file?.size <= 1024 * 1024,
      'La taille du fichier doit être inférieure à 1 Mo.'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file?.type),
      'Seuls les formats .jpg, .png et .gif sont acceptés.'
    ),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

function ConfirmPaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { user, isUserLoading } = useUser();
  const storage = useStorage();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });
  
  useEffect(() => {
    if (!orderId) {
      router.push('/account/orders');
      return;
    }
    
    try {
        const localOrders: LocalOrder[] = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const foundOrder = localOrders.find(o => o.id === orderId);

        if (foundOrder) {
            setOrder(foundOrder);
        } else {
            toast({
                variant: 'destructive',
                title: 'Commande non trouvée',
                description: 'Cette commande n\'existe pas localement.',
            });
            router.push('/account/orders');
        }
    } catch (error) {
        console.error("Failed to load order from local storage:", error);
        toast({
            variant: 'destructive',
            title: 'Erreur',
            description: 'Impossible de charger les commandes locales.',
        });
        router.push('/account/orders');
    } finally {
        setIsOrderLoading(false);
    }
    
  }, [orderId, router, toast]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit: SubmitHandler<UploadFormValues> = async (data) => {
    if (!orderId || !user || !storage) {
        toast({ variant: 'destructive', title: 'Erreur', description: 'Le service n\'est pas disponible.'});
        return;
    }

    try {
        const base64Image = await toBase64(data.receipt);
        const storageRef = ref(storage, `receipts/${orderId}/${data.receipt.name}`);

        // Upload the Base64 string
        await uploadString(storageRef, base64Image, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);

        // Update order in local storage
        const localOrders: LocalOrder[] = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const orderIndex = localOrders.findIndex(o => o.id === orderId);

        if (orderIndex > -1) {
            localOrders[orderIndex].receiptImageUrl = imageUrl;
            localOrders[orderIndex].paymentStatus = 'processing';
            localStorage.setItem('localOrders', JSON.stringify(localOrders));
        }

        toast({
            title: 'Reçu téléversé !',
            description: 'Votre commande est maintenant en cours de validation.',
        });

        router.push('/account/orders');

    } catch (error: any) {
        console.error("Upload error:", error);
        toast({
            variant: 'destructive',
            title: 'Erreur de téléversement',
            description: 'Une erreur s\'est produite. Veuillez réessayer.',
        });
    }
  };
  
  if (isUserLoading || isOrderLoading) {
      return (
          <div className="container mx-auto flex h-[80vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  if (!order) {
      return null;
  }
  
  if (order.paymentStatus !== 'pending') {
       router.push('/account/orders');
       return null;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Banknote />
            <TranslatedText
              fr="Finaliser le Paiement"
              en="Finalize Payment"
            >
              Zahlung abschließen
            </TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText
              fr={`Pour la commande #${orderId}, veuillez téléverser votre preuve de virement.`}
              en={`For order #${orderId}, please upload your proof of transfer.`}
            >
              Für die Bestellung #${orderId}, laden Sie bitte Ihren Überweisungsbeleg hoch.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 space-y-4 rounded-lg border bg-muted/50 p-6">
            <h4 className="font-semibold">
              <TranslatedText fr="Rappel des instructions" en="Instructions Reminder">
                Anweisungserinnerung
              </TranslatedText>
            </h4>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <TranslatedText
                  fr="Effectuez le virement vers le compte bancaire fourni."
                  en="Make the transfer to the provided bank account."
                >
                  Führen Sie die Überweisung auf das angegebene Bankkonto durch.
                </TranslatedText>
              </li>
              <li>
                <TranslatedText
                  fr="Utilisez le motif 'Gifts' pour le virement."
                  en="Use 'Gifts' as the reason for the transfer."
                >
                  Verwenden Sie 'Gifts' als Verwendungszweck.
                </TranslatedText>
              </li>
              <li>
                <TranslatedText
                  fr="Prenez une capture d'écran ou une photo de la confirmation de virement."
                  en="Take a screenshot or photo of the transfer confirmation."
                >
                  Machen Sie einen Screenshot oder ein Foto der Überweisungsbestätigung.
                </TranslatedText>
              </li>
              <li>
                <TranslatedText
                  fr="Téléversez l'image ci-dessous."
                  en="Upload the image below."
                >
                  Laden Sie das Bild unten hoch.
                </TranslatedText>
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="receipt"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>
                      <TranslatedText fr="Preuve de paiement" en="Proof of Payment">
                        Zahlungsnachweis
                      </TranslatedText>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={(event) => onChange(event.target.files)}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <TranslatedText fr="Téléversement..." en="Uploading...">
                      Hochladen...
                    </TranslatedText>
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    <TranslatedText fr="Confirmer le paiement" en="Confirm Payment">
                      Zahlung bestätigen
                    </TranslatedText>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmPaymentPage() {
    return (
        <Suspense fallback={<div className="container mx-auto flex h-[80vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ConfirmPaymentClient />
        </Suspense>
    )
}
