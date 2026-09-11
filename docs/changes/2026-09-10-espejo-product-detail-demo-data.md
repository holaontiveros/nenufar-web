# Seed all product-detail tabs for the mirror demo product

## Objective

Populate one existing development product so the second product-page section can demonstrate all four Shopify-backed detail tabs.

## Scope

- Added development-only dimensions, weight, materials, package contents, shipping, packaging, and care values to `espejo-cartera-oro-rosa-madre`.
- Linked that product to the existing three `product_process_step` entries, in their displayed order.
- Kept the product's existing personalization and commercial data unchanged.
- Recorded the product as the visual reference record in the product-page data guide.

## Decisions

- This is a content-only development-store change. It reuses the approved public product metafields and existing workshop-step metaobjects; no schema, query, or storefront architecture changed.
- The content is deliberately illustrative and must be replaced with merchant-verified production copy before launch.

## Files modified

- `docs/shopify/product-page-data.md`
- `docs/changes/2026-09-10-espejo-product-detail-demo-data.md`

## Validation

- `metafieldsSet` completed with no Shopify user errors.
- The public development Storefront API returned every written field and the three referenced workshop-step metaobjects.
- Manual deployed-storefront check confirmed the four tabs are present and the updated Materials & Dimensions tab renders the new values.
- `git diff --check`

## Remaining risks

- This content exists only in the development store and must be recreated or migrated deliberately for the production store.
- The values are demo copy and are not commercial or fulfillment commitments.

## Rollback

Clear the affected metafield values and remove the three process references from this product in Shopify Admin. No storefront deployment or schema rollback is required.
