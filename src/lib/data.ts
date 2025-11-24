
import type { Product, Category, Review } from './types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Herrenbekleidung', name_fr: 'Vêtements Homme', name_en: 'Men\'s Clothing', slug: 'mens-clothing', imageId: 'mens-category' },
  { id: 'cat-2', name: 'Damenbekleidung', name_fr: 'Vêtements Femme', name_en: 'Women\'s Clothing', slug: 'womens-clothing', imageId: 'womens-category' },
  { id: 'cat-3', name: 'Accessoires', name_fr: 'Accessoires', name_en: 'Accessories', slug: 'accessories', imageId: 'accessories-category' },
  { id: 'cat-5', name: 'Schuhe', name_fr: 'Chaussures', name_en: 'Shoes', slug: 'shoes', imageId: 'shoes-category' },
  { id: 'cat-4', name: 'Winterkleidung', name_fr: 'Vêtements d\'hiver', name_en: 'Winter Clothing', slug: 'winter-clothing', imageId: 'winter-category' },
];

export const products: Product[] = [
    {
    id: '1',
    name: 'Seiden-Midikleid',
    name_fr: 'Robe midi en soie',
    name_en: 'Silk Midi Dress',
    slug: 'robe-midi-en-soie',
    price: 590,
    description: 'Umhüllen Sie sich mit fließender Eleganz. Dieses Midikleid aus reiner Seide besticht durch seinen sanften Glanz und eine schmeichelhafte Silhouette, die bei jeder Bewegung tanzt. Ein Meisterwerk der Couture für unvergessliche Momente.',
    description_fr: 'Enveloppez-vous d\'une élégance fluide. Cette robe midi en pure soie se distingue par son éclat délicat et une silhouette flatteuse qui danse à chaque mouvement. Une pièce maîtresse de la couture pour des moments inoubliables.',
    description_en: 'Wrap yourself in fluid elegance. This pure silk midi dress features a delicate sheen and a flattering silhouette that dances with every move. A couture masterpiece for unforgettable moments.',
    category: 'womens-clothing',
    images: ['robe-midi-en-soie-gucci'],
    reviews: [
      { author: 'Sophie', rating: 5, comment: 'Absolument sublime. La qualité de la soie est exceptionnelle.' },
      { author: 'Claire', rating: 4, comment: 'Très chic, mais attention elle taille un peu petit.' },
    ],
  },
  {
    id: '2',
    name: 'Zweireihiger Blazer',
    name_fr: 'Blazer croisé',
    name_en: 'Double-Breasted Blazer',
    slug: 'blazer-croise',
    price: 780,
    description: 'Definieren Sie Autorität und Stil mit diesem zweireihigen Blazer. Seine strukturierten Schultern und die goldenen Knöpfe schaffen eine kraftvolle Silhouette. Gefertigt aus feinster Wolle, ist er eine Investition in zeitlose Eleganz.',
    description_fr: 'Définissez l\'autorité et le style avec ce blazer croisé. Ses épaules structurées et ses boutons dorés créent une silhouette puissante. Confectionné dans une laine de premier choix, c\'est un investissement dans une élégance intemporelle.',
    description_en: 'Define authority and style with this double-breasted blazer. Its structured shoulders and gold buttons create a powerful silhouette. Crafted from the finest wool, it is an investment in timeless elegance.',
    category: 'womens-clothing',
    images: ['blazer-croise-balmain'],
    reviews: [
      { author: 'Léa', rating: 5, comment: 'La coupe est absolument parfaite et le tissu est magnifique.' },
      { author: 'Inès', rating: 5, comment: 'Un classique instantané. Je me sens puissante en le portant.' },
    ],
  },
  {
    id: 'prod-21',
    name: 'Robe pull en cachemire',
    name_fr: 'Robe pull en cachemire',
    name_en: 'Cashmere Sweater Dress',
    slug: 'robe-pull-en-cachemire-max-mara',
    price: 950,
    description: 'Eine luxuriöse Pulloverkleid aus reinem Kaschmir, für eine komfortable und warme Eleganz. Seine lockere Passform und die Weichheit des Materials machen es zu einem Kokon des Luxus für den Winter.',
    description_fr: 'Une robe pull luxueuse en pur cachemire, pour une élégance confortable et chaleureuse. Sa coupe décontractée et la douceur de sa maille en font un cocon de luxe pour l\'hiver.',
    description_en: 'A luxurious sweater dress in pure cashmere, for comfortable and warm elegance. Its relaxed fit and the softness of its knit make it a cocoon of luxury for the winter.',
    category: 'womens-clothing',
    images: ['robe-pull-en-cachemire-max-mara'],
    reviews: [
      { author: 'Elodie', rating: 5, comment: 'Incroyablement douce et confortable, tout en restant très chic.' },
    ]
  },
  {
    id: 'prod-22',
    name: 'Pantalon en cuir',
    name_fr: 'Pantalon en cuir',
    name_en: 'Leather Trousers',
    slug: 'pantalon-en-cuir-saint-laurent',
    price: 1200,
    description: 'Ein Statement-Stück par excellence. Dieser Slim-Fit-Hose aus geschmeidigem Lammleder formt die Silhouette für einen entschieden rockigen und schicken Look. Ein starkes Stück, das die Zeiten überdauert.',
    description_fr: 'La pièce forte par excellence. Ce pantalon slim en cuir d\'agneau souple sculpte la silhouette pour un look résolument rock et chic. Une pièce forte qui traverse les époques.',
    description_en: 'The ultimate statement piece. These slim-fit trousers in supple lambskin sculpt the silhouette for a resolutely rock and chic look. A strong piece that stands the test of time.',
    category: 'womens-clothing',
    images: ['pantalon-en-cuir-saint-laurent'],
    reviews: [
      { author: 'Victoria', rating: 5, comment: 'Un cuir de rêve, souple et confortable. La coupe est parfaite.' },
    ]
  },
  {
    id: 'prod-23',
    name: 'Jupe plissée midi',
    name_fr: 'Jupe plissée midi',
    name_en: 'Pleated Midi Skirt',
    slug: 'jupe-plissee-midi-valentino',
    price: 680,
    description: 'Eine Ode an die Weiblichkeit und Bewegung. Dieser fließende und leichte Midirock mit Sonnenplissee tanzt bei jedem Schritt und schafft eine anmutige und luftige Silhouette.',
    description_fr: 'Une ode à la féminité et au mouvement. Cette jupe midi plissée soleil, fluide et légère, danse à chacun de vos pas, créant une silhouette gracieuse et aérienne.',
    description_en: 'An ode to femininity and movement. This fluid and light sunray pleated midi skirt dances with every step, creating a graceful and airy silhouette.',
    category: 'womens-clothing',
    images: ['jupe-plissee-midi-valentino'],
    reviews: [
      { author: 'Olivia', rating: 5, comment: 'Le mouvement de cette jupe est magique. Très élégante.' },
    ]
  },
  {
    id: 'prod-24',
    name: 'T-shirt brodé logo',
    name_fr: 'T-shirt brodé logo',
    name_en: 'Logo Embroidered T-shirt',
    slug: 't-shirt-brode-logo-gucci',
    price: 360,
    description: 'Ein Luxus-Basic. Dieses T-Shirt aus hochwertiger Baumwolle wird durch das ikonische Logo des Hauses, das sorgfältig auf der Brust gestickt ist, aufgewertet. Ein Symbol für Zugehörigkeit und lässigen Stil.',
    description_fr: 'Le basique de luxe. Ce t-shirt en coton de qualité supérieure est rehaussé du logo emblématique de la maison, minutieusement brodé sur la poitrine. Un symbole d\'appartenance et de style décontracté.',
    description_en: 'The luxury basic. This high-quality cotton T-shirt is enhanced by the house\'s iconic logo, meticulously embroidered on the chest. A symbol of belonging and casual style.',
    category: 'womens-clothing',
    images: ['t-shirt-brode-logo-gucci'],
    reviews: [
      { author: 'Anna', rating: 5, comment: 'Même pour un t-shirt, la qualité est incroyable. Très confortable.' },
    ]
  },
  {
    id: 'prod-25',
    name: 'Pull col bateau manches ballon',
    name_fr: 'Pull col bateau à manches ballon',
    name_en: 'Balloon-Sleeve Boatneck Sweater',
    slug: 'pull-col-bateau-manches-ballon-chloe',
    price: 630,
    description: 'Eine romantische und moderne Silhouette. Dieser Pullover mit U-Boot-Ausschnitt zeichnet sich durch seine voluminösen Ballonärmel aus und verleiht jedem Outfit einen Hauch von Couture.',
    description_fr: 'Une silhouette romantique et moderne. Ce pull à col bateau se distingue par ses manches ballon volumineuses, apportant une touche couture à n\'importe quelle tenue.',
    description_en: 'A romantic and modern silhouette. This boatneck sweater is distinguished by its voluminous balloon sleeves, bringing a couture touch to any outfit.',
    category: 'womens-clothing',
    images: ['pull-col-bateau-manches-ballon-chloe'],
    reviews: [
      { author: 'Emma', rating: 5, comment: 'Les manches sont magnifiques, c\'est une pièce très originale.' },
    ]
  },
  {
    id: 'prod-26',
    name: 'Robe-chemise oversize',
    name_fr: 'Robe-chemise oversize',
    name_en: 'Oversize Shirtdress',
    slug: 'robe-chemise-oversize-balenciaga',
    price: 920,
    description: 'Der Inbegriff von lässigem Chic. Diese Oversize-Hemdbluse in makellosem Weiß kann als Kleid oder offen über einer Hose getragen werden und bietet einen avantgardistischen und vielseitigen Stil.',
    description_fr: 'Le summum du chic décontracté. Cette robe-chemise oversize d\'un blanc immaculé peut être portée seule ou ouverte sur un pantalon, offrant un style avant-gardiste et polyvalent.',
    description_en: 'The height of casual chic. This immaculate white oversized shirtdress can be worn alone or open over trousers, offering an avant-garde and versatile style.',
    category: 'womens-clothing',
    images: ['robe-chemise-oversize-balenciaga'],
    reviews: [
      { author: 'Chloé', rating: 5, comment: 'La coupe est incroyable. Très mode et facile à porter.' },
    ]
  },
  {
    id: 'prod-27',
    name: 'Pantalon palazzo en laine',
    name_fr: 'Pantalon palazzo en laine',
    name_en: 'Wool Palazzo Pants',
    slug: 'pantalon-palazzo-en-laine-max-mara',
    price: 540,
    description: 'Eine majestätische Silhouette. Diese Palazzo-Hose aus fließender Wolle verlängert das Bein und bietet eine anmutige und kraftvolle Bewegung. Perfekt für einen anspruchsvollen Büro-Look oder einen eleganten Abend.',
    description_fr: 'Une allure majestueuse. Ce pantalon palazzo en laine fluide allonge la jambe et offre un mouvement gracieux et puissant. Parfait pour un look de bureau sophistiqué ou une soirée élégante.',
    description_en: 'A majestic allure. These fluid wool palazzo pants lengthen the leg and offer graceful and powerful movement. Perfect for a sophisticated office look or an elegant evening out.',
    category: 'womens-clothing',
    images: ['pantalon-palazzo-en-laine-max-mara'],
    reviews: [
      { author: 'Juliette', rating: 5, comment: 'Le tombé de ce pantalon est juste sublime. Très confortable.' },
    ]
  },
  {
    id: 'prod-28',
    name: 'Blazer en satin',
    name_fr: 'Blazer en satin',
    name_en: 'Satin Blazer',
    slug: 'blazer-satin-saint-laurent',
    price: 1750,
    description: 'Ein Juwel für den Abend. Dieser Smoking-Blazer aus luxuriösem Seidensatin mit seinem schimmernden Revers ist das ultimative Stück für einen unvergesslichen und glamourösen Auftritt.',
    description_fr: 'Un bijou pour le soir. Ce blazer smoking en satin de soie luxueux, avec son revers chatoyant, est la pièce ultime pour une allure inoubliable et glamour.',
    description_en: 'An evening jewel. This luxurious silk satin tuxedo blazer, with its shimmering lapel, is the ultimate piece for an unforgettable and glamorous look.',
    category: 'womens-clothing',
    images: ['blazer-satin-saint-laurent'],
    reviews: [
      { author: 'Garance', rating: 5, comment: 'Une pièce d\'exception. La qualité est visible au premier coup d\'œil.' },
    ]
  },
  {
    id: 'prod-29',
    name: 'Robe longue en velours',
    name_fr: 'Robe longue en velours',
    name_en: 'Long Velvet Dress',
    slug: 'robe-longue-en-velours-valentino',
    price: 2200,
    description: 'Eine königliche Eleganz. Diese lange Robe aus tiefschwarzem Samt umhüllt die Silhouette mit einer geheimnisvollen und opulenten Anmut. Ein Meisterwerk für die exklusivsten Anlässe.',
    description_fr: 'Une élégance royale. Cette robe longue en velours noir profond enveloppe la silhouette d\'une grâce mystérieuse et opulente. Une pièce maîtresse pour les occasions les plus exclusives.',
    description_en: 'A royal elegance. This long dress in deep black velvet envelops the silhouette with a mysterious and opulent grace. A masterpiece for the most exclusive occasions.',
    category: 'womens-clothing',
    images: ['robe-longue-en-velours-valentino'],
    reviews: [
      { author: 'Constance', rating: 5, comment: 'Je me suis sentie comme une reine. La robe est spectaculaire.' },
    ]
  },
  {
    id: 'prod-30',
    name: 'Slim-Fit Hemd',
    name_fr: 'Chemise Slim-Fit',
    name_en: 'Slim-Fit Shirt',
    slug: 'chemise-slim-fit-tom-ford',
    price: 280,
    description: 'Die Quintessenz der Raffinesse. Dieses Slim-Fit-Hemd, gefertigt aus luxuriöser ägyptischer Baumwolle, bietet eine unvergleichliche Passform und ein makelloses Finish. Der perfekte Begleiter für den modernen Gentleman.',
    description_fr: 'La quintessence du raffinement. Cette chemise slim-fit, coupée dans un luxueux coton égyptien, offre une coupe inégalée et une finition impeccable. L\'alliée parfaite du gentleman moderne.',
    description_en: 'The quintessence of refinement. This slim-fit shirt, cut from luxurious Egyptian cotton, offers an unmatched fit and a flawless finish. The perfect ally for the modern gentleman.',
    category: 'mens-clothing',
    images: ['chemise-slim-fit-tom-ford'],
    reviews: [
        { author: 'Thomas', rating: 5, comment: 'Une qualité de tissu exceptionnelle. Le tombé est parfait.'},
        { author: 'Julien', rating: 5, comment: 'Enfin une chemise qui épouse parfaitement la silhouette.'}
    ]
  },
  {
    id: 'prod-31',
    name: 'Piqué-Polo',
    name_fr: 'Polo piqué',
    name_en: 'Piqué Polo Shirt',
    slug: 'polo-pique-ralph-lauren',
    price: 95,
    description: 'Eine Ikone der lässigen Eleganz. Dieses Polo aus atmungsaktivem Baumwoll-Piqué verbindet Komfort mit einem Hauch von aristokratischem Flair. Ein zeitloses Must-Have für jeden Anlass, vom Yachtclub bis zum Stadtbummel.',
    description_fr: 'L\'icône de l\'élégance décontractée. Ce polo en piqué de coton respirant allie confort et une touche d\'aisance aristocratique. Un indispensable intemporel pour toutes les occasions, du yacht club à la ville.',
    description_en: 'The icon of casual elegance. This breathable cotton piqué polo combines comfort with a touch of aristocratic ease. A timeless essential for all occasions, from the yacht club to the city.',
    category: 'mens-clothing',
    images: ['polo-pique-ralph-lauren'],
    reviews: [
        { author: 'Antoine', rating: 5, comment: 'La qualité est au rendez-vous. Un classique efficace.'}
    ]
  },
  {
    id: 'prod-32',
    name: 'Kaschmir-Rollkragenpullover',
    name_fr: 'Pull col roulé cachemire',
    name_en: 'Cashmere Turtleneck Sweater',
    slug: 'pull-col-roule-cachemire-loro-piana',
    price: 720,
    description: 'Erleben Sie die Umarmung von purem Luxus. Dieser Rollkragenpullover aus feinstem mongolischem Kaschmir bietet unübertroffene Weichheit und wohlige Wärme. Ein Kunstwerk der Strickerei für die kältesten Tage.',
    description_fr: 'Vivez l\'étreinte du luxe pur. Ce pull à col roulé, confectionné dans le plus fin cachemire de Mongolie, offre une douceur inégalée et une chaleur réconfortante. Une œuvre d\'art du tricotage pour les jours les plus froids.',
    description_en: 'Experience the embrace of pure luxury. This turtleneck sweater, crafted from the finest Mongolian cashmere, offers unparalleled softness and comforting warmth. A work of knitting art for the coldest days.',
    category: 'mens-clothing',
    images: ['pull-col-roule-cachemire-loro-piana'],
    reviews: [
        { author: 'François', rating: 5, comment: 'Une douceur incroyable. On ne veut plus le quitter.'},
        { author: 'Paul', rating: 5, comment: 'L\'investissement vaut chaque centime.'}
    ]
  },
  {
    id: 'prod-33',
    name: 'T-Shirt mit Rundhalsausschnitt',
    name_fr: 'T-shirt col rond',
    name_en: 'Crewneck T-Shirt',
    slug: 't-shirt-col-rond-hugo-boss',
    price: 60,
    description: 'Das perfekte Basic. Aus Pima-Baumwolle gefertigt, bietet dieses T-Shirt außergewöhnliche Weichheit und eine perfekte Passform. Ein Beweis dafür, dass wahrer Luxus in der Einfachheit liegt.',
    description_fr: 'Le basique parfait. Confectionné en coton Pima, ce t-shirt offre une douceur exceptionnelle et une coupe impeccable. La preuve que le vrai luxe réside dans la simplicité.',
    description_en: 'The perfect basic. Made from Pima cotton, this T-shirt offers exceptional softness and an impeccable fit. Proof that true luxury lies in simplicity.',
    category: 'mens-clothing',
    images: ['t-shirt-col-rond-hugo-boss'],
    reviews: [
      { author: 'Luc', rating: 5, comment: 'Un coton d\'une douceur rare. Le meilleur t-shirt que j\'ai jamais eu.'},
    ]
  },
  {
    id: 'prod-34',
    name: 'Stretch-Chino-Hose',
    name_fr: 'Pantalon chino stretch',
    name_en: 'Stretch Chino Trousers',
    slug: 'pantalon-chino-stretch-burberry',
    price: 220,
    description: 'Die moderne Eleganz. Diese Chino-Hose, leicht dehnbar für optimalen Komfort, hat eine schlanke und moderne Passform. Sie ist der vielseitige Verbündete für alle Ihre lässig-schicken Looks.',
    description_fr: 'L\'élégance moderne. Ce pantalon chino, légèrement extensible pour un confort optimal, présente une coupe ajustée et contemporaine. L\'allié polyvalent de tous vos looks casual-chic.',
    description_en: 'Modern elegance. This slightly stretchy chino for optimal comfort features a slim, contemporary fit. The versatile ally for all your casual-chic looks.',
    category: 'mens-clothing',
    images: ['pantalon-chino-stretch-burberry'],
    reviews: [
      { author: 'Mathieu', rating: 5, comment: 'Très confortable et la coupe est parfaite. Je l\'ai pris en plusieurs couleurs.'},
    ]
  },
  {
    id: 'prod-35',
    name: 'Slim-Fit-Jeans',
    name_fr: 'Jean coupe ajustée',
    name_en: 'Slim-Fit Jeans',
    slug: 'jean-coupe-ajustee-diesel',
    price: 175,
    description: 'Eine zweite Haut. Diese Jeans aus hochwertigem japanischem Denim passt sich perfekt an die Körperform an und bietet gleichzeitig eine bemerkenswerte Bewegungsfreiheit. Der Inbegriff von coolem Stil.',
    description_fr: 'Une seconde peau. Ce jean, taillé dans un denim japonais de première qualité, épouse les formes tout en offrant une liberté de mouvement remarquable. La quintessence du style cool.',
    description_en: 'A second skin. These jeans, cut from premium Japanese denim, hug the body while offering remarkable freedom of movement. The quintessence of cool style.',
    category: 'mens-clothing',
    images: ['jean-coupe-ajustee-diesel'],
    reviews: [
      { author: 'Alex', rating: 5, comment: 'Le meilleur jean que j\'ai jamais porté. La toile est incroyable.'},
    ]
  },
  {
    id: 'prod-36',
    name: 'Nylon-Bomberjacke',
    name_fr: 'Bomber en nylon',
    name_en: 'Nylon Bomber Jacket',
    slug: 'bomber-nylon-moncler',
    price: 880,
    description: 'Ein urbaner Klassiker, neu interpretiert. Diese Bomberjacke aus glänzendem Nylon, gefüttert mit feinsten Daunen, vereint Streetwear-Stil und High-End-Performance. Ein Must-have für die Zwischensaison.',
    description_fr: 'Un classique urbain réinventé. Ce bomber en nylon brillant, doublé du plus fin duvet, allie style streetwear et performance haut de gamme. Un must-have de la mi-saison.',
    description_en: 'A reinvented urban classic. This shiny nylon bomber, lined with the finest down, combines streetwear style and high-end performance. A mid-season must-have.',
    category: 'mens-clothing',
    images: ['bomber-nylon-moncler'],
    reviews: [
      { author: 'Nico', rating: 5, comment: 'Légère, chaude et incroyablement stylée. Parfaite.'},
    ]
  },
  {
    id: 'prod-37',
    name: 'Lederjacke',
    name_fr: 'Blouson en cuir',
    name_en: 'Leather Jacket',
    slug: 'blouson-cuir-saint-laurent',
    price: 2800,
    description: 'Eine Legende. Diese Bikerjacke aus geschmeidigem und robustem Lammleder ist mehr als nur ein Kleidungsstück, sie ist ein Symbol für Rebellion und zeitlosen Stil. Sie wird mit den Jahren immer schöner.',
    description_fr: 'Une légende. Ce blouson de motard en cuir d\'agneau, souple et robuste, est plus qu\'un vêtement, c\'est un symbole de rébellion et de style intemporel. Il se bonifiera avec les années.',
    description_en: 'A legend. This biker jacket in soft and sturdy lambskin is more than a piece of clothing, it is a symbol of rebellion and timeless style. It will get better with age.',
    category: 'mens-clothing',
    images: ['blouson-cuir-saint-laurent'],
    reviews: [
      { author: 'Chris', rating: 5, comment: 'La perfection. Un investissement pour la vie.'},
    ]
  },
  {
    id: 'prod-38',
    name: 'Anzugjacke',
    name_fr: 'Veste de costume',
    name_en: 'Suit Jacket',
    slug: 'veste-costume-giorgio-armani',
    price: 1450,
    description: 'Die Essenz der italienischen Eleganz. Diese unstrukturierte Jacke aus einem exklusiven Woll-Seiden-Gemisch bietet einen fließenden und leichten Fall, der die Silhouette mit unvergleichlicher Anmut umhüllt.',
    description_fr: 'L\'essence de l\'élégance italienne. Cette veste déstructurée, dans un mélange exclusif de laine et de soie, offre un tombé fluide et léger, enveloppant la silhouette d\'une grâce inégalée.',
    description_en: 'The essence of Italian elegance. This deconstructed jacket, in an exclusive blend of wool and silk, offers a fluid and light drape, enveloping the silhouette with unparalleled grace.',
    category: 'mens-clothing',
    images: ['veste-costume-giorgio-armani'],
    reviews: [
      { author: 'Hugo', rating: 5, comment: 'On sent la qualité et le savoir-faire. C\'est une autre dimension.'},
    ]
  },
  {
    id: 'prod-39',
    name: '2-teiliger Anzug',
    name_fr: 'Costume 2 pièces',
    name_en: '2-Piece Suit',
    slug: 'costume-2-pieces-zegna',
    price: 2500,
    description: 'Die Rüstung des modernen Verführers. Dieser Anzug, der aus der renommierten Trofeo-Wolle geschnitten ist, zeichnet sich durch seine Widerstandsfähigkeit und seinen makellosen Fall aus. Ein Meisterwerk für den Mann von Welt.',
    description_fr: 'L\'armure du séducteur moderne. Taillé dans la prestigieuse laine Trofeo, ce costume se distingue par sa résilience et son tombé impeccable. Une pièce maîtresse pour l\'homme de pouvoir.',
    description_en: 'The armor of the modern seducer. Cut from the prestigious Trofeo wool, this suit is distinguished by its resilience and flawless drape. A masterpiece for the man of power.',
    category: 'mens-clothing',
    images: ['costume-2-pieces-zegna'],
    reviews: [
      { author: 'Arthur', rating: 5, comment: 'Un costume qui vous transforme. La coupe est exceptionnelle.'},
    ]
  },
  {
    id: 'prod-40',
    name: 'Seidenhemd',
    name_fr: 'Chemise en soie',
    name_en: 'Silk Shirt',
    slug: 'chemise-soie-versace',
    price: 520,
    description: 'Machen Sie Eindruck mit diesem kühnen Seidenhemd. Der ikonische Barockdruck und die fließende Seide sind ein Markenzeichen des Hauses Versace und garantieren einen unvergesslichen Stil, der Selbstbewusstsein ausstrahlt.',
    description_fr: 'Affirmez votre présence avec cette chemise en soie audacieuse. Son imprimé baroque iconique et la fluidité de la soie, signature de la maison Versace, garantissent un style mémorable qui respire la confiance.',
    description_en: 'Make a statement with this bold silk shirt. Its iconic baroque print and the fluidity of the silk, a signature of the house of Versace, guarantee a memorable style that exudes confidence.',
    category: 'mens-clothing',
    images: ['chemise-soie-versace'],
    reviews: [
        { author: 'Stéphane', rating: 5, comment: 'Pièce maîtresse de ma garde-robe. Les regards se tournent vers moi.'}
    ]
  },
  {
    id: 'prod-41',
    name: 'Kapuzenpullover',
    name_fr: 'Sweat à capuche',
    name_en: 'Hoodie',
    slug: 'sweat-a-capuche-off-white',
    price: 360,
    description: 'Die Fusion von Streetwear und Luxus. Dieser Hoodie aus dickem Fleece zeichnet sich durch seine grafischen Signaturen aus und ist das Emblem einer rebellischen und hochkreativen Mode.',
    description_fr: 'La fusion du streetwear et du luxe. Ce sweat à capuche en molleton épais, marqué de ses signatures graphiques, est l\'emblème d\'une mode rebelle et hautement créative.',
    description_en: 'The fusion of streetwear and luxury. This thick fleece hoodie, marked with its graphic signatures, is the emblem of a rebellious and highly creative fashion.',
    category: 'mens-clothing',
    images: ['sweat-a-capuche-off-white'],
    reviews: [
      { author: 'Léo', rating: 5, comment: 'Plus qu\'un sweat, c\'est une pièce de designer. Confortable et stylé.'},
    ]
  },
  {
    id: 'prod-42',
    name: 'Essential T-Shirt',
    name_fr: 'T-shirt Essential',
    name_en: 'Essential T-Shirt',
    slug: 't-shirt-essential-fear-of-god',
    price: 120,
    description: 'Die Neudefinition des Basics. Mit seiner lockeren Passform, den überschnittenen Schultern und dem minimalistischen Branding verkörpert dieses T-Shirt einen unaufdringlichen und durchdachten Luxus. Ein moderner Klassiker.',
    description_fr: 'La redéfinition du basique. Avec sa coupe ample, ses épaules tombantes et son branding minimaliste, ce t-shirt incarne un luxe discret et réfléchi. Un classique moderne.',
    description_en: 'The redefinition of the basic. With its loose fit, dropped shoulders, and minimalist branding, this t-shirt embodies a discreet and thoughtful luxury. A modern classic.',
    category: 'mens-clothing',
    images: ['t-shirt-essential-fear-of-god'],
    reviews: [
      { author: 'Noah', rating: 5, comment: 'La coupe est parfaite. Le tissu est lourd et de grande qualité.'},
    ]
  },
  {
    id: 'prod-43',
    name: 'Merino Wool Sweater',
    name_fr: 'Pull Laine Merinos',
    name_en: 'Merino Wool Sweater',
    slug: 'pull-laine-merinos-lacoste',
    price: 145,
    description: 'Die zeitlose Eleganz von Merinowolle. Dieser Pullover bietet unübertroffene Weichheit und natürliche Thermoregulation. Ein Must-Have für eine anspruchsvolle und komfortable Garderobe.',
    description_fr: 'L\'élégance intemporelle de la laine mérinos. Ce pull offre une douceur inégalée et une thermorégulation naturelle. Un indispensable pour une garde-robe sophistiquée et confortable.',
    description_en: 'The timeless elegance of merino wool. This sweater offers unparalleled softness and natural thermoregulation. An essential for a sophisticated and comfortable wardrobe.',
    category: 'mens-clothing',
    images: ['pull-laine-merinos-lacoste'],
    reviews: [
        { author: 'Bastien', rating: 5, comment: 'Doux, chaud et élégant. La qualité Lacoste est au rendez-vous.'}
    ]
  },
  {
    id: 'prod-44',
    name: 'Oversize Shirt',
    name_fr: 'Chemise Oversize',
    name_en: 'Oversize Shirt',
    slug: 'chemise-oversize-balenciaga',
    price: 480,
    description: 'Eine kühne Neuinterpretation der klassischen Hemdbluse. Mit ihrem Oversize-Schnitt und der makellosen Baumwolle ist sie ein starkes Stück, das einen avantgardistischen und trendigen Look schafft.',
    description_fr: 'Une réinterprétation audacieuse de la chemise classique. Avec sa coupe oversize et son coton impeccable, c\'est une pièce forte qui crée un look avant-gardiste et tendance.',
    description_en: 'A bold reinterpretation of the classic shirt. With its oversized cut and impeccable cotton, it\'s a strong piece that creates an avant-garde and trendy look.',
    category: 'mens-clothing',
    images: ['chemise-oversize-balenciaga'],
    reviews: [
        { author: 'Raphael', rating: 5, comment: 'Une coupe incroyable. Très conceptuel, j\'adore.'}
    ]
  },
  {
    id: 'prod-45',
    name: 'Flannel Overshirt',
    name_fr: 'Surchemise Flanelle',
    name_en: 'Flannel Overshirt',
    slug: 'surchemise-flanelle-acne-studios',
    price: 250,
    description: 'Das ideale Layering-Stück. Diese Surchemise aus weicher Flanell bietet Wärme und Stil. Perfekt über einem T-Shirt oder unter einem Mantel für einen modernen und lässigen Look.',
    description_fr: 'La pièce de superposition idéale. Cette surchemise en flanelle douce apporte chaleur et style. Parfaite sur un t-shirt ou sous un manteau pour un look moderne et décontracté.',
    description_en: 'The ideal layering piece. This soft flannel overshirt provides warmth and style. Perfect over a t-shirt or under a coat for a modern and casual look.',
    category: 'mens-clothing',
    images: ['surchemise-flanelle-acne-studios'],
    reviews: [
        { author: 'Theo', rating: 5, comment: 'Très confortable et la qualité est top.'}
    ]
  },
  {
    id: 'prod-46',
    name: 'Cargo Shorts',
    name_fr: 'Short Cargo',
    name_en: 'Cargo Shorts',
    slug: 'short-cargo-stone-island',
    price: 200,
    description: 'Funktionalität trifft auf High-End-Stil. Diese Cargo-Shorts aus technischem Stoff sind sowohl praktisch als auch modisch und verfügen über das ikonische Logo der Marke.',
    description_fr: 'La fonctionnalité rencontre le style haut de gamme. Ce short cargo en tissu technique est à la fois pratique et tendance, arborant le logo iconique de la marque.',
    description_en: 'Functionality meets high-end style. These technical fabric cargo shorts are both practical and trendy, featuring the brand\'s iconic logo.',
    category: 'mens-clothing',
    images: ['short-cargo-stone-island'],
    reviews: [
        { author: 'Enzo', rating: 5, comment: 'Très bien coupé et le tissu est incroyable.'}
    ]
  },
  {
    id: 'prod-47',
    name: 'Urbane Leder-Chelsea-Boots',
    name_fr: 'Bottines Chelsea en cuir Citadin',
    name_en: 'Urban Leather Chelsea Boots',
    slug: 'bottines-chelsea-cuir-citadin',
    price: 360,
    description: 'Die perfekte Verbindung von Tradition und Moderne. Diese Chelsea-Boots aus vollnarbigem Kalbsleder bieten eine schlanke Silhouette und außergewöhnlichen Komfort dank ihrer elastischen Einsätze. Ein Muss für den urbanen Entdecker.',
    description_fr: 'L\'alliance parfaite de la tradition et de la modernité. Ces bottines Chelsea en cuir de veau pleine fleur offrent une silhouette épurée et un confort exceptionnel grâce à leurs empiècements élastiques. Un must-have pour l\'explorateur urbain.',
    description_en: 'The perfect blend of tradition and modernity. These full-grain calfskin Chelsea boots offer a sleek silhouette and exceptional comfort thanks to their elastic gussets. A must-have for the urban explorer.',
    category: 'shoes',
    images: ['bottines-chelsea-cuir-citadin'],
    reviews: [
      { author: 'Alex', rating: 5, comment: 'Très confortables et le cuir est de superbe qualité. Je les porte tous les jours.' },
      { author: 'Luc', rating: 4, comment: 'Elles sont belles, mais demandent un petit temps d\'adaptation.'}
    ]
  },
  {
    id: 'prod-48',
    name: 'Wildlederstiefeletten mit Blockabsatz',
    name_fr: 'Bottines en cuir suédé à talon carré Paris',
    name_en: 'Suede Ankle Boots with Block Heel',
    slug: 'bottines-en-cuir-suede-talon-carre-paris',
    price: 380,
    description: 'Eleganz und Stabilität vereint. Diese Wildlederstiefeletten mit ihrem soliden Blockabsatz garantieren einen sicheren Gang und eine feminine Silhouette. Das weiche Veloursleder verleiht jedem Outfit eine Note von Raffinesse.',
    description_fr: 'L\'élégance et la stabilité réunies. Ces bottines en suède, avec leur talon carré solide, assurent une démarche assurée et une silhouette féminine. La douceur du veau velours ajoute une note de raffinement à chaque tenue.',
    description_en: 'Elegance and stability combined. These suede ankle boots, with their solid block heel, ensure a confident walk and a feminine silhouette. The softness of the suede adds a note of refinement to any outfit.',
    category: 'shoes',
    images: ['bottines-en-cuir-suede-talon-carre-paris'],
    reviews: [
      { author: 'Julia', rating: 4, comment: 'J\'adore le style, mais elles nécessitent d\'être "faites" au début.' },
      { author: 'Alice', rating: 5, comment: 'Parfaites pour le bureau comme pour sortir. Très polyvalentes.'}
    ]
  },
  {
    id: 'prod-49',
    name: 'Perforierte Full-Brogue-Schuhe',
    name_fr: 'Brogues perforées Full-Brogue Tradition',
    name_en: 'Perforated Full-Brogue Shoes',
    slug: 'brogues-perforees-full-brogue-tradition',
    price: 410,
    description: 'Ein zeitloser Klassiker der Herrengarderobe. Diese Full-Brogues aus feinstem Leder sind mit kunstvollen Perforationen verziert, ein Zeugnis traditioneller Handwerkskunst für einen Hauch von anspruchsvoller Eleganz.',
    description_fr: 'Un classique intemporel du vestiaire masculin. Ces souliers full-brogue en cuir fin sont ornés de perforations artistiques, témoignage d\'un savoir-faire traditionnel pour une touche de sophistication distinguée.',
    description_en: 'A timeless classic of the men\'s wardrobe. These full-brogue shoes in fine leather are adorned with artistic perforations, a testament to traditional craftsmanship for a touch of distinguished sophistication.',
    category: 'shoes',
    images: ['brogues-perforees-full-brogue-tradition'],
    reviews: [
      { author: 'Guillaume', rating: 5, comment: 'Une qualité de fabrication irréprochable. De vrais souliers de gentleman.' }
    ]
  },
  {
    id: 'prod-50',
    name: 'Chunky-Derby-Schuhe mit Plateausohle',
    name_fr: 'Derby chunky à plateforme Street-Luxe',
    name_en: 'Chunky Platform Derby Shoes',
    slug: 'derby-chunky-platform-street-luxe',
    price: 490,
    description: 'Ein kühnes Statement für den modebewussten Mann. Diese Derby-Schuhe kombinieren ein klassisches Obermaterial aus poliertem Leder mit einer imposanten Plateausohle und schaffen so eine avantgardistische Fusion aus Streetwear und Luxus.',
    description_fr: 'Une déclaration audacieuse pour l\'homme à la pointe de la mode. Ces derbies fusionnent une tige classique en cuir poli avec une semelle plateforme imposante, créant une fusion avant-gardiste entre streetwear et luxe.',
    description_en: 'A bold statement for the fashion-forward man. These derbies merge a classic polished leather upper with an imposing platform sole, creating an avant-garde fusion of streetwear and luxury.',
    category: 'shoes',
    images: ['derby-chunky-platform-street-luxe'],
    reviews: [
      { author: 'Leo', rating: 5, comment: 'Style unique, elles font vraiment leur effet.' },
      { author: 'Maxime', rating: 5, comment: 'Surprenant au début, mais incroyablement confortables.'}
    ]
  },
  {
    id: 'prod-51',
    name: 'Elite Derby-Schuhe aus genarbtem Leder',
    name_fr: 'Derby en cuir grainé Élite',
    name_en: 'Elite Grained Leather Derby Shoes',
    slug: 'derby-cuir-graine-elite',
    price: 440,
    description: 'Robustheit trifft auf Raffinesse. Gefertigt aus hochwertigem genarbtem Leder, bietet dieser Derby-Schuh eine reiche Textur und außergewöhnliche Langlebigkeit. Ein Grundpfeiler für die Garderobe des anspruchsvollen Mannes.',
    description_fr: 'Quand la robustesse rencontre le raffinement. Fabriqué dans un cuir grainé de première qualité, ce derby offre une texture riche et une durabilité exceptionnelle. Un pilier de la garde-robe de l\'homme exigeant.',
    description_en: 'When robustness meets refinement. Crafted from premium grained leather, this derby offers a rich texture and exceptional durability. A pillar of the discerning man\'s wardrobe.',
    category: 'shoes',
    images: ['derby-cuir-graine-elite'],
    reviews: [
      { author: 'Sébastien', rating: 5, comment: 'Le cuir grainé est magnifique et la chaussure est très solide.' }
    ]
  },
  {
    id: 'prod-52',
    name: 'Lackleder-Pumps mit 9 cm Absatz',
    name_fr: 'Escarpins en cuir verni talon 9 cm Éclipse',
    name_en: 'Patent Leather Pumps with 9cm Heel',
    slug: 'escarpins-cuir-verni-talon-9-cm-eclipse',
    price: 390,
    description: 'Der Inbegriff weiblicher Eleganz. Diese Pumps aus glänzendem Lackleder verlängern die Silhouette mit ihrem 9 cm hohen Stilettoabsatz. Ein Symbol für Glamour und Selbstvertrauen für jeden besonderen Anlass.',
    description_fr: 'La quintessence de l\'élégance féminine. Ces escarpins en cuir verni brillant allongent la silhouette avec leur talon aiguille de 9 cm. Un symbole de glamour et de confiance pour toute occasion spéciale.',
    description_en: 'The epitome of feminine elegance. These glossy patent leather pumps elongate the silhouette with their 9 cm stiletto heel. A symbol of glamour and confidence for any special occasion.',
    category: 'shoes',
    images: ['escarpins-cuir-verni-talon-9-cm-eclipse'],
    reviews: [
      { author: 'Charlotte', rating: 5, comment: 'La cambrure est parfaite. Elles sont sublimes.' }
    ]
  },
  {
    id: 'prod-53',
    name: 'Wildleder-Loafer mit Quasten',
    name_fr: 'Mocassin à pampilles en suède Club',
    name_en: 'Suede Tassel Loafers',
    slug: 'mocassin-tasseled-suede-club',
    price: 330,
    description: 'Eine lässig-schicke Ästhetik. Diese Loafer aus weichem Wildleder sind mit eleganten Quasten verziert und verkörpern einen mühelosen Preppy-Stil. Ideal für einen eleganten Look am Wochenende oder im Büro.',
    description_fr: 'Une esthétique casual-chic. Ces mocassins en suède souple, agrémentés d\'élégantes pampilles, incarnent un style preppy sans effort. Idéal pour une allure élégante le week-end ou au bureau.',
    description_en: 'A casual-chic aesthetic. These soft suede loafers, embellished with elegant tassels, embody an effortless preppy style. Ideal for an elegant look on the weekend or at the office.',
    category: 'shoes',
    images: ['mocassin-tasseled-suede-club'],
    reviews: [
      { author: 'Arthur', rating: 4, comment: 'Très beaux, mais un peu fragiles sous la pluie.' }
    ]
  },
  {
    id: 'prod-54',
    name: 'Satin-Mules mit skulpturalem Absatz',
    name_fr: 'Mules en satin à talon sculpté Diva',
    name_en: 'Satin Mules with Sculpted Heel',
    slug: 'mules-satin-talon-sculpte-diva',
    price: 420,
    description: 'Ein wahres Fußschmuckstück. Diese Mules aus leuchtendem Satin fallen durch ihren einzigartigen, kunstvoll skulpturierten Absatz auf. Sie sind die Garantie für einen unvergesslichen und raffinierten Auftritt.',
    description_fr: 'Véritable bijou de pied. Ces mules en satin lumineux se distinguent par leur talon sculptural unique et artistique. La garantie d\'une entrée remarquée et sophistiquée.',
    description_en: 'A true foot jewel. These luminous satin mules are distinguished by their unique and artistic sculptural heel. The guarantee of a remarkable and sophisticated entrance.',
    category: 'shoes',
    images: ['mules-satin-talon-sculpte-diva'],
    reviews: [
      { author: 'Nina', rating: 5, comment: 'Spectaculaires ! Une véritable œuvre d\'art à mes pieds.' },
      { author: 'Laura', rating: 5, comment: 'Étonnamment confortables pour des chaussures aussi design.'}
    ]
  },
  {
    id: 'prod-55',
    name: 'Handgenähte Oxford-Schuhe aus patiniertem Leder',
    name_fr: 'Richelieu cousu main en cuir patiné Souverain',
    name_en: 'Hand-Stitched Patinated Leather Oxfords',
    slug: 'richelieu-cousu-main-cuir-patine-souverain',
    price: 620,
    description: 'Die Krönung der Schuhmacherkunst. Diese handgenähten Oxford-Schuhe aus sorgfältig patiniertem Leder bieten eine einzigartige Tiefe und unvergleichliche Farbnuancen. Für den Kenner, der das Außergewöhnliche sucht.',
    description_fr: 'Le summum de l\'art bottier. Ce richelieu cousu main, réalisé dans un cuir méticuleusement patiné, offre une profondeur et des nuances de couleur inégalées. Pour le connaisseur qui recherche l\'exception.',
    description_en: 'The pinnacle of shoemaking art. This hand-stitched oxford, made from meticulously patinated leather, offers unparalleled depth and shades of color. For the connoisseur who seeks the exceptional.',
    category: 'shoes',
    images: ['richelieu-cousu-main-cuir-patine-souverain'],
    reviews: [
      { author: 'Édouard', rating: 5, comment: 'La patine est magnifique. Des chaussures d\'exception.' }
    ]
  },
  {
    id: 'prod-56',
    name: 'Sandalen mit Knöchelriemen aus Leder',
    name_fr: 'Sandales à bride cheville en cuir Sérénité',
    name_en: 'Leather Ankle Strap Sandals',
    slug: 'sandales-a-bride-cheville-en-cuir-serenite',
    price: 310,
    description: 'Die Essenz sommerlicher Schlichtheit. Diese minimalistischen Sandalen zeichnen sich durch einen feinen Lederriemen aus, der den Knöchel elegant umschließt. Ein Symbol für mühelose Eleganz an sonnigen Tagen.',
    description_fr: 'L\'essence de la simplicité estivale. Ces sandales minimalistes se caractérisent par une fine bride en cuir qui enlace délicatement la cheville. Un symbole d\'élégance sans effort pour les jours ensoleillés.',
    description_en: 'The essence of summer simplicity. These minimalist sandals are characterized by a thin leather strap that delicately wraps around the ankle. A symbol of effortless elegance for sunny days.',
    category: 'shoes',
    images: ['sandales-a-bride-cheville-en-cuir-serenite'],
    reviews: [
      { author: 'Chloé', rating: 5, comment: 'Élégantes, simples et confortables. Parfaites pour l\'été.' }
    ]
  },
  {
    id: 'prod-57',
    name: 'Luxus-Sneakers aus Nubukleder',
    name_fr: 'Sneakers de luxe en cuir nubuck Runway',
    name_en: 'Luxury Nubuck Leather Sneakers',
    slug: 'sneakers-luxe-cuir-nubuck-runway',
    price: 520,
    description: 'Überschreiten Sie die Grenzen zwischen lässig und luxuriös. Diese Sneakers sind aus samtigem Nubukleder gefertigt und auf einer maßgefertigten Sohle montiert, die Komfort und High-Fashion-Stil vereint.',
    description_fr: 'Transcendez les frontières entre le décontracté et le luxe. Ces sneakers sont fabriquées en cuir nubuck velouté et montées sur une semelle designée sur mesure, alliant confort et style haute-couture.',
    description_en: 'Transcend the boundaries between casual and luxury. These sneakers are made of velvety nubuck leather and mounted on a custom-designed sole, combining comfort and high-fashion style.',
    category: 'shoes',
    images: ['sneakers-luxe-cuir-nubuck-runway'],
    reviews: [
      { author: 'Tom', rating: 5, comment: 'Aussi confortables que stylées. Le nubuck est très doux.' },
      { author: 'Lucas', rating: 5, comment: 'Un luxe discret et moderne. J\'adore.'}
    ]
  },
  {
    id: 'prod-58',
    name: 'Lightweight Down Jacket',
    name_fr: 'Doudoune Légère',
    name_en: 'Lightweight Down Jacket',
    slug: 'doudoune-legere-canada-goose',
    price: 600,
    description: 'Essentielle Wärme ohne das Volumen. Diese leichte Daunenjacke bietet außergewöhnliche Isolierung in einem schlanken, vielseitigen Paket. Ideal für Reisen oder als Schicht an kühleren Tagen.',
    description_fr: 'La chaleur essentielle sans l\'encombrement. Cette doudoune légère offre une isolation exceptionnelle dans un format fin et polyvalent. Idéale pour le voyage ou comme couche intermédiaire les jours plus frais.',
    description_en: 'Essential warmth without the bulk. This lightweight down jacket offers exceptional insulation in a slim, versatile package. Ideal for travel or as a layer on cooler days.',
    category: 'mens-clothing',
    images: ['doudoune-legere-canada-goose'],
    reviews: [
        { author: 'Adam', rating: 5, comment: 'Incroyablement légère et chaude. Parfaite pour la mi-saison.'}
    ]
  },
  {
    id: 'prod-59',
    name: 'Expedition Parka',
    name_fr: 'Parka d\'Expédition',
    name_en: 'Expedition Parka',
    slug: 'parka-expedition-the-north-face-black-series',
    price: 1050,
    description: 'Ultimativer Schutz vor den Elementen. Dieser Parka aus der Black Series ist für extreme Bedingungen konzipiert und kombiniert modernste technische Materialien mit einem urbanen, anspruchsvollen Design.',
    description_fr: 'La protection ultime contre les éléments. Conçue pour les conditions extrêmes, cette parka de la Black Series allie des matériaux techniques de pointe à un design urbain et sophistiqué.',
    description_en: 'Ultimate protection against the elements. Designed for extreme conditions, this Black Series parka combines cutting-edge technical materials with an urban, sophisticated design.',
    category: 'mens-clothing',
    images: ['parka-expedition-the-north-face-black-series'],
    reviews: [
        { author: 'Xavier', rating: 5, comment: 'Un véritable bouclier contre le froid. Chaque détail est pensé.'}
    ]
  },
  {
    id: 'prod-60',
    name: 'Cashmere Zip Cardigan',
    name_fr: 'Cardigan Zippé Cachemire',
    name_en: 'Cashmere Zip Cardigan',
    slug: 'cardigan-zippe-cachemire-brunello-cucinelli',
    price: 1280,
    description: 'Der lässige Luxus in seiner reinsten Form. Dieser Cardigan mit Reißverschluss aus reinem Kaschmir ist unglaublich weich und vielseitig und kann allein oder als Schicht getragen werden.',
    description_fr: 'Le luxe décontracté à son paroxysme. Ce cardigan zippé en pur cachemire est d\'une douceur et d\'une polyvalence inégalées, à porter seul ou en superposition.',
    description_en: 'Casual luxury at its finest. This pure cashmere zip-up cardigan is incredibly soft and versatile, to be worn alone or as a layer.',
    category: 'mens-clothing',
    images: ['cardigan-zippe-cachemire-brunello-cucinelli'],
    reviews: [
        { author: 'Gaspard', rating: 5, comment: 'Une pièce d\'une qualité exceptionnelle. Le prix est justifié.'}
    ]
  },
  {
    id: 'prod-61',
    name: 'Long Wool Coat',
    name_fr: 'Manteau Long en Laine',
    name_en: 'Long Wool Coat',
    slug: 'manteau-long-laine-max-mara-homme',
    price: 1200,
    description: 'Eine imposante und zeitlose Silhouette. Dieser lange Mantel aus reiner Schurwolle bietet eine elegante Struktur und eine unvergleichliche Wärme für einen makellosen Winterstil.',
    description_fr: 'Une silhouette imposante et intemporelle. Ce long manteau en pure laine vierge offre une structure élégante et une chaleur inégalée pour un style hivernal impeccable.',
    description_en: 'An imposing and timeless silhouette. This long coat in pure virgin wool offers an elegant structure and unparalleled warmth for an impeccable winter style.',
    category: 'mens-clothing',
    images: ['manteau-long-laine-max-mara-homme'],
    reviews: [
        { author: 'Augustin', rating: 5, comment: 'La coupe est majestueuse. Un manteau pour la vie.'}
    ]
  },
  {
    id: 'prod-62',
    name: 'Denim Jacket',
    name_fr: 'Veste en Jean',
    name_en: 'Denim Jacket',
    slug: 'veste-denim-levis-made-crafted',
    price: 220,
    description: 'Die Ikone der amerikanischen Garderobe, neu interpretiert. Diese Jacke aus hochwertigem Denim ist eine Hommage an das Erbe von Levi\'s mit einer modernen Passform und hochwertigen Oberflächen.',
    description_fr: 'L\'icône du vestiaire américain, réinventée. Cette veste en denim de première qualité rend hommage à l\'héritage Levi\'s avec une coupe moderne et des finitions haut de gamme.',
    description_en: 'The icon of the American wardrobe, reinvented. This premium denim jacket pays homage to the Levi\'s heritage with a modern cut and high-end finishes.',
    category: 'mens-clothing',
    images: ['veste-denim-levis-made-crafted'],
    reviews: [
        { author: 'Oscar', rating: 5, comment: 'Une veste en jean parfaite. Ni trop large, ni trop serrée.'}
    ]
  },
  {
    id: 'prod-63',
    name: 'Tailored Trousers',
    name_fr: 'Pantalon de Costume',
    name_en: 'Tailored Trousers',
    slug: 'pantalon-tailleur-dior-homme',
    price: 560,
    description: 'Die Essenz der Schneiderkunst. Diese Hose mit perfektem Fall und makellosem Schnitt ist das Fundament einer eleganten Garderobe, die sowohl im Büro als auch bei formellen Anlässen getragen werden kann.',
    description_fr: 'L\'essence du savoir-faire tailleur. Ce pantalon au tombé parfait et à la coupe impeccable est le fondement d\'une garde-robe élégante, à porter au bureau comme lors d\'événements formels.',
    description_en: 'The essence of tailoring expertise. These trousers with a perfect drape and impeccable cut are the foundation of an elegant wardrobe, to be worn at the office as well as at formal events.',
    category: 'mens-clothing',
    images: ['pantalon-tailleur-dior-homme'],
    reviews: [
        { author: 'Victor', rating: 5, comment: 'La coupe est absolument parfaite.'}
    ]
  },
  {
    id: 'prod-64',
    name: 'Printed Hoodie',
    name_fr: 'Hoodie Imprimé',
    name_en: 'Printed Hoodie',
    slug: 'hoodie-imprime-palm-angels',
    price: 380,
    description: 'Der Geist Kaliforniens in einem Hoodie. Mit seinem kühnen Druck und dem lässigen Schnitt verkörpert dieses Stück den coolen und luxuriösen Geist von Palm Angels.',
    description_fr: 'L\'esprit de la Californie dans un hoodie. Avec son imprimé audacieux et sa coupe décontractée, cette pièce incarne l\'esprit cool et luxueux de Palm Angels.',
    description_en: 'The spirit of California in a hoodie. With its bold print and relaxed fit, this piece embodies the cool and luxurious spirit of Palm Angels.',
    category: 'mens-clothing',
    images: ['hoodie-imprime-palm-angels'],
    reviews: [
        { author: 'Samuel', rating: 5, comment: 'Très stylé, l\'imprimé est de super qualité.'}
    ]
  },
  {
    id: 'prod-65',
    name: 'Quilted Jacket',
    name_fr: 'Veste Matelassée',
    name_en: 'Quilted Jacket',
    slug: 'veste-matelassee-barbour-international',
    price: 280,
    description: 'Die britische Eleganz in einer Outdoor-Version. Diese gesteppte Jacke ist leicht, warm und unglaublich vielseitig und ideal für einen Ausflug aufs Land oder einen Spaziergang in der Stadt.',
    description_fr: 'L\'élégance britannique en version outdoor. Cette veste matelassée est légère, chaude et incroyablement polyvalente, idéale pour une escapade à la campagne ou une balade en ville.',
    description_en: 'British elegance in an outdoor version. This quilted jacket is lightweight, warm, and incredibly versatile, ideal for a countryside getaway or a city stroll.',
    category: 'mens-clothing',
    images: ['veste-matelassee-barbour-international'],
    reviews: [
        { author: 'Louis', rating: 5, comment: 'Un classique. Toujours élégant et très pratique.'}
    ]
  },
  {
    id: 'prod-66',
    name: 'Cable-Knit Sweater',
    name_fr: 'Pull Torsadé',
    name_en: 'Cable-Knit Sweater',
    slug: 'pull-torsade-paul-smith',
    price: 240,
    description: 'Ein zeitloser Klassiker neu interpretiert. Dieser Pullover mit Zopfmuster ist aus weicher Wolle gefertigt und verfügt über die für Paul Smith typischen subtilen Farbakzente.',
    description_fr: 'Un classique intemporel revisité. Ce pull à torsades est confectionné dans une laine douce et présente les touches de couleur subtiles signatures de Paul Smith.',
    description_en: 'A timeless classic revisited. This cable-knit sweater is made of soft wool and features the subtle color touches signature of Paul Smith.',
    category: 'mens-clothing',
    images: ['pull-torsade-paul-smith'],
    reviews: [
        { author: 'Adrien', rating: 5, comment: 'Très beau pull, la petite touche de couleur fait toute la différence.'}
    ]
  },
  {
    id: 'prod-67',
    name: 'Logo T-Shirt',
    name_fr: 'T-shirt Logo',
    name_en: 'Logo T-Shirt',
    slug: 't-shirt-logo-givenchy',
    price: 310,
    description: 'Ein starkes Statement. Dieses T-Shirt mit dem ikonischen Givenchy-Logo ist ein Muss für Liebhaber des urbanen Luxus, das einen einfachen Look sofort aufwertet.',
    description_fr: 'Une affirmation de style forte. Ce t-shirt arborant le logo iconique de Givenchy est un must-have pour les amateurs de luxe urbain, rehaussant instantanément un look simple.',
    description_en: 'A strong style statement. This t-shirt featuring the iconic Givenchy logo is a must-have for lovers of urban luxury, instantly elevating a simple look.',
    category: 'mens-clothing',
    images: ['t-shirt-logo-givenchy'],
    reviews: [
        { author: 'Mehdi', rating: 5, comment: 'Le logo est imposant mais classe. Tissu de grande qualité.'}
    ]
  },
  {
    id: 'prod-68',
    name: 'Luxury Tracksuit',
    name_fr: 'Survêtement de Luxe',
    name_en: 'Luxury Tracksuit',
    slug: 'survetement-luxe-adidas-gucci',
    price: 1450,
    description: 'Die ultimative Fusion von Sport und Luxus. Diese Zusammenarbeit zwischen Adidas und Gucci definiert den Trainingsanzug mit hochwertigen Stoffen und einem kühnen Co-Branding neu.',
    description_fr: 'La fusion ultime du sport et du luxe. Cette collaboration entre Adidas et Gucci redéfinit le survêtement avec des tissus nobles et un co-branding audacieux.',
    description_en: 'The ultimate fusion of sport and luxury. This collaboration between Adidas and Gucci redefines the tracksuit with noble fabrics and bold co-branding.',
    category: 'mens-clothing',
    images: ['survetement-luxe-adidas-gucci'],
    reviews: [
        { author: 'Kevin', rating: 5, comment: 'Une pièce de collection. Incroyable.'}
    ]
  },
  {
    id: 'prod-69',
    name: 'Technical Jacket',
    name_fr: 'Veste Technique',
    name_en: 'Technical Jacket',
    slug: 'veste-technique-nike-acg',
    price: 360,
    description: 'Für den urbanen Entdecker. Diese Jacke aus der ACG-Linie von Nike ist für alle Bedingungen konzipiert und kombiniert technische Leistung mit einem scharfen Street-Design.',
    description_fr: 'Pour l\'explorateur urbain. Conçue pour toutes les conditions, cette veste de la ligne ACG de Nike allie performance technique et design street affûté.',
    description_en: 'For the urban explorer. Designed for all conditions, this jacket from Nike\'s ACG line combines technical performance with a sharp street design.',
    category: 'mens-clothing',
    images: ['veste-technique-nike-acg'],
    reviews: [
        { author: 'Sami', rating: 5, comment: 'Parfaite pour la ville quand il pleut. Très bien pensée.'}
    ]
  },
  {
    id: 'prod-70',
    name: 'Sleeveless Vest',
    name_fr: 'Gilet Sans Manches',
    name_en: 'Sleeveless Vest',
    slug: 'gilet-sans-manches-prada',
    price: 760,
    description: 'Eine schicke und funktionale Schicht. Diese ärmellose Weste aus dem ikonischen Nylon von Prada verleiht jedem Outfit einen Hauch von modernem und anspruchsvollem Luxus.',
    description_fr: 'Une couche chic et fonctionnelle. Ce gilet sans manches, en nylon iconique de Prada, ajoute une touche de luxe moderne et sophistiqué à n\'importe quelle tenue.',
    description_en: 'A chic and functional layer. This sleeveless vest, in Prada\'s iconic nylon, adds a touch of modern and sophisticated luxury to any outfit.',
    category: 'mens-clothing',
    images: ['gilet-sans-manches-prada'],
    reviews: [
        { author: 'David', rating: 5, comment: 'Très polyvalent. Je le porte sur une chemise ou sous un manteau.'}
    ]
  },
  {
    id: 'acc-1',
    name: 'Chrono Luxe Uhr',
    name_fr: 'Montre Chrono Luxe',
    name_en: 'Chrono Luxe Watch',
    slug: 'montre-acier-inoxydable-noire-chrono-luxe',
    price: 360,
    description: 'Eine kühne Ästhetik für das Handgelenk. Diese Chronographenuhr aus mattschwarzem Edelstahl ist ein Symbol für moderne Raffinesse. Sie vereint anspruchsvolle Funktionalität mit einem entschieden urbanen und kraftvollen Design.',
    description_fr: 'Une esthétique audacieuse pour le poignet. Cette montre chronographe en acier inoxydable noir mat est un symbole de sophistication moderne. Elle allie une fonctionnalité pointue à un design résolument urbain et puissant.',
    description_en: 'A bold aesthetic for the wrist. This matte black stainless steel chronograph watch is a symbol of modern sophistication. It combines sharp functionality with a resolutely urban and powerful design.',
    category: 'accessories',
    images: ['montre-acier-inoxydable-noire-chrono-luxe'],
    reviews: [
        { author: 'Marc', rating: 5, comment: 'Superbe montre, très classe et agréable à porter.' },
        { author: 'David', rating: 5, comment: 'Le noir mat est magnifique. Elle ne quitte plus mon poignet.'}
    ]
  },
  {
    id: 'acc-2',
    name: 'Hydrosport Sportuhr',
    name_fr: 'Montre sport Hydrosport',
    name_en: 'Hydrosport Sports Watch',
    slug: 'montre-sport-silicone-hydrosport-5-atm',
    price: 200,
    description: 'Der ideale Begleiter für den modernen Abenteurer. Mit ihrem widerstandsfähigen Silikonarmband und einer Wasserdichtigkeit von 5 ATM ist diese Uhr für jede Herausforderung bereit, ohne jemals auf Stil zu verzichten.',
    description_fr: 'Le compagnon idéal de l\'aventurier moderne. Avec son bracelet en silicone résistant et son étanchéité à 5 ATM, cette montre est conçue pour affronter tous les défis sans jamais sacrifier le style.',
    description_en: 'The ideal companion for the modern adventurer. With its durable silicone strap and 5 ATM water resistance, this watch is designed to tackle any challenge without ever sacrificing style.',
    category: 'accessories',
    images: ['montre-sport-silicone-hydrosport-5-atm'],
    reviews: [
        { author: 'Kevin', rating: 5, comment: 'Robuste et stylée, parfaite pour mes activités sportives.'}
    ]
  },
  {
    id: 'acc-3',
    name: 'Heritage Classic Uhr',
    name_fr: 'Montre Heritage Classique',
    name_en: 'Heritage Classic Watch',
    slug: 'montre-cuir-brun-heritage-classique',
    price: 300,
    description: 'Eine Hommage an die zeitlose Uhrmacherkunst. Diese Uhr mit ihrem braunen Lederarmband, das mit der Zeit eine wunderschöne Patina entwickelt, und ihrem minimalistischen Zifferblatt verkörpert eine unaufdringliche und ewige Eleganz.',
    description_fr: 'Un hommage à l\'horlogerie intemporelle. Cette montre, avec son bracelet en cuir brun qui se patinera superbement avec le temps et son cadran épuré, incarne une élégance discrète et éternelle.',
    description_en: 'A tribute to timeless watchmaking. This watch, with its brown leather strap that will develop a beautiful patina over time and its minimalist dial, embodies a discreet and eternal elegance.',
    category: 'accessories',
    images: ['montre-cuir-brun-heritage-classique'],
    reviews: [
        { author: 'Jean', rating: 5, comment: 'Magnifique et très agréable à porter. Un classique.' },
        { author: 'Pierre', rating: 5, comment: 'Le cuir est de très belle qualité.'}
    ]
  },
  {
    id: 'acc-4',
    name: 'Blue Vision Uhr',
    name_fr: 'Montre Blue Vision',
    name_en: 'Blue Vision Watch',
    slug: 'montre-metallique-argent-blue-vision',
    price: 250,
    description: 'Fesseln Sie die Blicke mit dem tiefblauen Zifferblatt dieser Uhr, das an einen mitternächtlichen Himmel erinnert. Eingefasst in poliertes silbernes Metall, ist sie ein Schmuckstück von moderner und fesselnder Eleganz.',
    description_fr: 'Capturez les regards avec le cadran bleu profond de cette montre, évoquant un ciel de minuit. Enchâssée dans un métal argenté poli, c\'est un bijou d\'une élégance moderne et captivante.',
    description_en: 'Capture gazes with the deep blue dial of this watch, reminiscent of a midnight sky. Encased in polished silver metal, it is a jewel of modern and captivating elegance.',
    category: 'accessories',
    images: ['montre-metallique-argent-blue-vision'],
    reviews: [
        { author: 'Daniel', rating: 5, comment: 'Le cadran bleu est tout simplement hypnotique.'}
    ]
  },
  {
    id: 'acc-5',
    name: 'Urban Tech Digitaluhr',
    name_fr: 'Montre digitale Urban Tech',
    name_en: 'Urban Tech Digital Watch',
    slug: 'montre-digitale-led-urban-tech',
    price: 140,
    description: 'Ein Konzentrat aus Technologie und Stil. Diese digitale Uhr mit ihrem klaren LED-Display und minimalistischem Design ist das perfekte Accessoire für einen Look, der entschieden in der Zukunft verankert ist.',
    description_fr: 'Un concentré de technologie et de style. Cette montre digitale, avec son affichage LED clair et son design minimaliste, est l\'accessoire parfait pour un look résolument ancré dans le futur.',
    description_en: 'A concentrate of technology and style. This digital watch, with its clear LED display and minimalist design, is the perfect accessory for a look resolutely anchored in the future.',
    category: 'accessories',
    images: ['montre-digitale-led-urban-tech'],
    reviews: [
        { author: 'Simon', rating: 4, comment: 'Design sympa et futuriste. Très légère.'}
    ]
  },
  {
    id: 'acc-6',
    name: 'Executive Elite Uhr',
    name_fr: 'Montre Executive Elite',
    name_en: 'Executive Elite Watch',
    slug: 'montre-cadran-or-rose-executive-elite',
    price: 440,
    description: 'Für den Mann, der an der Spitze steht. Die sanften und warmen Töne des Roségold-Zifferblatts verleihen dieser prestigeträchtigen Uhr eine moderne und anspruchsvolle Note. Ein Symbol für Erfolg und raffinierten Geschmack.',
    description_fr: 'Pour l\'homme qui est au sommet. Les tons doux et chauds du cadran en or rose confèrent à cette montre de prestige une touche de modernité et d\'exigence. Un symbole de réussite et de goût raffiné.',
    description_en: 'For the man at the top. The soft and warm tones of the rose gold dial give this prestigious watch a touch of modernity and sophistication. A symbol of success and refined taste.',
    category: 'accessories',
    images: ['montre-cadran-or-rose-executive-elite'],
    reviews: [
        { author: 'Charles', rating: 5, comment: 'Une montre qui impose le respect. Finitions impeccables.'}
    ]
  },
  {
    id: 'acc-7',
    name: 'Titan Steel Pro Chronograph',
    name_fr: 'Chronographe Titan Steel Pro',
    name_en: 'Titan Steel Pro Chronograph',
    slug: 'montre-chronographe-titan-steel-pro',
    price: 490,
    description: 'Gebaut für die Ewigkeit. Dieser Chronograph aus ultraleichtem und widerstandsfähigem Titan ist ein Konzentrat aus Leistung und Präzision. Sein technisches Design und seine Robustheit machen ihn zum Werkzeug für kompromisslose Männer.',
    description_fr: 'Conçu pour durer. Ce chronographe en titane, ultra-léger et résistant, est un concentré de performance et de précision. Son design technique et sa robustesse en font l\'outil des hommes sans compromis.',
    description_en: 'Built to last. This ultra-light and resistant titanium chronograph is a concentrate of performance and precision. Its technical design and robustness make it the tool for uncompromising men.',
    category: 'accessories',
    images: ['montre-chronographe-titan-steel-pro'],
    reviews: [
      { author: 'Olivier', rating: 5, comment: 'Légère, robuste et très précise. Une montre d\'exception.'}
    ]
  },
  {
    id: 'acc-8',
    name: 'Nordic Luxe Wollmütze',
    name_fr: 'Bonnet en laine Nordic Luxe',
    name_en: 'Nordic Luxe Wool Beanie',
    slug: 'bonnet-laine-torsadee-noir-nordic-luxe',
    price: 60,
    description: 'Wärme und Textur für Ihre Wintertage. Diese Mütze aus reiner Wolle mit Zopfstrickmuster bietet einen schicken und gemütlichen Stil. Ein unverzichtbares Accessoire, um der Kälte mit nordischer Eleganz zu trotzen.',
    description_fr: 'De la chaleur et de la texture pour vos journées d\'hiver. Ce bonnet en pure laine, au tricot torsadé, offre un style chic et douillet. Un accessoire indispensable pour affronter le froid avec une élégance nordique.',
    description_en: 'Warmth and texture for your winter days. This pure wool beanie with a cable knit pattern offers a chic and cozy style. An essential accessory to face the cold with Nordic elegance.',
    category: 'winter-clothing',
    images: ['bonnet-laine-torsadee-noir-nordic-luxe'],
    reviews: [
        { author: 'Elsa', rating: 5, comment: 'Très chaud et la laine ne gratte pas. J\'adore !'}
    ]
  },
  {
    id: 'acc-9',
    name: 'Winter Essential Mütze',
    name_fr: 'Bonnet Winter Essential',
    name_en: 'Winter Essential Beanie',
    slug: 'bonnet-epais-gris-winter-essential',
    price: 50,
    description: 'Schlichtheit und Funktionalität. Diese dicke Mütze in neutralem Grau ist das unverzichtbare Accessoire, das sich leicht mit all Ihren Wintermänteln kombinieren lässt, um stilvoll warm zu bleiben.',
    description_fr: 'La simplicité et l\'efficacité. Ce bonnet épais d\'un gris neutre est l\'accessoire essentiel qui s\'associe facilement à tous vos manteaux d\'hiver pour rester au chaud avec style.',
    description_en: 'Simplicity and efficiency. This thick, neutral grey beanie is the essential accessory that easily pairs with all your winter coats to stay warm in style.',
    category: 'winter-clothing',
    images: ['bonnet-epais-gris-winter-essential'],
    reviews: [
        { author: 'Martin', rating: 5, comment: 'Simple, chaud, efficace. Exactement ce que je cherchais.'}
    ]
  },
  {
    id: 'acc-10',
    name: 'Alpine Soft Schal',
    name_fr: 'Écharpe Alpine Soft',
    name_en: 'Alpine Soft Scarf',
    slug: 'echarpe-laine-vierge-premium-alpine-soft',
    price: 120,
    description: 'Hüllen Sie sich in einen Kokon aus Weichheit. Dieser Schal aus reiner Schurwolle bietet eine unvergleichliche Wärme und ein Gefühl von zartem Luxus auf der Haut. Das perfekte Accessoire für die kältesten Tage.',
    description_fr: 'Enveloppez-vous dans un cocon de douceur. Cette écharpe en pure laine vierge offre une chaleur inégalée et une sensation de luxe délicat contre la peau. L\'accessoire parfait pour les jours les plus froids.',
    description_en: 'Wrap yourself in a cocoon of softness. This pure virgin wool scarf offers unparalleled warmth and a feeling of delicate luxury against the skin. The perfect accessory for the coldest days.',
    category: 'winter-clothing',
    images: ['echarpe-laine-vierge-premium-alpine-soft'],
    reviews: [
        { author: 'Isabelle', rating: 5, comment: 'Une douceur incroyable, c\'est comme un câlin.'}
    ]
  },
  {
    id: 'acc-11',
    name: 'Winter Shield Snood',
    name_fr: 'Snood Winter Shield',
    name_en: 'Winter Shield Snood',
    slug: 'snood-polaire-winter-shield-premium',
    price: 55,
    description: 'Eine moderne und praktische Alternative zum Schal. Dieser Fleece-Snood bietet optimalen Schutz vor Wind und Kälte und bewahrt dabei einen klaren und urbanen Stil. Perfekt für Ihre Outdoor-Aktivitäten.',
    description_fr: 'Une alternative moderne et pratique à l\'écharpe. Ce snood en polaire offre une protection optimale contre le vent et le froid, tout en conservant un style épuré et urbain. Parfait pour vos activités extérieures.',
    description_en: 'A modern and practical alternative to the scarf. This fleece snood offers optimal protection against wind and cold, while maintaining a clean and urban style. Perfect for your outdoor activities.',
    category: 'winter-clothing',
    images: ['snood-polaire-winter-shield-premium'],
    reviews: [
        { author: 'Romain', rating: 5, comment: 'Très pratique et bien plus chaud que je ne le pensais.'}
    ]
  },
  {
    id: 'acc-12',
    name: 'Urban Knit Mütze',
    name_fr: 'Bonnet Urban Knit',
    name_en: 'Urban Knit Beanie',
    slug: 'bonnet-streetwear-a-revers-urban-knit',
    price: 45,
    description: 'Das Markenzeichen des urbanen Stils. Diese Mütze mit ihrem charakteristischen Umschlag ist das unverzichtbare Accessoire, um jedem lässigen Outfit einen trendigen und modernen Streetwear-Touch zu verleihen.',
    description_fr: 'La marque de fabrique du style urbain. Ce bonnet à revers caractéristique est l\'accessoire indispensable pour ajouter une touche streetwear tendance et moderne à n\'importe quelle tenue décontractée.',
    description_en: 'The hallmark of urban style. This cuffed beanie is the essential accessory to add a trendy and modern streetwear touch to any casual outfit.',
    category: 'accessories',
    images: ['bonnet-streetwear-a-revers-urban-knit'],
    reviews: [
        { author: 'Dylan', rating: 5, comment: 'Style parfait, je le porte tout le temps.'}
    ]
  },
  {
    id: 'acc-13',
    name: 'Tech Gloves',
    name_fr: 'Gants Tech Gloves',
    name_en: 'Tech Gloves',
    slug: 'gants-tactiles-thermiques-tech-gloves',
    price: 75,
    description: 'Kombinieren Sie Wärme und Konnektivität. Diese Thermohandschuhe sind mit einer speziellen Technologie ausgestattet, mit der Sie Ihre Touchscreens bedienen können, ohne sie ausziehen zu müssen. Nie wieder kalte Hände, um in Verbindung zu bleiben.',
    description_fr: 'Alliez chaleur et connectivité. Ces gants thermiques sont dotés d\'une technologie spécifique vous permettant d\'utiliser vos écrans tactiles sans les retirer. Ne plus jamais avoir froid aux mains pour rester connecté.',
    description_en: 'Combine warmth and connectivity. These thermal gloves are equipped with a special technology that allows you to use your touch screens without taking them off. Never have cold hands to stay connected again.',
    category: 'winter-clothing',
    images: ['gants-tactiles-thermiques-tech-gloves'],
    reviews: [
        { author: 'Laura', rating: 5, comment: 'Enfin des gants qui fonctionnent vraiment avec mon téléphone !'}
    ]
  },
  {
    id: 'acc-14',
    name: 'Slimfold Premium Portemonnaie',
    name_fr: 'Portefeuille Slimfold Premium',
    name_en: 'Slimfold Premium Wallet',
    slug: 'portefeuille-cuir-veritable-slimfold-premium',
    price: 95,
    description: 'Eleganz in Ihrer Tasche. Dieses schlanke Portemonnaie aus echtem Leder ist so konzipiert, dass es sich diskret in Ihre Tasche schmiegt und gleichzeitig Ihre wichtigsten Karten und Geldscheine mit Raffinesse organisiert.',
    description_fr: 'L\'élégance dans votre poche. Ce portefeuille slim en cuir véritable est conçu pour se glisser discrètement dans votre poche tout en organisant vos cartes et billets essentiels avec raffinement.',
    description_en: 'Elegance in your pocket. This slim genuine leather wallet is designed to discreetly slip into your pocket while organizing your essential cards and cash with refinement.',
    category: 'accessories',
    images: ['portefeuille-cuir-veritable-slimfold-premium'],
    reviews: [
        { author: 'Vincent', rating: 5, comment: 'Très fin et le cuir est de grande qualité. Parfait.'}
    ]
  },
  {
    id: 'acc-15',
    name: 'Executive Umhängetasche',
    name_fr: 'Sacoche bandoulière Executive',
    name_en: 'Executive Crossbody Bag',
    slug: 'sacoche-bandouliere-cuir-premium-executive-bag',
    price: 280,
    description: 'Der ideale Partner für den modernen Geschäftsmann. Diese Umhängetasche aus hochwertigem Leder vereint Funktionalität und Eleganz. Ihre durchdachten Fächer ermöglichen es Ihnen, Ihre täglichen Essentials mit Stil zu organisieren.',
    description_fr: 'Le partenaire idéal de l\'homme d\'affaires moderne. Cette sacoche en bandoulière, fabriquée dans un cuir de première qualité, allie fonctionnalité et élégance. Ses compartiments bien pensés vous permettent d\'organiser vos essentiels quotidiens avec style.',
    description_en: 'The ideal partner for the modern businessman. This premium leather crossbody bag combines functionality and elegance. Its well-thought-out compartments allow you to organize your daily essentials with style.',
    category: 'accessories',
    images: ['sacoche-bandouliere-cuir-premium-executive-bag'],
    reviews: [
        { author: 'Alexandre', rating: 5, comment: 'Taille parfaite et très professionnelle. Je recommande.'}
    ]
  },
  {
    id: 'acc-16',
    name: 'Golden Lady Uhr',
    name_fr: 'Montre Golden Lady',
    name_en: 'Golden Lady Watch',
    slug: 'montre-elegante-doree-golden-lady',
    price: 380,
    description: 'Ein Schmuckstück, das die Zeit anzeigt. Diese vergoldete Uhr ist eine Ode an die Weiblichkeit. Ihr strahlendes Finish und ihr raffiniertes Design machen sie zum perfekten Accessoire, um jedes Outfit mit einem Hauch von Glamour zu erleuchten.',
    description_fr: 'Un bijou qui donne l\'heure. Cette montre plaquée or est une ode à la féminité. Sa finition éclatante et son design raffiné en font l\'accessoire parfait pour illuminer chaque tenue d\'une touche de glamour.',
    description_en: 'A jewel that tells time. This gold-plated watch is an ode to femininity. Its radiant finish and refined design make it the perfect accessory to illuminate any outfit with a touch of glamour.',
    category: 'accessories',
    images: ['montre-elegante-doree-golden-lady'],
    reviews: [
        { author: 'Marie', rating: 5, comment: 'Absolument magnifique, je l\'adore ! Elle est encore plus belle en vrai.' },
        { author: 'Juliette', rating: 5, comment: 'Un vrai bijou. Je reçois des compliments à chaque fois que je la porte.'}
    ]
  },
  {
    id: 'acc-17',
    name: 'Silver Pure Uhr',
    name_fr: 'Montre Silver Pure',
    name_en: 'Silver Pure Watch',
    slug: 'montre-argentee-minimaliste-silver-pure',
    price: 280,
    description: 'Die Kunst der Schlichtheit. Diese minimalistische, versilberte Uhr verkörpert reine und zeitlose Eleganz. Ihr schlichtes Design und ihre makellose Verarbeitung machen sie zu einem vielseitigen Accessoire für jeden Anlass.',
    description_fr: 'L\'art de la simplicité. Cette montre minimaliste en métal argenté incarne une élégance pure et intemporelle. Son design épuré et sa finition impeccable en font un accessoire polyvalent pour toutes les occasions.',
    description_en: 'The art of simplicity. This minimalist silver-plated watch embodies pure and timeless elegance. Its clean design and flawless finish make it a versatile accessory for any occasion.',
    category: 'accessories',
    images: ['montre-argentee-minimaliste-silver-pure'],
    reviews: [
      { author: 'Clara', rating: 5, comment: 'Simple, élégante, parfaite. C\'est exactement ce que je voulais.'}
    ]
  },
  {
    id: 'acc-18',
    name: 'Soft Elegance Uhr',
    name_fr: 'Montre Soft Elegance',
    name_en: 'Soft Elegance Watch',
    slug: 'montre-cuir-beige-soft-elegance',
    price: 250,
    description: 'Eine sanfte und raffinierte Note für Ihr Handgelenk. Das Armband aus weichem beigem Leder und das schlichte Zifferblatt dieser Uhr schaffen eine Harmonie von subtiler und femininer Eleganz.',
    description_fr: 'Une touche de douceur et de raffinement pour votre poignet. Le bracelet en cuir beige souple et le cadran épuré de cette montre créent une harmonie d\'élégance subtile et féminine.',
    description_en: 'A touch of softness and refinement for your wrist. The soft beige leather strap and the clean dial of this watch create a harmony of subtle and feminine elegance.',
    category: 'accessories',
    images: ['montre-cuir-beige-soft-elegance'],
    reviews: [
        { author: 'Audrey', rating: 5, comment: 'La couleur est très douce et la montre est très confortable.'}
    ]
  },
  {
    id: 'acc-19',
    name: 'Rose Queen Uhr',
    name_fr: 'Montre Rose Queen',
    name_en: 'Rose Queen Watch',
    slug: 'montre-rose-gold-maille-milanaise-rose-queen',
    price: 330,
    description: 'Die Königin der Uhren an Ihrem Handgelenk. Das Milanaise-Armband aus Roségold schmiegt sich elegant an die Haut, während das funkelnde Zifferblatt bei jeder Bewegung das Licht einfängt. Eine Uhr für die moderne Königin.',
    description_fr: 'La reine des montres à votre poignet. Son bracelet en maille milanaise couleur or rose épouse élégamment la peau, tandis que son cadran étincelant capture la lumière à chaque mouvement. Une montre pour la reine moderne.',
    description_en: 'The queen of watches on your wrist. Its rose gold milanese mesh strap elegantly hugs the skin, while its sparkling dial captures the light with every movement. A watch for the modern queen.',
    category: 'accessories',
    images: ['montre-rose-gold-maille-milanaise-rose-queen'],
    reviews: [
        { author: 'Manon', rating: 5, comment: 'Je suis amoureuse de cette montre. Le bracelet est magnifique.'}
    ]
  },
  {
    id: 'acc-20',
    name: 'Cozy Glam Mütze',
    name_fr: 'Bonnet Cozy Glam',
    name_en: 'Cozy Glam Beanie',
    slug: 'bonnet-laine-pompon-fourrure-synthetique-cozy-glam',
    price: 70,
    description: 'Vereinen Sie Wärme und Glamour. Diese Wollmütze ist mit einem weichen Bommel aus hochwertigem Kunstpelz versehen, der Ihrem Winterlook einen Hauch von verspieltem Luxus verleiht.',
    description_fr: 'Alliez chaleur et glamour. Ce bonnet en laine est surmonté d\'un pompon doux en fausse fourrure de haute qualité, ajoutant une touche de luxe ludique à votre look d\'hiver.',
    description_en: 'Combine warmth and glamour. This wool beanie is topped with a soft, high-quality faux fur pom-pom, adding a touch of playful luxury to your winter look.',
    category: 'winter-clothing',
    images: ['bonnet-laine-pompon-fourrure-synthetique-cozy-glam'],
    reviews: [
        { author: 'Jessica', rating: 5, comment: 'Très doux et le pompon est adorable !'}
    ]
  },
  {
    id: 'acc-21',
    name: 'Urban Chic Mütze',
    name_fr: 'Bonnet Urban Chic',
    name_en: 'Urban Chic Beanie',
    slug: 'bonnet-long-oversize-urban-chic',
    price: 55,
    description: 'Für einen lässigen und trendigen Stil. Diese lange Oversize-Mütze kann auf verschiedene Arten getragen werden, um Ihren urbanen und schicken Look zu vervollkommnen. Ein starkes Stück für einen selbstbewussten Stil.',
    description_fr: 'Pour un style décontracté et tendance. Ce bonnet long et oversize peut être porté de différentes manières pour parfaire votre look urbain et chic. Une pièce forte pour un style affirmé.',
    description_en: 'For a casual and trendy style. This long and oversized beanie can be worn in different ways to perfect your urban and chic look. A strong piece for an assertive style.',
    category: 'accessories',
    images: ['bonnet-long-oversize-urban-chic'],
    reviews: [
        { author: 'Mathieu', rating: 4, comment: 'Bonnet sympa, le style oversize est cool.'}
    ]
  },
  {
    id: 'acc-22',
    name: 'Winter Pearl Mütze',
    name_fr: 'Bonnet Winter Pearl',
    name_en: 'Winter Pearl Beanie',
    slug: 'bonnet-tricote-perle-winter-pearl',
    price: 65,
    description: 'Ein Hauch von Zartheit im Herzen des Winters. Diese gestrickte Mütze ist subtil mit kleinen Perlen verziert, die einen Hauch von Licht und winterlicher Poesie in Ihre Garderobe bringen.',
    description_fr: 'Une touche de délicatesse au cœur de l\'hiver. Ce bonnet tricoté est subtilement orné de petites perles, apportant un éclat de lumière et une poésie hivernale à votre garde-robe.',
    description_en: 'A touch of delicacy in the heart of winter. This knitted beanie is subtly adorned with small pearls, bringing a splash of light and winter poetry to your wardrobe.',
    category: 'winter-clothing',
    images: ['bonnet-tricote-perle-winter-pearl'],
    reviews: [
        { author: 'Amélie', rating: 5, comment: 'Très original et féminin. J\'aime beaucoup les petites perles.'}
    ]
  },
  {
    id: 'acc-23',
    name: 'Luxe Soft Schal',
    name_fr: 'Écharpe Luxe Soft',
    name_en: 'Luxe Soft Scarf',
    slug: 'echarpe-oversize-fausse-fourrure-luxe-soft',
    price: 145,
    description: 'Hüllen Sie sich in extremen Luxus. Dieser Oversize-Schal aus hochwertigem Kunstpelz bietet eine unvergleichliche Weichheit und einen Hauch von opulentem Glamour für Ihre Winteroutfits.',
    description_fr: 'Drapez-vous dans un luxe extrême. Cette écharpe oversize en fausse fourrure de haute qualité offre une douceur inégalée et une touche de glamour opulent à vos tenues d\'hiver.',
    description_en: 'Drape yourself in extreme luxury. This oversized scarf in high-quality faux fur offers unparalleled softness and a touch of opulent glamour to your winter outfits.',
    category: 'winter-clothing',
    images: ['echarpe-oversize-fausse-fourrure-luxe-soft'],
    reviews: [
        { author: 'Caroline', rating: 5, comment: 'Incroyablement douce et luxueuse. C\'est magnifique.'}
    ]
  },
  {
    id: 'acc-24',
    name: 'Warm Plush Schal',
    name_fr: 'Écharpe Warm Plush',
    name_en: 'Warm Plush Scarf',
    slug: 'echarpe-maille-torsadee-warm-plush',
    price: 105,
    description: 'Die zeitlose Eleganz von Zopfstrick. Dieser dicke und weiche Schal umhüllt Sie mit stilvoller Wärme. Seine reiche Textur und großzügigen Abmessungen machen ihn zum perfekten Verbündeten gegen die Winterkälte.',
    description_fr: 'L\'élégance intemporelle de la maille torsadée. Cette écharpe épaisse et moelleuse vous enveloppe de chaleur avec style. Sa texture riche et ses dimensions généreuses en font l\'alliée parfaite contre le froid hivernal.',
    description_en: 'The timeless elegance of cable knit. This thick and soft scarf envelops you in warmth with style. Its rich texture and generous dimensions make it the perfect ally against the winter cold.',
    category: 'winter-clothing',
    images: ['echarpe-maille-torsadee-warm-plush'],
    reviews: [
        { author: 'Nicolas', rating: 5, comment: 'Écharpe de grande qualité, très chaude et confortable.'}
    ]
  },
  {
    id: 'acc-25',
    name: 'Elegant Wrap Stola',
    name_fr: 'Châle Elegant Wrap',
    name_en: 'Elegant Wrap Shawl',
    slug: 'chale-hiver-motif-elegant-elegant-wrap',
    price: 130,
    description: 'Mehr als nur ein Accessoire, ein Statement. Diese große Winterstola mit ihrem raffinierten und eleganten Muster wertet jedes Outfit auf, vom einfachen Mantel bis zum Abendkleid.',
    description_fr: 'Plus qu\'un accessoire, une déclaration de style. Ce grand châle d\'hiver, avec son motif raffiné et élégant, sublime n\'importe quelle tenue, du simple manteau à la robe de soirée.',
    description_en: 'More than an accessory, a style statement. This large winter shawl, with its refined and elegant pattern, enhances any outfit, from a simple coat to an evening dress.',
    category: 'winter-clothing',
    images: ['chale-hiver-motif-elegant-elegant-wrap'],
    reviews: [
        { author: 'Béatrice', rating: 5, comment: 'Les motifs sont superbes et il est très grand et enveloppant.'}
    ]
  },
  {
    id: 'acc-26',
    name: 'Cashmere Touch Foulard',
    name_fr: 'Foulard Cashmere Touch',
    name_en: 'Cashmere Touch Scarf',
    slug: 'foulard-cachemire-imprime-cashmere-touch',
    price: 175,
    description: 'Die Weichheit von Kaschmir, die Kühnheit eines Drucks. Dieser Schal aus einem Kaschmirgemisch bietet ein luxuriöses Gefühl und einen Hauch von Farbe, um Ihre Looks in der Zwischensaison aufzuwerten.',
    description_fr: 'La douceur du cachemire, l\'audace d\'un imprimé. Ce foulard en mélange de cachemire offre un toucher luxueux et une touche de couleur pour rehausser vos looks de mi-saison.',
    description_en: 'The softness of cashmere, the boldness of a print. This cashmere blend scarf offers a luxurious feel and a touch of color to enhance your mid-season looks.',
    category: 'accessories',
    images: ['foulard-cachemire-imprime-cashmere-touch'],
    reviews: [
        { author: 'Diane', rating: 5, comment: 'Très doux et les couleurs sont magnifiques.'}
    ]
  },
  {
    id: 'acc-27',
    name: 'Lady Warm Handschuhe',
    name_fr: 'Gants Lady Warm',
    name_en: 'Lady Warm Gloves',
    slug: 'gants-cuir-doubles-polaire-lady-warm',
    price: 85,
    description: 'Die perfekte Allianz zwischen Eleganz und Komfort. Diese Handschuhe aus geschmeidigem Leder sind mit einem weichen Fleece gefüttert, um Ihre Hände warm zu halten, ohne auf einen raffinierten Stil zu verzichten.',
    description_fr: 'L\'alliance parfaite entre l\'élégance et le confort. Ces gants en cuir souple sont doublés d\'une polaire douce pour garder vos mains au chaud sans sacrifier un style raffiné.',
    description_en: 'The perfect alliance between elegance and comfort. These supple leather gloves are lined with soft fleece to keep your hands warm without sacrificing a refined style.',
    category: 'winter-clothing',
    images: ['gants-cuir-doubles-polaire-lady-warm'],
    reviews: [
        { author: 'Hélène', rating: 5, comment: 'Très chauds et le cuir est d\'une grande souplesse. Parfaits.'}
    ]
  },
  {
    id: 'acc-28',
    name: 'Mini Glam Handtasche',
    name_fr: 'Petit sac à main Mini Glam',
    name_en: 'Mini Glam Handbag',
    slug: 'petit-sac-a-main-chic-mini-glam',
    price: 360,
    description: 'Das unverzichtbare Accessoire für Ihre Abende. Diese schicke Minitasche mit ihren goldenen Details ist so konzipiert, dass sie Ihre wichtigsten Dinge aufnimmt und Ihrem Abendoutfit einen Hauch von Glamour verleiht.',
    description_fr: 'L\'accessoire indispensable de vos soirées. Ce mini sac chic, avec ses détails dorés, est conçu pour contenir juste l\'essentiel et ajouter une touche de glamour à votre tenue de soirée.',
    description_en: 'The essential accessory for your evenings. This chic mini bag, with its golden details, is designed to hold just the essentials and add a touch of glamour to your evening outfit.',
    category: 'accessories',
    images: ['petit-sac-a-main-chic-mini-glam'],
    reviews: [
        { author: 'Camille', rating: 5, comment: 'Adorable et juste assez grand pour mon téléphone et mon rouge à lèvres.'}
    ]
  },
  {
    id: 'acc-29',
    name: 'Shine Drop Ohrringe',
    name_fr: 'Boucles d\'oreilles Shine Drop',
    name_en: 'Shine Drop Earrings',
    slug: 'boucles-oreilles-pendantes-argentees-shine-drop',
    price: 145,
    description: 'Ein Tropfen Licht, um Ihr Gesicht zu erhellen. Diese hängenden Ohrringe aus poliertem Silber fangen das Licht bei jeder Bewegung ein und verleihen Ihrem Look einen subtilen und raffinierten Glanz.',
    description_fr: 'Une goutte de lumière pour illuminer votre visage. Ces boucles d\'oreilles pendantes en argent poli capturent la lumière à chaque mouvement, ajoutant un éclat subtil et raffiné à votre allure.',
    description_en: 'A drop of light to illuminate your face. These dangling polished silver earrings capture the light with every movement, adding a subtle and refined sparkle to your look.',
    category: 'accessories',
    images: ['boucles-oreilles-pendantes-argentees-shine-drop'],
    reviews: [
        { author: 'Marion', rating: 5, comment: 'Elles sont magnifiques et très légères à porter.'}
    ]
  },
  {
    id: 'acc-30',
    name: 'Shine Night Clutch',
    name_fr: 'Pochette Shine Night',
    name_en: 'Shine Night Clutch',
    slug: 'pochette-soiree-shine-night-premium',
    price: 200,
    description: 'Die perfekte Ergänzung zu Ihrem Abendkleid. Diese Clutch mit ihrem funkelnden Finish und ihrer eleganten Struktur ist so konzipiert, dass Sie Ihre wichtigsten Dinge aufnehmen und gleichzeitig ein modisches Statement setzen.',
    description_fr: 'Le complément parfait de votre robe de soirée. Cette pochette à la finition scintillante et à la structure élégante est conçue pour contenir vos essentiels tout en étant une déclaration de mode à part entière.',
    description_en: 'The perfect complement to your evening gown. This clutch with its sparkling finish and elegant structure is designed to hold your essentials while being a fashion statement in its own right.',
    category: 'accessories',
    images: ['pochette-soiree-shine-night-premium'],
    reviews: [
        { author: 'Eva', rating: 5, comment: 'Parfaite pour un mariage. J\'ai reçu beaucoup de compliments.'}
    ]
  },
  {
    id: 'prod-71',
    name: 'Manteau Long en Laine',
    name_fr: 'Manteau Long en Laine',
    name_en: 'Long Wool Coat',
    slug: 'manteau-long-laine-hugo-boss',
    price: 680,
    description: 'Ein zeitloser Mantel aus hochwertiger Wolle, der Eleganz und Wärme vereint. Perfekt für den Winter.',
    description_fr: 'Un manteau intemporel en laine de qualité supérieure qui allie élégance et chaleur. Parfait pour l\'hiver.',
    description_en: 'A timeless coat made of high-quality wool that combines elegance and warmth. Perfect for winter.',
    category: 'winter-clothing',
    images: ['manteau-long-laine-hugo-boss'],
    reviews: []
  },
  {
    id: 'prod-72',
    name: 'Doudoune Matelassée',
    name_fr: 'Doudoune Matelassée',
    name_en: 'Quilted Down Jacket',
    slug: 'doudoune-matelassee-moncler',
    price: 960,
    description: 'Eine leichte und warme Daunenjacke, ideal für kalte Tage. Ein Klassiker von Moncler.',
    description_fr: 'Une doudoune légère et chaude, idéale pour les journées froides. Un classique de chez Moncler.',
    description_en: 'A light and warm down jacket, ideal for cold days. A classic from Moncler.',
    category: 'winter-clothing',
    images: ['doudoune-matelassee-moncler'],
    reviews: []
  },
  {
    id: 'prod-73',
    name: 'Parka Arctic',
    name_fr: 'Parka Arctic',
    name_en: 'Arctic Parka',
    slug: 'parka-arctic-canada-goose',
    price: 880,
    description: 'Ein extrem warmer Parka, entworfen, um den härtesten Wintern standzuhalten. Mit der Qualität von Canada Goose.',
    description_fr: 'Une parka extrêmement chaude conçue pour résister aux hivers les plus rudes. La qualité Canada Goose.',
    description_en: 'An extremely warm parka designed to withstand the harshest winters. Canada Goose quality.',
    category: 'winter-clothing',
    images: ['parka-arctic-canada-goose'],
    reviews: []
  },
  {
    id: 'prod-74',
    name: 'Pull Col Roulé Laine Merinos',
    name_fr: 'Pull Col Roulé Laine Merinos',
    name_en: 'Merino Wool Turtleneck Sweater',
    slug: 'pull-col-roule-laine-merinos-paul-smith',
    price: 250,
    description: 'Ein weicher und eleganter Rollkragenpullover aus Merinowolle. Ein Muss für Ihre Wintergarderobe.',
    description_fr: 'Un pull à col roulé doux et élégant en laine de mérinos. Un indispensable de votre garde-robe d\'hiver.',
    description_en: 'A soft and elegant turtleneck sweater in merino wool. An essential for your winter wardrobe.',
    category: 'winter-clothing',
    images: ['pull-col-roule-laine-merinos-paul-smith'],
    reviews: []
  }
];


// --- Data-fetching functions ---

export function getProductsByCategory(products: Product[], categorySlug: string, limit?: number, excludeId?: string): Product[] {
  let filteredProducts: Product[];

  if (categorySlug === 'all') {
    filteredProducts = products;
  } else if (categorySlug === 'winter-clothing') {
    const winterKeywords = ['winter', 'manteau', 'pull', 'parka', 'doudoune', 'bonnet', 'écharpe', 'gants', 'coat', 'sweater', 'beanie', 'scarf', 'gloves', 'mantel', 'pullover', 'wolle', 'laine', 'wool', 'cardigan', 'cachemire', 'cashmere'];
    filteredProducts = products.filter(p => 
      p.category === 'winter-clothing' || 
      winterKeywords.some(keyword => p.name_fr.toLowerCase().includes(keyword)) ||
      winterKeywords.some(keyword => p.name_en.toLowerCase().includes(keyword)) ||
      winterKeywords.some(keyword => p.name.toLowerCase().includes(keyword)) ||
      winterKeywords.some(keyword => p.description_fr.toLowerCase().includes(keyword)) ||
      winterKeywords.some(keyword => p.description_en.toLowerCase().includes(keyword)) ||
      winterKeywords.some(keyword => p.description.toLowerCase().includes(keyword))
    );
  } else {
    filteredProducts = products.filter((p) => p.category === categorySlug);
  }

  if (excludeId) {
    filteredProducts = filteredProducts.filter((p) => p.id !== excludeId);
  }
  
  if (limit) {
    return filteredProducts.slice(0, limit);
  }

  return filteredProducts;
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(products: Product[], limit: number = 4): Product[] {
    const winterProducts = products.filter(p => p.category === 'winter-clothing' || p.name.toLowerCase().includes('winter') || p.name.toLowerCase().includes('mantel') || p.name.toLowerCase().includes('pullover'));
    return winterProducts.slice(0, limit);
}
