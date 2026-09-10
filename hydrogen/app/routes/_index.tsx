import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Image, Money} from '@shopify/hydrogen';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Nenúfar | Regalos personalizados'}];
};

export async function loader({context}: Route.LoaderArgs) {
  const {products} = await context.storefront.query(NENUFAR_CATALOG_QUERY, {
    cache: context.storefront.CacheLong(),
  });

  return {products: products.nodes};
}

export default function Homepage() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-700">
          Nenúfar
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Regalos personalizados para cada ocasión
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          Explora piezas creadas para celebrar, agradecer y compartir. Personaliza los detalles antes de agregarlos al carrito.
        </p>
      </header>

      {products.length ? (
        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Productos">
          {products.map((product) => {
            const technique = metafieldValue(product.metafields, 'technique');
            const leadTime = metafieldValue(product.metafields, 'lead_time');
            const catalogName = metafieldValue(product.metafields, 'catalog_name');
            const price = product.priceRange.minVariantPrice;

            return (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <Link to={`/products/${product.handle}`} prefetch="intent" className="block">
                  {product.featuredImage ? (
                    <Image data={product.featuredImage} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="aspect-[4/3] bg-stone-100" aria-hidden="true" />
                  )}
                  <div className="p-5">
                    {catalogName && <p className="text-xs font-semibold uppercase tracking-wider text-pink-700">{catalogName}</p>}
                    <h2 className="mt-2 text-xl font-semibold text-stone-900">{product.title}</h2>
                    {technique && <p className="mt-2 text-sm text-stone-600">{technique}</p>}
                    {leadTime && <p className="mt-1 text-sm text-stone-500">Tiempo de producción: {leadTime}</p>}
                    <p className="mt-4 text-lg font-bold text-pink-700"><Money data={price} /></p>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="mt-12 rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
          Estamos preparando esta colección. Vuelve pronto para descubrir nuevos regalos personalizados.
        </section>
      )}
    </main>
  );
}

function metafieldValue(
  metafields: Array<{key: string; value: string} | null>,
  key: string,
) {
  return metafields.find((metafield) => metafield?.key === key)?.value;
}

const NENUFAR_CATALOG_QUERY = `#graphql
  query NenufarCatalog($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 100, sortKey: TITLE) {
      nodes {
        id
        title
        handle
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "catalog_name"}
          {namespace: "custom", key: "technique"}
          {namespace: "custom", key: "lead_time"}
        ]) {
          key
          value
        }
      }
    }
  }
` as const;
