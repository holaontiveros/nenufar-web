# Use the first product collection as the product badge

## Objective

Make the single-product gallery badge identify the product's first associated collection, matching the catalogue card's collection label.

## Scope

- Render the product page badge from the first collection already loaded for related products.
- Remove the now-unused product `custom.badge` metafield from the product-page query.
- Preserve the current related-products collection selection and all product, variant, and cart behavior.

## Decisions

- Reuse `product.collections.nodes[0]`, the existing first associated collection used by the product page's related-products section.
- Hide the badge when Shopify returns no associated collection.

## Files modified

- `app/routes/products.$handle.tsx`
- `docs/changes/2026-09-12-product-badge-first-collection.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- Shopify controls the returned ordering of product collections; the first returned collection is therefore the displayed catalogue and product-page label.

## Rollback

Revert this commit to restore the `custom.badge` metafield as the product-page gallery badge.
