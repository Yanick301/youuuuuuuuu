'use client';

import { User, LogOut, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { TranslatedText } from '../TranslatedText';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export function UserButton() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Abgemeldet',
        description: 'Sie wurden erfolgreich abgemeldet.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Abmeldung fehlgeschlagen',
        description: error.message,
      });
    }
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  if (isUserLoading) {
    return <Skeleton className="h-10 w-24" />
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account"><User className="mr-2 h-4 w-4" /> <TranslatedText fr="Mon compte">Mein Konto</TranslatedText></Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/favorites"><Heart className="mr-2 h-4 w-4" /> <TranslatedText fr="Mes favoris">Meine Favoriten</TranslatedText></Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <TranslatedText fr="Se déconnecter">Abmelden</TranslatedText>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
   <Button variant="ghost" asChild className="justify-start">
    <Link href="/login"><User className="mr-2 h-4 w-4" /> <TranslatedText fr="Se connecter">Anmelden</TranslatedText></Link>
   </Button>
  );
}
