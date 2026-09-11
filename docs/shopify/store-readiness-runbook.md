# Shopify store-readiness and production migration runbook

This runbook is the operational checklist for getting Nenúfar Web running against a Shopify store. It distinguishes the current development-store state from work that must be repeated or verified for the future production store.

For the client-transfer production store, follow the no-demo execution sequence in [production-store-bootstrap.md](../plans/production-store-bootstrap.md) before configuring products or deploying Hydrogen.

The transfer-store schema bootstrap completed on 2026-09-10. Its public Product, Collection, Shop, and merchant-owned `nenufar_*` metaobject definitions are in place, along with the constrained Product reference fields. See the production bootstrap plan for the current state.

## Safety rules

- The current Hydrogen project is linked only to the development storefront. Never reuse that linkage, its Oxygen environment, or its credentials for production.
- Create production tokens and environment values in the production store only; never commit them.
- Treat all development products, prices, inventory, images, copy, metafield values, WhatsApp number, and FAQs as non-production data until the merchant verifies them.
- Recreate definitions and content in production deliberately. Do not depend on a development-store resource ID, cart ID, file URL, or Oxygen preview URL.

## Development-store baseline

The following was read from `nenu-from-react.myshopify.com` on 2026-09-10. It is a configuration inventory, not proof that every product value is complete.

| Status | Resource | Details |
| --- | --- | --- |
| Confirmed | Product metafield | `custom.technique`, single-line text, public storefront read. |
| Confirmed | Product metafield | `custom.lead_time`, single-line text, public storefront read. |
| Confirmed | Product metafield | `custom.badge`, single-line text, public storefront read. |
| Confirmed | Product metafield | `custom.allow_custom_text`, boolean, public storefront read. |
| Confirmed | Product metafield | `custom.is_popular`, boolean, public storefront read. |
| Confirmed | Product metafield | `custom.materials`, multi-line text, public storefront read. |
| Confirmed | Product metafield | `custom.custom_text_placeholder`, single-line text, public storefront read. |
| Legacy / do not copy by default | Product metafield | `custom.catalog_id` and `custom.catalog_name`; the storefront now classifies catalogue content with native Shopify collections. Reassess only if another integration depends on them. |
| Confirmed | Metaobject definition | `faq_item`, public storefront read, with required `question` and `answer` fields. Three development FAQ entries were seeded. |
| Confirmed in the dedicated contact change | Shop metafield | `contact.whatsapp_number`, public storefront read, with the development number populated. |
| Confirmed | Product-page schema | The planned Product metafield definitions plus public `product_personalization` and `product_process_step` definitions now exist in development. Personalized and dev-only non-personalized seeds are published and verified. |

## What must exist in every store used by this storefront

### 1. Storefront access and runtime environment

1. Create or select a distinct Hydrogen storefront for the target store.
2. Configure a Storefront API public token for that storefront with the capabilities required by product queries and Cart API.
3. Set the target environment's secrets/configuration in Hydrogen/Oxygen, not Git:
   - `PUBLIC_STORE_DOMAIN`
   - `PUBLIC_STOREFRONT_API_TOKEN`
   - `PUBLIC_STOREFRONT_ID`
   - `PUBLIC_CHECKOUT_DOMAIN`
   - `SESSION_SECRET` (new, strong, environment-specific value)
4. Link the local project to the target storefront only when preparing that environment; never point a production deployment at the development-store configuration.
5. Run `npm run codegen`, `npm run typecheck`, and `npm run build` after the target-store configuration is available.

### 2. Core commercial data

1. Create/import merchant-verified products, descriptions, variants, prices, SKUs, inventory policy, weight, and tax/shipping settings.
2. Upload merchant-owned product media to the target Shopify store and set correct alt text. Shopify Files/CDN assets from the development store must be copied or re-uploaded; their development URLs are not a production asset inventory.
3. Publish every purchasable product to the storefront's sales channel.
4. Configure payments, shipping zones/rates, taxes, markets, and checkout policies in the target store before accepting orders.
5. Create the native seasonal collections used by the storefront and populate them with the intended products. Preserve or deliberately update these handles currently linked from the home page:
   - `dia-de-la-madre`
   - `dia-del-padre`
   - `dia-del-maestro`
   - `navidad-fin-de-ano`

### 3. Current product metafields

Create the required `custom` Product metafield definitions with public storefront read access, then populate them on all relevant target-store products:

| Key | Required purpose |
| --- | --- |
| `technique` | Catalogue technique filter and product presentation. |
| `materials` | Product material summary. |
| `lead_time` | Customer-facing production time. |
| `badge` | Short product-image label. |
| `is_popular` | Optional featured label. |
| `allow_custom_text` | Current personalized (`true`) versus non-personalized (`false`) switch. |
| `material_label`, `dimensions`, `weight` | Product hero and materials/dimensions tab. |
| `package_includes`, `shipping_details`, `packaging_details`, `care_guide` | Product detail tabs. |
| `making_process`, `personalization_config` | References to the required public metaobject entries. |
| `custom_text_placeholder` | Legacy import field; structured personalization reads `personalization_config`. |

See `docs/shopify/metafields.md` for the existing demo import mapping.

### 4. Homepage FAQs

1. Create the `nenufar_faq_group` metaobject definition with public storefront read access: required `title` and `position`, optional `description`.
2. Add the optional `group` reference to `nenufar_faq_item`, constrained to `nenufar_faq_group`.
3. Create production group entries, then production FAQ entries with required `question` and `answer` values and the correct group selected.
4. Verify the entries through Storefront API; incomplete entries intentionally do not render and ungrouped entries remain visible during migration.

See `docs/shopify/faq-metaobjects.md`.

### 5. Global WhatsApp contact

1. Create the Shop metafield definition `contact.whatsapp_number` with public storefront read access.
2. Enter the verified production phone number as E.164 digits without a `+`, spaces, or punctuation.
3. Verify a storefront page exposes working WhatsApp actions. Without a valid value, those actions intentionally remain hidden.

See `docs/shopify/contact-metafields.md`.

### 6. Product-page rich data

1. Create `nenufar_product_personalization` and `nenufar_product_process_step` metaobject definitions with public storefront read access.
2. Create the new product metafield definitions and populate merchant-verified values.
3. Create reusable personalization and workshop-step entries, then assign the reference metafields to representative personalized products.
4. Verify all referenced entries and values through Storefront API before publishing to the Hydrogen channel.

The exact definitions, formats, and migration order are in `docs/shopify/product-page-data.md`.

## Production cutover sequence

1. Complete all desired feature chunks and merge their committed code.
2. Finish the target-store data setup above and verify real checkout settings with the merchant.
3. Create a new Oxygen preview attached to the target storefront; do not reuse a development preview URL as a release artifact.
4. Run the acceptance checklist below using production-like products and a real test order flow permitted by the merchant.
5. Obtain approval for the production deployment and custom-domain change, if applicable.
6. Deploy the approved commit to the target production Oxygen environment.
7. Re-run smoke tests on the live domain and retain the prior deployment reference for rollback.

## Acceptance checklist

- Homepage loads its public FAQ metaobjects and its WhatsApp actions use the target Shop metafield.
- `/catalogo` shows only intended products; each seasonal link resolves to its intended native collection filter.
- Product pages show correct media, variants, availability, price, and any approved custom data.
- Adding, changing quantity, and removing cart items works; the cart survives a browser refresh as designed.
- Checkout uses the target store's real `checkoutUrl`, currency, payment, shipping, tax, and policy configuration.
- Personalized products carry their intended cart-line attributes into checkout/order details when that feature is released.
- Images load from approved Shopify or owned assets; no broken development-store asset dependencies remain.
- Error, empty-data, and mobile paths have been reviewed.

## Pending decisions and known prerequisites

- Approve a verified source before rendering reviews, rating averages, delivery counts, or other social-proof claims.
- Decide the source of customer-facing availability and express-delivery wording.
- Fix the existing ESLint Jest/Vitest configuration issue before making lint a release gate; `npm test`, typecheck, and production build currently provide the project’s runnable checks.

## Rollback

Rollback deployment by restoring the prior known-good Oxygen deployment or deploying the prior committed Git revision. Do not delete target-store products, definitions, or orders as part of a storefront rollback. Correct content/configuration errors in Shopify and redeploy only when code changed.
