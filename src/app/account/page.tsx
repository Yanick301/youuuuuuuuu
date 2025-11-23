import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';

export default function AccountPage() {
  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText fr="Détails du compte">Kontodetails</TranslatedText>
      </h1>
      <Card>
        <CardHeader>
          <CardTitle><TranslatedText fr="Bienvenue, Utilisateur !">Willkommen, Benutzer!</TranslatedText></CardTitle>
          <CardDescription>
            <TranslatedText fr="Vous pouvez consulter et modifier les informations de votre compte ici.">
              Hier können Sie Ihre Kontoinformationen einsehen und bearbeiten.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold"><TranslatedText fr="Nom">Name</TranslatedText></h3>
            <p className="text-muted-foreground">Alex Doe</p>
          </div>
          <div>
            <h3 className="font-semibold"><TranslatedText fr="Email">Email</TranslatedText></h3>
            <p className="text-muted-foreground">alex.doe@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
