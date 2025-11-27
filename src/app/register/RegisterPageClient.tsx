
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
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile, type UserCredential, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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
import { useLanguage } from '@/context/LanguageContext';


const registerSchemaFR = z.object({
    name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
    email: z.string().email({ message: 'Adresse e-mail invalide.' }),
    password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' }),
});
const registerSchemaDE = z.object({
    name: z.string().min(2, { message: 'Der Name muss mindestens 2 Zeichen enthalten.' }),
    email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
    password: z.string().min(6, { message: 'Das Passwort muss mindestens 6 Zeichen lang sein.' }),
});
const registerSchemaEN = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function RegisterPageClient() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();

  const currentSchema = language === 'fr' ? registerSchemaFR : language === 'en' ? registerSchemaEN : registerSchemaDE;

  const form = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleUserCreation = async (userCredential: UserCredential, name?: string) => {
    const user = userCredential.user;
    if (!user || !firestore) return;

    const userRef = doc(firestore, 'userProfiles', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        const displayName = name || user.displayName;
        if(displayName && user.displayName !== displayName) {
          await updateProfile(user, { displayName });
        }
        
        let profileData: any = {
            id: user.uid,
            email: user.email,
            firstName: displayName?.split(' ')[0] || '',
            lastName: displayName?.split(' ').slice(1).join(' ') || '',
            registrationDate: serverTimestamp(),
        };
        
        await setDoc(userRef, profileData);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof currentSchema>> = async (data) => {
    if (!auth) {
      // Handle case where auth is not available
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      await handleUserCreation(userCredential, data.name);
      
      await sendEmailVerification(userCredential.user);
      toast({
          title: language === 'fr' ? 'Vérifiez votre e-mail' : language === 'en' ? 'Verify your email' : 'Überprüfen Sie Ihre E-Mail',
          description: language === 'fr' ? 'Un lien de vérification a été envoyé à votre adresse e-mail.' : language === 'en' ? 'A verification link has been sent to your email address.' : 'Ein Bestätigungslink wurde an Ihre E-Mail-Adresse gesendet.',
      });
      router.push('/verify-email');

    } catch (error: any) {
       const errorMessage = error.code === 'auth/email-already-in-use' 
        ? (language === 'fr' ? 'Cette adresse e-mail est déjà utilisée.' : language === 'en' ? 'This email address is already in use.' : 'Diese E-Mail-Adresse wird bereits verwendet.')
        : (language === 'fr' ? 'Une erreur est survenue lors de l\'inscription.' : language === 'en' ? 'An error occurred during registration.' : 'Bei der Registrierung ist ein Fehler aufgetreten.');
      toast({
        variant: 'destructive',
        title: language === 'fr' ? 'Échec de l\'inscription' : language === 'en' ? 'Registration Failed' : 'Registrierung fehlgeschlagen',
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
                <h2 className="mb-6 text-2xl font-semibold"><TranslatedText fr="Créer un compte" en="Create an Account">Créer un compte</TranslatedText></h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><TranslatedText fr="Nom complet" en="Full Name">Nom complet</TranslatedText></FormLabel>
                                    <FormControl>
                                        <Input {...field} className="border-0 bg-input" />
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
                                    <FormLabel><TranslatedText fr="Mot de passe" en="Password">Mot de passe</TranslatedText></FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="border-0 bg-input"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-4 rounded-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <TranslatedText fr="Création..." en="Creating...">Création...</TranslatedText> : <TranslatedText fr="Créer un compte" en="Create Account">Créer un compte</TranslatedText>}
                        </Button>
                    </form>
                </Form>
                
                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        <TranslatedText fr="Vous avez déjà un compte ?" en="Already have an account?">Vous avez déjà un compte ?</TranslatedText>{' '}
                        <Link href="/login" className="font-semibold text-foreground hover:underline">
                            <TranslatedText fr="Se connecter" en="Log In">Se connecter</TranslatedText>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
