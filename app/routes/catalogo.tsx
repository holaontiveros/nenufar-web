import type {Route} from './+types/catalogo';
import {NenufarCatalogue, type NenufarCatalogueItem} from '~/components/NenufarCatalogue';

export const meta: Route.MetaFunction = () => [{title: 'Catálogo | Nenúfar'}];

export async function loader({context}: Route.LoaderArgs) {
  const {collections} = await context.storefront.query(NENUFAR_CATALOG_QUERY, {cache: context.storefront.CacheLong()});
  const collectionsByHandle = new Map(collections.nodes.map((collection) => [collection.handle, collection]));
  const catalogue: NenufarCatalogueItem[] = SEASONAL_COLLECTION_HANDLES.flatMap((handle) => {
    const collection = collectionsByHandle.get(handle);

    return collection?.products.nodes.map((product) => ({
      id: product.id, title: product.title, handle: product.handle,
      image: product.featuredImage ? {url: product.featuredImage.url, altText: product.featuredImage.altText} : undefined,
      price: product.priceRange.minVariantPrice, description: product.description,
      catalogName: collection.title, catalogHandle: collection.handle, technique: product.technique?.value, leadTime: product.leadTime?.value,
    })) ?? [];
  });
  return {catalogue};
}

export default function CataloguePage({loaderData}: Route.ComponentProps) {
  return <NenufarCatalogue products={loaderData.catalogue} />;
}

const SEASONAL_COLLECTION_HANDLES = [
  'dia-de-la-madre',
  'dia-del-padre',
  'dia-del-maestro',
  'navidad-fin-de-ano',
  'bodas-eventos-especiales',
];

const NENUFAR_CATALOG_QUERY = `#graphql
  query NenufarCatalog($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: 100) { nodes { title handle products(first: 100, sortKey: TITLE) { nodes {
      id title handle description featuredImage { id url altText width height } priceRange { minVariantPrice { amount currencyCode } }
      technique: metafield(namespace: "custom", key: "technique") { value }
      leadTime: metafield(namespace: "custom", key: "lead_time") { value }
    } } } }
  }
` as const;
