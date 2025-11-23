
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
      title_fr: 'Boutique',
      links: [
        { name: "Herrenbekleidung", name_fr: "Vêtements pour hommes", href: '/products/mens-clothing' },
        { name: "Damenbekleidung", name_fr: "Vêtements pour femmes", href: '/products/womens-clothing' },
        { name: 'Accessoires', name_fr: 'Accessoires', href: '/products/accessories' },
        { name: 'Schuhe', name_fr: 'Chaussures', href: '/products/shoes' },
        { name: 'Winterkleidung', name_fr: 'Vêtements d\'hiver', href: '/products/winter-clothing' },
      ],
    },
    {
      title: 'Über uns',
      title_fr: 'À propos',
      links: [
        { name: 'Unsere Geschichte', name_fr: 'Notre histoire', href: '#' },
        { name: 'Nachhaltigkeit', name_fr: 'Durabilité', href: '#' },
        { name: 'Karriere', name_fr: 'Carrières', href: '#' },
      ],
    },
    {
      title: 'Support',
      title_fr: 'Support',
      links: [
        { name: 'Kontaktieren Sie uns', name_fr: 'Contactez-nous', href: '#' },
        { name: 'FAQ', name_fr: 'FAQ', href: '#' },
        { name: 'Versand & Rücksendungen', name_fr: 'Expédition et retours', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 mb-8 md:col-span-4 lg:col-span-1 lg:mb-0">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="EZCENTIALS Logo" width={60} height={60} />
              <span className="font-bold font-headline text-2xl">EZCENTIALS</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground"><TranslatedText fr="Élégance discrète et sophistication.">Dezente Eleganz und Raffinesse.</TranslatedText></p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold"><TranslatedText fr={section.title_fr}>{section.title}</TranslatedText></h5>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      <TranslatedText fr={link.name_fr}>{link.name}</TranslatedText>
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
              <h5 className="font-semibold"><TranslatedText fr="Restez en contact">Bleiben Sie in Kontakt</TranslatedText></h5>
              <p className="mt-2 text-sm text-muted-foreground"><TranslatedText fr="Inscrivez-vous à notre newsletter pour recevoir des mises à jour sur les nouveautés et les offres spéciales.">Melden Sie sich für unseren Newsletter an, um Updates zu Neuankömmlingen und Sonderangeboten zu erhalten.</TranslatedText></p>
              <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="Geben Sie Ihre E-Mail-Adresse ein" className="max-w-xs" />
                <Button type="submit"><TranslatedText fr="S'abonner">Abonnieren</TranslatedText></Button>
              </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <TranslatedText fr="EZCENTIALS. Tous droits réservés.">EZCENTIALS. Alle Rechte vorbehalten.</TranslatedText></p>
        </div>
      </div>
    </footer>
  );
}
