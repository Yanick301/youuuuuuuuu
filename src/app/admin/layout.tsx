
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) return; // Wait for user state to be confirmed
    if (!user) {
      router.push('/login?redirect=/admin'); // Redirect to login if not authenticated
    } else if (!isAdmin) {
      router.push('/account'); // Redirect to account page if not an admin
    }
  }, [user, isAdmin, isUserLoading, router]);

  // Show a loading state while checking for user and admin status
  if (isUserLoading || !user || !isAdmin) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        {isUserLoading ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        ) : (
            <>
                <ShieldAlert className="h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">
                    <TranslatedText fr="Accès non autorisé" en="Unauthorized Access">
                        Unbefugter Zugriff
                    </TranslatedText>
                </h1>
                <p className="text-muted-foreground">
                    <TranslatedText fr="Vous n'avez pas les permissions nécessaires pour accéder à cette page." en="You do not have permission to access this page.">
                        Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
                    </TranslatedText>
                </p>
            </>
        )}
      </div>
    );
  }

  // If user is an admin, render the children
  return <>{children}</>;
}
