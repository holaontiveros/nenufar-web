# ADR: Model product-page content with Shopify product metafields and reusable metaobjects

- Status: Approved
- Date: 2026-09-10

## Context

The approved product-page experience has two product types: personalized and non-personalized. It includes product-specific materials, package contents, workshop process, shipping/packaging, care guidance, and related products from the same native Shopify collection. The existing product data only supports a basic personalization text field and a small set of catalogue labels.

## Decision

Keep `custom.allow_custom_text` as the canonical product-type switch:

- `true`: personalized product
- `false`: non-personalized product

Use product metafields for product-specific display content and two merchant-managed, storefront-readable metaobject types for repeatable structured content:

- `product_personalization`: reusable configuration for a personalized product's input fields and selectable options.
- `product_process_step`: a reusable titled workshop step with an ordered position.

Personalized products reference one `product_personalization` entry and may reference an ordered list of `product_process_step` entries. Customer choices and entered personalization text are submitted as Shopify cart-line attributes so they remain available in checkout and the resulting order.

Related-product cards derive from Shopify's native collection membership. No `related_collection` metafield will be created. The related-products section excludes the current product and routes its catalogue link to `/catalogo?collection=<collection-handle>`.

## Alternatives considered

1. Put every personalization setting in independent product metafields. This would duplicate the same configuration across products and make option lists cumbersome to maintain.
2. Use generic rich-text blocks for all product details. This reduces structure, prevents consistent cards and lists, and is harder to validate.
3. Use the approved combination of direct product metafields and reusable metaobjects. It keeps per-product content direct while representing repeatable choices and process steps consistently.

## Impact and migration

Existing `custom.materials`, `custom.technique`, `custom.lead_time`, `custom.badge`, `custom.allow_custom_text`, and `custom.custom_text_placeholder` remain supported during migration. New personalized products must reference a `product_personalization` entry before the expanded personalization form is enabled. Existing non-personalized products require no personalization configuration.

Definitions, formats, and migration steps are documented in `docs/shopify/product-page-data.md`. The visual implementation is intentionally deferred to the staged roadmap.

## Risks and rollback

Missing optional display data should hide its corresponding card or tab content rather than show placeholders. A personalized product without a valid configuration must not render a partially functional customizer. Product membership in multiple collections needs an explicit selection rule before the related-products section is implemented.

To roll back the eventual implementation, revert its dedicated storefront chunk. The additional Shopify definitions can remain unused without affecting the current page.
