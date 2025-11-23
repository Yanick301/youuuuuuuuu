
import type { Product, Category, Review } from './types';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Herrenbekleidung', name_fr: 'Vêtements Homme', slug: 'mens-clothing', imageId: 'mens-category' },
  { id: 'cat-2', name: 'Damenbekleidung', name_fr: 'Vêtements Femme', slug: 'womens-clothing', imageId: 'womens-category' },
  { id: 'cat-3', name: 'Accessoires', name_fr: 'Accessoires', slug: 'accessories', imageId: 'accessories-category' },
  { id: 'cat-5', name: 'Schuhe', name_fr: 'Chaussures', slug: 'shoes', imageId: 'shoes-category' },
  { id: 'cat-4', name: 'Winterkleidung', name_fr: 'Vêtements d\'hiver', slug: 'winter-clothing', imageId: 'winter-category' },
];

export const products: Product[] = [
  // Winter Wear - Men
  {
    id: 'prod-winter-1',
    name: 'Langer Wollmantel von Hugo Boss',
    name_fr: 'Manteau Long en Laine Hugo Boss',
    slug: 'manteau-long-laine-hugo-boss',
    price: 799.00,
    description: 'Ein klassischer langer Mantel aus reiner Schurwolle, der Wärme und eine tadellos elegante Silhouette von Hugo Boss bietet.',
    description_fr: 'Un manteau long classique en pure laine vierge qui offre chaleur et une silhouette impeccablement élégante par Hugo Boss.',
    category: 'winter-clothing',
    images: ['manteau-long-laine-hugo-boss'],
    reviews: [
        { author: 'Klaus', rating: 5, comment: 'Absolut fantastischer Mantel. Die Qualität ist unübertroffen und er ist jeden Cent wert.' },
        { author: 'Helena', rating: 5, comment: 'Habe diesen Mantel für meinen Mann gekauft und er sieht so elegant aus. Perfekte Passform.' },
        { author: 'Stefan', rating: 4, comment: 'Sehr warm und stilvoll. Ein bisschen steif am Anfang, aber das gibt sich mit der Zeit.' },
        { author: 'Lina', rating: 5, comment: 'Ein zeitloser Klassiker. Sehr zufrieden mit dem Kauf.' },
        { author: 'Markus', rating: 3, comment: 'Guter Mantel, aber ich hatte für den Preis eine etwas weichere Wolle erwartet.' }
    ],
  },
  {
    id: 'prod-winter-2',
    name: 'Gesteppte Daunenjacke von Moncler',
    name_fr: 'Doudoune Matelassée Moncler',
    slug: 'doudoune-matelassee-moncler',
    price: 1250.00,
    description: 'Die ikonische Daunenjacke von Moncler, die technische Leistung und alpinen Stil für optimalen Kälteschutz vereint.',
    description_fr: 'L\'emblématique doudoune Moncler, alliant performance technique et style alpin pour une protection optimale contre le froid.',
    category: 'winter-clothing',
    images: ['doudoune-matelassee-moncler'],
    reviews: [
        { author: 'Alex', rating: 5, comment: 'Unglaublich leicht und extrem warm. Perfekt für den Winter in der Stadt.' },
        { author: 'Sophie', rating: 5, comment: 'Der Stil ist unübertroffen. Moncler enttäuscht nie.' },
        { author: 'Tom', rating: 5, comment: 'Die Investition lohnt sich. Eine Jacke, die Jahre halten wird.' },
        { author: 'Julia', rating: 4, comment: 'Sehr gute Jacke, aber die glänzende Oberfläche ist nicht jedermanns Sache.' },
        { author: 'Chris', rating: 3, comment: 'Warm, ja, aber der Reißverschluss klemmt manchmal. Bei diesem Preis hätte ich das nicht erwartet.' }
    ],
  },
  {
    id: 'prod-winter-3',
    name: 'Arctic Parka von Canada Goose',
    name_fr: 'Parka Arctic Canada Goose',
    slug: 'parka-arctic-canada-goose',
    price: 1150.00,
    description: 'Entwickelt für die extremsten Klimazonen, ist der Arctic Parka von Canada Goose der Gipfel an Wärme und Haltbarkeit.',
    description_fr: 'Conçu pour les climats les plus extrêmes, le parka Arctic de Canada Goose est le summum de la chaleur et de la durabilité.',
    category: 'winter-clothing',
    images: ['parka-arctic-canada-goose'],
    reviews: [
        { author: 'Ben', rating: 5, comment: 'Kein kalter Tag kann diesem Parka etwas anhaben. Unglaublich.' },
        { author: 'Anna', rating: 5, comment: 'Sehr funktional mit all den Taschen. Und so warm!' },
        { author: 'David', rating: 5, comment: 'Die beste Winterjacke, die ich je besessen habe.' },
        { author: 'Lea', rating: 4, comment: 'Extrem warm, aber auch ziemlich schwer. Für den Alltag manchmal zu viel.' },
        { author: 'Martin', rating: 3, comment: 'Hält warm, aber das Design ist etwas zu sperrig für meinen Geschmack.' }
    ],
  },
  {
    id: 'prod-winter-4',
    name: 'Kaschmirmantel von Loro Piana für Herren',
    name_fr: 'Manteau en Cachemire Loro Piana pour Homme',
    slug: 'manteau-cachemire-loro-piana-homme',
    price: 4500.00,
    description: 'Luxus in seiner reinsten Form. Dieser doppelseitige Kaschmirmantel von Loro Piana ist von unvergleichlicher Weichheit und Wärme.',
    description_fr: 'Le luxe à l\'état pur. Ce manteau en cachemire double face de Loro Piana est d\'une douceur et d\'une chaleur inégalées.',
    category: 'winter-clothing',
    images: ['manteau-cachemire-loro-piana-homme'],
    reviews: [
        { author: 'Arthur', rating: 5, comment: 'Das ist kein Mantel, das ist ein Traum. Die Weichheit ist unglaublich.' },
        { author: 'Isabelle', rating: 5, comment: 'Der Preis ist hoch, aber die Qualität ist einfach von einer anderen Welt. Phänomenal.' },
        { author: 'Richard', rating: 5, comment: 'Man fühlt sich wie ein König, wenn man ihn trägt. Jeder Detail ist perfekt.' },
        { author: 'Charlotte', rating: 5, comment: 'Der luxuriöseste Stoff, den ich je berührt habe.' },
        { author: 'Philip', rating: 3, comment: 'Wunderbar weich, aber für diesen Preis ist er überraschend empfindlich. Man muss sehr vorsichtig sein.' }
    ],
  },
  {
    id: 'prod-winter-5',
    name: 'Shearling-Blouson von Saint Laurent',
    name_fr: 'Blouson en Shearling Saint Laurent',
    slug: 'blouson-shearling-saint-laurent',
    price: 4800.00,
    description: 'Ein kühner Fliegerblouson aus gewachsenem Lammfell von Saint Laurent für einen rockigen und luxuriösen Stil.',
    description_fr: 'Un audacieux blouson aviateur en peau de mouton retournée par Saint Laurent pour un style rock et luxueux.',
    category: 'winter-clothing',
    images: ['blouson-shearling-saint-laurent'],
    reviews: [
        { author: 'Jules', rating: 5, comment: 'Rock\'n\'Roll und Luxus perfekt vereint. Ich liebe diese Jacke.' },
        { author: 'Adèle', rating: 5, comment: 'Sieht unglaublich cool aus und ist dabei super warm. Ein echtes Statement-Stück.' },
        { author: 'Victor', rating: 5, comment: 'Die Qualität des Lammfells ist außergewöhnlich. Ein Kunstwerk.' },
        { author: 'Margot', rating: 4, comment: 'Wunderschöne Jacke. Der Schnitt ist sehr tailliert, man sollte eventuell eine Nummer größer nehmen.' },
        { author: 'Louis', rating: 3, comment: 'Tolles Design, aber sehr schwer auf den Schultern. Nicht für lange Spaziergänge.' }
    ],
  },
  {
    id: 'prod-winter-6',
    name: 'Rollkragenpullover aus Merinowolle von Paul Smith',
    name_fr: 'Pull à Col Roulé en Laine Mérinos Paul Smith',
    slug: 'pull-col-roule-laine-merinos-paul-smith',
    price: 350.00,
    description: 'Ein unverzichtbares Winter-Basic: Dieser Rollkragenpullover aus feiner Merinowolle von Paul Smith ist ebenso weich wie vielseitig.',
    description_fr: 'Un basique hivernal essentiel, ce pull à col roulé en fine laine mérinos de Paul Smith est aussi doux que polyvalent.',
    category: 'winter-clothing',
    images: ['pull-col-roule-laine-merinos-paul-smith'],
    reviews: [
        { author: 'Tim', rating: 5, comment: 'Perfektes Basic. Super weich und kratzt nicht.' },
        { author: 'Clara', rating: 5, comment: 'Die Farbe ist brillant und die Qualität ist top. Passt zu allem.' },
        { author: 'Felix', rating: 4, comment: 'Guter Pullover, fällt aber etwas klein aus. Lieber eine Nummer größer bestellen.' },
        { author: 'Sandra', rating: 5, comment: 'Ein eleganter und bequemer Pullover. Sehr empfehlenswert.' },
        { author: 'Peter', rating: 3, comment: 'Nach ein paar Mal Waschen hat er etwas an Form verloren, obwohl ich die Anweisungen befolgt habe.' }
    ],
  },
  {
    id: 'prod-winter-7',
    name: 'Gefüttertes Überhemd von Acne Studios für Herren',
    name_fr: 'Surchemise Doublée Acne Studios pour Homme',
    slug: 'surchemise-doublee-acne-studios-homme',
    price: 420.00,
    description: 'Das gefütterte Wollflanell-Überhemd von Acne Studios, perfekt für Lagenlooks in der Übergangszeit mit skandinavischem Touch.',
    description_fr: 'La surchemise en flanelle de laine doublée d\'Acne Studios, parfaite pour les superpositions de mi-saison avec une touche scandinave.',
    category: 'winter-clothing',
    images: ['surchemise-doublee-acne-studios-homme'],
    reviews: [
        { author: 'Oskar', rating: 5, comment: 'Perfekt für den Herbst. Sieht toll aus und ist sehr gut verarbeitet.' },
        { author: 'Freja', rating: 5, comment: 'Cooler Oversize-Look. Die Qualität des Wollflanells ist super.' },
        { author: 'Emil', rating: 5, comment: 'Mein neues Lieblingsteil für Lagenlooks.' },
        { author: 'Astrid', rating: 4, comment: 'Sehr stylisch, aber die Ärmel sind für mich ein wenig zu lang.' },
        { author: 'Gustav', rating: 3, comment: 'Der Stoff ist etwas kratzig auf der Haut. Ich muss immer ein Langarmshirt darunter tragen.' }
    ],
  },
  {
    id: 'prod-winter-8',
    name: 'Ärmellose Daunenjacke von Polo Ralph Lauren',
    name_fr: 'Doudoune Sans Manches Polo Ralph Lauren',
    slug: 'doudoune-sans-manche-polo-ralph-lauren',
    price: 250.00,
    description: 'Leicht und praktisch ist diese ärmellose Daunenjacke ein Klassiker von Polo Ralph Lauren, ideal über einem Pullover oder unter einem Mantel.',
    description_fr: 'Légère et pratique, cette doudoune sans manches est un classique de Polo Ralph Lauren, idéale sur un pull ou sous un manteau.',
    category: 'winter-clothing',
    images: ['doudoune-sans-manche-polo-ralph-lauren'],
    reviews: [
        { author: 'Paul', rating: 5, comment: 'Ein Klassiker. Perfekt für die Übergangszeit.' },
        { author: 'Marie', rating: 4, comment: 'Gute Qualität, wie von Ralph Lauren erwartet. Hätte mir etwas mehr Daunenfüllung gewünscht.' },
        { author: 'Jonas', rating: 5, comment: 'Sehr praktisch und vielseitig. Trage sie ständig.' },
        { author: 'Laura', rating: 5, comment: 'Sieht sportlich und gleichzeitig schick aus.' },
        { author: 'Kevin', rating: 3, comment: 'Die Passform ist etwas kastig. Nicht ideal für schlanke Personen.' }
    ],
  },
  {
    id: 'prod-winter-9',
    name: 'Doppelreihiger Trenchcoat von Burberry',
    name_fr: 'Trench-Coat Double Boutonnage Burberry',
    slug: 'manteau-trench-double-burberry',
    price: 1990.00,
    description: 'Der ikonische Trenchcoat von Burberry. Ein zeitloses und wetterfestes Stück, Symbol britischer Eleganz.',
    description_fr: 'L\'iconique trench-coat de Burberry. Une pièce intemporelle et résistante aux intempéries, symbole de l\'élégance britannique.',
    category: 'winter-clothing',
    images: ['manteau-trench-double-burberry'],
    reviews: [
        { author: 'James', rating: 5, comment: 'Ein absolutes Muss in jeder Garderobe. Die Qualität ist unbestreitbar.' },
        { author: 'Amelia', rating: 5, comment: 'Der Schnitt ist perfekt. Ein Mantel fürs Leben.' },
        { author: 'William', rating: 5, comment: 'Zeitlose Eleganz. Schützt perfekt vor Regen und Wind.' },
        { author: 'Olivia', rating: 4, comment: 'Wunderschön, aber der Preis ist natürlich sehr hoch. Man zahlt für die Marke.' },
        { author: 'Henry', rating: 3, comment: 'Das Material ist steifer als erwartet. Ich dachte, er wäre etwas weicher.' }
    ],
  },
  {
    id: 'prod-winter-10',
    name: 'Dicker Zopfmusterpullover von Dior Homme',
    name_fr: 'Pull Épais à Torsades Dior Homme',
    slug: 'pull-torsade-epais-dior-homme',
    price: 1100.00,
    description: 'Ein reich texturierter Pullover aus Wolle und Kaschmir, verziert mit klassischen Zopfmustern. Ein Meisterstück von Dior.',
    description_fr: 'Un pull richement texturé en laine et cachemire, orné de torsades classiques. Une pièce maîtresse de Dior.',
    category: 'winter-clothing',
    images: ['pull-torsade-epais-dior-homme'],
    reviews: [
        { author: 'Antoine', rating: 5, comment: 'Unglaublich weich und warm. Das Zopfmuster ist wunderschön gearbeitet.' },
        { author: 'Camille', rating: 5, comment: 'Ein sehr luxuriöser Pullover. Der hohe Preis ist durch die Qualität gerechtfertigt.' },
        { author: 'Lucas', rating: 5, comment: 'Man spürt die Handwerkskunst. Ein wirklich besonderes Stück.' },
        { author: 'Manon', rating: 4, comment: 'Sehr schön, aber auch sehr dick. Man kann ihn nur an wirklich kalten Tagen tragen.' },
        { author: 'Hugo', rating: 3, comment: 'Ich habe Bedenken wegen Pilling. Bei einem so teuren Pullover sollte das kein Thema sein.' }
    ],
  },
  {
    id: 'prod-winter-11',
    name: 'Wasserdichte technische Jacke der TNF Black Series',
    name_fr: 'Veste Technique Imperméable TNF Black Series',
    slug: 'veste-technique-impermeable-tnf-black-series',
    price: 650.00,
    description: 'Aus der High-End-Linie von The North Face kombiniert diese Jacke futuristisches Design mit maximalem Schutz vor den Elementen.',
    description_fr: 'Issue de la ligne haut de gamme de The North Face, cette veste combine un design futuriste avec une protection maximale contre les éléments.',
    category: 'winter-clothing',
    images: ['veste-technique-impermeable-tnf-black-series'],
    reviews: [
        { author: 'Kenji', rating: 5, comment: 'Techwear vom Feinsten. Absolut wasserdicht und sieht mega aus.' },
        { author: 'Yuki', rating: 5, comment: 'Das Design ist der Wahnsinn. Funktionalität und Stil in einem.' },
        { author: 'Ryo', rating: 4, comment: 'Top Jacke. Der Schnitt ist sehr modern und vielleicht nicht für jeden geeignet.' },
        { author: 'Mei', rating: 5, comment: 'Hält mich bei jedem Wetter trocken. Und die Details sind unglaublich.' },
        { author: 'Kai', rating: 3, comment: 'Das Material ist etwas laut, es knistert bei jeder Bewegung. Das stört mich ein wenig.' }
    ],
  },
  // Winter Wear - Women
  {
    id: 'prod-winter-12',
    name: 'Seiden-Midikleid von Gucci',
    name_fr: 'Robe Midi en Soie Gucci',
    slug: 'robe-midi-en-soie-gucci',
    price: 2500.00,
    description: 'Ein Midikleid aus Seiden-Crêpe von Gucci, verziert mit einem kühnen Druck für maximale Eleganz.',
    description_fr: 'Une robe midi en crêpe de soie par Gucci, ornée d\'un imprimé audacieux pour une élégance maximale.',
    category: 'womens-clothing',
    images: ['robe-midi-en-soie-gucci'],
    reviews: [
        { author: 'Chiara', rating: 5, comment: 'Ein absoluter Traum von einem Kleid. Der Stoff fällt wunderschön.' },
        { author: 'Alessia', rating: 5, comment: 'Der Druck ist einzigartig und sehr Gucci. Ich habe so viele Komplimente bekommen.' },
        { author: 'Marco', rating: 5, comment: 'Habe es meiner Frau geschenkt. Sie sah atemberaubend aus.' },
        { author: 'Giulia', rating: 4, comment: 'Wunderschön, aber die Seide ist sehr empfindlich und muss professionell gereinigt werden.' },
        { author: 'Paolo', rating: 3, comment: 'Das Muster ist mir persönlich zu auffällig. Weniger wäre mehr gewesen.' }
    ],
  },
  {
    id: 'prod-winter-13',
    name: 'Doppelreihiger Blazer von Balmain',
    name_fr: 'Blazer Croisé Balmain',
    slug: 'blazer-croise-balmain',
    price: 2200.00,
    description: 'Der ikonische doppelreihige Balmain-Blazer mit seinen goldenen Knöpfen, ein starkes Stück, das die Silhouette kühn strukturiert.',
    description_fr: 'L\'iconique blazer croisé Balmain avec ses boutons dorés, une pièce forte qui structure la silhouette avec audace.',
    category: 'womens-clothing',
    images: ['blazer-croise-balmain'],
    reviews: [
        { author: 'Victoire', rating: 5, comment: 'Dieser Blazer ist eine Rüstung. Man fühlt sich sofort stark und selbstbewusst.' },
        { author: 'Chloé', rating: 5, comment: 'Die Schulterpolster sind ikonisch. Perfekte Passform.' },
        { author: 'Olivier', rating: 5, comment: 'Ein zeitloses Stück, das jedes Outfit aufwertet.' },
        { author: 'Léa', rating: 4, comment: 'Ich liebe ihn, aber die goldenen Knöpfe sind sehr auffällig. Man muss den Rest des Outfits schlicht halten.' },
        { author: 'Juliette', rating: 3, comment: 'Der Schnitt ist für meine Figur etwas zu streng. Er wirkt sehr kastig an mir.' }
    ],
  },
  {
    id: 'prod-winter-14',
    name: 'Kaschmir-Rollkragenpullover von Loro Piana für Damen',
    name_fr: 'Pull à Col Roulé en Cachemire Loro Piana pour Femme',
    slug: 'pull-col-roule-cachemire-loro-piana-femme',
    price: 1800.00,
    description: 'Die Quintessenz von Luxus und Komfort. Dieser Rollkragenpullover von Loro Piana aus reinem Kaschmir ist wie eine zweite Haut.',
    description_fr: 'La quintessence du luxe et du confort. Ce pull à col roulé de Loro Piana en pur cachemire est comme une seconde peau.',
    category: 'womens-clothing',
    images: ['pull-col-roule-cachemire-loro-piana-femme'],
    reviews: [
        { author: 'Eleonora', rating: 5, comment: 'Der weichste Pullover, den ich je besessen habe. Es ist, als würde man eine Wolke tragen.' },
        { author: 'Beatrice', rating: 5, comment: 'Unglaubliche Qualität. Man spürt den Unterschied sofort.' },
        { author: 'Filippo', rating: 5, comment: 'Ein perfektes, luxuriöses Basic.' },
        { author: 'Sofia', rating: 4, comment: 'Wunderbar, aber man muss extrem vorsichtig beim Waschen sein.' },
        { author: 'Leonardo', rating: 3, comment: 'Für einen so einfachen Pullover ist der Preis astronomisch. Ja, er ist weich, aber... wow.' }
    ],
  },
  {
    id: 'prod-winter-15',
    name: 'Weite Wollhose von Max Mara',
    name_fr: 'Pantalon Large en Laine Max Mara',
    slug: 'pantalon-large-en-laine-max-mara',
    price: 650.00,
    description: 'Eine weit geschnittene Hose mit perfekter Passform aus fließender Wolle von Max Mara für einen schicken und lässigen Look.',
    description_fr: 'Un pantalon large à la coupe parfaite en laine fluide par Max Mara pour un look chic et décontracté.',
    category: 'womens-clothing',
    images: ['pantalon-large-en-laine-max-mara'],
    reviews: [
        { author: 'Gabriella', rating: 5, comment: 'Der Stoff fällt so elegant. Perfekte Hose fürs Büro und darüber hinaus.' },
        { author: 'Martina', rating: 5, comment: 'Sehr bequem und trotzdem unglaublich schick. Liebe die weite Passform.' },
        { author: 'Riccardo', rating: 5, comment: 'Max Mara kann einfach Hosen. Der Schnitt ist tadellos.' },
        { author: 'Valentina', rating: 4, comment: 'Musste sie kürzen lassen, da sie sehr lang ausfällt, aber ansonsten perfekt.' },
        { author: 'Andrea', rating: 3, comment: 'Die Farbe war online etwas anders als in echt. Ein wenig blasser.' }
    ],
  },
  {
    id: 'prod-winter-16',
    name: 'Premium Slim-Jeans von Diesel',
    name_fr: 'Jean Slim Premium Diesel',
    slug: 'jean-slim-premium-diesel',
    price: 280.00,
    description: 'Eine Slim-Jeans mit perfekter Passform und dezenter Waschung aus hochwertigem Denim von Diesel.',
    description_fr: 'Un jean slim à la coupe parfaite et au délavage subtil en denim de haute qualité par Diesel.',
    category: 'womens-clothing',
    images: ['jean-slim-premium-diesel'],
    reviews: [
        { author: 'Francesca', rating: 5, comment: 'Die beste Jeans, die ich je hatte. Sitzt wie eine zweite Haut.' },
        { author: 'Davide', rating: 5, comment: 'Toller Stretch-Anteil, sehr bequem.' },
        { author: 'Elena', rating: 4, comment: 'Gute Passform, aber die Waschung ist sehr dezent, fast nicht sichtbar.' },
        { author: 'Matteo', rating: 5, comment: 'Diesel-Qualität, wie man sie kennt. Top.' },
        { author: 'Silvia', rating: 3, comment: 'Fällt eine Nummer kleiner aus. Musste sie zurückschicken und neu bestellen.' }
    ],
  },
  {
    id: 'prod-winter-17',
    name: 'Bedruckte Seidenbluse von Saint Laurent',
    name_fr: 'Chemisier en Soie Imprimée Saint Laurent',
    slug: 'chemisier-en-soie-imprimee-saint-laurent',
    price: 1350.00,
    description: 'Eleganz und Modernität treffen in dieser fließenden Seidenbluse mit exklusivem Saint Laurent-Druck aufeinander.',
    description_fr: 'Élégance et modernité se rencontrent dans ce chemisier fluide en soie à l\'imprimé exclusif Saint Laurent.',
    category: 'womens-clothing',
    images: ['chemisier-en-soie-imprimee-saint-laurent'],
    reviews: [
        { author: 'Inès', rating: 5, comment: 'Der Druck ist so schick und die Seide fühlt sich himmlisch an.' },
        { author: 'Théo', rating: 5, comment: 'Ein echtes Kunstwerk. Verwandelt ein einfaches Outfit in einen Hingucker.' },
        { author: 'Juliette', rating: 4, comment: 'Sehr transparent, man muss ein Top darunter tragen, was ich nicht erwartet hatte.' },
        { author: 'Gaspard', rating: 5, comment: 'Typisch Saint Laurent. Cool, schick, perfekt.' },
        { author: 'Éloïse', rating: 3, comment: 'Wunderschön, aber der Preis für eine Bluse ist einfach atemberaubend.' }
    ],
  },
  {
    id: 'prod-winter-18',
    name: 'Kurzes Wollkleid von Prada',
    name_fr: 'Robe Courte en Laine Prada',
    slug: 'robe-courte-en-laine-prada',
    price: 1700.00,
    description: 'Ein kurzes Kleid mit strukturierter Silhouette aus feiner Wolle, sinnbildlich für den schicken Minimalismus von Prada.',
    description_fr: 'Une robe courte à la silhouette structurée en laine fine, emblématique du minimalisme chic de Prada.',
    category: 'womens-clothing',
    images: ['robe-courte-en-laine-prada'],
    reviews: [
        { author: 'Miuccia', rating: 5, comment: 'Prada-Minimalismus in Perfektion. Ein Kleid für die Ewigkeit.' },
        { author: 'Patrizio', rating: 5, comment: 'Der Schnitt ist so schmeichelhaft. Sehr architektonisch.' },
        { author: 'Donatella', rating: 4, comment: 'Sehr schick, aber das Wollmaterial ist ein wenig kratzig. Hätte etwas Weicheres erwartet.' },
        { author: 'Giorgio', rating: 5, comment: 'Ein zeitloses, elegantes Stück.' },
        { author: 'Franca', rating: 3, comment: 'Es ist SEHR kurz. Definitiv nichts für jeden Anlass oder jede Figur.' }
    ],
  },
  {
    id: 'prod-winter-19',
    name: 'Langer Kaschmirmantel von Max Mara',
    name_fr: 'Manteau Long en Cachemire Max Mara',
    slug: 'manteau-long-en-cachemire-max-mara',
    price: 4800.00,
    description: "Der ikonische 'Manuela'-Mantel von Max Mara aus reinem Kaschmir, ein zeitloses Stück von absoluter Eleganz.",
    description_fr: "L'iconique manteau 'Manuela' de Max Mara en pur cachemire, une pièce intemporelle d\'une élégance absolue.",
    category: 'womens-clothing',
    images: ['manteau-long-en-cachemire-max-mara'],
    reviews: [
        { author: 'Carine', rating: 5, comment: 'Es gibt einen Grund, warum dieser Mantel eine Ikone ist. Perfektion.' },
        { author: 'Anna', rating: 5, comment: 'Man hüllt sich in puren Luxus. Jederzeit wieder.' },
        { author: 'Emmanuelle', rating: 5, comment: 'Ein Investment, das sich lohnt. Der Schnitt, das Material... alles ist perfekt.' },
        { author: 'Franca', rating: 4, comment: 'Ein Traum von einem Mantel, aber die Pflege ist sehr aufwendig.' },
        { author: 'Grace', rating: 3, comment: 'Ich bin 1,60 m groß und der Mantel war leider viel zu lang für mich, sah aus wie ein Bademantel.' }
    ],
  },
  {
    id: 'prod-winter-20',
    name: 'Kurze Steppjacke von Moncler',
    name_fr: 'Veste Courte Matelassée Moncler',
    slug: 'veste-courte-matelassee-moncler',
    price: 990.00,
    description: 'Eine kurze, gesteppte Jacke, die Moncler-Performance mit einer femininen und modernen Silhouette verbindet.',
    description_fr: 'Une veste courte matelassée qui allie la performance Moncler à une silhouette féminine et moderne.',
    category: 'womens-clothing',
    images: ['veste-courte-matelassee-moncler'],
    reviews: [
        { author: 'Nina', rating: 5, comment: 'Schöne, taillierte Passform. Nicht so klobig wie andere Daunenjacken.' },
        { author: 'Eva', rating: 5, comment: 'Hält super warm und sieht trotzdem sehr modisch aus.' },
        { author: 'Max', rating: 4, comment: 'Gute Jacke, aber für den Preis hätte ich eine etwas bessere Daunenqualität erwartet.' },
        { author: 'Lena', rating: 5, comment: 'Ich liebe den kürzeren Schnitt. Perfekt zu hochgeschnittenen Hosen.' },
        { author: 'Ben', rating: 3, comment: 'Die Ärmel sind etwas kurz geraten für meine Armlänge.' }
    ],
  },
  {
    id: 'prod-winter-21',
    name: 'Oversize-Zopfmusterpullover von Chloé',
    name_fr: 'Pull Oversize à Torsades Chloé',
    slug: 'pull-oversize-torsade-chloe',
    price: 1200.00,
    description: 'Ein Oversize-Pullover aus dickem Zopfstrick, der die bohèmehafte Romantik des Hauses Chloé verkörpert.',
    description_fr: 'Un pull oversize en grosse maille torsadée qui incarne le romantisme bohème de la maison Chloé.',
    category: 'womens-clothing',
    images: ['pull-oversize-torsade-chloe'],
    reviews: [
        { author: 'Gabriela', rating: 5, comment: 'So gemütlich und trotzdem total schick. Der perfekte Winterpullover.' },
        { author: 'Natacha', rating: 5, comment: 'Die Wolle ist traumhaft weich und das Muster ist wunderschön.' },
        { author: 'Stella', rating: 4, comment: 'Er ist wirklich SEHR oversize. Man muss diesen Look mögen. Aber die Qualität ist top.' },
        { author: 'Clémence', rating: 5, comment: 'Ein echtes Statement-Stück, das man für immer behalten wird.' },
        { author: 'Aurore', rating: 3, comment: 'Leider kratzt er ein wenig. Für diesen Preis hatte ich eine weichere Wolle erwartet.' }
    ],
  },
  {
    id: 'prod-winter-22',
    name: 'Woll-Bleistiftrock von Hugo Boss',
    name_fr: 'Jupe Crayon en Laine Hugo Boss',
    slug: 'jupe-crayon-en-laine-hugo-boss',
    price: 350.00,
    description: 'Ein perfekt geschnittener Bleistiftrock aus Stretch-Wolle von Hugo Boss, unverzichtbar für eine professionelle Garderobe.',
    description_fr: 'Une jupe crayon parfaitement coupée en laine stretch par Hugo Boss, indispensable pour une garde-robe professionnelle.',
    category: 'womens-clothing',
    images: ['jupe-crayon-en-laine-hugo-boss'],
    reviews: [
        { author: 'Anke', rating: 5, comment: 'Perfekter Rock fürs Büro. Sehr professionell und bequem.' },
        { author: 'Birgit', rating: 5, comment: 'Der Schnitt ist sehr schmeichelhaft. Macht eine tolle Figur.' },
        { author: 'Heike', rating: 4, comment: 'Gute Qualität, aber der Bund ist etwas eng. Besser eine Nummer größer probieren.' },
        { author: 'Sabine', rating: 5, comment: 'Ein klassisches Teil, das in keinem Kleiderschrank fehlen sollte.' },
        { author: 'Ingrid', rating: 3, comment: 'Das Futter im Inneren verrutscht manchmal, was etwas nervig ist.' }
    ],
  },
  {
    id: 'prod-winter-23',
    name: 'Langes Plisseekleid von Valentino',
    name_fr: 'Robe Longue Plissée Valentino',
    slug: 'robe-longue-plissee-valentino',
    price: 3900.00,
    description: 'Eine spektakuläre Kreation von Valentino: Dieses lange Kleid aus plissiertem Stoff schwebt bei jeder Bewegung.',
    description_fr: 'Une création spectaculaire de Valentino, cette longue robe en tissu plissé flotte à chaque mouvement.',
    category: 'womens-clothing',
    images: ['robe-longue-plissee-valentino'],
    reviews: [
        { author: 'Pierpaolo', rating: 5, comment: 'Ein Kunstwerk. Jede Falte ist perfekt platziert.' },
        { author: 'Maria Grazia', rating: 5, comment: 'Man fühlt sich wie eine Göttin in diesem Kleid. Unglaublich.' },
        { author: 'Zendaya', rating: 5, comment: 'Atemberaubend auf dem roten Teppich. Es bewegt sich so schön.' },
        { author: 'Florence', rating: 4, comment: 'Ein wunderschönes Kleid, aber es ist extrem lang. Man braucht hohe Absätze.' },
        { author: 'Adut', rating: 3, comment: 'Der Stoff ist sehr empfindlich. Ich hatte Angst, es zu beschädigen.' }
    ],
  },
  {
    id: 'prod-winter-24',
    name: 'Premium-Baumwollhemd von Burberry',
    name_fr: 'Chemise en Coton Premium Burberry',
    slug: 'chemise-en-coton-premium-burberry',
    price: 450.00,
    description: 'Ein makelloses weißes Hemd aus Premium-Baumwolle, verfeinert mit dezenten Details wie dem ikonischen Tartan-Muster im Kragen.',
    description_fr: 'Une chemise blanche impeccable en coton premium, rehaussée de détails discrets comme le tartan iconique à l\'intérieur du col.',
    category: 'womens-clothing',
    images: ['chemise-en-coton-premium-burberry'],
    reviews: [
        { author: 'Victoria', rating: 5, comment: 'Das perfekte weiße Hemd. Die Baumwolle ist von außergewöhnlicher Qualität.' },
        { author: 'David', rating: 5, comment: 'Die kleinen Burberry-Details machen den Unterschied. Sehr edel.' },
        { author: 'Kate', rating: 4, comment: 'Sehr schönes Hemd, aber es knittert ziemlich schnell.' },
        { author: 'William', rating: 5, comment: 'Ein Klassiker, der sein Geld wert ist.' },
        { author: 'Meghan', rating: 3, comment: 'Der Schnitt ist sehr gerade, nicht sehr feminin. Ich musste es taillieren lassen.' }
    ],
  },
  {
    id: 'prod-winter-25',
    name: 'Seiden-Wickelkleid von Diane von Furstenberg',
    name_fr: 'Robe Portefeuille en Soie Diane von Furstenberg',
    slug: 'robe-portefeuille-en-soie-diane-von-furstenberg',
    price: 550.00,
    description: 'Das ikonische DVF-Wickelkleid aus Seidenjersey, ein Stück, das jeder Silhouette mit zeitloser Eleganz schmeichelt.',
    description_fr: 'L\'iconique robe portefeuille DVF en jersey de soie, une pièce qui flatte toutes les silhouettes avec une élégance intemporelle.',
    category: 'womens-clothing',
    images: ['robe-portefeuille-en-soie-diane-von-furstenberg'],
    reviews: [
        { author: 'Diane', rating: 5, comment: 'Ein Kleid, in dem sich jede Frau schön und selbstbewusst fühlt.' },
        { author: 'Talita', rating: 5, comment: 'So schmeichelhaft und bequem. Ein Muss!' },
        { author: 'Sarah Jessica', rating: 5, comment: 'Ein Klassiker aus gutem Grund. Funktioniert immer.' },
        { author: 'Michelle', rating: 4, comment: 'Ich liebe das Konzept, aber das Muster war nicht ganz meins.' },
        { author: 'Whitney', rating: 3, comment: 'Der Ausschnitt ist sehr tief. Fürs Büro musste ich ein Top darunter tragen.' }
    ],
  },
  {
    id: 'prod-winter-26',
    name: 'Anzughose von Dior für Damen',
    name_fr: 'Pantalon de Tailleur Dior pour Femme',
    slug: 'pantalon-tailleur-dior-femme',
    price: 1200.00,
    description: 'Eine Anzughose mit tadellosem Schnitt, die das Savoir-faire und die Eleganz des Hauses Dior widerspiegelt.',
    description_fr: 'Un pantalon de tailleur à la coupe impeccable, qui reflète le savoir-faire et l\'élégance de la maison Dior.',
    category: 'womens-clothing',
    images: ['pantalon-tailleur-dior-femme'],
    reviews: [
        { author: 'Maria', rating: 5, comment: 'Perfekter Schnitt, perfekter Fall. Dior-Handwerkskunst.' },
        { author: 'Raf', rating: 5, comment: 'Die eleganteste Hose, die ich besitze.' },
        { author: 'Hedi', rating: 4, comment: 'Sehr hohe Taille, das muss man mögen. Aber die Qualität ist hervorragend.' },
        { author: 'John', rating: 5, comment: 'Ein Kunstwerk der Schneiderei.' },
        { author: 'Kim', rating: 3, comment: 'Für den Preis hätte ich einen etwas haltbareren Stoff erwartet. Er scheint empfindlich.' }
    ],
  },
  {
    id: 'prod-winter-27',
    name: 'U-Boot-Ausschnitt-Pullover von Ralph Lauren',
    name_fr: 'Pull à Col Bateau Ralph Lauren',
    slug: 'pull-col-bateau-ralph-lauren',
    price: 320.00,
    description: 'Ein klassischer Pullover mit U-Boot-Ausschnitt aus feinem Strick, ein vielseitiges und schickes Stück von Ralph Lauren.',
    description_fr: 'Un pull classique à encolure bateau en maille fine, une pièce polyvalente et chic de Ralph Lauren.',
    category: 'womens-clothing',
    images: ['pull-col-bateau-ralph-lauren'],
    reviews: [
        { author: 'Lauren', rating: 5, comment: 'Zeitlose amerikanische Eleganz. Liebe den U-Boot-Ausschnitt.' },
        { author: 'Ricky', rating: 5, comment: 'Sehr weich und angenehm zu tragen.' },
        { author: 'Jessica', rating: 4, comment: 'Fällt etwas größer aus. Ich würde empfehlen, eine Nummer kleiner zu nehmen.' },
        { author: 'Gwyneth', rating: 5, comment: 'Perfekt zu Jeans oder einem Rock. Sehr vielseitig.' },
        { author: 'Blake', rating: 3, comment: 'Der Strick ist sehr fein und wirkt etwas durchsichtig.' }
    ],
  },
  {
    id: 'prod-winter-28',
    name: 'Langer Kaschmir-Cardigan von Brunello Cucinelli',
    name_fr: 'Long Cardigan en Cachemire Brunello Cucinelli',
    slug: 'cardigan-long-en-cachemire-brunello-cucinelli',
    price: 2900.00,
    description: 'Die Quintessenz des lässigen Luxus. Dieser lange und umhüllende Cardigan ist aus feinstem Kaschmir gestrickt.',
    description_fr: 'La quintessence du luxe décontracté. Ce long et enveloppant cardigan est tricoté dans le plus fin des cachemires.',
    category: 'womens-clothing',
    images: ['cardigan-long-en-cachemire-brunello-cucinelli'],
    reviews: [
        { author: 'Brunello', rating: 5, comment: 'Philosophie in Form von Kleidung. Weichheit und Seele.' },
        { author: 'Federica', rating: 5, comment: 'Es ist, als würde man von einer warmen Wolke umarmt werden. Jeden Tag.' },
        { author: 'Carolina', rating: 5, comment: 'Der Inbegriff von "Quiet Luxury". Unaufdringlich perfekt.' },
        { author: 'Jennifer', rating: 5, comment: 'Ich lebe in diesem Cardigan. Er ist jeden Cent wert.' },
        { author: 'Gisele', rating: 3, comment: 'Wunderschön, aber so empfindlich. Ich habe Angst, ihn zu tragen und zu ruinieren.' }
    ],
  },
  {
    id: 'prod-winter-29',
    name: 'Asymmetrisches Kleid von Givenchy',
    name_fr: 'Robe Asymétrique Givenchy',
    slug: 'robe-asymetrique-givenchy',
    price: 2100.00,
    description: 'Ein schwarzes Kleid mit kühnem asymmetrischem Schnitt, sinnbildlich für den architektonischen und modernen Stil von Givenchy.',
    description_fr: 'Une robe noire à la coupe asymétrique audacieuse, emblématique du style architectural et moderne de Givenchy.',
    category: 'womens-clothing',
    images: ['robe-asymetrique-givenchy'],
    reviews: [
        { author: 'Audrey', rating: 5, comment: 'Einfach, aber so wirkungsvoll. Das kleine Schwarze, neu erfunden.' },
        { author: 'Hubert', rating: 5, comment: 'Die Linie ist alles. Dieses Kleid hat eine unglaubliche Linie.' },
        { author: 'Riccardo', rating: 4, comment: 'Sehr avantgardistisch. Man braucht das Selbstbewusstsein, um es zu tragen.' },
        { author: 'Clare', rating: 5, comment: 'Eine Hommage an die Stärke der Frauen. Kraftvoll und elegant.' },
        { author: 'Matthew', rating: 3, comment: 'Der asymmetrische Saum ist gewöhnungsbedürftig. Er sah an mir seltsam aus.' }
    ],
  },
  {
    id: 'prod-winter-30',
    name: 'Satinbluse von Stella McCartney',
    name_fr: 'Blouse Satinée Stella McCartney',
    slug: 'blouse-satinee-stella-mccartney',
    price: 650.00,
    description: 'Eine fließende und elegante Bluse aus nachhaltigem Seidensatin, perfekt für einen anspruchsvollen und bewussten Look.',
    description_fr: 'Une blouse fluide et élégante en satin de soie durable, parfaite pour un look sophistiqué et conscient.',
    category: 'womens-clothing',
    images: ['blouse-satinee-stella-mccartney'],
    reviews: [
        { author: 'Stella', rating: 5, comment: 'Luxus, der die Welt nicht kostet. Fühlt sich gut an, in jeder Hinsicht.' },
        { author: 'Paul', rating: 5, comment: 'Nachhaltig und trotzdem so schick. Ein tolles Statement.' },
        { author: 'Mary', rating: 4, comment: 'Der Glanz ist wunderschön, aber der Stoff knittert sehr leicht.' },
        { author: 'Linda', rating: 5, comment: 'Tolle Farbe und fällt sehr schön.' },
        { author: 'Liv', rating: 3, comment: 'Der Schnitt ist sehr locker. Ich musste sie enger nähen lassen.' }
    ],
  },
  {
    id: 'prod-winter-31',
    name: 'Jumpsuit von Balenciaga',
    name_fr: 'Combinaison-Pantalon Balenciaga',
    slug: 'combinaison-pantalon-balenciaga',
    price: 2400.00,
    description: 'Ein starkes Stück mit avantgardistischem Design. Dieser Balenciaga-Jumpsuit formt eine moderne und kraftvolle Silhouette.',
    description_fr: 'Une pièce forte au design avant-gardiste. Cette combinaison-pantalon Balenciaga sculpte une silhouette moderne et puissante.',
    category: 'womens-clothing',
    images: ['combinaison-pantalon-balenciaga'],
    reviews: [
        { author: 'Demna', rating: 5, comment: 'Mode als Kommentar. Dieser Jumpsuit ist eine Aussage.' },
        { author: 'Cristóbal', rating: 5, comment: 'Die Form ist alles. Eine Skulptur zum Anziehen.' },
        { author: 'Kim', rating: 4, comment: 'Sehr cool, aber nicht sehr praktisch im Alltag, besonders beim Toilettengang.' },
        { author: 'Nicole', rating: 5, comment: 'Ein unglaublicher Power-Look. Man fühlt sich unbesiegbar.' },
        { author: 'Isabelle', rating: 3, comment: 'Das Material ist sehr steif und nicht besonders bequem.' }
    ],
  },
  {
    id: 'prod-winter-32',
    name: 'Oversize-Mantel von Acne Studios',
    name_fr: 'Manteau Oversize Acne Studios',
    slug: 'manteau-oversize-acne-studios',
    price: 1100.00,
    description: 'Ein Oversize-Mantel aus doppelseitiger Wolle, charakteristisch für den coolen und minimalistischen Stil von Acne Studios.',
    description_fr: 'Un manteau oversize en laine double face, caractéristique du style cool et minimaliste d\'Acne Studios.',
    category: 'womens-clothing',
    images: ['manteau-oversize-acne-studios'],
    reviews: [
        { author: 'Jonny', rating: 5, comment: 'Der Inbegriff von Stockholm-Chic. Lässig und trotzdem elegant.' },
        { author: 'Elsa', rating: 5, comment: 'Perfekter Oversize-Schnitt. Man kann dicke Pullover darunter tragen.' },
        { author: 'Henrik', rating: 4, comment: 'Die Farbe ist etwas dunkler als auf den Fotos, aber immer noch sehr schön.' },
        { author: 'Ingrid', rating: 5, comment: 'So gemütlich und stilvoll. Ich liebe ihn.' },
        { author: 'Mikael', rating: 3, comment: 'Sehr schwer. Nach einem ganzen Tag Tragen spüre ich ihn auf den Schultern.' }
    ],
  },
  {
    id: 'prod-winter-33',
    name: 'Kaschmir-Pulloverkleid von Max Mara',
    name_fr: 'Robe-Pull en Cachemire Max Mara',
    slug: 'robe-pull-en-cachemire-max-mara',
    price: 1300.00,
    description: 'Dieses Pulloverkleid aus reinem Kaschmir vereint Komfort und Eleganz und ist ein luxuriöses und gemütliches Stück für den Winter.',
    description_fr: 'Alliant confort et élégance, cette robe-pull en pur cachemire est une pièce luxueuse et confortable pour l\'hiver.',
    category: 'womens-clothing',
    images: ['robe-pull-en-cachemire-max-mara'],
    reviews: [
        { author: 'Gigi', rating: 5, comment: 'So schick und bequem. Das perfekte Kleid für kalte Tage.' },
        { author: 'Bella', rating: 5, comment: 'Der Kaschmir ist von höchster Qualität. Fühlt sich unglaublich an.' },
        { author: 'Irina', rating: 4, comment: 'Wunderschön, aber sehr figurbetont. Zeigt alles.' },
        { author: 'Karlie', rating: 5, comment: 'Ein luxuriöses Wohlfühlkleid.' },
        { author: 'Rosie', rating: 3, comment: 'Es hat nach dem ersten Waschen (Handwäsche!) an Länge verloren. Sehr enttäuschend.' }
    ],
  },
  {
    id: 'prod-winter-34',
    name: 'Lederhose von Saint Laurent',
    name_fr: 'Pantalon en Cuir Saint Laurent',
    slug: 'pantalon-en-cuir-saint-laurent',
    price: 2800.00,
    description: 'Eine Skinny-Hose aus Stretch-Lammleder, ein ikonisches Stück aus der rockigen und schicken Garderobe von Saint Laurent.',
    description_fr: 'Un pantalon skinny en cuir d\'agneau stretch, une pièce iconique du vestiaire rock et chic de Saint Laurent.',
    category: 'womens-clothing',
    images: ['pantalon-en-cuir-saint-laurent'],
    reviews: [
        { author: 'Kate', rating: 5, comment: 'Perfekte Rock-Chic-Hose. Sitzt wie eine zweite Haut.' },
        { author: 'Anthony', rating: 5, comment: 'Das Leder ist so weich. Eine Investition, die sich lohnt.' },
        { author: 'Zoë', rating: 5, comment: 'Ich trage sie ständig. Passt zu allem.' },
        { author: 'Lenny', rating: 4, comment: 'Sehr eng geschnitten. Man braucht die richtige Figur dafür.' },
        { author: 'Hailey', rating: 3, comment: 'Das Leder hat sich nach ein paar Mal Tragen an den Knien etwas geweitet.' }
    ],
  },
  {
    id: 'prod-winter-35',
    name: 'Plissierter Midirock von Valentino',
    name_fr: 'Jupe Plissée Midi Valentino',
    slug: 'jupe-plissee-midi-valentino',
    price: 1800.00,
    description: 'Ein Midirock mit zartem Sonnenplissee, der bei jedem Schritt anmutig mitschwingt. Ein ikonisches Stück von Valentino.',
    description_fr: 'Une jupe midi au délicat plissé soleil qui ondule gracieusement à chaque pas. Une pièce iconique de Valentino.',
    category: 'womens-clothing',
    images: ['jupe-plissee-midi-valentino'],
    reviews: [
        { author: 'Anne', rating: 5, comment: 'Ein absolut traumhafter Rock. Die Bewegung ist magisch.' },
        { author: 'Jessica', rating: 5, comment: 'So feminin und elegant. Ich fühle mich wie eine Prinzessin.' },
        { author: 'Naomi', rating: 5, comment: 'Valentino-Rot ist einfach unschlagbar. Ein wunderschönes Stück.' },
        { author: 'Gwyneth', rating: 4, comment: 'Sehr empfindlich. Die Plisseefalten müssen sorgfältig behandelt werden.' },
        { author: 'Charlize', rating: 3, comment: 'Der Bund ist nicht elastisch und sitzt sehr hoch, was für mich unbequem war.' }
    ],
  },
  {
    id: 'prod-winter-36',
    name: 'T-Shirt mit gesticktem Gucci-Logo',
    name_fr: 'T-Shirt Brodé Logo Gucci',
    slug: 't-shirt-brode-logo-gucci',
    price: 550.00,
    description: 'Ein T-Shirt aus hochwertiger Baumwolle, veredelt mit dem gestickten Gucci-Logo für einen Hauch von lässigem Luxus.',
    description_fr: 'Un t-shirt en coton de qualité supérieure, rehaussé du logo Gucci brodé pour une touche de luxe décontracté.',
    category: 'womens-clothing',
    images: ['t-shirt-brode-logo-gucci'],
    reviews: [
        { author: 'Alessandro', rating: 5, comment: 'Ein einfaches T-Shirt, aber die Stickerei macht es besonders.' },
        { author: 'Jared', rating: 5, comment: 'Cool und bequem. Was will man mehr?' },
        { author: 'Harry', rating: 4, comment: 'Gute Qualität, aber es ist immer noch ein T-Shirt für über 500 Euro. Das ist verrückt.' },
        { author: 'Dakota', rating: 5, comment: 'Ich liebe den Vintage-Vibe des Logos.' },
        { author: 'Billie', rating: 3, comment: 'Fällt sehr groß aus. Der Oversize-Look ist nicht für jeden.' }
    ],
  },
  {
    id: 'prod-winter-37',
    name: 'U-Boot-Ausschnitt-Pullover mit Ballonärmeln von Chloé',
    name_fr: 'Pull à Col Bateau et Manches Ballon Chloé',
    slug: 'pull-col-bateau-manches-ballon-chloe',
    price: 950.00,
    description: 'Ein romantischer Pullover mit elegantem U-Boot-Ausschnitt und voluminösen Ballonärmeln, typisch für den Chloé-Stil.',
    description_fr: 'Un pull romantique avec une élégante encolure bateau et des manches ballon volumineuses, typique du style Chloé.',
    category: 'womens-clothing',
    images: ['pull-col-bateau-manches-ballon-chloe'],
    reviews: [
        { author: 'Gaby', rating: 5, comment: 'So romantisch und feminin. Die Ärmel sind ein Traum.' },
        { author: 'Natacha', rating: 5, comment: 'Der Chloé-Geist in einem Pullover. Wunderschön.' },
        { author: 'Chemena', rating: 5, comment: 'Weich, bequem und einzigartig.' },
        { author: 'Sienna', rating: 4, comment: 'Die Ballonärmel sind toll, aber im Alltag manchmal etwas unpraktisch.' },
        { author: 'Katie', rating: 3, comment: 'Der U-Boot-Ausschnitt ist sehr weit und rutscht ständig von meinen Schultern.' }
    ],
  },
  {
    id: 'prod-winter-38',
    name: 'Oversize-Hemdkleid von Balenciaga',
    name_fr: 'Robe-Chemise Oversize Balenciaga',
    slug: 'robe-chemise-oversize-balenciaga',
    price: 1250.00,
    description: 'Ein Hemdkleid mit kühnem Oversize-Schnitt für einen dekonstruierten und konzeptionellen Look von Balenciaga.',
    description_fr: 'Une robe-chemise à la coupe oversize audacieuse pour un look déconstruit et conceptuel par Balenciaga.',
    category: 'womens-clothing',
    images: ['robe-chemise-oversize-balenciaga'],
    reviews: [
        { author: 'Alexa', rating: 5, comment: 'Cooler geht es nicht. Perfekt mit klobigen Stiefeln.' },
        { author: 'Rihanna', rating: 5, comment: 'Bequem und High-Fashion zugleich.' },
        { author: 'Justin', rating: 4, comment: 'Es ist im Grunde ein riesiges Hemd. Man muss wissen, wie man es stylt.' },
        { author: 'Kanye', rating: 5, comment: 'Die Zukunft der Mode.' },
        { author: 'Anna W.', rating: 3, comment: 'Konzeptionell interessant, aber für die meisten Menschen untragbar.' }
    ],
  },
  {
    id: 'prod-winter-39',
    name: 'Palazzo-Hose aus Wolle von Max Mara',
    name_fr: 'Pantalon Palazzo en Laine Max Mara',
    slug: 'pantalon-palazzo-en-laine-max-mara',
    price: 750.00,
    description: 'Eine weite und fließende Palazzo-Hose aus Schurwolle, die die Silhouette mit spektakulärer Eleganz verlängert.',
    description_fr: 'Un pantalon palazzo large et fluide en laine vierge qui allonge la silhouette avec une élégance spectaculaire.',
    category: 'womens-clothing',
    images: ['pantalon-palazzo-en-laine-max-mara'],
    reviews: [
        { author: 'Cate', rating: 5, comment: 'Die eleganteste Hose, die man sich vorstellen kann. Der Fall des Stoffes ist perfekt.' },
        { author: 'Julianne', rating: 5, comment: 'Macht unendlich lange Beine. Sehr schmeichelhaft.' },
        { author: 'Amal', rating: 5, comment: 'Perfekt fürs Büro, aber auch für einen schicken Abend.' },
        { author: 'Angelina', rating: 4, comment: 'Sehr, sehr lang. Selbst mit hohen Absätzen musste ich sie kürzen lassen.' },
        { author: 'Jennifer G.', rating: 3, comment: 'Der Bund sitzt sehr hoch, was ich nicht so bequem finde.' }
    ],
  },
  {
    id: 'prod-winter-40',
    name: 'Satin-Blazer von Saint Laurent',
    name_fr: 'Blazer en Satin Saint Laurent',
    slug: 'blazer-satin-saint-laurent',
    price: 2600.00,
    description: 'Inspiriert vom Smoking bietet dieser Blazer aus Duchesse-Satin einen nächtlichen und ultra-raffinierten Look.',
    description_fr: 'Inspiré du smoking, ce blazer en satin duchesse offre un look nocturne et ultra-raffiné.',
    category: 'womens-clothing',
    images: ['blazer-satin-saint-laurent'],
    reviews: [
        { author: 'Betty', rating: 5, comment: 'Der "Le Smoking" Vibe ist unübertroffen. Ein ikonisches Stück.' },
        { author: 'Catherine', rating: 5, comment: 'Pure Eleganz. Der Satin-Glanz ist dezent und sehr edel.' },
        { author: 'Charlotte', rating: 5, comment: 'Ein Blazer, der Selbstvertrauen ausstrahlt.' },
        { author: 'Anja', rating: 4, comment: 'Wunderschön, aber der Satin ist extrem empfindlich gegenüber Flecken.' },
        { author: 'Freja B.E.', rating: 3, comment: 'Der Schnitt ist sehr schmal. Für Frauen mit Kurven eher schwierig.' }
    ],
  },
  {
    id: 'prod-winter-41',
    name: 'Langes Samtkleid von Valentino',
    name_fr: 'Robe Longue en Velours Valentino',
    slug: 'robe-longue-en-velours-valentino',
    price: 4500.00,
    description: 'Ein prächtiges Abendkleid aus Seidensamt, opulent und doch von großer Linienreinheit.',
    description_fr: 'Une somptueuse robe de soirée en velours de soie, opulente mais d\'une grande pureté de ligne.',
    category: 'womens-clothing',
    images: ['robe-longue-en-velours-valentino'],
    reviews: [
        { author: 'Lady Gaga', rating: 5, comment: 'Dramatisch, luxuriös, unvergesslich. Alles, was man von einem Abendkleid will.' },
        { author: 'Rihanna', rating: 5, comment: 'Der Samt ist so tief und satt in der Farbe. Wunderschön.' },
        { author: 'Zendaya', rating: 5, comment: 'Ein Red-Carpet-Moment in einem Kleid.' },
        { author: 'Anya', rating: 4, comment: 'Es ist sehr schwer wegen des vielen Stoffes, aber man fühlt sich wie eine Königin.' },
        { author: 'Margot', rating: 3, comment: 'Samt ist ein schwieriges Material. Es zieht jeden Fussel an.' }
    ],
  },
];


// --- Data-fetching functions ---

export function getProductsByCategory(categorySlug: string, limit?: number, excludeId?: string): Product[] {
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

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(limit: number = 4): Product[] {
    const winterProducts = products.filter(p => p.category === 'winter-clothing' || p.name.toLowerCase().includes('winter') || p.name.toLowerCase().includes('mantel') || p.name.toLowerCase().includes('pullover'));
    return winterProducts.slice(0, limit);
}
