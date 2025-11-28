
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
import { TranslatedText } from '@/components/TranslatedText';
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError, useFirebase } from '@/firebase';
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';


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


export default function LoginPageClient() {
  const { auth, firestore } = useFirebase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

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
    
    try {
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            const profileData = {
                id: user.uid,
                email: user.email,
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                isAdmin: false,
                registrationDate: serverTimestamp(),
            };
            await setDoc(userRef, profileData, { merge: true });
        }
    } catch (e) {
        // This can be a read (getDoc) or write (setDoc) error.
        // We emit a generic write error as it's the more critical failure point.
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'write', 
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError; // Re-throw to be caught by the outer try/catch
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof currentSchema>> = async (data) => {
    if (!auth || !firestore) return;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      if (userCredential.user && !userCredential.user.emailVerified) {
        router.push('/verify-email');
        return;
      }

      await handleUserCreation(userCredential)
      
      toast({
          title: language === 'fr' ? 'Connexion réussie' : language === 'en' ? 'Login Successful' : 'Anmeldung erfolgreich',
          description: language === 'fr' ? 'Bienvenue à nouveau !' : language === 'en' ? 'Welcome back!' : 'Willkommen zurück!',
      });
      
      const redirectUrl = searchParams.get('redirect') || '/account';
      router.push(redirectUrl);
      router.refresh();

    } catch (error: any) {
      if (error instanceof FirestorePermissionError) {
         // Error is already emitted, just show a toast
          toast({
            variant: 'destructive',
            title: 'Erreur de Permission',
            description: 'Impossible de mettre à jour le profil utilisateur.',
          });
          return;
      }
        
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
                                <div className="relative">
                                    <FormControl>
                                        <Input type={showPassword ? 'text' : 'password'} {...field} className="border-0 bg-input pr-10" />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute inset-y-0 right-0 h-full px-3"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                                        <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4 w-full rounded-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <TranslatedText fr="Connexion..." en="Logging in...">Connexion...</TranslatedText> : <TranslatedText fr="Se connecter" en="Log In">Se connecter</TranslatedText>}
                        </Button>
                    </form>
                </Form>

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
