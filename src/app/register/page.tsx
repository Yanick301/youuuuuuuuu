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

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            <TranslatedText>Konto erstellen</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText>Treten Sie der Welt von EZCENTIALS bei.</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="grid gap-2">
            <Label htmlFor="name"><TranslatedText>Name</TranslatedText></Label>
            <Input id="name" placeholder="Jane Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email"><TranslatedText>Email</TranslatedText></Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password"><TranslatedText>Passwort</TranslatedText></Label>
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full mt-2"><TranslatedText>Konto erstellen</TranslatedText></Button>
          <p className="text-xs text-center text-muted-foreground">
            <TranslatedText>Eine E-Mail wird gesendet, um Ihr Konto zu verifizieren.</TranslatedText>
          </p>

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
           <GoogleSignInButton><TranslatedText>Mit Google registrieren</TranslatedText></GoogleSignInButton>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            <TranslatedText>Haben Sie bereits ein Konto?</TranslatedText>{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              <TranslatedText>Anmelden</TranslatedText>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
