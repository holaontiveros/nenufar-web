# Show Shopify original and current prices on cart lines

## Objective

Make a discounted cart line explain itself by displaying Shopify's original
compare-at unit price beside the current unit price.

## Scope

- Replaced the line-total price in the cart drawer with Shopify's current unit
  price, `cost.amountPerQuantity`.
- Passed Shopify's cart-context compare-at unit price,
  `cost.compareAtAmountPerQuantity`, to the existing sale-price component.
- Added a `por pieza` label when the line quantity exceeds one, so the displayed
  API values are not mistaken for the full line total.
- Kept the applied-discount area and its API-provided savings unchanged.

## Decisions

- Prices are displayed directly from the Storefront Cart API. The storefront
  does not derive an original price, calculate a saving, or multiply a unit
  price by quantity.
- The original struck-through price appears only when Shopify supplies a
  compare-at price for the cart line. Non-sale products continue to show only
  their current price.

## Files modified

- `app/components/CartLineItem.tsx`
- `app/styles/app.css`
- `docs/changes/2026-09-12-cart-line-compare-at-prices.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

- Confirm a discounted product shows its original compare-at unit price and
  current unit price in the drawer, alongside the separate Shopify-reported
  saving.
- Revert this chunk to restore line-total-only pricing without changing any
  Shopify price or discount configuration.
