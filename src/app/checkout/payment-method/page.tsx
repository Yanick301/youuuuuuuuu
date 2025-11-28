
'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TranslatedText } from '@/components/TranslatedText';
import { Separator } from '@/components/ui/separator';
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
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useUser, useFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const { placeholderImages } = placeholderImagesData;

const shippingSchemaDE = z.object({
  name: z.string().min(2, { message: 'Name ist erforderlich.' }),
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
  address: z.string().min(5, { message: 'Adresse ist erforderlich.' }),
  city: z.string().min(2, { message: 'Stadt ist erforderlich.' }),
  zip: z.string().min(3, { message: 'Postleitzahl ist erforderlich.' }),
  country: z.string().min(2, { message: 'Land ist erforderlich.' }),
});

const shippingSchemaFR = z.object({
  name: z.string().min(2, { message: 'Le nom est requis.' }),
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  address: z.string().min(5, { message: 'L\'adresse est requise.' }),
  city: z.string().min(2, { message: 'La ville est requise.' }),
  zip: z.string().min(3, { message: 'Le code postal est requis.' }),
  country: z.string().min(2, { message: 'Le pays est requis.' }),
});

const shippingSchemaEN = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  zip: z.string().min(3, { message: 'Zip code is required.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
});

export default function PaymentMethodPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useUser();
  const { firestore } = useFirebase();
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSchema =
    language === 'fr'
      ? shippingSchemaFR
      : language === 'en'
      ? shippingSchemaEN
      : shippingSchemaDE;

  const form = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      address: '',
      city: '',
      zip: '',
      country: 'Deutschland',
    },
  });

  const shippingCost = subtotal > 100 ? 0 : 10;
  const taxRate = 0.19; // 19%
  const taxes = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxes;

  const onSubmit: SubmitHandler<z.infer<typeof currentSchema>> = async (
    data
  ) => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Benutzer nicht authentifiziert oder Firestore nicht verfügbar.',
      });
      return;
    }
    
    setIsSubmitting(true);

    const orderData = {
      userId: user.uid,
      shippingInfo: data,
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        name_fr: item.product.name_fr,
        name_en: item.product.name_en,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      subtotal: subtotal,
      shipping: shippingCost,
      taxes: taxes,
      totalAmount: totalAmount,
      orderDate: serverTimestamp(),
      paymentStatus: 'pending',
    };

    try {
        const ordersCollectionRef = collection(firestore, 'orders');
        const docRef = await addDoc(ordersCollectionRef, orderData);
        
        clearCart();
        toast({
            title: "Commande enregistrée !",
            description: "Vous allez être redirigé pour finaliser le paiement.",
        });
        
        router.push(`/checkout/confirm-payment?orderId=${docRef.id}`);

    } catch (error) {
        console.error("Error creating order: ", error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible de créer la commande. Veuillez réessayer."
        })
    } finally {
        setIsSubmitting(false);
    }

  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center font-headline text-4xl md:text-5xl">
        <TranslatedText fr="Finaliser ma Commande" en="Finalize My Order">
          Meine Bestellung abschließen
        </TranslatedText>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card className="rounded-lg border shadow-sm">
            <CardHeader>
                <CardTitle>
                    <TranslatedText fr="1. Informations de livraison" en="1. Shipping Information">
                        1. Versandinformationen
                    </TranslatedText>
                </CardTitle>
                <CardDescription>
                    <TranslatedText fr="Où devons-nous envoyer votre commande ?" en="Where should we send your order?">
                        Wohin sollen wir Ihre Bestellung senden?
                    </TranslatedText>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel><TranslatedText fr="Nom complet" en="Full Name">Vollständiger Name</TranslatedText></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel><TranslatedText fr="Adresse" en="Address">Adresse</TranslatedText></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                        <FormLabel><TranslatedText fr="Ville" en="City">Stadt</TranslatedText></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                        <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                        <FormLabel><TranslatedText fr="Code postal" en="Zip Code">Postleitzahl</TranslatedText></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                        <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="sm:col-span-1">
                        <FormLabel><TranslatedText fr="Pays" en="Country">Land</TranslatedText></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </CardContent>
            </Card>

            <div className="space-y-8">
                <div className="h-fit rounded-lg bg-muted/50 p-6 lg:p-8">
                <h2 className="mb-6 font-headline text-2xl">
                    <TranslatedText fr="2. Récapitulatif de la commande" en="2. Order Summary">
                    2. Bestellübersicht
                    </TranslatedText>
                </h2>
                <div className="space-y-4">
                    {cartItems.map((item) => {
                    const image = placeholderImages.find(
                        (p) => p.id === item.product.images[0]
                    );
                    return (
                        <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            {image && (
                            <img
                                src={image.imageUrl}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                            />
                            )}
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">
                            <TranslatedText
                                fr={item.product.name_fr}
                                en={item.product.name_en}
                            >
                                {item.product.name}
                            </TranslatedText>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {item.size} {item.size && item.color && ' / '} {item.color}
                            </p>
                        </div>
                        <p className="font-medium">
                            €{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        </div>
                    );
                    })}
                </div>
                <Separator className="my-6" />
                <div className="space-y-2">
                    <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Sous-total" en="Subtotal">Zwischensumme</TranslatedText></p>
                    <p>€{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Livraison" en="Shipping">Versand</TranslatedText></p>
                    <p>{shippingCost > 0 ? `€${shippingCost.toFixed(2)}` : <TranslatedText fr="Gratuit" en="Free">Kostenlos</TranslatedText>}</p>
                    </div>
                    <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Taxes (19%)" en="Taxes (19%)">Steuern (19%)</TranslatedText></p>
                    <p>€{taxes.toFixed(2)}</p>
                    </div>
                </div>
                <Separator className="my-6" />
                <div className="flex justify-between text-lg font-bold">
                    <p><TranslatedText fr="Total" en="Total">Gesamt</TranslatedText></p>
                    <p>€{totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle><TranslatedText fr="3. Processus de Paiement" en="3. Payment Process">3. Zahlungsprozess</TranslatedText></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-amber-800">
                            <p className="text-sm">
                                <TranslatedText 
                                    fr="Un virement instantané est requis. Vous devrez téléverser le reçu de paiement à l'étape suivante pour valider votre commande."
                                    en="An instant bank transfer is required. You will need to upload the payment receipt in the next step to validate your order."
                                >
                                    Eine sofortige Banküberweisung ist erforderlich. Sie müssen den Zahlungsbeleg im nächsten Schritt hochladen, um Ihre Bestellung zu bestätigen.
                                </TranslatedText>
                            </p>
                        </div>
                        <Button type="submit" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        <TranslatedText fr="Valider et Payer" en="Validate and Pay">
                            Bestätigen und Bezahlen
                        </TranslatedText>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </form>
    </Form>

    </div>
  );
}

    