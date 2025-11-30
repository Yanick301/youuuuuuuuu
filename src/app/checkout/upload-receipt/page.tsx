
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from 'emailjs-com';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TranslatedText } from '@/components/TranslatedText';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

const uploadSchema = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'File is required.')
    .refine(
      (files) => files?.[0]?.size <= 5_000_000,
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(
          files?.[0]?.type
        ),
      '.jpg, .png, and .pdf files are accepted.'
    ),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

// Helper to convert file to Base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function UploadReceiptForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
      console.error('EmailJS Public Key is not set.');
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit: SubmitHandler<UploadFormValues> = async (data) => {
    if (!orderId) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'ID de commande manquant.',
      });
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS Service ID or Template ID are not set.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'Email service is not configured. Please contact support.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const file = data.receipt[0];
      const base64file = await toBase64(file);

      // Using parameters that match the user's reference code
      const templateParams = {
        user_name: orderId,
        image_base64: base64file,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      const localOrders = JSON.parse(
        localStorage.getItem('localOrders') || '[]'
      );
      const updatedOrders = localOrders.map((order: any) =>
        order.id === orderId ? { ...order, paymentStatus: 'processing' } : order
      );
      localStorage.setItem('localOrders', JSON.stringify(updatedOrders));
      
      setUploadSuccess(true);
      toast({
        title: 'Reçu envoyé !',
        description:
          'Votre preuve de paiement a été envoyée. Vous allez être redirigé.',
      });

      setTimeout(() => {
        router.push('/account/orders');
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur d\'envoi',
        description:
          'Impossible d\'envoyer votre reçu. Veuillez réessayer ou nous contacter.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderId) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
          <CardDescription>
            Aucun ID de commande trouvé. Impossible de continuer.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (uploadSuccess) {
    return (
        <Card className="w-full max-w-lg text-center">
            <CardContent className="p-10">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-semibold">Téléversement réussi !</h2>
                <p className="mt-2 text-muted-foreground">
                    Votre preuve de paiement a été envoyée avec succès. Votre commande est maintenant en cours de traitement.
                </p>
                 <p className="mt-4 text-sm text-muted-foreground">
                    Vous serez redirigé dans quelques instants...
                </p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-6 w-6" />
        </div>
        <CardTitle className="text-center">
          <TranslatedText fr="Finaliser la commande" en="Finalize Order">
            Bestellung abschließen
          </TranslatedText>
        </CardTitle>
        <CardDescription className="text-center">
          <TranslatedText
            fr={`Pour la commande n° ${orderId}, veuillez téléverser votre preuve de paiement.`}
            en={`For order ID ${orderId}, please upload your proof of payment.`}
          >
            {`Für Bestell-ID ${orderId}, laden Sie bitte Ihren Zahlungsnachweis
            hoch.`}
          </TranslatedText>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="receipt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TranslatedText fr="Preuve de paiement" en="Proof of Payment">
                      Zahlungsnachweis
                    </TranslatedText>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Input
                            type="file"
                            id="receipt"
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            onChange={(e) => {
                                field.onChange(e.target.files);
                                if (e.target.files && e.target.files.length > 0) {
                                    setFileName(e.target.files[0].name);
                                } else {
                                    setFileName('');
                                }
                            }}
                        />
                        <div className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed">
                           {fileName ? (
                                <p className="text-sm text-muted-foreground">{fileName}</p>
                           ): (
                                <>
                                    <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        <TranslatedText fr="Cliquez pour téléverser ou glissez-déposez" en="Click to upload or drag and drop">
                                            Klicken zum Hochladen oder Drag & Drop
                                        </TranslatedText>
                                    </p>
                                </>
                           )}
                        </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <TranslatedText fr="Envoi en cours..." en="Sending...">
                    Wird gesendet...
                  </TranslatedText>
                </>
              ) : (
                <TranslatedText fr="Envoyer le reçu" en="Send Receipt">
                  Beleg senden
                </TranslatedText>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function UploadReceiptPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Chargement...</span>
          </div>
        }
      >
        <UploadReceiptForm />
      </Suspense>
    </div>
  );
}
