
'use client';

import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { TranslatedText } from '@/components/TranslatedText';
import { Separator } from '@/components/ui/separator';
import { useAuth, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLanguage } from '@/context/LanguageContext';

const ADMIN_EMAIL = 'ezcentials@gmail.com';

const loginSchemaFR = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
});
const loginSchemaDE = z.object({
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
  password: z.string().min(1, { message: 'Passwort ist erforderlich.' }),
});
const loginSchemaEN = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});


export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { language } = useLanguage();

  const currentSchema = language === 'fr' ? loginSchemaFR : language === 'en' ? loginSchemaEN : loginSchemaDE;

  const form = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleUserCreation = async (userCredential: UserCredential) => {
    const user = userCredential.user;
    if (!user || !firestore) return;

    const userRef = doc(firestore, 'userProfiles', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      try {
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          registrationDate: serverTimestamp(),
          isAdmin: user.email === ADMIN_EMAIL,
        });
      } catch (error) {
        console.error("Error creating user profile in Firestore: ", error);
        // Optional: Handle the error, e.g., show a toast message
      }
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof currentSchema>> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      await handleUserCreation(userCredential);
      
      const isAdmin = userCredential.user.email === ADMIN_EMAIL;
      
      if (isAdmin) {
        toast({
            title: 'Bienvenue cher administrateur',
        });
        router.push('/admin/dashboard');
      } else {
        toast({
            title: language === 'fr' ? 'Connexion réussie' : language === 'en' ? 'Login Successful' : 'Anmeldung erfolgreich',
            description: language === 'fr' ? 'Bienvenue à nouveau !' : language === 'en' ? 'Welcome back!' : 'Willkommen zurück!',
        });
        const redirectUrl = searchParams.get('redirect') || '/account';
        router.push(redirectUrl);
      }

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.code === 'auth/invalid-credential' 
        ? (language === 'fr' ? 'Email ou mot de passe incorrect.' : language === 'en' ? 'Incorrect email or password.' : 'Falsche E-Mail oder falsches Passwort.')
        : (language === 'fr' ? 'Une erreur est survenue lors de la connexion.' : language === 'en' ? 'An error occurred during login.' : 'Bei der Anmeldung ist ein Fehler aufgetreten.');
      toast({
        variant: 'destructive',
        title: language === 'fr' ? 'Échec de la connexion' : language === 'en' ? 'Login Failed' : 'Anmeldung fehlgeschlagen',
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        await handleUserCreation(userCredential);

        const isAdmin = userCredential.user.email === ADMIN_EMAIL;
        
        if (isAdmin) {
            toast({
                title: 'Bienvenue cher administrateur',
            });
            router.push('/admin/dashboard');
        } else {
            toast({
                title: language === 'fr' ? 'Connexion réussie' : language === 'en' ? 'Login Successful' : 'Anmeldung erfolgreich',
                description: language === 'fr' ? 'Bienvenue !' : language === 'en' ? 'Welcome!' : 'Willkommen!',
            });
            const redirectUrl = searchParams.get('redirect') || '/account';
            router.push(redirectUrl);
        }

    } catch (error: any) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: language === 'fr' ? 'Échec de la connexion Google' : language === 'en' ? 'Google Sign-In Failed' : 'Google-Anmeldung fehlgeschlagen',
            description: error.message,
        });
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-5xl tracking-tighter">EZCENTIALS</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground"><TranslatedText fr="COLLECTION PREMIUM" en="PREMIUM COLLECTION">PREMIUM COLLECTION</TranslatedText></p>
        </div>

        <Card className="w-full max-w-sm rounded-2xl border-none shadow-lg">
            <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-semibold"><TranslatedText fr="Connexion" en="Log In">Se connecter</TranslatedText></h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel><TranslatedText fr="Email" en="Email">Email</TranslatedText></FormLabel>
                                <FormControl>
                                <Input type="email" {...field} className="border-0 bg-input" />
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
                                    <FormLabel><TranslatedText fr="Mot de passe" en="Password">Mot de passe</TranslatedText></FormLabel>
                                </div>
                                <FormControl>
                                <Input type="password" {...field} className="border-0 bg-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4 w-full rounded-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <TranslatedText fr="Connexion..." en="Logging in...">Connexion...</TranslatedText> : <TranslatedText fr="Se connecter" en="Log In">Se connecter</TranslatedText>}
                        </Button>
                    </form>
                </Form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            <TranslatedText fr="Ou" en="OR">OU</TranslatedText>
                        </span>
                    </div>
                </div>

                <GoogleSignInButton onClick={handleGoogleSignIn}>
                    <TranslatedText fr="Continuer avec Google" en="Continue with Google">Continuer avec Google</TranslatedText>
                </GoogleSignInButton>

                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        <TranslatedText fr="Pas encore de compte ?" en="Don't have an account yet?">Pas encore de compte ?</TranslatedText>{' '}
                        <Link href="/register" className="font-semibold text-foreground hover:underline">
                            <TranslatedText fr="S'inscrire" en="Sign up">S'inscrire</TranslatedText>
                        </Link>
                    </p>
                     <Link
                        href="/forgot-password"
                        className="mt-2 inline-block text-sm text-muted-foreground hover:underline"
                    >
                        <TranslatedText fr="Mot de passe oublié ?" en="Forgot password?">Mot de passe oublié ?</TranslatedText>
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
