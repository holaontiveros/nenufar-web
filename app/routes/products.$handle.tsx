import { Link, redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  Image,
  Money,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import type { PersonalizationConfig } from '~/components/ProductForm';
import {
  ProductDetailsTabs,
  type ProductDetailReference,
  type ProductProcessStep,
} from '~/components/ProductDetailsTabs';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data?.product.title ?? 'Producto'} | Nenúfar` },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: Route.LoaderArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const { product } = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;
  const isPersonalized = product.personalizationEnabled?.value === 'true';
  const personalizationReference = product.personalizationConfig?.reference;
  const personalizationConfig: PersonalizationConfig | null =
    personalizationReference
      ? {
          artisanNoteEnabled:
            personalizationReference.artisanNoteEnabled?.value === 'true',
          artisanNoteLabel: personalizationReference.artisanNoteLabel?.value,
          artisanNotePlaceholder:
            personalizationReference.artisanNotePlaceholder?.value,
          characterLimit: personalizationReference.characterLimit?.value,
          fontOptions: personalizationReference.fontOptions?.value,
          motifOptions: personalizationReference.motifOptions?.value,
          previewCopy: personalizationReference.previewCopy?.value,
          textLabel: personalizationReference.textLabel?.value,
          textPlaceholder: personalizationReference.textPlaceholder?.value,
        }
      : null;
  const processSteps: ProductProcessStep[] =
    product.makingProcess?.references?.nodes
      .flatMap((reference) =>
        reference
          ? [
              {
                body: reference.body?.value ?? '',
                position: reference.position?.value ?? '',
                title: reference.title?.value ?? '',
              },
            ]
          : [],
      )
      .filter((step) => step.title && step.body) ?? [];
  const readDetailReferences = (
    references: typeof product.shippingDetails,
  ): ProductDetailReference[] =>
    references?.references?.nodes.flatMap((reference) => {
      if (!reference || !('body' in reference)) return [];

      const body = reference.body?.value;
      return body
        ? [
            {
              body,
              position:
                'position' in reference
                  ? (reference.position?.value ?? undefined)
                  : undefined,
              title:
                'title' in reference
                  ? (reference.title?.value ?? undefined)
                  : undefined,
            },
          ]
        : [];
    }) ?? [];
  const shippingDetails = readDetailReferences(product.shippingDetails);
  const packagingDetails = readDetailReferences(product.packagingDetails);
  const careGuide = readDetailReferences(product.careGuide);
  const compatibleTechniques =
    product.compatibleTechniques?.references?.nodes.flatMap((reference) => {
      const name =
        reference && 'name' in reference ? reference.name?.value : null;
      return name ? [name] : [];
    }) ?? [];
  const relatedCollection = product.collections.nodes[0];
  const relatedProducts =
    relatedCollection?.products.nodes
      .filter((relatedProduct) => relatedProduct.id !== product.id)
      .slice(0, 3) ?? [];

  return (
    <>
      <div className="product nenufar-product-page">
        <div className="nenufar-product-gallery ">
          <div className={`nenufar-product-gallery-inner${product.images.nodes.length > 1 ? ' has-gallery' : ''}`}>
            {product.badge?.value && (
              <span className="nenufar-product-badge">
                {product.badge.value}
              </span>
            )}
            <ProductImage
              image={selectedVariant?.image}
              images={product.images.nodes}
            />
            <p className="nenufar-product-gallery-note">
              {selectedVariant?.availableForSale
                ? '✓ Disponible para elaboración'
                : 'Consulta disponibilidad'}
            </p>
          </div>

          <ul className="nenufar-product-assurances">
            <li>Pago protegido mediante Shopify.</li>
            <li>Atención del taller para cada pedido.</li>
          </ul>
        </div>
        <div className="product-main nenufar-product-main">
          <div className="nenufar-product-meta">
            <span>
              {product.materialLabel?.value ||
                (isPersonalized
                  ? 'Pieza personalizada'
                  : 'Insumo listo para usar')}
            </span>
            {product.technique?.value && (
              <small>{product.technique.value}</small>
            )}
          </div>
          <h1>{title}</h1>
          <div className="nenufar-product-price-panel">
            <div>
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
              <small>Precios final · IVA incluido</small>
            </div>
            <div className="nenufar-product-availability">
              <b>
                {selectedVariant?.availableForSale
                  ? '● Disponible'
                  : '● Agotado'}
              </b>
              {product.leadTime?.value && (
                <span>◷ Tiempo de elaboración: {product.leadTime.value}</span>
              )}
            </div>
          </div>
          <div className="nenufar-product-description">
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>
          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
            allowCustomText={isPersonalized}
            personalizationConfig={personalizationConfig}
          />
        </div>
      </div>
      <ProductDetailsTabs
        careGuide={careGuide}
        compatibleTechniques={compatibleTechniques}
        dimensions={product.dimensions?.value}
        materials={product.materials?.value}
        packageIncludes={product.packageIncludes?.value}
        packagingDetails={packagingDetails}
        processSteps={processSteps}
        shippingDetails={shippingDetails}
        technique={product.technique?.value}
        weight={product.weight?.value}
      />
      {relatedCollection && relatedProducts.length > 0 && (
        <section
          className="related-products"
          aria-labelledby="related-products-heading"
        >
          <div className="related-products-heading">
            <div>
              <span>Colección completa</span>
              <h2 id="related-products-heading">
                Otras piezas de {relatedCollection.title}
              </h2>
            </div>
            <Link to={`/catalogo?collection=${relatedCollection.handle}`}>
              Ver catálogo completo →
            </Link>
          </div>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link
                className="related-product-card"
                key={relatedProduct.id}
                prefetch="intent"
                to={`/products/${relatedProduct.handle}`}
              >
                {relatedProduct.featuredImage && (
                  <Image
                    alt={
                      relatedProduct.featuredImage.altText ||
                      relatedProduct.title
                    }
                    aspectRatio="1/1"
                    data={relatedProduct.featuredImage}
                    loading="lazy"
                    sizes="(min-width: 45em) 33vw, 100vw"
                  />
                )}
                <h3>{relatedProduct.title}</h3>
                <p>{relatedProduct.description}</p>
                <strong>
                  <Money data={relatedProduct.priceRange.minVariantPrice} />
                </strong>
                <span>Ver pieza →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    images(first: 10) {
      nodes {
        id
        url
        altText
      }
    }
    collections(first: 1) {
      nodes {
        handle
        title
        products(first: 4) {
          nodes {
            id
            handle
            title
            description
            featuredImage {
              altText
              height
              id
              url
              width
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    materialLabel: metafield(namespace: "custom", key: "material_label") {
      value
    }
    badge: metafield(namespace: "custom", key: "badge") {
      value
    }
    technique: metafield(namespace: "custom", key: "technique") {
      value
    }
    leadTime: metafield(namespace: "custom", key: "lead_time") {
      value
    }
    dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
    }
    weight: metafield(namespace: "custom", key: "weight") {
      value
    }
    materials: metafield(namespace: "custom", key: "materials") {
      value
    }
    packageIncludes: metafield(namespace: "custom", key: "package_includes") {
      value
    }
    makingProcess: metafield(namespace: "custom", key: "making_process") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            body: field(key: "body") {
              value
            }
            position: field(key: "position") {
              value
            }
            title: field(key: "title") {
              value
            }
          }
        }
      }
    }
    shippingDetails: metafield(namespace: "custom", key: "shipping_details") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            body: field(key: "body") { value }
            position: field(key: "position") { value }
            title: field(key: "title") { value }
          }
        }
      }
    }
    packagingDetails: metafield(namespace: "custom", key: "packaging_details") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            body: field(key: "body") { value }
            position: field(key: "position") { value }
            title: field(key: "title") { value }
          }
        }
      }
    }
    careGuide: metafield(namespace: "custom", key: "care_guide") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            body: field(key: "body") { value }
            position: field(key: "position") { value }
            title: field(key: "title") { value }
          }
        }
      }
    }
    compatibleTechniques: metafield(namespace: "custom", key: "compatible_techniques") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            name: field(key: "name") {
              value
            }
          }
        }
      }
    }
    personalizationEnabled: metafield(namespace: "custom", key: "allow_custom_text") {
      value
    }
    personalizationConfig: metafield(namespace: "custom", key: "personalization_config") {
      reference {
        ... on Metaobject {
          artisanNoteEnabled: field(key: "artisan_note_enabled") {
            value
          }
          artisanNoteLabel: field(key: "artisan_note_label") {
            value
          }
          artisanNotePlaceholder: field(key: "artisan_note_placeholder") {
            value
          }
          characterLimit: field(key: "character_limit") {
            value
          }
          fontOptions: field(key: "font_options") {
            value
          }
          motifOptions: field(key: "motif_options") {
            value
          }
          previewCopy: field(key: "preview_copy") {
            value
          }
          textLabel: field(key: "text_label") {
            value
          }
          textPlaceholder: field(key: "text_placeholder") {
            value
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
