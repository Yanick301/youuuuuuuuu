
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
  const { user, profile, isLoading: isUserLoading } = useUser();
  const { isFullyAdmin, isAdminMode } = useAdminMode();
  const router = useRouter();

  useEffect(() => {
    // Wait until user loading is complete before making any decisions
    if (isUserLoading) {
      return;
    }

    // After loading, if there's no user, or the user profile isn't an admin, redirect.
    if (!user || !profile?.isAdmin) {
      router.replace('/login');
      return;
    }
    
    // If the user IS an admin but hasn't entered the secret code, keep them on a waiting screen or redirect.
    // For this case, we allow them to stay on the page, but content will be hidden by the page itself.
    // The main check for isFullyAdmin will be done on the page component.

  }, [user, profile, isUserLoading, router, isAdminMode]);

  // While loading user/profile data, show a full-screen loader.
  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground"><TranslatedText fr="Vérification des autorisations..." en="Verifying permissions...">Berechtigungen werden überprüft...</TranslatedText></p>
        </div>
      </div>
    );
  }

  // If loading is complete and user is an admin (profile-wise), show the content.
  // The page itself will handle the `isAdminMode` check.
  if (user && profile?.isAdmin) {
    return <>{children}</>;
  }

  // Fallback for unauthorized access while not loading
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground"><TranslatedText fr="Accès non autorisé. Redirection..." en="Unauthorized. Redirecting...">Zugriff verweigert. Weiterleitung...</TranslatedText></p>
      </div>
    </div>
  );
}
