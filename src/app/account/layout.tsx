'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ListOrdered, User } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const accountNav = [
    {
      name: 'Kontodetails',
      name_fr: 'Détails du compte',
      name_en: 'Account Details',
      href: '/account',
      icon: User,
    },
    {
      name: 'Bestellverlauf',
      name_fr: 'Historique des commandes',
      name_en: 'Order History',
      href: '/account/orders',
      icon: ListOrdered,
    },
    {
      name: 'Meine Favoriten',
      name_fr: 'Mes favoris',
      name_en: 'My Favorites',
      href: '/favorites',
      icon: Heart,
    },
  ];

  useEffect(() => {
    if (isUserLoading) {
      return; // Do nothing while loading
    }
    if (!user) {
      router.push('/login');
      return;
    }
    if (
      user.providerData.some((p) => p.providerId === 'password') &&
      !user.emailVerified
    ) {
      router.push('/verify-email');
      return;
    }
  }, [user, isUserLoading, router]);

  if (
    isUserLoading ||
    !user ||
    (user.providerData.some((p) => p.providerId === 'password') &&
      !user.emailVerified)
  ) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Laden...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <aside className="md:col-span-1">
          <h2 className="mb-6 hidden font-headline text-2xl md:block">
            <TranslatedText fr="Mon compte" en="My Account">
              Mein Konto
            </TranslatedText>
          </h2>
          <nav className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-1">
            {accountNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden md:inline">
                  <TranslatedText fr={item.name_fr} en={item.name_en}>
                    {item.name}
                  </TranslatedText>
                </span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="md:col-span-3 lg:col-span-4">{children}</main>
      </div>
    </div>
  );
}
