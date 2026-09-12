# Show catalogue product price ranges

## Objective

Show a product card's full Shopify variant-price range when its minimum and maximum variant prices differ.

## Scope

- Fetch both minimum and maximum variant prices for catalogue products.
- Display one localized price for a single-price product and a localized minimum-to-maximum range for products with variants at different prices.
- Preserve catalogue filtering, collection labels, navigation, and all product-page pricing behavior.

## Decisions

- Use Shopify's `priceRange` values rather than calculating prices from loaded variants.
- Compare both amount and currency before collapsing a range to one price.

## Files modified

- `app/components/NenufarCatalogue.tsx`
- `app/routes/catalogo.tsx`
- `docs/changes/2026-09-12-catalogue-price-ranges.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- The development-store catalogue needs products with distinct variant prices for manual visual confirmation of the range format.

## Rollback

Revert this commit to restore catalogue cards that show only the minimum variant price.
