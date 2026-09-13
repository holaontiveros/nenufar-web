import {
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useRouteError,
} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {Analytics} from '@shopify/hydrogen';
import {
  NenufarCatalogue,
  type NenufarCatalogueItem,
} from '~/components/NenufarCatalogue';
import {NotFoundPage} from '~/components/NotFoundPage';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => [
  {title: `${data?.collection.title ?? 'Colección'} | Nenúfar`},
];

export async function loader(args: Route.LoaderArgs) {
  const {collection} = await loadCollection(args);

  return {
    catalogue: collection.products.nodes.map((product) => {
      const techniqueReference = product.technique?.reference;
      const technique =
        techniqueReference && 'name' in techniqueReference
          ? (techniqueReference.name?.value ?? undefined)
          : undefined;

      return {
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
      } satisfies NenufarCatalogueItem;
    }),
    collection: {
      handle: collection.handle,
      id: collection.id,
      title: collection.title,
      description: collection.description,
    },
  };
}

async function loadCollection({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw redirect('/collections/all');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    cache: storefront.CacheLong(),
    variables: {handle},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

export default function Collection() {
  const {catalogue, collection} = useLoaderData<typeof loader>();

  return (
    <>
      <NenufarCatalogue collection={collection} products={catalogue} />
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  throw error;
}

const COLLECTION_QUERY = `#graphql
  query NenufarCollectionCatalog(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: 100, sortKey: TITLE) {
        nodes {
          id
          title
          handle
          description
          featuredImage {
            id
            altText
            url
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
` as const;
