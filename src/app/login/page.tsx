
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
        title: 'Connexion réussie',
        description: 'Bienvenue à nouveau !',
      });
      router.push('/account');
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.code === 'auth/invalid-credential' 
        ? 'Email ou mot de passe incorrect.'
        : 'Une erreur est survenue lors de la connexion.';
      toast({
        variant: 'destructive',
        title: 'Échec de la connexion',
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
                <h2 className="mb-6 text-2xl font-semibold"><TranslatedText fr="Connexion">Se connecter</TranslatedText></h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel><TranslatedText fr="Email">Email</TranslatedText></FormLabel>
                                <FormControl>
                                <Input type="email" placeholder="votre@email.com" {...field} className="border-0 bg-input" />
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
                                    <FormLabel><TranslatedText fr="Mot de passe">Mot de passe</TranslatedText></FormLabel>
                                </div>
                                <FormControl>
                                <Input type="password" placeholder="********" {...field} className="border-0 bg-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4 w-full rounded-full" size="lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Connexion...' : <TranslatedText fr="Se connecter">Se connecter</TranslatedText>}
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
                    <TranslatedText fr="Continuer avec Google">Continuer avec Google</TranslatedText>
                </GoogleSignInButton>

                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        <TranslatedText fr="Pas encore de compte ?">Pas encore de compte ?</TranslatedText>{' '}
                        <Link href="/register" className="font-semibold text-foreground hover:underline">
                            <TranslatedText fr="S'inscrire">S'inscrire</TranslatedText>
                        </Link>
                    </p>
                     <Link
                        href="/forgot-password"
                        className="mt-2 inline-block text-sm text-muted-foreground hover:underline"
                    >
                        <TranslatedText fr="Mot de passe oublié ?">Mot de passe oublié ?</TranslatedText>
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
