
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, isUserLoading, isProfileLoading } = useUser();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Wait until both user and profile loading are complete
    if (isUserLoading || isProfileLoading) {
      return;
    }

    // Once loading is done, check for admin status
    if (!profile?.isAdmin) {
      router.push('/login');
    } else {
      // Mark auth as checked if user is an admin
      setAuthChecked(true);
    }
  }, [user, profile, isUserLoading, isProfileLoading, router]);

  // If auth hasn't been checked yet, show a loading state
  if (!authChecked) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Vérification de l'accès...</p>
        
        {/* Show access denied message only after loading is complete and access is denied */}
        {!isUserLoading && !isProfileLoading && !profile?.isAdmin && (
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

  // If auth has been checked and user is an admin, render the children
  return <div>{children}</div>;
}
