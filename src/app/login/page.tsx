
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
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
  password: z.string().min(6, { message: 'Das Passwort muss mindestens 6 Zeichen lang sein.' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const loginImage = placeholderImages.find(img => img.id === 'mens-category');

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: 'Erfolgreich angemeldet',
        description: 'Willkommen zurück!',
      });
      router.push('/account');
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Anmeldung fehlgeschlagen',
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
       <div className="relative hidden lg:block">
            {loginImage && (
                <Image
                    src={loginImage.imageUrl}
                    alt="Elegantes Model"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    data-ai-hint={loginImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/20" />
       </div>
       <div className="flex items-center justify-center p-4 sm:p-8 md:p-12">
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow">
            <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">
                <TranslatedText fr="Se connecter">Anmelden</TranslatedText>
            </CardTitle>
            <CardDescription>
                <TranslatedText fr="Bienvenue à nouveau. Connectez-vous à votre compte.">
                Willkommen zurück. Melden Sie sich bei Ihrem Konto an.
                </TranslatedText>
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                        <div className="flex items-center justify-between">
                            <FormLabel><TranslatedText fr="Mot de passe">Passwort</TranslatedText></FormLabel>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                <TranslatedText fr="Mot de passe oublié ?">Passwort vergessen?</TranslatedText>
                            </Link>
                        </div>
                        <FormControl>
                        <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-4" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Anmelden...' : <TranslatedText fr="Se connecter">Anmelden</TranslatedText>}
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
                <TranslatedText fr="Se connecter avec Google">Mit Google anmelden</TranslatedText>
            </GoogleSignInButton>
            </CardContent>
            <CardFooter className="justify-center text-sm">
            <p className="text-muted-foreground">
                <TranslatedText fr="Vous n'avez pas de compte ?">Sie haben noch kein Konto?</TranslatedText>{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                <TranslatedText fr="S'inscrire">Registrieren</TranslatedText>
                </Link>
            </p>
            </CardFooter>
        </Card>
       </div>
    </div>
  );
}
