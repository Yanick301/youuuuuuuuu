import Link from 'next/link';

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
import { Label } from '@/components/ui/label';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { TranslatedText } from '@/components/TranslatedText';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            <TranslatedText>Anmelden</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText>
              Willkommen zurück bei EZCENTIALS.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email"><TranslatedText>Email</TranslatedText></Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
             <div className="flex items-center justify-between">
              <Label htmlFor="password"><TranslatedText>Passwort</TranslatedText></Label>
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                <TranslatedText>Passwort vergessen?</TranslatedText>
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full mt-2"><TranslatedText>Anmelden</TranslatedText></Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
                <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                <TranslatedText>Oder weiter mit</TranslatedText>
                </span>
            </div>
          </div>

           <GoogleSignInButton><TranslatedText>Mit Google anmelden</TranslatedText></GoogleSignInButton>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            <TranslatedText>Sie haben noch kein Konto?</TranslatedText>{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              <TranslatedText>Registrieren</TranslatedText>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
