
'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { TranslatedText } from '@/components/TranslatedText';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Banknote } from 'lucide-react';
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

const { placeholderImages } = placeholderImagesData;

const shippingSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis.' }),
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  address: z.string().min(1, { message: "L'adresse est requise." }),
  city: z.string().min(1, { message: 'La ville est requise.' }),
  zip: z.string().min(1, { message: 'Le code postal est requis.' }),
  country: z.string().min(1, { message: 'Le pays est requis.' }),
});

type ShippingFormInputs = z.infer<typeof shippingSchema>;


export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();

  const form = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      country: '',
    },
  });

  useEffect(() => {
    if (cart.length === 0 && !form.formState.isSubmitSuccessful) {
      router.push('/products/all');
    }
  }, [cart, router, form.formState.isSubmitSuccessful]);


  if (cart.length === 0 && !form.formState.isSubmitSuccessful) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center text-center">
        <p><TranslatedText fr="Votre panier est vide. Vous allez être redirigé...">Ihr Warenkorb ist leer. Sie werden weitergeleitet...</TranslatedText></p>
      </div>
    );
  }

  const shipping = 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const handlePlaceOrder: SubmitHandler<ShippingFormInputs> = (data) => {
    console.log('Order placed with shipping info:', data);
    // In a real app, this would save the order
    clearCart();
    router.push('/checkout/thank-you');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center font-headline text-4xl md:text-5xl">
        <TranslatedText fr="Paiement">Kasse</TranslatedText>
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePlaceOrder)} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Forms */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle><TranslatedText fr="Informations de livraison">Versandinformationen</TranslatedText></CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                   <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel><TranslatedText fr="Nom complet">Vollständiger Name</TranslatedText></FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <div className="sm:col-span-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel><TranslatedText fr="Email">Email</TranslatedText></FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="sm:col-span-2">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel><TranslatedText fr="Adresse">Adresse</TranslatedText></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel><TranslatedText fr="Ville">Stadt</TranslatedText></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                     <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel><TranslatedText fr="Code postal">PLZ / Postleitzahl</TranslatedText></FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="sm:col-span-2">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel><TranslatedText fr="Pays">Land</TranslatedText></FormLabel>
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

            <Card>
              <CardHeader>
                <CardTitle><TranslatedText fr="Instructions de Paiement">Zahlungsanweisungen</TranslatedText></CardTitle>
                <CardDescription>
                    <div className="flex items-center gap-2 text-sm">
                        <Banknote className="h-4 w-4" />
                        <TranslatedText fr="Veuillez effectuer un virement bancaire pour finaliser votre commande.">Bitte tätigen Sie eine Banküberweisung, um Ihre Bestellung abzuschließen.</TranslatedText>
                    </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                 <div>
                    <p className="font-semibold text-muted-foreground"><TranslatedText fr="Banque">BANQUE</TranslatedText></p>
                    <p>BBVA</p>
                 </div>
                 <div>
                    <p className="font-semibold text-muted-foreground">IBAN</p>
                    <p>DE78500319000014630686</p>
                 </div>
                 <div>
                    <p className="font-semibold text-muted-foreground">BIC / SWIFT</p>
                    <p>BBVADEFFXXX</p>
                 </div>
                 <div>
                    <p className="font-semibold text-muted-foreground"><TranslatedText fr="Référence de la commande">Bestellreferenz</TranslatedText></p>
                    <p>Gifts</p>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle><TranslatedText fr="Résumé de la commande">Bestellübersicht</TranslatedText></CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {cart.map((item) => {
                    const productImage = placeholderImages.find(p => p.id === item.product.images[0]);
                    return (
                      <li key={item.product.id} className="flex items-center py-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          {productImage && (
                            <img
                              src={productImage.imageUrl}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">{item.quantity}</span>
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium"><TranslatedText fr={item.product.name_fr}>{item.product.name}</TranslatedText></p>
                          <p className="text-sm text-muted-foreground">
                              ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </li>
                    );
                  })}
                </ul>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Sous-total">Zwischensumme</TranslatedText></p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Livraison">Versand</TranslatedText></p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground"><TranslatedText fr="Taxes">Steuern</TranslatedText></p>
                    <p>${taxes.toFixed(2)}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                    <p><TranslatedText fr="Total">Gesamt</TranslatedText></p>
                    <p>${total.toFixed(2)}</p>
                  </div>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full" type="submit" disabled={form.formState.isSubmitting}>
              <TranslatedText fr="Passer la commande">Bestellung aufgeben</TranslatedText>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
