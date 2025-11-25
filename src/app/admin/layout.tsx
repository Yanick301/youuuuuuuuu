
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading, profile, isProfileLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading || isProfileLoading) {
      return; // Wait for everything to load
    }
    
    // If no user or user is not an admin, redirect
    if (!user || !profile?.isAdmin) {
      router.push('/login');
    }
  }, [user, isUserLoading, profile, isProfileLoading, router]);

  // While loading or if user is not authorized (before effective redirection)
  if (isUserLoading || isProfileLoading || !user || !profile || !profile.isAdmin) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Vérification de l'accès...</p>
         {!isUserLoading && !isProfileLoading && (!user || !profile?.isAdmin) && (
            <div className='mt-8'>
                <p className='text-destructive font-semibold'>Accès non autorisé.</p>
                <p className='text-sm text-muted-foreground'>Vous allez être redirigé vers la page de connexion.</p>
                 <Button asChild variant="link" className='mt-2'>
                    <Link href="/login">Se connecter</Link>
                </Button>
            </div>
        )}
      </div>
    );
  }

  // If the user is an admin
  return <div>{children}</div>;
}
