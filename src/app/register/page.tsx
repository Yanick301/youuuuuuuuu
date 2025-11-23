'use client';

import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { TranslatedText } from '@/components/TranslatedText';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from 'next/image';
import placeholderImagesData from '@/lib/placeholder-images.json';

const { placeholderImages } = placeholderImagesData;


const registerSchema = z.object({
    name: z.string().min(2, { message: 'Der Name muss mindestens 2 Zeichen lang sein.' }),
    email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
    password: z.string().min(6, { message: 'Das Passwort muss mindestens 6 Zeichen lang sein.' }),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const registerImage = placeholderImages.find(img => img.id === 'womens-category');

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: data.name
        });
      }

      toast({
        title: 'Konto erfolgreich erstellt',
        description: 'Willkommen! Sie werden in Kürze weitergeleitet.',
      });
      router.push('/account');
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Registrierung fehlgeschlagen',
        description: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        toast({
            title: 'Erfolgreich angemeldet',
            description: 'Willkommen!',
        });
        router.push('/account');
    } catch (error: any) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Google-Anmeldung fehlgeschlagen',
            description: error.message,
        });
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-80px)] w-full grid-cols-1 lg:grid-cols-2">
       <div className="flex items-center justify-center p-4 sm:p-8 md:p-12">
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline md:text-3xl">
                <TranslatedText fr="Créer un compte">Konto erstellen</TranslatedText>
            </CardTitle>
            <CardDescription>
                <TranslatedText fr="Rejoignez le monde d'EZCENTIALS.">Treten Sie der Welt von EZCENTIALS bei.</TranslatedText>
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><TranslatedText fr="Nom">Name</TranslatedText></FormLabel>
                            <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
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
                            <FormLabel><TranslatedText fr="Email">Email</TranslatedText></FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel><TranslatedText fr="Mot de passe">Passwort</TranslatedText></FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-4" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Erstellen...' : <TranslatedText fr="Créer un compte">Konto erstellen</TranslatedText>}
                </Button>
                </form>
            </Form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    <TranslatedText fr="Ou continuer avec">Oder weiter mit</TranslatedText>
                    </span>
                </div>
            </div>
            <GoogleSignInButton onClick={handleGoogleSignIn}>
                <TranslatedText fr="S'inscrire avec Google">Mit Google registrieren</TranslatedText>
            </GoogleSignInButton>
            </CardContent>
            <CardFooter className="justify-center text-sm">
            <p className="text-muted-foreground">
                <TranslatedText fr="Vous avez déjà un compte ?">Haben Sie bereits ein Konto?</TranslatedText>{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                <TranslatedText fr="Se connecter">Anmelden</TranslatedText>
                </Link>
            </p>
            </CardFooter>
        </Card>
       </div>
       <div className="relative hidden lg:block">
            {registerImage && (
                <Image
                    src={registerImage.imageUrl}
                    alt="Elegantes Model"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    data-ai-hint={registerImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/20" />
       </div>
    </div>
  );
}
