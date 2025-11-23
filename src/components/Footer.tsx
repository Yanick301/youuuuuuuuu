import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TranslatedText } from './TranslatedText';
import { Separator } from './ui/separator';

export function Footer() {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: "Men's Clothing", href: '/products/mens-clothing' },
        { name: "Women's Clothing", href: '/products/womens-clothing' },
        { name: 'Accessories', href: '/products/accessories' },
        { name: 'Shoes', href: '/products/shoes' },
        { name: 'Winter Wear', href: '/products/winter-clothing' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Shipping & Returns', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 mb-8 md:col-span-4 lg:col-span-1 lg:mb-0">
            <h4 className="font-headline text-lg"><TranslatedText>EZCENTIALS</TranslatedText></h4>
            <p className="mt-2 text-sm text-muted-foreground"><TranslatedText>Understated elegance and sophistication.</TranslatedText></p>
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
              <h5 className="font-semibold"><TranslatedText>Stay in Touch</TranslatedText></h5>
              <p className="mt-2 text-sm text-muted-foreground"><TranslatedText>Sign up for our newsletter to receive updates on new arrivals and special offers.</TranslatedText></p>
              <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-xs" />
                <Button type="submit"><TranslatedText>Subscribe</TranslatedText></Button>
              </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <TranslatedText>EZCENTIALS. All rights reserved.</TranslatedText></p>
        </div>
      </div>
    </footer>
  );
}
