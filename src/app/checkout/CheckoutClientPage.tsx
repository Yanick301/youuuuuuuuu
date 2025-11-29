
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
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { placeholderImages } = placeholderImagesData;

// Combined schema for all form fields
const checkoutSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  subscribe: z.boolean().default(false),
  country: z.string().min(2, { message: 'Select a country' }),
  firstName: z.string().min(1, { message: "Enter a first name" }),
  lastName: z.string().min(1, { message: "Enter a last name" }),
  address: z.string().min(1, { message: "Enter an address" }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "Enter a city" }),
  state: z.string().min(1, { message: "Enter a state" }),
  zip: z.string().min(1, { message: "Enter a ZIP code" }),
  saveInfo: z.boolean().default(false),
  discountCode: z.string().optional(),
  cardName: z.string().min(1, { message: 'Name on card is required' }),
  cardNumber: z.string().min(16, { message: 'Card number must be 16 digits' }).max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/, { message: 'Invalid expiry date (MM/YY)' }),
  cardCvc: z.string().min(3, { message: 'CVC must be 3 digits' }).max(4),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutClientPage() {
  const { cartItems, subtotal } = useCart();
  const { language } = useLanguage();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      subscribe: false,
      country: 'United States',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      saveInfo: false,
      discountCode: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data);
    // Here you would typically handle payment processing
    alert('Payment successful (simulation)!');
    router.push('/');
  };

  const shippingCost = subtotal > 100 ? 0 : 5;
  const total = subtotal + shippingCost;
  
  if (cartItems.length === 0) {
       return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">Add some products to your cart to proceed to checkout.</p>
            <Button asChild className="mt-6">
                <Link href="/products/all">Continue Shopping</Link>
            </Button>
        </div>
       )
  }

  return (
    <div className="bg-checkout-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <main className="border-r border-gray-200 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg">
                <h1 className="font-headline text-2xl font-medium tracking-tight text-gray-900">EZCENTIALS</h1>
                
                <nav aria-label="Breadcrumb" className="mt-4">
                    <ol role="list" className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><Link href="/cart" className="hover:text-gray-700">Cart</Link></li>
                        <li className="flex items-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-300"><path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path></svg></li>
                        <li><span className="font-medium text-gray-900">Information</span></li>
                         <li className="flex items-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-300"><path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path></svg></li>
                        <li><span className="text-gray-500">Payment</span></li>
                    </ol>
                </nav>

                <div className="mt-12">
                  <section>
                      <h2 className="text-lg font-medium text-gray-900">Contact</h2>
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
                      <div className="mt-4 flex items-start">
                          <FormField
                              control={form.control}
                              name="subscribe"
                              render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                  <FormControl>
                                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel className="text-sm">Email me with news and offers</FormLabel>
                              </FormItem>
                              )}
                          />
                      </div>
                  </section>

                  <section className="mt-10 border-t border-gray-200 pt-10">
                      <h2 className="text-lg font-medium text-gray-900">Shipping address</h2>

                      <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                      <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                              <FormLabel>Country/Region</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="United States">United States</SelectItem>
                                  <SelectItem value="Canada">Canada</SelectItem>
                                  <SelectItem value="Mexico">Mexico</SelectItem>
                                  <SelectItem value="Germany">Germany</SelectItem>
                                  <SelectItem value="France">France</SelectItem>
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
                              <FormLabel>First name</FormLabel>
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
                              <FormLabel>Last name</FormLabel>
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
                              <FormLabel>Address</FormLabel>
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
                              <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
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
                              <FormLabel>City</FormLabel>
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
                              <FormLabel>State</FormLabel>
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
                              <FormLabel>ZIP code</FormLabel>
                              <FormControl>
                              <Input {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      </div>
                       <div className="mt-6 flex items-start">
                          <FormField
                              control={form.control}
                              name="saveInfo"
                              render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                  <FormControl>
                                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel className="text-sm">Save this information for next time</FormLabel>
                              </FormItem>
                              )}
                          />
                      </div>
                  </section>
                  
                  <section className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                      <div className="col-span-full rounded-md border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <label htmlFor="credit-card" className="flex items-center gap-2 text-sm font-medium text-gray-900">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                            Credit card
                          </label>
                          <p className="text-sm text-gray-400">EZCENTIALS</p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input placeholder="Card number" {...field} className="pl-10"/>
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Name on card" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="MM / YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="cardCvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Input placeholder="CVC" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                
                <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                    <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Processing...' : `Pay €${total.toFixed(2)}`}
                    </Button>
                    <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                        <Link href="/cart" className="flex items-center justify-center gap-2 font-medium text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="h-4 w-4" />
                            Return to cart
                        </Link>
                    </p>
                </div>
              </div>
            </main>

            <aside className="bg-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-lg">
                <h2 className="sr-only">Order summary</h2>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => {
                      const image = placeholderImages.find((p) => p.id === item.product.images[0]);
                      return (
                      <li key={item.id} className="flex space-x-4 py-6">
                          <div className="relative h-20 w-20 flex-shrink-0">
                          {image && <img src={image.imageUrl} alt={item.product.name} className="h-full w-full rounded-md object-cover object-center" />}
                           <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-xs text-white">{item.quantity}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-gray-900"><TranslatedText fr={item.product.name_fr} en={item.product.name_en}>{item.product.name}</TranslatedText></h3>
                          <p className="text-sm text-gray-500">{item.size}</p>
                          </div>
                          <p className="flex-none text-base font-medium text-gray-900">€{(item.product.price * item.quantity).toFixed(2)}</p>
                      </li>
                      );
                  })}
                  </ul>
                </div>

                <Separator className="my-6" />

                <div>
                    <h2 className="text-lg font-medium text-gray-900">Discount code</h2>
                    <div className="mt-4 flex space-x-4">
                    <FormField
                        control={form.control}
                        name="discountCode"
                        render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                            <Input placeholder="Discount code" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <Button type="button" variant="secondary">Apply</Button>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium text-gray-900">€{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium text-gray-900">{shippingCost > 0 ? `€${shippingCost.toFixed(2)}` : 'Free'}</p>
                    </div>
                </div>
                
                <Separator className="my-6" />

                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>€{total.toFixed(2)}</p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </Form>
    </div>
  );
}
