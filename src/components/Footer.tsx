
import Link from 'next/link';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TranslatedText } from './TranslatedText';
import { Separator } from './ui/separator';

export function Footer() {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: "Herrenbekleidung", href: '/products/mens-clothing' },
        { name: "Damenbekleidung", href: '/products/womens-clothing' },
        { name: 'Accessoires', href: '/products/accessories' },
        { name: 'Schuhe', href: '/products/shoes' },
        { name: 'Winterkleidung', href: '/products/winter-clothing' },
      ],
    },
    {
      title: 'Über uns',
      links: [
        { name: 'Unsere Geschichte', href: '#' },
        { name: 'Nachhaltigkeit', href: '#' },
        { name: 'Karriere', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Kontaktieren Sie uns', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Versand & Rücksendungen', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 mb-8 md:col-span-4 lg:col-span-1 lg:mb-0">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="EZCENTIALS Logo" width={50} height={50} />
              <span className="font-bold font-headline text-2xl">EZCENTIALS</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground"><TranslatedText>Dezente Eleganz und Raffinesse.</TranslatedText></p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold"><TranslatedText>{section.title}</TranslatedText></h5>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      <TranslatedText>{link.name}</TranslatedText>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-4 lg:col-span-5">
              <Separator className="my-8" />
          </div>
          
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <h5 className="font-semibold"><TranslatedText>Bleiben Sie in Kontakt</TranslatedText></h5>
              <p className="mt-2 text-sm text-muted-foreground"><TranslatedText>Melden Sie sich für unseren Newsletter an, um Updates zu Neuankömmlingen und Sonderangeboten zu erhalten.</TranslatedText></p>
              <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="Geben Sie Ihre E-Mail-Adresse ein" className="max-w-xs" />
                <Button type="submit"><TranslatedText>Abonnieren</TranslatedText></Button>
              </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <TranslatedText>EZCENTIALS. Alle Rechte vorbehalten.</TranslatedText></p>
        </div>
      </div>
    </footer>
  );
}
