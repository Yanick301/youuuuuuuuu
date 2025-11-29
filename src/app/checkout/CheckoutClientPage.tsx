
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Loader2, Banknote, AlertTriangle } from 'lucide-react';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser, useFirestore, useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const { placeholderImages } = placeholderImagesData;

// Combined schema for all form fields
const checkoutSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  country: z.string().min(2, { message: 'Select a country' }),
  firstName: z.string().min(1, { message: 'Enter a first name' }),
  lastName: z.string().min(1, { message: 'Enter a last name' }),
  address: z.string().min(1, { message: 'Enter an address' }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: 'Enter a city' }),
  state: z.string().min(1, { message: 'Enter a state' }),
  zip: z.string().min(1, { message: 'Enter a ZIP code' }),
  discountCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutClientPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const { language } = useLanguage();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || '',
      country: 'France',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      discountCode: '',
    },
  });
  
  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
        router.push('/login?redirect=/checkout');
        return;
    }

    form.reset({
        email: user.email || '',
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        country: 'France',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        discountCode: '',
    });

  }, [user, isUserLoading, router, form])

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Vous devez être connecté pour passer une commande.' });
      return;
    }

    const shippingCost = subtotal > 100 ? 0 : 10;
    const taxes = subtotal * 0.2; // Example 20% tax
    const total = subtotal + shippingCost + taxes;
    
    const orderData = {
        userId: user.uid,
        shippingInfo: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          address: data.address,
          city: data.city,
          zip: data.zip,
          country: data.country,
        },
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
        totalAmount: total,
        orderDate: serverTimestamp(),
        paymentStatus: 'pending',
        receiptImageUrl: null,
    };
    
    const ordersCollection = collection(firestore, 'orders');

    addDoc(ordersCollection, orderData)
      .then(docRef => {
        toast({
            title: "Commande validée !",
            description: "Vous allez être redirigé pour téléverser votre preuve de paiement."
        });

        clearCart();
        router.push(`/checkout/confirm-payment?orderId=${docRef.id}`);
      })
      .catch(error => {
        // Emit a detailed, contextual error for the development overlay
        const permissionError = new FirestorePermissionError({
          path: ordersCollection.path,
          operation: 'create',
          requestResourceData: orderData,
        });
        errorEmitter.emit('permission-error', permissionError);

        // Also show a user-friendly toast
        toast({
            variant: "destructive",
            title: "Erreur de commande",
            description: "Impossible de créer la commande. Vérifiez vos permissions et réessayez."
        });
      });
  };

  const shippingCost = subtotal > 100 ? 0 : 10;
  const taxes = subtotal * 0.2; // 20%
  const total = subtotal + shippingCost + taxes;

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-semibold">
          <TranslatedText fr="Votre panier est vide" en="Your cart is empty">
            Ihr Warenkorb ist leer
          </TranslatedText>
        </h1>
        <p className="mt-2 text-muted-foreground">
          <TranslatedText
            fr="Ajoutez des produits à votre panier pour passer à la caisse."
            en="Add products to your cart to checkout."
          >
            Fügen Sie Produkte zu Ihrem Warenkorb hinzu, um zur Kasse zu
            gehen.
          </TranslatedText>
        </p>
        <Button asChild className="mt-6">
          <Link href="/products/all">
            <TranslatedText fr="Continuer les achats" en="Continue Shopping">
              Weiter einkaufen
            </TranslatedText>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-checkout-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <main className="border-r border-gray-200 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg">
                <h1 className="font-headline text-2xl font-medium tracking-tight text-gray-900">
                  EZCENTIALS
                </h1>

                <nav aria-label="Breadcrumb" className="mt-4">
                  <ol
                    role="list"
                    className="flex items-center space-x-2 text-sm text-gray-500"
                  >
                    <li>
                      <Link href="/cart" className="hover:text-gray-700">
                        <TranslatedText fr="Panier" en="Cart">Warenkorb</TranslatedText>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                    </li>
                    <li>
                      <span className="font-medium text-gray-900">
                        <TranslatedText fr="Informations" en="Information">Informationen</TranslatedText>
                      </span>
                    </li>
                  </ol>
                </nav>

                <div className="mt-12">
                  <section>
                    <h2 className="text-lg font-medium text-gray-900">
                      <TranslatedText fr="Contact" en="Contact">Kontakt</TranslatedText>
                    </h2>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  <section className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      <TranslatedText fr="Adresse de livraison" en="Shipping address">Lieferadresse</TranslatedText>
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel><TranslatedText fr="Pays/Région" en="Country/Region">Land/Region</TranslatedText></FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Germany">Allemagne</SelectItem>
                                <SelectItem value="United States">États-Unis</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><TranslatedText fr="Prénom" en="First name">Vorname</TranslatedText></FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><TranslatedText fr="Nom de famille" en="Last name">Nachname</TranslatedText></FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel><TranslatedText fr="Adresse" en="Address">Adresse</TranslatedText></FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>
                              <TranslatedText fr="Appartement, suite, etc. (facultatif)" en="Apartment, suite, etc. (optional)">Wohnung, Suite usw. (optional)</TranslatedText>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
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
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><TranslatedText fr="État/Région" en="State/Region">Staat/Region</TranslatedText></FormLabel>
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
                          <FormItem>
                            <FormLabel><TranslatedText fr="Code postal" en="ZIP code">Postleitzahl</TranslatedText></FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <TranslatedText fr="Retour au panier" en="Return to cart">Zum Warenkorb zurück</TranslatedText>
                  </Link>
                </div>
              </div>
            </main>

            <aside className="bg-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-lg">
                <h2 className="sr-only"><TranslatedText fr="Résumé de la commande" en="Order summary">Bestellübersicht</TranslatedText></h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => {
                      const image = placeholderImages.find(
                        (p) => p.id === item.product.images[0]
                      );
                      return (
                        <li key={item.id} className="flex space-x-4 py-6">
                          <div className="relative h-20 w-20 flex-shrink-0">
                            {image && (
                              <img
                                src={image.imageUrl}
                                alt={item.product.name}
                                className="h-full w-full rounded-md object-cover object-center"
                              />
                            )}
                            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium text-gray-900">
                              <TranslatedText
                                fr={item.product.name_fr}
                                en={item.product.name_en}
                              >
                                {item.product.name}
                              </TranslatedText>
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.size}
                            </p>
                          </div>
                          <p className="flex-none text-base font-medium text-gray-900">
                            €
                            {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <p><TranslatedText fr="Sous-total" en="Subtotal">Zwischensumme</TranslatedText></p>
                    <p className="font-medium text-gray-900">
                      €{subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p><TranslatedText fr="Livraison" en="Shipping">Versand</TranslatedText></p>
                    <p className="font-medium text-gray-900">
                      {shippingCost > 0 ? `€${shippingCost.toFixed(2)}` : 'Gratuit'}
                    </p>
                  </div>
                   <div className="flex justify-between">
                    <p><TranslatedText fr="Taxes" en="Taxes">Steuern</TranslatedText></p>
                    <p className="font-medium text-gray-900">
                        €{taxes.toFixed(2)}
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>€{total.toFixed(2)}</p>
                </div>

                <div className="mt-8">
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                            <Banknote className="mr-2 h-5 w-5" />
                            <TranslatedText fr="Paiement par virement bancaire" en="Bank Transfer Payment">Zahlung per Banküberweisung</TranslatedText>
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            <TranslatedText fr="Veuillez effectuer un virement instantané aux coordonnées ci-dessous. Votre commande ne sera traitée qu'à réception du paiement." en="Please make an instant bank transfer to the details below. Your order will only be processed upon receipt of payment.">Bitte tätigen Sie eine Sofortüberweisung an die unten stehenden Daten. Ihre Bestellung wird erst nach Zahlungseingang bearbeitet.</TranslatedText>
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="font-medium">Titulaire du compte:</span> <span>Sabine Menke</span></div>
                            <div className="flex justify-between"><span className="font-medium">IBAN:</span> <span>DE78500319000014630686</span></div>
                            <div className="flex justify-between"><span className="font-medium">BIC:</span> <span>BBVADEFFXXX</span></div>
                            <div className="flex justify-between"><span className="font-medium">Banque:</span> <span>BBVA</span></div>
                            <div className="flex justify-between"><span className="font-medium">Motif:</span> <span className="font-bold">Gifts</span></div>
                        </div>

                        <Alert variant="destructive" className="mt-6 bg-amber-50 border-amber-200 text-amber-800">
                            <AlertTriangle className="h-4 w-4 !text-amber-800" />
                            <AlertTitle className="font-semibold"><TranslatedText fr="Avertissement Important" en="Important Warning">Wichtiger Hinweis</TranslatedText></AlertTitle>
                            <AlertDescription className="text-amber-700">
                                <TranslatedText fr="Après avoir cliqué sur 'Valider ma commande', vous devrez téléverser le reçu de votre virement pour finaliser votre commande." en="After clicking 'Validate my order', you will need to upload your transfer receipt to finalize your order.">Nachdem Sie auf 'Meine Bestellung bestätigen' geklickt haben, müssen Sie Ihren Überweisungsbeleg hochladen, um Ihre Bestellung abzuschließen.</TranslatedText>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <TranslatedText fr="Validation en cours..." en="Validating...">Validierung...</TranslatedText>
                        </>
                    ) : (
                        <TranslatedText fr="Valider ma commande" en="Validate my order">Meine Bestellung bestätigen</TranslatedText>
                    )}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </Form>
    </div>
  );
}
