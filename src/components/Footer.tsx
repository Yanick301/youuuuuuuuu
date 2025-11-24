
'use client';
import Link from 'next/link';
import { TranslatedText } from './TranslatedText';
import { InstagramIcon } from './InstagramIcon';
import { SnapchatIcon } from './SnapchatIcon';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerSections = [
    {
      title: 'Hilfe',
      title_fr: 'Aide',
      title_en: 'Help',
      links: [
        { name: 'Kontaktieren Sie uns', name_fr: 'Contactez-nous', name_en: 'Contact Us', href: 'mailto:contact-support@ezcentials.com' },
        { name: 'FAQs', name_fr: 'FAQs', name_en: 'FAQs', href: '/products/all' },
        { name: 'Produktpflege', name_fr: 'Entretien des produits', name_en: 'Product Care', href: '/products/all' },
        { name: 'Rechtliche Hinweise', name_fr: 'Mentions légales', name_en: 'Legal Notice', href: '/account' },
      ],
    },
    {
      title: 'Dienstleistungen',
      title_fr: 'Services',
      title_en: 'Services',
      links: [
        { name: 'Reparaturen', name_fr: 'Réparations', name_en: 'Repairs', href: '/products/all' },
        { name: 'Personalisierung', name_fr: 'Personnalisation', name_en: 'Personalization', href: '/products/all' },
        { name: 'Geschenkkarten', name_fr: 'Cartes cadeaux', name_en: 'Gift Cards', href: '/products/all' },
      ],
    },
    {
      title: 'Über EZCENTIALS',
      title_fr: 'À propos d\'EZCENTIALS',
      title_en: 'About EZCENTIALS',
      links: [
        { name: 'Modehäuser', name_fr: 'Maisons de mode', name_en: 'Fashion Houses', href: '/products/all' },
        { name: 'Nachhaltigkeit', name_fr: 'Durabilité', name_en: 'Sustainability', href: '/products/all' },
        { name: 'Karriere', name_fr: 'Carrières', name_en: 'Careers', href: '/products/all' },
      ],
    },
     {
      title: 'Réseaux sociaux',
      title_fr: 'Réseaux sociaux',
      title_en: 'Social Media',
      isSocial: true,
      links: [
        { name: 'Instagram', href: 'https://www.instagram.com/ezcentials_?igsh=MWQ2aTR60WgyYnpvag%3D%3D&utm_source=qr', icon: InstagramIcon },
        { name: 'Snapchat', href: 'https://snapchat.com/t/qez0Z1z0', icon: SnapchatIcon },
      ],
    },
  ];

  return (
    <footer className="border-t border-stone-800 bg-footer text-stone-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:col-span-1 lg:mb-0">
                <h5 className="font-headline text-xl font-semibold tracking-wider text-white">EZCENTIALS</h5>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 col-span-2 md:col-span-4 lg:col-span-4">
                {footerSections.map((section) => (
                <div key={section.title}>
                    <h5 className="font-headline text-lg font-semibold tracking-wider text-white">
                    <TranslatedText fr={section.title_fr} en={section.title_en}>{section.title}</TranslatedText>
                    </h5>
                    <ul className={`mt-4 space-y-3 ${section.isSocial ? 'flex space-x-4 space-y-0' : ''}`}>
                    {section.links.map((link) => (
                        <li key={link.name}>
                        <Link href={link.href} className="text-sm text-stone-300 hover:text-white flex items-center gap-2">
                           {link.icon && <link.icon />}
                           {!section.isSocial && <TranslatedText fr={link.name_fr} en={link.name_en}>{link.name}</TranslatedText>}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>
        <div className="mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-400">
           <p>&copy; {currentYear} <TranslatedText fr="EZCENTIALS. Tous droits réservés." en="EZCENTIALS. All rights reserved.">EZCENTIALS. Alle Rechte vorbehalten.</TranslatedText></p>
        </div>
      </div>
    </footer>
  );
}
