'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { TranslatedText } from '@/components/TranslatedText';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div>
      <h1 className="mb-6 font-headline text-3xl">
        <TranslatedText fr="Historique des commandes">Bestellverlauf</TranslatedText>
      </h1>
      <Card className="border-2 border-dashed shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold"><TranslatedText fr="Aucune commande pour le moment">Noch keine Bestellungen</TranslatedText></h3>
            <p className="mt-2 text-muted-foreground"><TranslatedText fr="Explorez nos collections et trouvez quelque chose qui vous plaît.">Entdecken Sie unsere Kollektionen und finden Sie etwas, das Ihnen gefällt.</TranslatedText></p>
            <Button asChild className="mt-6">
                <Link href="/products/all"><TranslatedText fr="Continuer les achats">Weiter einkaufen</TranslatedText></Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
