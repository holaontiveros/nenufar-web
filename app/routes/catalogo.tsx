import type {Route} from './+types/catalogo';
import {NenufarCatalogue, type NenufarCatalogueItem} from '~/components/NenufarCatalogue';

export const meta: Route.MetaFunction = () => [{title: 'Catálogo | Nenúfar'}];

export async function loader({context}: Route.LoaderArgs) {
  const {products} = await context.storefront.query(NENUFAR_CATALOG_QUERY, {cache: context.storefront.CacheLong()});
  const catalogue: NenufarCatalogueItem[] = products.nodes.map((product) => ({
    id: product.id, title: product.title, handle: product.handle,
    image: product.featuredImage ? {url: product.featuredImage.url, altText: product.featuredImage.altText} : undefined,
    price: product.priceRange.minVariantPrice, description: product.description,
    catalogName: metafieldValue(product.metafields, 'catalog_name'), technique: metafieldValue(product.metafields, 'technique'), leadTime: metafieldValue(product.metafields, 'lead_time'),
  }));
  return {catalogue};
}

export default function CataloguePage({loaderData}: Route.ComponentProps) {
  return <NenufarCatalogue products={loaderData.catalogue} />;
}

function metafieldValue(metafields: Array<{key: string; value: string} | null>, key: string) { return metafields.find((metafield) => metafield?.key === key)?.value; }

const NENUFAR_CATALOG_QUERY = `#graphql
  query NenufarCatalog($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 100, sortKey: TITLE) { nodes { id title handle description featuredImage { id url altText width height } priceRange { minVariantPrice { amount currencyCode } }
      metafields(identifiers: [{namespace: "custom", key: "catalog_name"} {namespace: "custom", key: "technique"} {namespace: "custom", key: "lead_time"}]) { key value }
    }}
  }
` as const;
