
'use client';

import { useUser } from '@/firebase';
import { useAdminMode } from '@/context/AdminModeContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isLoading } = useUser();
  const { isFullyAdmin } = useAdminMode();
  const router = useRouter();

  useEffect(() => {
    // Wait until loading is fully complete before making any decisions
    if (isLoading) {
      return;
    }

    // After loading, if there's no user, or the user is not a full admin, redirect.
    if (!user || !isFullyAdmin) {
      router.replace('/login');
    }
  }, [user, isFullyAdmin, isLoading, router]);

  // While loading, show a full-screen loader.
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground"><TranslatedText fr="Vérification des autorisations..." en="Verifying permissions...">Berechtigungen werden überprüft...</TranslatedText></p>
        </div>
      </div>
    );
  }

  // If loading is complete and user is a full admin, show the content.
  if (user && isFullyAdmin) {
    return <>{children}</>;
  }

  // Otherwise, show a loading/redirecting screen as a fallback
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground"><TranslatedText fr="Accès non autorisé. Redirection..." en="Unauthorized. Redirecting...">Zugriff verweigert. Weiterleitung...</TranslatedText></p>
      </div>
    </div>
  );
}
