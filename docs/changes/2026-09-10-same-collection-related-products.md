# Same-collection related products

## Objective

Show other pieces from the current product's native Shopify collection at the end of its product page.

## Scope

- Select the first collection returned by Shopify for the current product, as explicitly approved.
- Query up to four products from that collection, exclude the current product, and render up to three related cards.
- Make the full card—including its image—a product link.
- Route the section action to the corresponding filtered catalogue URL.

## Decisions

- The first collection returned by Shopify is the deterministic source when a product belongs to multiple collections. The approved architecture decision is recorded in `ADR-2026-09-10-related-products-first-collection.md`.
- The section is omitted when the selected collection has no other available product records.

## Files modified

- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `docs/architecture/ADR-2026-09-10-related-products-first-collection.md`
- `docs/plans/product-page-roadmap.md`
- `docs/shopify/product-page-data.md`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Risks and rollback

- The Storefront API's returned collection ordering controls the selected related-product source. Merchants should manage native collection membership deliberately.
- Revert this commit to remove the related-products query and section.
