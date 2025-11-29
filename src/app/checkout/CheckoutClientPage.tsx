
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
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Loader2, ArrowLeft, ShoppingCart, Lock } from 'lucide-react';
import Link from 'next/link';

const { placeholderImages } = placeholderImagesData;

const shippingSchemaDE = z.object({
  email: z.string().email({ message: 'Geben Sie eine gültige E-Mail ein' }),
  country: z.string().min(1, 'Land ist erforderlich'),
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  address: z.string().min(1, 'Adresse ist erforderlich'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'Stadt ist erforderlich'),
  postalCode: z.string().min(1, 'Postleitzahl ist erforderlich'),
  card: z.object({
    number: z.string().min(1, 'Kartennummer ist erforderlich'),
    name: z.string().min(1, 'Name auf der Karte ist erforderlich'),
    expiry: z.string().min(1, 'Ablaufdatum ist erforderlich'),
    cvc: z.string().min(1, 'Sicherheitscode ist erforderlich'),
  }),
});

const shippingSchemaFR = z.object({
  email: z.string().email({ message: 'Entrez un email valide' }),
  country: z.string().min(1, 'Le pays est requis'),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  address: z.string().min(1, 'L\'adresse est requise'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'La ville est requise'),
  postalCode: z.string().min(1, 'Le code postal est requis'),
  card: z.object({
    number: z.string().min(1, 'Le numéro de carte est requis'),
    name: z.string().min(1, 'Le nom sur la carte est requis'),
    expiry: z.string().min(1, 'La date d\'expiration est requise'),
    cvc: z.string().min(1, 'Le code de sécurité est requis'),
  }),
});

const shippingSchemaEN = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  country: z.string().min(1, 'Country is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  card: z.object({
    number: z.string().min(1, 'Card number is required'),
    name: z.string().min(1, 'Name on card is required'),
    expiry: z.string().min(1, 'Expiration date is required'),
    cvc: z.string().min(1, 'Security code is required'),
  }),
});

type ShippingFormValues = z.infer<typeof shippingSchemaEN>;

export function CheckoutClientPage() {
  const { cartItems, subtotal, totalItems, clearCart } = useCart();
  const { language } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentSchema =
    language === 'fr'
      ? shippingSchemaFR
      : language === 'en'
      ? shippingSchemaEN
      : shippingSchemaDE;

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      country: 'DE',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
      card: {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
      },
    },
  });

  const shippingCost = subtotal > 100 ? 0 : 10;
  const totalAmount = subtotal + shippingCost;

  const onSubmit: SubmitHandler<ShippingFormValues> = async (data) => {
    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Order submitted', data);
    setIsSubmitting(false);

    toast({
      title: 'Commande Passée !',
      description: 'Votre commande a été traitée avec succès.',
    });
    
    clearCart();
    router.push('/'); // Redirect to homepage or an order confirmation page
  };

  if (!isClient) {
      return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto flex h-screen flex-col items-center justify-center p-4 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">
          Votre panier est vide
        </h1>
        <Button asChild className="mt-6">
          <Link href="/products/all">Continuer les achats</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="bg-checkout-background min-h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <main className="border-r border-gray-200 bg-white px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="font-headline text-4xl tracking-tighter">
              EZCENTIALS
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12">
                <section>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section className="mt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping address
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
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
                                <SelectItem value="FR">France</SelectItem>
                                <SelectItem value="DE">Germany</SelectItem>
                                <SelectItem value="GB">United Kingdom</SelectItem>
                                <SelectItem value="US">United States</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
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
                        name="apartment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Apartment, suite, etc. (optional)
                            </FormLabel>
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
                            <FormLabel>City</FormLabel>
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
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </section>
                
                <Separator className="my-10" />

                <section>
                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                     <p className="mt-1 text-sm text-gray-600">All transactions are secure and encrypted.</p>
                     <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <FormField control={form.control} name="card.number" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card number</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                         <div className="sm:col-span-2">
                            <FormField control={form.control} name="card.name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name on card</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <div>
                             <FormField control={form.control} name="card.expiry" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiration date (MM/YY)</FormLabel>
                                    <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                         <div>
                             <FormField control={form.control} name="card.cvc" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Security code</FormLabel>
                                    <FormControl><Input placeholder="CVC" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                     </div>
                </section>

                <div className="mt-10 border-t border-gray-200 pt-6 flex items-center justify-between">
                   <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        {isSubmitting ? 'Processing...' : `Pay €${totalAmount.toFixed(2)}`}
                    </Button>
                    <Link href="/products/all" className="text-sm font-medium text-primary hover:text-primary/80">
                      <span className="hidden sm:inline">Return to cart</span>
                      <ArrowLeft className="sm:hidden h-5 w-5" />
                    </Link>
                </div>
              </form>
            </Form>
          </div>
        </main>

        <aside className="hidden bg-checkout-background lg:block lg:pl-8 lg:pr-8">
            <div className="h-full py-8 overflow-y-auto">
                <div className="mx-auto max-w-lg">
                    <h2 className="font-headline text-3xl">Order Summary</h2>
                    <div className="mt-6 flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => {
                            const image = placeholderImages.find(
                                (p) => p.id === item.product.images[0]
                            );
                            return (
                                <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {image && (
                                    <img
                                        src={image.imageUrl}
                                        alt={item.product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    )}
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                        <TranslatedText fr={item.product.name_fr} en={item.product.name_en}>
                                            {item.product.name}
                                        </TranslatedText>
                                        </h3>
                                        <p className="ml-4">€{(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.size}{item.size && item.color && ' / '}{item.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                    </div>
                                </div>
                                </li>
                            );
                        })}
                        </ul>
                    </div>

                    <Separator className="my-6" />
                    
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-sm font-medium text-gray-900">€{subtotal.toFixed(2)}</p>
                    </div>
                     <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-600">Shipping</p>
                        <p className="text-sm font-medium text-gray-900">€{shippingCost.toFixed(2)}</p>
                    </div>

                    <Separator className="my-6" />

                     <div className="flex items-center justify-between text-lg font-medium text-gray-900">
                        <p>Total</p>
                        <p>€{totalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
}
