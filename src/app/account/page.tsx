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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, ListOrdered, User } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  return (
    <div>
      <h1 className="mb-8 font-headline text-3xl">
        <TranslatedText fr="Aperçu du compte">Kontoübersicht</TranslatedText>
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardContent className="flex flex-col items-center p-8 text-center">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-semibold">{user.displayName || 'Benutzer'}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card className="hover:bg-muted/50 transition-colors">
                     <Link href="/account/orders">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium"><TranslatedText fr="Commandes récentes">Letzte Bestellungen</TranslatedText></CardTitle>
                            <ListOrdered className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground"><TranslatedText fr="Afficher l'historique de vos commandes">Ihren Bestellverlauf anzeigen</TranslatedText></p>
                        </CardContent>
                    </Link>
                </Card>
                 <Card className="hover:bg-muted/50 transition-colors">
                     <Link href="/account/favorites">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium"><TranslatedText fr="Vos favoris">Ihre Favoriten</TranslatedText></CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground"><TranslatedText fr="Afficher les articles que vous avez aimés">Artikel anzeigen, die Ihnen gefallen haben</TranslatedText></p>
                        </CardContent>
                    </Link>
                </Card>
                 <Card className="sm:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="h-5 w-5" />
                            <TranslatedText fr="Détails du profil">Profildetails</TranslatedText>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground"><TranslatedText fr="Nom complet">Vollständiger Name</TranslatedText></h3>
                            <p>{user.displayName || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground"><TranslatedText fr="Adresse e-mail">E-Mail-Adresse</TranslatedText></h3>
                            <p>{user.email}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
