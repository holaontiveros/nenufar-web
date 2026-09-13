import type {Route} from './+types/collections.all';
import {
  NenufarCatalogue,
  type NenufarCatalogueItem,
} from '~/components/NenufarCatalogue';

export const meta: Route.MetaFunction = () => [{title: 'Catálogo | Nenúfar'}];

export async function loader({context}: Route.LoaderArgs) {
  const {collections} = await context.storefront.query(NENUFAR_CATALOG_QUERY, {
    cache: context.storefront.CacheLong(),
  });
  const productsById = new Map<string, NenufarCatalogueItem>();

  for (const collection of collections.nodes) {
    for (const product of collection.products.nodes) {
      const techniqueReference = product.technique?.reference;
      const technique =
        techniqueReference && 'name' in techniqueReference
          ? (techniqueReference.name?.value ?? undefined)
          : undefined;
      const existing = productsById.get(product.id);

      if (existing) {
        existing.catalogNames = [
          ...new Set([...(existing.catalogNames ?? []), collection.title]),
        ];
        existing.catalogHandles = [
          ...new Set([...(existing.catalogHandles ?? []), collection.handle]),
        ];
        continue;
      }

      productsById.set(product.id, {
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: product.featuredImage
          ? {
              url: product.featuredImage.url,
              altText: product.featuredImage.altText,
            }
          : undefined,
        priceRange: product.priceRange,
        description: product.description,
        catalogName: collection.title,
        catalogHandle: collection.handle,
        catalogNames: [collection.title],
        catalogHandles: [collection.handle],
        technique,
        leadTime: product.leadTime?.value,
      });
    }
  }

  return {catalogue: [...productsById.values()]};
}

export default function AllProductsCollection({loaderData}: Route.ComponentProps) {
  return <NenufarCatalogue products={loaderData.catalogue} />;
}

const NENUFAR_CATALOG_QUERY = `#graphql
  query NenufarAllProductsCatalog(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 100) {
      nodes {
        title
        handle
        products(first: 100, sortKey: TITLE) {
          nodes {
            id
            title
            handle
            description
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
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            technique: metafield(namespace: "custom", key: "technique") {
              reference {
                ... on Metaobject {
                  name: field(key: "name") {
                    value
                  }
                }
              }
            }
            leadTime: metafield(namespace: "custom", key: "lead_time") {
              value
            }
          }
        }
      }
    }
  }
` as const;
