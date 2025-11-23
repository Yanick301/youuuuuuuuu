'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { useUser } from '@/firebase';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText fr="Détails du compte">Kontodetails</TranslatedText>
      </h1>
      <Card>
        <CardHeader>
          <CardTitle><TranslatedText fr={`Bienvenue, ${user.displayName || 'Utilisateur'} !`}>Willkommen, {user.displayName || 'Benutzer'}!</TranslatedText></CardTitle>
          <CardDescription>
            <TranslatedText fr="Vous pouvez consulter et modifier les informations de votre compte ici.">
              Hier können Sie Ihre Kontoinformationen einsehen und bearbeiten.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold"><TranslatedText fr="Nom">Name</TranslatedText></h3>
            <p className="text-muted-foreground">{user.displayName || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold"><TranslatedText fr="Email">Email</TranslatedText></h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
