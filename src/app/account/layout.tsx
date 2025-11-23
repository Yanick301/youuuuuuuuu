'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ListOrdered, User } from 'lucide-react';
import { TranslatedText } from '@/components/TranslatedText';
import { cn } from '@/lib/utils';

const accountNav = [
  {
    name: 'Kontodetails',
    href: '/account',
    icon: User,
  },
  {
    name: 'Bestellverlauf',
    href: '/account/orders',
    icon: ListOrdered,
  },
  {
    name: 'Meine Favoriten',
    href: '/account/favorites',
    icon: Heart,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <aside className="md:col-span-1">
          <h2 className="mb-6 font-headline text-2xl hidden md:block">
            <TranslatedText>Mein Konto</TranslatedText>
          </h2>
          <nav className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-x-auto -mx-4 px-4 pb-2 md:pb-0 md:p-0 md:overflow-visible">
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
                <span className="hidden md:inline"><TranslatedText>{item.name}</TranslatedText></span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="md:col-span-3 lg:col-span-4">{children}</main>
      </div>
    </div>
  );
}
