# Product-page delivery roadmap

## Approved scope

Build a Shopify Hydrogen product page with distinct personalized and non-personalized flows, a structured tabbed details section, and related products from the same native collection.

## Pending implementation chunks

### 1. Create and seed Shopify product-page data

- Status: complete. The documented product metafield and metaobject definitions exist in the development store.
- Complete personalized and non-personalized seeds are published and verified through Storefront API.
- Update `docs/shopify/metafields.md` and the demo import guidance where relevant.

### 2. Rebuild the product-page top section

- Build responsive media gallery, labels, price/availability summary, real variant controls, quantity, cart action, direct Shopify checkout, and WhatsApp action.
- Render a non-personalized product without customization controls.
- Render a personalized product only when both `allow_custom_text` and a valid personalization configuration are present.
- Preserve current Storefront Cart API behavior and checkout URL.

### 3. Add structured personalization controls

- Render the configured text, typography, motif, preview, and artisan-note controls.
- Enforce the configured character limit.
- Submit choices as documented Shopify cart-line attributes.
- Add regression coverage for variant changes and cart submission with and without personalization.

### 4. Add tabbed product details

- Status: complete. The four conditional detail tabs read the approved product metafields and workshop-step references.
- The tab list and active panel use the corresponding ARIA tab roles; card layouts collapse responsively.

### 5. Add same-collection related products

- Status: complete. The section uses the first collection returned for the current product, excludes the current product, and renders up to three linked cards.
- The section action routes to `/catalogo?collection=<collection-handle>`.

## Decisions still needed before implementation

- **Product reviews:** the references show ratings and order counts, but no verified review provider or source exists. Do not render these claims until a data source is approved.
- **Availability wording:** decide whether badge/promotional delivery copy is manually managed product content or generated strictly from Shopify inventory and `lead_time`.
- **Media badges:** decide whether image-overlay badges continue to use `custom.badge` only or need a separate list/structured model.
- **Direct checkout behavior:** confirm whether “Comprar ahora en Shopify” should replace the current cart, add the selected item and redirect to the real cart checkout, or use a dedicated one-item cart flow.

## Out of scope for these chunks

- A review system or fabricated social proof.
- File/image upload for personalization.
- A custom order-management backend or Admin token in the storefront.
- Production-store data migration.
