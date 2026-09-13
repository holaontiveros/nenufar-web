# Standardize related and complementary product cards

## Objective

Use one card implementation for both product-recommendation sections on an individual product page.

## Scope

- Reuse the existing `related-product-card` markup and styles for Search & Discovery complementary products.
- Query and show the complementary product description, matching the related-product card content structure.
- Remove the duplicate complementary-card CSS.
- Do not change catalogue cards or the home-page card that links to the catalogue.

## Files modified

- `app/routes/products.$handle.tsx`
- `app/styles/app.css`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

Both sections intentionally share the existing related-product card presentation. Revert this commit to restore the complementary-only card treatment; recommendation data and Search & Discovery configuration remain unchanged.
