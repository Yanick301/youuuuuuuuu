import { getProductsByCategory, categories } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import { TranslatedText } from '@/components/TranslatedText';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  const allCategories = [{ slug: 'all' }, ...categories];
  return allCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const category = categories.find((c) => c.slug === categorySlug);
  const title = categorySlug === 'all' ? 'Alle Produkte' : category?.name;

  return {
    title: `${title} | EZCENTIALS`,
  };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;
  const products = getProductsByCategory(categorySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  const title = categorySlug === 'all' ? 'Alle Produkte' : category?.name;
  const titleFr = categorySlug === 'all' ? 'Tous les produits' : category?.name_fr;

  if (!products) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center font-headline text-4xl md:text-5xl">
        <TranslatedText fr={titleFr || 'Produits'}>{title || 'Produkte'}</TranslatedText>
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          <TranslatedText fr="Aucun produit trouvé dans cette catégorie.">Keine Produkte in dieser Kategorie gefunden.</TranslatedText>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
