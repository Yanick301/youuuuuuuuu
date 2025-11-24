
import type { Product, Category, Review } from './types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Herrenbekleidung', name_fr: 'Vêtements Homme', slug: 'mens-clothing', imageId: 'mens-category' },
  { id: 'cat-2', name: 'Damenbekleidung', name_fr: 'Vêtements Femme', slug: 'womens-clothing', imageId: 'womens-category' },
  { id: 'cat-3', name: 'Accessoires', name_fr: 'Accessoires', slug: 'accessories', imageId: 'accessories-category' },
  { id: 'cat-5', name: 'Schuhe', name_fr: 'Chaussures', slug: 'shoes', imageId: 'shoes-category' },
  { id: 'cat-4', name: 'Winterkleidung', name_fr: 'Vêtements d\'hiver', slug: 'winter-clothing', imageId: 'winter-category' },
];

export const products: Product[] = [
    {
    id: '1',
    name: 'Seiden-Midikleid',
    name_fr: 'Robe midi en soie',
    slug: 'robe-midi-en-soie',
    price: 750,
    description: 'Ein elegantes Midikleid aus reiner Seide, perfekt für besondere Anlässe. Fließender Stoff und schmeichelhafter Schnitt.',
    description_fr: 'Une robe midi élégante en pure soie, parfaite pour les occasions spéciales. Tissu fluide et coupe flatteuse.',
    category: 'womens-clothing',
    images: ['robe-midi-en-soie-gucci', 'robe-midi-en-soie-gucci', 'robe-midi-en-soie-gucci'],
    reviews: [
      { author: 'Sophie', rating: 5, comment: 'Absolut umwerfend! Die Qualität ist außergewöhnlich.' },
      { author: 'Claire', rating: 4, comment: 'Sehr schick, aber die Größe fällt etwas klein aus.' },
    ],
  },
  {
    id: '2',
    name: 'Zweireihiger Blazer',
    name_fr: 'Blazer croisé',
    slug: 'blazer-croise',
    price: 980,
    description: 'Ein klassischer zweireihiger Blazer mit goldenen Knöpfen. Eine zeitlose Ergänzung für jede Garderobe.',
    description_fr: 'Un blazer croisé classique avec des boutons dorés. Une pièce intemporelle pour toute garde-robe.',
    category: 'womens-clothing',
    images: ['blazer-croise-balmain', 'blazer-croise-balmain', 'blazer-croise-balmain'],
    reviews: [
      { author: 'Léa', rating: 5, comment: 'Perfekte Passform und sehr elegant.' },
    ],
  },
    {
    id: 'prod-30',
    name: 'Slim-Fit Hemd',
    name_fr: 'Chemise Slim-Fit',
    slug: 'chemise-slim-fit-tom-ford',
    price: 350,
    description: 'Ein perfekt geschnittenes Slim-Fit-Hemd aus hochwertiger Baumwolle für einen eleganten und modernen Look.',
    description_fr: 'Une chemise slim-fit parfaitement coupée en coton de qualité supérieure pour un look élégant et moderne.',
    category: 'mens-clothing',
    images: ['chemise-slim-fit-tom-ford'],
    reviews: []
  },
  {
    id: 'prod-31',
    name: 'Piqué-Polo',
    name_fr: 'Polo piqué',
    slug: 'polo-pique-ralph-lauren',
    price: 120,
    description: 'Das ikonische Piqué-Polo, ein Must-Have für eine lässig-schicke Garderobe. Bequem und zeitlos.',
    description_fr: 'L\'iconique polo en piqué, un indispensable pour une garde-robe casual-chic. Confortable et intemporel.',
    category: 'mens-clothing',
    images: ['polo-pique-ralph-lauren'],
    reviews: []
  },
  {
    id: 'prod-32',
    name: 'Kaschmir-Rollkragenpullover',
    name_fr: 'Pull col roulé cachemire',
    slug: 'pull-col-roule-cachemire-loro-piana',
    price: 900,
    description: 'Ein luxuriöser Rollkragenpullover aus reinem Kaschmir für unübertroffene Weichheit und Wärme.',
    description_fr: 'Un pull col roulé luxueux en pur cachemire pour une douceur et une chaleur inégalées.',
    category: 'winter-clothing',
    images: ['pull-col-roule-cachemire-loro-piana'],
    reviews: []
  },
  {
    id: 'prod-40',
    name: 'Seidenhemd',
    name_fr: 'Chemise en soie',
    slug: 'chemise-soie-versace',
    price: 650,
    description: 'Ein gewagtes Seidenhemd mit ikonischem Druck, das Markenzeichen des Hauses Versace. Für einen unvergesslichen Stil.',
    description_fr: 'Une chemise en soie audacieuse à l\'imprimé iconique, signature de la maison Versace. Pour un style mémorable.',
    category: 'mens-clothing',
    images: ['chemise-soie-versace'],
    reviews: []
  },
  {
    id: 'prod-47',
    name: 'Urbane Leder-Chelsea-Boots',
    name_fr: 'Bottines Chelsea en cuir Citadin',
    slug: 'bottines-chelsea-cuir-citadin',
    price: 450,
    description: 'Moderne und elegante Chelsea-Boots aus Glattleder. Perfekt, um jedes städtische Outfit zu vervollständigen.',
    description_fr: 'Des bottines chelsea modernes et élégantes en cuir lisse. Parfaites pour compléter n\'importe quelle tenue urbaine.',
    category: 'shoes',
    images: ['bottines-chelsea-cuir-citadin'],
    reviews: [
      { author: 'Alex', rating: 5, comment: 'Sehr bequem und stilvoll. Ich trage sie jeden Tag.' }
    ]
  },
  {
    id: 'prod-48',
    name: 'Wildlederstiefeletten mit Blockabsatz',
    name_fr: 'Bottines en cuir suédé à talon carré Paris',
    slug: 'bottines-en-cuir-suede-talon-carre-paris',
    price: 480,
    description: 'Elegante Wildlederstiefeletten mit einem stabilen quadratischen Absatz, der Stil und Komfort vereint.',
    description_fr: 'D\'élégantes bottines en suède dotées d\'un talon carré stable, alliant style et confort au quotidien.',
    category: 'shoes',
    images: ['bottines-en-cuir-suede-talon-carre-paris'],
    reviews: [
      { author: 'Julia', rating: 4, comment: 'Ich liebe den Stil, aber sie müssen eingelaufen werden.' }
    ]
  },
  {
    id: 'prod-49',
    name: 'Perforierte Full-Brogue-Schuhe',
    name_fr: 'Brogues perforées Full-Brogue Tradition',
    slug: 'brogues-perforees-full-brogue-tradition',
    price: 520,
    description: 'Ein klassischer Herrenschuh, der Full-Brogue, mit aufwendigen Perforationen für einen Hauch von traditioneller Raffinesse.',
    description_fr: 'Un classique du vestiaire masculin, le full-brogue, avec ses perforations élaborées pour une touche de sophistication traditionnelle.',
    category: 'shoes',
    images: ['brogues-perforees-full-brogue-tradition'],
    reviews: []
  },
  {
    id: 'prod-50',
    name: 'Chunky-Derby-Schuhe mit Plateausohle',
    name_fr: 'Derby chunky à plateforme Street-Luxe',
    slug: 'derby-chunky-platform-street-luxe',
    price: 610,
    description: 'Ein kühner Derby-Schuh mit einer imposanten Plateausohle, der Streetwear und Luxus für einen entschieden modernen Look vereint.',
    description_fr: 'Une chaussure derby audacieuse montée sur une semelle plateforme imposante, fusionnant streetwear et luxe pour un look résolument moderne.',
    category: 'shoes',
    images: ['derby-chunky-platform-street-luxe'],
    reviews: [
      { author: 'Leo', rating: 5, comment: 'Einzigartiger Stil, sehr beeindruckend.' }
    ]
  },
  {
    id: 'prod-51',
    name: 'Elite Derby-Schuhe aus genarbtem Leder',
    name_fr: 'Derby en cuir grainé Élite',
    slug: 'derby-cuir-graine-elite',
    price: 550,
    description: 'Ein robuster und eleganter Derby-Schuh aus hochwertigem genarbtem Leder. Ein Muss für den anspruchsvollen Mann.',
    description_fr: 'Un derby robuste et élégant, fabriqué dans un cuir grainé de première qualité. Un essentiel pour l\'homme distingué.',
    category: 'shoes',
    images: ['derby-cuir-graine-elite'],
    reviews: []
  },
  {
    id: 'prod-52',
    name: 'Lackleder-Pumps mit 9 cm Absatz',
    name_fr: 'Escarpins en cuir verni talon 9 cm Éclipse',
    slug: 'escarpins-cuir-verni-talon-9-cm-eclipse',
    price: 490,
    description: 'Der Inbegriff von Weiblichkeit, diese Lacklederpumps mit einem 9 cm hohen Absatz verlängern die Silhouette elegant.',
    description_fr: 'Le summum de la féminité, ces escarpins en cuir verni avec un talon de 9 cm pour allonger la silhouette avec élégance.',
    category: 'shoes',
    images: ['escarpins-cuir-verni-talon-9-cm-eclipse'],
    reviews: []
  },
  {
    id: 'prod-53',
    name: 'Wildleder-Loafer mit Quasten',
    name_fr: 'Mocassin à pampilles en suède Club',
    slug: 'mocassin-tasseled-suede-club',
    price: 420,
    description: 'Ein lässig-eleganter Loafer aus Wildleder, verziert mit klassischen Quasten. Perfekt für einen Preppy-Chic-Look.',
    description_fr: 'Un mocassin décontracté-élégant en suède, orné de pampilles classiques. Parfait pour un look preppy-chic.',
    category: 'shoes',
    images: ['mocassin-tasseled-suede-club'],
    reviews: []
  },
  {
    id: 'prod-54',
    name: 'Satin-Mules mit skulpturalem Absatz',
    name_fr: 'Mules en satin à talon sculpté Diva',
    slug: 'mules-satin-talon-sculpte-diva',
    price: 530,
    description: 'Diese Satin-Mules sind ein wahres Schmuckstück und zeichnen sich durch ihren einzigartigen skulpturalen Absatz aus. Für einen unvergesslichen Auftritt.',
    description_fr: 'Véritables bijoux de pied, ces mules en satin se distinguent par leur talon sculptural unique. Pour une entrée remarquée.',
    category: 'shoes',
    images: ['mules-satin-talon-sculpte-diva'],
    reviews: [
      { author: 'Nina', rating: 5, comment: 'Spektakulär! Ein echtes Kunstwerk.' }
    ]
  },
  {
    id: 'prod-55',
    name: 'Handgenähte Oxford-Schuhe aus patiniertem Leder',
    name_fr: 'Richelieu cousu main en cuir patiné Souverain',
    slug: 'richelieu-cousu-main-cuir-patine-souverain',
    price: 780,
    description: 'Der Oxford in seiner edelsten Form. Handgenäht aus patiniertem Leder für eine einzigartige Tiefe und Farbe.',
    description_fr: 'Le richelieu dans sa forme la plus noble. Cousu à la main dans un cuir patiné pour une profondeur et une couleur uniques.',
    category: 'shoes',
    images: ['richelieu-cousu-main-cuir-patine-souverain'],
    reviews: []
  },
  {
    id: 'prod-56',
    name: 'Sandalen mit Knöchelriemen aus Leder',
    name_fr: 'Sandales à bride cheville en cuir Sérénité',
    slug: 'sandales-a-bride-cheville-en-cuir-serenite',
    price: 390,
    description: 'Minimalistische und schicke Sandalen mit einem feinen Knöchelriemen aus Leder. Die Essenz sommerlicher Eleganz.',
    description_fr: 'Des sandales minimalistes et chics, avec une fine bride en cuir qui enlace la cheville. L\'essence de l\'élégance estivale.',
    category: 'shoes',
    images: ['sandales-a-bride-cheville-en-cuir-serenite'],
    reviews: []
  },
  {
    id: 'prod-57',
    name: 'Luxus-Sneakers aus Nubukleder',
    name_fr: 'Sneakers de luxe en cuir nubuck Runway',
    slug: 'sneakers-luxe-cuir-nubuck-runway',
    price: 650,
    description: 'Diese Sneakers überschreiten die Grenzen zwischen Sport und Luxus, gefertigt aus weichem Nubukleder mit einer Designer-Sohle.',
    description_fr: 'Des sneakers qui transcendent les codes du sport et du luxe, fabriquées en cuir nubuck doux avec une semelle design.',
    category: 'shoes',
    images: ['sneakers-luxe-cuir-nubuck-runway'],
    reviews: [
      { author: 'Tom', rating: 5, comment: 'So bequem und sehen toll aus.' }
    ]
  },
  {
    id: 'acc-1',
    name: 'Chrono Luxe Uhr',
    name_fr: 'Montre Chrono Luxe',
    slug: 'montre-acier-inoxydable-noire-chrono-luxe',
    price: 450,
    description: 'Eine moderne und kühne Uhr aus schwarzem Edelstahl. Ein Chronograph für einen urbanen und anspruchsvollen Stil.',
    description_fr: 'Une montre moderne et audacieuse en acier inoxydable noir. Un chronographe pour un style urbain et sophistiqué.',
    category: 'accessories',
    images: ['montre-acier-inoxydable-noire-chrono-luxe'],
    reviews: [{ author: 'Marc', rating: 5, comment: 'Superbe montre, très classe.' }]
  },
  {
    id: 'acc-2',
    name: 'Hydrosport Sportuhr',
    name_fr: 'Montre sport Hydrosport',
    slug: 'montre-sport-silicone-hydrosport-5-atm',
    price: 250,
    description: 'Eine Sportuhr mit Silikonarmband, wasserdicht bis 5 ATM. Perfekt für den aktiven Mann.',
    description_fr: 'Une montre de sport avec un bracelet en silicone, étanche jusqu\'à 5 ATM. Parfaite pour l\'homme actif.',
    category: 'accessories',
    images: ['montre-sport-silicone-hydrosport-5-atm'],
    reviews: []
  },
  {
    id: 'acc-3',
    name: 'Heritage Classic Uhr',
    name_fr: 'Montre Heritage Classique',
    slug: 'montre-cuir-brun-heritage-classique',
    price: 380,
    description: 'Eine klassische Uhr mit braunem Lederarmband, die zeitlose Eleganz verkörpert. Ein Erbstück von morgen.',
    description_fr: 'Une montre classique avec un bracelet en cuir brun, incarnant l\'élégance intemporelle. Un héritage de demain.',
    category: 'accessories',
    images: ['montre-cuir-brun-heritage-classique'],
    reviews: [{ author: 'Jean', rating: 5, comment: 'Magnifique et très agréable à porter.' }]
  },
  {
    id: 'acc-4',
    name: 'Blue Vision Uhr',
    name_fr: 'Montre Blue Vision',
    slug: 'montre-metallique-argent-blue-vision',
    price: 320,
    description: 'Eine Uhr aus silbernem Metall mit einem tiefblauen Zifferblatt. Eine perfekte Kombination aus Modernität und Eleganz.',
    description_fr: 'Une montre en métal argenté avec un cadran bleu profond. Une alliance parfaite de modernité et d\'élégance.',
    category: 'accessories',
    images: ['montre-metallique-argent-blue-vision'],
    reviews: []
  },
  {
    id: 'acc-5',
    name: 'Urban Tech Digitaluhr',
    name_fr: 'Montre digitale Urban Tech',
    slug: 'montre-digitale-led-urban-tech',
    price: 180,
    description: 'Eine digitale Uhr mit LED-Anzeige für einen entschieden urbanen und technologischen Look.',
    description_fr: 'Une montre digitale avec affichage LED pour un look résolument urbain et technologique.',
    category: 'accessories',
    images: ['montre-digitale-led-urban-tech'],
    reviews: []
  },
  {
    id: 'acc-6',
    name: 'Executive Elite Uhr',
    name_fr: 'Montre Executive Elite',
    slug: 'montre-cadran-or-rose-executive-elite',
    price: 550,
    description: 'Eine prestigeträchtige Uhr mit einem Zifferblatt in Roségold, für den modernen und anspruchsvollen Mann.',
    description_fr: 'Une montre de prestige avec un cadran en or rose, pour l\'homme d\'affaires moderne et exigeant.',
    category: 'accessories',
    images: ['montre-cadran-or-rose-executive-elite'],
    reviews: []
  },
  {
    id: 'acc-7',
    name: 'Titan Steel Pro Chronograph',
    name_fr: 'Chronographe Titan Steel Pro',
    slug: 'montre-chronographe-titan-steel-pro',
    price: 620,
    description: 'Ein robuster und präziser Chronograph aus Titan. Ein Werkzeug für den Mann, der keine Kompromisse eingeht.',
    description_fr: 'Un chronographe robuste et précis en titane. Un outil pour l\'homme qui ne fait aucun compromis.',
    category: 'accessories',
    images: ['montre-chronographe-titan-steel-pro'],
    reviews: []
  },
  {
    id: 'acc-8',
    name: 'Nordic Luxe Wollmütze',
    name_fr: 'Bonnet en laine Nordic Luxe',
    slug: 'bonnet-laine-torsadee-noir-nordic-luxe',
    price: 80,
    description: 'Eine Mütze aus Zopfstrickwolle, für einen schicken und gemütlichen Winterlook.',
    description_fr: 'Un bonnet en laine torsadée, pour un look hivernal chic et douillet.',
    category: 'accessories',
    images: ['bonnet-laine-torsadee-noir-nordic-luxe'],
    reviews: []
  },
  {
    id: 'acc-9',
    name: 'Winter Essential Mütze',
    name_fr: 'Bonnet Winter Essential',
    slug: 'bonnet-epais-gris-winter-essential',
    price: 65,
    description: 'Eine dicke, graue Mütze, ein unverzichtbares Accessoire, um dem Winter mit Stil zu begegnen.',
    description_fr: 'Un bonnet épais et gris, l\'essentiel pour affronter l\'hiver avec style.',
    category: 'winter-clothing',
    images: ['bonnet-epais-gris-winter-essential'],
    reviews: []
  },
  {
    id: 'acc-10',
    name: 'Alpine Soft Schal',
    name_fr: 'Écharpe Alpine Soft',
    slug: 'echarpe-laine-vierge-premium-alpine-soft',
    price: 150,
    description: 'Ein Schal aus reiner Schurwolle für unübertroffene Weichheit und Wärme.',
    description_fr: 'Une écharpe en pure laine vierge pour une douceur et une chaleur inégalées.',
    category: 'winter-clothing',
    images: ['echarpe-laine-vierge-premium-alpine-soft'],
    reviews: []
  },
  {
    id: 'acc-11',
    name: 'Winter Shield Snood',
    name_fr: 'Snood Winter Shield',
    slug: 'snood-polaire-winter-shield-premium',
    price: 75,
    description: 'Ein Fleece-Snood für optimalen Schutz vor Kälte, ohne Kompromisse beim Stil einzugehen.',
    description_fr: 'Un snood en polaire pour une protection optimale contre le froid, sans compromis sur le style.',
    category: 'winter-clothing',
    images: ['snood-polaire-winter-shield-premium'],
    reviews: []
  },
  {
    id: 'acc-12',
    name: 'Urban Knit Mütze',
    name_fr: 'Bonnet Urban Knit',
    slug: 'bonnet-streetwear-a-revers-urban-knit',
    price: 55,
    description: 'Eine Streetwear-Mütze mit Umschlag für einen lässigen und trendigen Look.',
    description_fr: 'Un bonnet streetwear à revers pour un look décontracté et tendance.',
    category: 'accessories',
    images: ['bonnet-streetwear-a-revers-urban-knit'],
    reviews: []
  },
  {
    id: 'acc-13',
    name: 'Tech Gloves',
    name_fr: 'Gants Tech Gloves',
    slug: 'gants-tactiles-thermiques-tech-gloves',
    price: 95,
    description: 'Thermische und taktile Handschuhe, um auch im Winter verbunden zu bleiben.',
    description_fr: 'Des gants thermiques et tactiles pour rester connecté même en hiver.',
    category: 'winter-clothing',
    images: ['gants-tactiles-thermiques-tech-gloves'],
    reviews: []
  },
  {
    id: 'acc-14',
    name: 'Slimfold Premium Portemonnaie',
    name_fr: 'Portefeuille Slimfold Premium',
    slug: 'portefeuille-cuir-veritable-slimfold-premium',
    price: 120,
    description: 'Ein schlankes Portemonnaie aus echtem Leder, das Eleganz und Funktionalität vereint.',
    description_fr: 'Un portefeuille slim en cuir véritable, alliant élégance et fonctionnalité.',
    category: 'accessories',
    images: ['portefeuille-cuir-veritable-slimfold-premium'],
    reviews: []
  },
  {
    id: 'acc-15',
    name: 'Executive Umhängetasche',
    name_fr: 'Sacoche bandoulière Executive',
    slug: 'sacoche-bandouliere-cuir-premium-executive-bag',
    price: 350,
    description: 'Eine Umhängetasche aus Premium-Leder, ideal für den modernen Geschäftsmann.',
    description_fr: 'Une sacoche en bandoulière en cuir premium, idéale pour l\'homme d\'affaires moderne.',
    category: 'accessories',
    images: ['sacoche-bandouliere-cuir-premium-executive-bag'],
    reviews: []
  },
  {
    id: 'acc-16',
    name: 'Golden Lady Uhr',
    name_fr: 'Montre Golden Lady',
    slug: 'montre-elegante-doree-golden-lady',
    price: 480,
    description: 'Eine elegante, vergoldete Uhr für die Frau, die gerne glänzt. Ein Schmuckstück, das die Zeit anzeigt.',
    description_fr: 'Une montre élégante et dorée pour la femme qui aime briller. Un bijou qui donne l\'heure.',
    category: 'accessories',
    images: ['montre-elegante-doree-golden-lady'],
    reviews: [{ author: 'Marie', rating: 5, comment: 'Absolument magnifique, je l\'adore !' }]
  },
  {
    id: 'acc-17',
    name: 'Silver Pure Uhr',
    name_fr: 'Montre Silver Pure',
    slug: 'montre-argentee-minimaliste-silver-pure',
    price: 350,
    description: 'Eine minimalistische, versilberte Uhr. Die Essenz von schlichter Eleganz.',
    description_fr: 'Une montre minimaliste et argentée. L\'essence de l\'élégance épurée.',
    category: 'accessories',
    images: ['montre-argentee-minimaliste-silver-pure'],
    reviews: []
  },
  {
    id: 'acc-18',
    name: 'Soft Elegance Uhr',
    name_fr: 'Montre Soft Elegance',
    slug: 'montre-cuir-beige-soft-elegance',
    price: 320,
    description: 'Eine Uhr mit beigem Lederarmband für eine sanfte und raffinierte Eleganz.',
    description_fr: 'Une montre avec un bracelet en cuir beige pour une élégance douce et raffinée.',
    category: 'accessories',
    images: ['montre-cuir-beige-soft-elegance'],
    reviews: []
  },
  {
    id: 'acc-19',
    name: 'Rose Queen Uhr',
    name_fr: 'Montre Rose Queen',
    slug: 'montre-rose-gold-maille-milanaise-rose-queen',
    price: 420,
    description: 'Eine Uhr in Roségold mit Milanaise-Armband. Die Königin der Uhren.',
    description_fr: 'Une montre en or rose avec un bracelet en maille milanaise. La reine des montres.',
    category: 'accessories',
    images: ['montre-rose-gold-maille-milanaise-rose-queen'],
    reviews: []
  },
  {
    id: 'acc-20',
    name: 'Cozy Glam Mütze',
    name_fr: 'Bonnet Cozy Glam',
    slug: 'bonnet-laine-pompon-fourrure-synthetique-cozy-glam',
    price: 90,
    description: 'Eine Wollmütze mit einem Bommel aus Kunstpelz, für einen glamourösen und gemütlichen Winter.',
    description_fr: 'Un bonnet en laine avec un pompon en fourrure synthétique, pour un hiver glamour et douillet.',
    category: 'winter-clothing',
    images: ['bonnet-laine-pompon-fourrure-synthetique-cozy-glam'],
    reviews: []
  },
  {
    id: 'acc-21',
    name: 'Urban Chic Mütze',
    name_fr: 'Bonnet Urban Chic',
    slug: 'bonnet-long-oversize-urban-chic',
    price: 70,
    description: 'Eine lange Oversize-Mütze für einen urbanen und schicken Look.',
    description_fr: 'Un bonnet long et oversize pour un look urbain et chic.',
    category: 'accessories',
    images: ['bonnet-long-oversize-urban-chic'],
    reviews: []
  },
  {
    id: 'acc-22',
    name: 'Winter Pearl Mütze',
    name_fr: 'Bonnet Winter Pearl',
    slug: 'bonnet-tricote-perle-winter-pearl',
    price: 85,
    description: 'Eine gestrickte Mütze mit Perlen verziert, für einen Hauch von winterlicher Zartheit.',
    description_fr: 'Un bonnet tricoté orné de perles, pour une touche de délicatesse hivernale.',
    category: 'winter-clothing',
    images: ['bonnet-tricote-perle-winter-pearl'],
    reviews: []
  },
  {
    id: 'acc-23',
    name: 'Luxe Soft Schal',
    name_fr: 'Écharpe Luxe Soft',
    slug: 'echarpe-oversize-fausse-fourrure-luxe-soft',
    price: 180,
    description: 'Ein Oversize-Schal aus Kunstpelz für einen Hauch von Luxus und extremer Weichheit.',
    description_fr: 'Une écharpe oversize en fausse fourrure pour une touche de luxe et de douceur extrême.',
    category: 'winter-clothing',
    images: ['echarpe-oversize-fausse-fourrure-luxe-soft'],
    reviews: []
  },
  {
    id: 'acc-24',
    name: 'Warm Plush Schal',
    name_fr: 'Écharpe Warm Plush',
    slug: 'echarpe-maille-torsadee-warm-plush',
    price: 130,
    description: 'Ein Schal aus Zopfstrick, um sich stilvoll in Wärme zu hüllen.',
    description_fr: 'Une écharpe en maille torsadée pour s\'envelopper de chaleur avec style.',
    category: 'winter-clothing',
    images: ['echarpe-maille-torsadee-warm-plush'],
    reviews: []
  },
  {
    id: 'acc-25',
    name: 'Elegant Wrap Stola',
    name_fr: 'Châle Elegant Wrap',
    slug: 'chale-hiver-motif-elegant-elegant-wrap',
    price: 160,
    description: 'Eine Winterstola mit elegantem Muster, um jedes Outfit zu veredeln.',
    description_fr: 'Un châle d\'hiver au motif élégant pour sublimer n\'importe quelle tenue.',
    category: 'winter-clothing',
    images: ['chale-hiver-motif-elegant-elegant-wrap'],
    reviews: []
  },
  {
    id: 'acc-26',
    name: 'Cashmere Touch Foulard',
    name_fr: 'Foulard Cashmere Touch',
    slug: 'foulard-cachemire-imprime-cashmere-touch',
    price: 220,
    description: 'Ein bedruckter Schal mit Kaschmir-Gefühl für einen Hauch von Farbe und Weichheit.',
    description_fr: 'Un foulard imprimé au toucher cachemire pour une touche de couleur et de douceur.',
    category: 'accessories',
    images: ['foulard-cachemire-imprime-cashmere-touch'],
    reviews: []
  },
  {
    id: 'acc-27',
    name: 'Lady Warm Handschuhe',
    name_fr: 'Gants Lady Warm',
    slug: 'gants-cuir-doubles-polaire-lady-warm',
    price: 110,
    description: 'Lederhandschuhe mit Fleecefutter, um Eleganz und Wärme zu vereinen.',
    description_fr: 'Des gants en cuir doublés de polaire pour allier élégance et chaleur.',
    category: 'winter-clothing',
    images: ['gants-cuir-doubles-polaire-lady-warm'],
    reviews: []
  },
  {
    id: 'acc-28',
    name: 'Mini Glam Handtasche',
    name_fr: 'Petit sac à main Mini Glam',
    slug: 'petit-sac-a-main-chic-mini-glam',
    price: 450,
    description: 'Eine kleine, schicke Handtasche, das unverzichtbare Accessoire für Ihre Abendveranstaltungen.',
    description_fr: 'Un petit sac à main chic, l\'accessoire indispensable pour vos soirées.',
    category: 'accessories',
    images: ['petit-sac-a-main-chic-mini-glam'],
    reviews: []
  },
  {
    id: 'acc-29',
    name: 'Shine Drop Ohrringe',
    name_fr: 'Boucles d\'oreilles Shine Drop',
    slug: 'boucles-oreilles-pendantes-argentees-shine-drop',
    price: 180,
    description: 'Hängende, versilberte Ohrringe, um Ihr Gesicht mit einem Hauch von Glanz zu erhellen.',
    description_fr: 'Des boucles d\'oreilles pendantes et argentées pour illuminer votre visage d\'un éclat.',
    category: 'accessories',
    images: ['boucles-oreilles-pendantes-argentees-shine-drop'],
    reviews: []
  },
  {
    id: 'acc-30',
    name: 'Shine Night Clutch',
    name_fr: 'Pochette Shine Night',
    slug: 'pochette-soiree-shine-night-premium',
    price: 250,
    description: 'Eine Abendclutch, um Ihre wichtigsten Dinge mit Eleganz zu transportieren.',
    description_fr: 'Une pochette de soirée pour transporter vos essentiels avec élégance.',
    category: 'accessories',
    images: ['pochette-soiree-shine-night-premium'],
    reviews: []
  },
    {
    id: 'prod-21',
    name: 'Robe pull en cachemire',
    name_fr: 'Robe pull en cachemire',
    slug: 'robe-pull-en-cachemire-max-mara',
    price: 1200,
    description: 'Une robe pull luxueuse en pur cachemire, pour une élégance confortable et chaleureuse.',
    description_fr: 'Une robe pull luxueuse en pur cachemire, pour une élégance confortable et chaleureuse.',
    category: 'womens-clothing',
    images: ['robe-pull-en-cachemire-max-mara'],
    reviews: []
  },
  {
    id: 'prod-22',
    name: 'Pantalon en cuir',
    name_fr: 'Pantalon en cuir',
    slug: 'pantalon-en-cuir-saint-laurent',
    price: 1500,
    description: 'Un pantalon en cuir d\'agneau souple, coupe slim, pour un look rock et chic.',
    description_fr: 'Un pantalon en cuir d\'agneau souple, coupe slim, pour un look rock et chic.',
    category: 'womens-clothing',
    images: ['pantalon-en-cuir-saint-laurent'],
    reviews: []
  },
  {
    id: 'prod-23',
    name: 'Jupe plissée midi',
    name_fr: 'Jupe plissée midi',
    slug: 'jupe-plissee-midi-valentino',
    price: 850,
    description: 'Une jupe midi plissée, fluide et légère, pour un mouvement gracieux et une allure féminine.',
    description_fr: 'Une jupe midi plissée, fluide et légère, pour un mouvement gracieux et une allure féminine.',
    category: 'womens-clothing',
    images: ['jupe-plissee-midi-valentino'],
    reviews: []
  },
  {
    id: 'prod-24',
    name: 'T-shirt brodé logo',
    name_fr: 'T-shirt brodé logo',
    slug: 't-shirt-brode-logo-gucci',
    price: 450,
    description: 'Un t-shirt en coton de qualité supérieure, rehaussé du logo emblématique brodé de la maison.',
    description_fr: 'Un t-shirt en coton de qualité supérieure, rehaussé du logo emblématique brodé de la maison.',
    category: 'womens-clothing',
    images: ['t-shirt-brode-logo-gucci'],
    reviews: []
  }
];


// --- Data-fetching functions ---

export function getProductsByCategory(products: Product[], categorySlug: string, limit?: number, excludeId?: string): Product[] {
  let filteredProducts: Product[];

  if (categorySlug === 'all') {
    filteredProducts = products;
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
