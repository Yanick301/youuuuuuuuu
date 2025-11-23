'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText fr="Historique des commandes">Bestellverlauf</TranslatedText>
      </h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold"><TranslatedText fr="Aucune commande pour le moment">Noch keine Bestellungen</TranslatedText></h3>
            <p className="mt-2 text-muted-foreground"><TranslatedText fr="Vous n'avez passé aucune commande chez nous.">Sie haben bei uns noch keine Bestellungen aufgegeben.</TranslatedText></p>
        </CardContent>
      </Card>
    </div>
  );
}
