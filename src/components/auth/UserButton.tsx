'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { TranslatedText } from '../TranslatedText';

export function UserButton() {
  // Mock user state
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Benutzermenü</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/account"><TranslatedText>Mein Konto</TranslatedText></Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/favorites"><TranslatedText>Meine Favoriten</TranslatedText></Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><TranslatedText>Abmelden</TranslatedText></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Benutzermenü</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/login"><TranslatedText>Anmelden</TranslatedText></Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/register"><TranslatedText>Registrieren</TranslatedText></Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
