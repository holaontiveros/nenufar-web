# Prevent cart-line pricing errors during optimistic updates

## Objective

Keep the cart drawer available while a line is being optimistically added or
updated before Shopify returns its complete cart pricing data.

## Scope

- Made the cart-line unit and compare-at price reads optional.
- Preserved the direct Storefront Cart API values once they are available.
- Kept the price display blank during the brief optimistic state instead of
  throwing a storefront error.

## Decisions

- No fallback price, discount, or calculation is introduced. An optimistic line
  without `cost` simply does not render a price until Shopify returns the
  authoritative cart data.
- This is a rendering guard only; it does not change cart mutations, product
  pricing, or discount behavior.

## Files modified

- `app/components/CartLineItem.tsx`
- `docs/changes/2026-09-13-cart-line-optimistic-price-safety.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

- Confirm adding a product repeatedly does not produce a 500 error while the
  cart is updating, and that Shopify prices appear after the response returns.
- Revert this chunk to restore strict line-cost reads.
