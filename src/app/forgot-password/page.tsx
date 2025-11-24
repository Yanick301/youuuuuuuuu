
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TranslatedText } from '@/components/TranslatedText';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse.' }),
});

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;


export default function ForgotPasswordPage() {
    const auth = useAuth();
    const { toast } = useToast();

    const form = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
        try {
            await sendPasswordResetEmail(auth, data.email);
            toast({
                title: 'E-Mail gesendet',
                description: 'Überprüfen Sie Ihren Posteingang für den Link zum Zurücksetzen des Passworts.',
            });
        } catch (error: any) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Fehler',
                description: error.message,
            });
        }
    };


  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            <TranslatedText fr="Mot de passe oublié">Passwort vergessen</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText fr="Entrez votre e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.">
              Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
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
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Senden...' : <TranslatedText fr="Envoyer le lien de réinitialisation">Link zum Zurücksetzen senden</TranslatedText>}
                    </Button>
                </form>
            </Form>
          <Button variant="ghost" asChild className="mt-4 w-full">
            <Link href="/login"><TranslatedText fr="Retour à la connexion">Zurück zum Login</TranslatedText></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
