
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


const registerSchema = z.object({
    name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
    email: z.string().email({ message: 'Adresse e-mail invalide.' }),
    password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' }),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
        title: 'Compte créé avec succès',
        description: 'Bienvenue ! Vous allez être redirigé.',
      });
      router.push('/account');
    } catch (error: any) {
      console.error(error);
       const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'Cette adresse e-mail est déjà utilisée.'
        : 'Une erreur est survenue lors de l\'inscription.';
      toast({
        variant: 'destructive',
        title: 'Échec de l\'inscription',
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        toast({
            title: 'Connexion réussie',
            description: 'Bienvenue !',
        });
        router.push('/account');
    } catch (error: any) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Échec de la connexion Google',
            description: error.message,
        });
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-5xl tracking-tighter">EZCENTIALS</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground"><TranslatedText fr="COLLECTION PREMIUM">PREMIUM COLLECTION</TranslatedText></p>
        </div>

        <Card className="w-full max-w-sm rounded-2xl border-none shadow-lg">
            <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-semibold"><TranslatedText fr="Créer un compte">Créer un compte</TranslatedText></h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel><TranslatedText fr="Nom complet">Nom complet</TranslatedText></FormLabel>
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
                                    <FormLabel><TranslatedText fr="Email">Email</TranslatedText></FormLabel>
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
                                    <FormLabel><TranslatedText fr="Mot de passe">Mot de passe</TranslatedText></FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="border-0 bg-input"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-4 rounded-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Création...' : <TranslatedText fr="Créer un compte">Créer un compte</TranslatedText>}
                        </Button>
                    </form>
                </Form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            <TranslatedText fr="Ou">OU</TranslatedText>
                        </span>
                    </div>
                </div>
                
                <GoogleSignInButton onClick={handleGoogleSignIn}>
                    <TranslatedText fr="S'inscrire avec Google">S'inscrire avec Google</TranslatedText>
                </GoogleSignInButton>
                
                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        <TranslatedText fr="Vous avez déjà un compte ?">Vous avez déjà un compte ?</TranslatedText>{' '}
                        <Link href="/login" className="font-semibold text-foreground hover:underline">
                            <TranslatedText fr="Se connecter">Se connecter</TranslatedText>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
